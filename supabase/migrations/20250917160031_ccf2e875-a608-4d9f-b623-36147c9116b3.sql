-- Add role system to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user' NOT NULL;

-- Create enum for roles
CREATE TYPE public.user_role AS ENUM ('admin', 'moderator', 'user');

-- Update profiles table to use enum
ALTER TABLE public.profiles ALTER COLUMN role TYPE user_role USING role::user_role;

-- Create function to check if user has admin role
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = $1 AND role = 'admin'
  );
$$;

-- Update contact_messages RLS policies to restrict to admin users only
DROP POLICY IF EXISTS "Only authenticated users can view contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Only authenticated users can update contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Only authenticated users can delete contact messages" ON public.contact_messages;

-- Create new admin-only policies for contact messages
CREATE POLICY "Only admins can view contact messages" 
ON public.contact_messages 
FOR SELECT 
USING (public.is_admin());

CREATE POLICY "Only admins can update contact messages" 
ON public.contact_messages 
FOR UPDATE 
USING (public.is_admin());

CREATE POLICY "Only admins can delete contact messages" 
ON public.contact_messages 
FOR DELETE 
USING (public.is_admin());

-- Update api_keys policies to use the new role system
DROP POLICY IF EXISTS "Only authenticated admins can manage api_keys" ON public.api_keys;

CREATE POLICY "Only admin users can manage api_keys" 
ON public.api_keys 
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Create function to make first user admin
CREATE OR REPLACE FUNCTION public.make_first_user_admin()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_count integer;
BEGIN
  SELECT COUNT(*) INTO user_count FROM public.profiles;
  
  -- Make the first user an admin
  IF user_count = 0 THEN
    NEW.role = 'admin';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger to make first user admin
DROP TRIGGER IF EXISTS make_first_user_admin_trigger ON public.profiles;
CREATE TRIGGER make_first_user_admin_trigger
  BEFORE INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.make_first_user_admin();