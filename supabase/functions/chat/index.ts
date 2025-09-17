import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
};

// Rate limiting - simple in-memory store (pour démonstration)
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Récupérer la clé API Anthropic depuis les variables d'environnement
    const openaiApiKey = Deno.env.get('ANTHROPIC_API_KEY');
    
    if (!openaiApiKey) {
      throw new Error('Clé API Anthropic non configurée');
    }

    // Obtenir l'IP du client pour le rate limiting
    const clientIP = req.headers.get('x-forwarded-for') || 'unknown';
    
    // Vérifier le rate limiting
    const now = Date.now();
    const clientRequests = rateLimitStore.get(clientIP) || [];
    const recentRequests = clientRequests.filter((time: number) => now - time < RATE_LIMIT_WINDOW);
    
    if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
      return new Response(JSON.stringify({ 
        error: 'Trop de requêtes. Veuillez patienter avant de réessayer.' 
      }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    // Enregistrer cette requête
    recentRequests.push(now);
    rateLimitStore.set(clientIP, recentRequests);

    const { message, systemPrompt } = await req.json();

    // Validation des entrées
    if (!message || typeof message !== 'string') {
      throw new Error('Message requis et doit être une chaîne de caractères');
    }
    
    if (message.length > 4000) {
      throw new Error('Message trop long (maximum 4000 caractères)');
    }

    // Nettoyage du message pour éviter les injections
    const cleanMessage = message.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    if (systemPrompt && typeof systemPrompt !== 'string') {
      throw new Error('System prompt doit être une chaîne de caractères');
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': openaiApiKey,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 500,
        system: systemPrompt,
        messages: [
          { role: 'user', content: cleanMessage }
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API Error:', errorData);
      throw new Error(`OpenAI API Error: ${response.status}`);
    }

    const responseData = await response.json();
    
    // Validation de la réponse
    if (!responseData.content || !responseData.content[0] || !responseData.content[0].text) {
      throw new Error('Réponse API invalide');
    }
    
    // Nettoyage de la réponse
    const cleanResponse = responseData.content[0].text.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    return new Response(JSON.stringify({ 
      response: cleanResponse,
      provider: 'openai'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Une erreur est survenue'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});