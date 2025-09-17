-- Add subject column to contact_messages table
ALTER TABLE public.contact_messages 
ADD COLUMN subject TEXT NOT NULL DEFAULT '';