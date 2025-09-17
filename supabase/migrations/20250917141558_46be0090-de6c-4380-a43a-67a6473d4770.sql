-- Créer une table pour stocker les clés API
CREATE TABLE public.api_keys (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Activer Row Level Security
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;

-- Créer une politique pour permettre la lecture des clés (pour les fonctions edge)
CREATE POLICY "Allow read access to api keys" 
ON public.api_keys 
FOR SELECT 
USING (true);

-- Créer une politique pour permettre l'insertion de nouvelles clés
CREATE POLICY "Allow insert of api keys" 
ON public.api_keys 
FOR INSERT 
WITH CHECK (true);

-- Créer une politique pour permettre la mise à jour des clés
CREATE POLICY "Allow update of api keys" 
ON public.api_keys 
FOR UPDATE 
USING (true);

-- Créer une politique pour permettre la suppression des clés
CREATE POLICY "Allow delete of api keys" 
ON public.api_keys 
FOR DELETE 
USING (true);

-- Créer une fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Créer un trigger pour mettre à jour automatiquement updated_at
CREATE TRIGGER update_api_keys_updated_at
  BEFORE UPDATE ON public.api_keys
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insérer les clés existantes
INSERT INTO public.api_keys (name, value, description) VALUES 
('OPENAI_API_KEY', 'your-openai-key-here', 'Clé API pour OpenAI/GPT'),
('ANTHROPIC_API_KEY', 'your-anthropic-key-here', 'Clé API pour Claude/Anthropic'),
('CALENDLY_API_KEY', 'your-calendly-key-here', 'Clé API pour Calendly');