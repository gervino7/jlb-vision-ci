import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, apiKey, apiProvider, systemPrompt } = await req.json();

    if (!message || !apiKey || !apiProvider) {
      throw new Error('Missing required parameters');
    }

    let response;
    let responseData;

    if (apiProvider === 'openai') {
      response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message }
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('OpenAI API Error:', errorData);
        throw new Error(`OpenAI API Error: ${response.status}`);
      }

      responseData = await response.json();
      
      return new Response(JSON.stringify({ 
        response: responseData.choices[0].message.content,
        provider: 'openai'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } else if (apiProvider === 'anthropic') {
      response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-5-haiku-20241022',
          max_tokens: 500,
          system: systemPrompt,
          messages: [
            { role: 'user', content: message }
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Anthropic API Error:', errorData);
        throw new Error(`Anthropic API Error: ${response.status}`);
      }

      responseData = await response.json();
      
      return new Response(JSON.stringify({ 
        response: responseData.content[0].text,
        provider: 'anthropic'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } else {
      throw new Error('Provider not supported');
    }

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