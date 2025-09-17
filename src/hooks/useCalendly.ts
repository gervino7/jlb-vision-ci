import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface EventType {
  uri: string;
  name: string;
  description_plain?: string;
  duration: number;
  booking_url: string;
}

interface AvailableTime {
  start_time: string;
  invitee_start_time: string;
}

export const useCalendly = () => {
  const [loading, setLoading] = useState(false);
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [availableTimes, setAvailableTimes] = useState<AvailableTime[]>([]);
  const { toast } = useToast();

  const callCalendlyAPI = async (action: string, params: any = {}) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.functions.invoke('calendly', {
        body: { action, ...params }
      });

      if (error) {
        throw error;
      }

      if (!data.success) {
        throw new Error(data.error || 'Erreur API Calendly');
      }

      return data.data;
    } catch (error) {
      console.error(`Erreur ${action}:`, error);
      toast({
        title: "Erreur",
        description: `Impossible de ${action}: ${error.message}`,
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getEventTypes = async () => {
    try {
      const data = await callCalendlyAPI('getEventTypes');
      const types = data.collection || [];
      setEventTypes(types);
      return types;
    } catch (error) {
      return [];
    }
  };

  const getAvailableTimes = async (eventTypeUri: string, startDate: string, endDate: string) => {
    try {
      const data = await callCalendlyAPI('getAvailableTimes', {
        event_type: eventTypeUri,
        start_time: startDate,
        end_time: endDate
      });
      const times = data.collection || [];
      setAvailableTimes(times);
      return times;
    } catch (error) {
      return [];
    }
  };

  const getUserInfo = async () => {
    try {
      const data = await callCalendlyAPI('getUser');
      return data.resource;
    } catch (error) {
      return null;
    }
  };

  // Fonction pour ouvrir le widget Calendly en popup intégré
  const openCalendlyPopup = (eventTypeUrl: string) => {
    // Créer un iframe dans un modal pour éviter de quitter la page
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    modal.style.zIndex = '9999';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';

    const iframe = document.createElement('iframe');
    iframe.src = eventTypeUrl;
    iframe.style.width = '90%';
    iframe.style.height = '90%';
    iframe.style.maxWidth = '800px';
    iframe.style.maxHeight = '600px';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '8px';
    iframe.style.backgroundColor = 'white';

    const closeButton = document.createElement('button');
    closeButton.innerHTML = '✕';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.background = 'white';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '50%';
    closeButton.style.width = '40px';
    closeButton.style.height = '40px';
    closeButton.style.fontSize = '20px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.zIndex = '10000';

    closeButton.onclick = () => {
      document.body.removeChild(modal);
    };

    modal.onclick = (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    };

    modal.appendChild(iframe);
    modal.appendChild(closeButton);
    document.body.appendChild(modal);
  };

  return {
    loading,
    eventTypes,
    availableTimes,
    getEventTypes,
    getAvailableTimes,
    getUserInfo,
    openCalendlyPopup
  };
};