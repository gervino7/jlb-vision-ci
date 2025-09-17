-- Phase 1: Secure API Keys and Add Authentication

-- First, let's restrict the api_keys table access to authenticated admin users only
-- Drop the existing overly permissive policies
DROP POLICY IF EXISTS "Allow delete of api keys" ON public.api_keys;
DROP POLICY IF EXISTS "Allow insert of api keys" ON public.api_keys;
DROP POLICY IF EXISTS "Allow read access to api keys" ON public.api_keys;
DROP POLICY IF EXISTS "Allow update of api keys" ON public.api_keys;

-- Create secure RLS policies for api_keys (temporary, will be removed later)
CREATE POLICY "Only authenticated admins can manage api_keys"
ON public.api_keys
FOR ALL
USING (auth.uid() IS NOT NULL AND auth.jwt() ->> 'email' IN ('admin@jeanloulsbillon2025.ci'))
WITH CHECK (auth.uid() IS NOT NULL AND auth.jwt() ->> 'email' IN ('admin@jeanloulsbillon2025.ci'));

-- Create profiles table for user management
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  email text NOT NULL,
  role text NOT NULL DEFAULT 'user',
  display_name text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create secure RLS policies for profiles
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"  
ON public.profiles
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, display_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to automatically create profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Add updated_at trigger for profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();