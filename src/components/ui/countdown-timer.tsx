import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: Date;
  title?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  title = "Élection Présidentielle 2025"
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="glass-card p-6 text-center animate-scale-in">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <Clock className="w-5 h-5 text-primary" />
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-gradient-presidential mb-1">
            {timeLeft.days}
          </div>
          <div className="text-sm text-muted-foreground">Jours</div>
        </div>
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-gradient-presidential mb-1">
            {timeLeft.hours}
          </div>
          <div className="text-sm text-muted-foreground">Heures</div>
        </div>
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-gradient-presidential mb-1">
            {timeLeft.minutes}
          </div>
          <div className="text-sm text-muted-foreground">Minutes</div>
        </div>
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-gradient-presidential mb-1">
            {timeLeft.seconds}
          </div>
          <div className="text-sm text-muted-foreground">Secondes</div>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mt-4">
        Côte d'Ivoire • Octobre 2025
      </p>
    </div>
  );
};