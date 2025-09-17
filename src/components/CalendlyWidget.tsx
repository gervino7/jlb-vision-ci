import React, { useEffect, useRef } from 'react';
import { useCalendly } from '@/hooks/useCalendly';
import { Card } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

interface CalendlyWidgetProps {
  url: string;
  height?: string;
  className?: string;
}

export const CalendlyWidget: React.FC<CalendlyWidgetProps> = ({ 
  url, 
  height = '700px',
  className = ""
}) => {
  const containerId = `calendly-widget-${Date.now()}`;
  const { createInlineWidget } = useCalendly();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current && url) {
      // Petit délai pour s'assurer que le DOM est prêt
      const timer = setTimeout(() => {
        createInlineWidget(containerId, url);
        hasInitialized.current = true;
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [url, createInlineWidget, containerId]);

  return (
    <Card className={`glass-card p-6 border-primary/20 ${className}`}>
      <div className="mb-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-primary-glow rounded-full mb-4 shadow-presidential">
          <Calendar className="h-8 w-8 text-primary-foreground" />
        </div>
        <h3 className="text-2xl font-bold text-primary mb-2">Réservez votre rendez-vous</h3>
        <p className="text-muted-foreground">
          Choisissez le créneau qui vous convient le mieux
        </p>
      </div>
      
      <div 
        id={containerId}
        className="w-full rounded-lg overflow-hidden border border-primary/10"
        style={{ minHeight: height }}
      >
        {/* Le widget Calendly sera inséré ici */}
        <div className="flex items-center justify-center h-40 bg-muted/30">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-3"></div>
            <p className="text-muted-foreground">Chargement du calendrier...</p>
          </div>
        </div>
      </div>
    </Card>
  );
};