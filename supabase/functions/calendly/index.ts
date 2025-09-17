import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const CALENDLY_API_KEY = Deno.env.get('CALENDLY_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!CALENDLY_API_KEY) {
      throw new Error('CALENDLY_API_KEY not configured');
    }

    const { action, ...params } = await req.json();
    
    console.log(`Calendly API request: ${action}`, params);

    let response;
    const headers = {
      'Authorization': `Bearer ${CALENDLY_API_KEY}`,
      'Content-Type': 'application/json',
    };

    switch (action) {
      case 'getUser':
        // Récupérer les informations de l'utilisateur principal
        response = await fetch('https://api.calendly.com/users/me', {
          headers
        });
        break;

      case 'getEventTypes':
        // Récupérer les types d'événements disponibles
        const userResponse = await fetch('https://api.calendly.com/users/me', {
          headers
        });
        const userData = await userResponse.json();
        
        response = await fetch(`https://api.calendly.com/event_types?user=${userData.resource.uri}`, {
          headers
        });
        break;

      case 'getAvailableTimes':
        // Récupérer les créneaux disponibles pour un type d'événement
        const { event_type, start_time, end_time } = params;
        response = await fetch(`https://api.calendly.com/event_type_available_times?event_type=${event_type}&start_time=${start_time}&end_time=${end_time}`, {
          headers
        });
        break;

      case 'createScheduledEvent':
        // Créer un événement programmé (nécessite des permissions spéciales)
        const { event_type, start_time: scheduledStart, invitee_email, invitee_name } = params;
        response = await fetch('https://api.calendly.com/scheduled_events', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            event_type,
            start_time: scheduledStart,
            invitee: {
              email: invitee_email,
              name: invitee_name
            }
          })
        });
        break;

      default:
        throw new Error(`Action non supportée: ${action}`);
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Calendly API error: ${response.status} - ${errorText}`);
      throw new Error(`Erreur API Calendly: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Calendly API response:', data);

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in calendly function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Erreur interne du serveur'
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});