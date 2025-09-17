import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, Clock, Users, Briefcase, Mic, HandHeart } from 'lucide-react';

interface AppointmentType {
  id: string;
  title: string;
  description: string;
  duration: string;
  icon: React.ComponentType<any>;
  color: string;
  url: string;
}

interface AppointmentTypesProps {
  onSelectAppointment: (url: string) => void;
  className?: string;
}

export const AppointmentTypes: React.FC<AppointmentTypesProps> = ({ 
  onSelectAppointment, 
  className = "" 
}) => {
  const appointmentTypes: AppointmentType[] = [
    {
      id: 'citoyens',
      title: 'Consultation Citoyenne',
      description: 'Échangez directement avec Jean-Louis Billon sur vos préoccupations et vos idées pour la Côte d\'Ivoire.',
      duration: '30 min',
      icon: Users,
      color: 'primary',
      url: 'https://calendly.com/lovablecalendly/consultation-citoyenne'
    },
    {
      id: 'medias',
      title: 'Interview Média',
      description: 'Réservé aux journalistes et médias pour des interviews et points presse.',
      duration: '45 min',
      icon: Mic,
      color: 'secondary',
      url: 'https://calendly.com/lovablecalendly/interview-media'
    },
    {
      id: 'partenaires',
      title: 'Rencontre Partenaires',
      description: 'Destiné aux partenaires politiques, économiques et sociaux.',
      duration: '60 min',
      icon: Briefcase,
      color: 'accent',
      url: 'https://calendly.com/lovablecalendly/rencontre-partenaires'
    },
    {
      id: 'communaute',
      title: 'Dialogue Communautaire',
      description: 'Sessions dédiées aux leaders communautaires et associations.',
      duration: '90 min',
      icon: HandHeart,
      color: 'primary',
      url: 'https://calendly.com/lovablecalendly/dialogue-communautaire'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return {
          bg: 'bg-primary',
          text: 'text-primary-foreground',
          border: 'border-primary/20',
          hover: 'hover:border-primary/40'
        };
      case 'secondary':
        return {
          bg: 'bg-secondary',
          text: 'text-secondary-foreground',
          border: 'border-secondary/20',
          hover: 'hover:border-secondary/40'
        };
      case 'accent':
        return {
          bg: 'bg-accent',
          text: 'text-accent-foreground',
          border: 'border-accent/20',
          hover: 'hover:border-accent/40'
        };
      default:
        return {
          bg: 'bg-primary',
          text: 'text-primary-foreground',
          border: 'border-primary/20',
          hover: 'hover:border-primary/40'
        };
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {appointmentTypes.map((type) => {
        const Icon = type.icon;
        const colors = getColorClasses(type.color);
        
        return (
          <Card 
            key={type.id}
            className={`glass-card p-6 border ${colors.border} ${colors.hover} transition-all duration-300 hover:shadow-glow`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${colors.bg} ${colors.text}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-lg">{type.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {type.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{type.duration}</span>
              </div>
            </div>

            <Button 
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-presidential transition-all duration-300 group"
              onClick={() => onSelectAppointment(type.url)}
            >
              <Calendar className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              Réserver ce type de rendez-vous
            </Button>
          </Card>
        );
      })}
    </div>
  );
};