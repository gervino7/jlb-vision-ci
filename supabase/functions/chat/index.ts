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

// Enhanced rate limiting implementation
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5; // Reduced from 10 to 5 for better security
const AUTHENTICATED_MAX_REQUESTS = 20; // Higher limit for authenticated users

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client for auth verification
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Get user from JWT token
    const authHeader = req.headers.get('authorization');
    let userId = null;
    let isAuthenticated = false;

    if (authHeader) {
      try {
        const token = authHeader.replace('Bearer ', '');
        const { data: { user } } = await supabase.auth.getUser(token);
        if (user) {
          userId = user.id;
          isAuthenticated = true;
        }
      } catch (error) {
        console.error('Auth error:', error);
      }
    }

    // Get API key from environment
    const openaiApiKey = Deno.env.get('ANTHROPIC_API_KEY');
    
    if (!openaiApiKey) {
      throw new Error('Clé API OPENAI non configurée');
    }

    // Enhanced rate limiting with user-based limits
    const now = Date.now();
    const rateLimitKey = userId || req.headers.get('cf-connecting-ip') || 
                         req.headers.get('x-forwarded-for') || 'unknown';
    const maxRequests = isAuthenticated ? AUTHENTICATED_MAX_REQUESTS : RATE_LIMIT_MAX_REQUESTS;
    
    const current = rateLimitStore.get(rateLimitKey);

    if (current) {
      if (now < current.resetTime) {
        if (current.count >= maxRequests) {
          return new Response(
            JSON.stringify({ 
              error: isAuthenticated ? 
                'Limite de requêtes atteinte. Veuillez patienter.' : 
                'Trop de requêtes. Connectez-vous pour une limite plus élevée.' 
            }),
            { 
              status: 429, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }
        current.count++;
      } else {
        rateLimitStore.set(rateLimitKey, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
      }
    } else {
      rateLimitStore.set(rateLimitKey, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    }

    // Log request for monitoring
    console.log(`Chat request from ${isAuthenticated ? 'user:' + userId : 'anonymous:' + rateLimitKey}, count: ${current?.count || 1}/${maxRequests}`);

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