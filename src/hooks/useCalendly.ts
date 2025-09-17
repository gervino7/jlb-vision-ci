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

  // Fonction pour ouvrir le widget Calendly en popup
  const openCalendlyPopup = (eventTypeUrl: string) => {
    if (typeof window !== 'undefined' && (window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({
        url: eventTypeUrl
      });
    } else {
      // Fallback: ouvrir dans un nouvel onglet
      window.open(eventTypeUrl, '_blank', 'noopener,noreferrer');
    }
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