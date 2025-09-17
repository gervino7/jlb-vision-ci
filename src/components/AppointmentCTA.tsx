import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, ArrowRight } from 'lucide-react';

interface AppointmentCTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  variant?: 'card' | 'inline' | 'banner';
  className?: string;
  onScheduleClick?: () => void;
}

export const AppointmentCTA: React.FC<AppointmentCTAProps> = ({
  title = "Échangeons ensemble",
  description = "Réservez un rendez-vous pour discuter de vos idées et préoccupations",
  buttonText = "Prendre rendez-vous",
  variant = 'card',
  className = "",
  onScheduleClick
}) => {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    onScheduleClick?.();
  };

  if (variant === 'inline') {
    return (
      <div className={`flex items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20 ${className}`}>
        <div>
          <h4 className="font-semibold text-foreground">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Button
          size="sm"
          className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-presidential transition-all duration-300 group"
          onClick={scrollToContact}
        >
          <Calendar className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
          {buttonText}
        </Button>
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div className={`py-12 px-6 text-center bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 ${className}`}>
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-primary-glow rounded-full mb-6 shadow-presidential">
            <Calendar className="h-8 w-8 text-primary-foreground" />
          </div>
          <h3 className="text-3xl font-bold text-gradient-presidential mb-4">{title}</h3>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{description}</p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-presidential transition-all duration-300 group btn-shine"
            onClick={scrollToContact}
          >
            <Calendar className="mr-2 h-6 w-6 group-hover:scale-110 transition-transform" />
            {buttonText}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    );
  }

  // Default card variant
  return (
    <Card className={`glass-card p-8 border-primary/20 hover:shadow-glow transition-all duration-500 group ${className}`}>
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-primary-glow rounded-full mb-6 shadow-presidential group-hover:scale-110 transition-transform duration-300">
          <Calendar className="h-8 w-8 text-primary-foreground" />
        </div>
        <h3 className="text-2xl font-bold text-primary mb-4">{title}</h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>
        <Button 
          size="lg"
          className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-presidential transition-all duration-300 group/btn btn-shine"
          onClick={scrollToContact}
        >
          <Calendar className="mr-2 h-5 w-5 group-hover/btn:scale-110 transition-transform duration-300" />
          {buttonText}
        </Button>
      </div>
    </Card>
  );
};