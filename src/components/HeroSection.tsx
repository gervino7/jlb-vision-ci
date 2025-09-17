import React from 'react';
import { ArrowRight, Star, Users, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CountdownTimer } from '@/components/ui/countdown-timer';
import portraitImage from '@/assets/jean-louis-billon-portrait-officiel.jpg';

export const HeroSection = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Election date: October 2025 (estimated)
  const electionDate = new Date('2025-10-25T00:00:00');

  return (
    <section id="home" className="min-h-screen relative overflow-hidden hero-pattern">
      {/* Background decorative elements */}
      <div className="absolute inset-0 kente-pattern opacity-30"></div>
      <div className="absolute top-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-floating"></div>
      
      <div className="container mx-auto px-4 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          
          {/* Left Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Star className="w-4 h-4" />
                <span>Candidat Présidentiel 2025</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-gradient-presidential">Jean Louis</span>
                <br />
                <span className="text-foreground">Billon</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground font-light">
                Une nouvelle génération de leaders pour la Côte d'Ivoire
              </p>
            </div>

            {/* Bio courte */}
            <div className="glass-card p-6 space-y-4">
              <p className="text-foreground leading-relaxed">
                <strong>Jean Louis Billon, 61 ans</strong>, entrepreneur visionnaire et candidat à la Présidentielle 2025. 
                Ancien Ministre du Commerce (2012-2017), PDG du groupe SIFCA (plus grand groupe privé ivoirien), 
                il incarne une nouvelle génération de leaders.
              </p>
              <p className="text-foreground leading-relaxed">
                Son <strong>"Plan B pour la Côte d'Ivoire"</strong> propose renouvellement générationnel, 
                création d'emplois massifs et gouvernance transparente. Diplômé de Montpellier et de l'IHEDN Paris, 
                il a transformé SIFCA en géant agro-industriel employant 33 000 personnes dans 6 pays.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center glass-card p-4">
                <div className="text-2xl font-bold text-gradient-presidential">33K+</div>
                <div className="text-sm text-muted-foreground">Emplois créés</div>
              </div>
              <div className="text-center glass-card p-4">
                <div className="text-2xl font-bold text-gradient-presidential">6</div>
                <div className="text-sm text-muted-foreground">Pays d'activité</div>
              </div>
              <div className="text-center glass-card p-4">
                <div className="text-2xl font-bold text-gradient-presidential">25+</div>
                <div className="text-sm text-muted-foreground">Ans d'expérience</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="btn-shine bg-gradient-presidential hover:shadow-glow group"
                onClick={() => scrollToSection('#gallery')}
              >
                Découvrir mon projet pour la Côte d'Ivoire
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground group"
                onClick={() => scrollToSection('#contact')}
              >
                <Users className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Rejoindre le mouvement
              </Button>
            </div>

            {/* Quick Appointment CTA */}
            <div className="mt-6 p-6 glass-card border-secondary/30">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Besoin d'échanger directement ?</h3>
                  <p className="text-sm text-muted-foreground">Réservez un rendez-vous personnalisé</p>
                </div>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-secondary to-secondary hover:shadow-glow group"
                  onClick={() => scrollToSection('#contact')}
                >
                  <span className="mr-2">📅</span>
                  Prendre RDV
                </Button>
              </div>
            </div>
          </div>

          {/* Right Content - Portrait & Countdown */}
          <div className="relative animate-fade-in">
            <div className="relative">
              {/* Portrait with elegant frame */}
              <div className="relative overflow-hidden rounded-3xl shadow-presidential">
                <img 
                  src={portraitImage} 
                  alt="Jean Louis Billon - Portrait officiel"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
              </div>
              
              {/* Floating credentials */}
              <div className="absolute -bottom-6 -left-6 glass-card p-4 animate-floating">
                <div className="flex items-center space-x-3">
                  <Briefcase className="w-8 h-8 text-primary" />
                  <div>
                    <div className="font-semibold text-foreground">Ex-Ministre</div>
                    <div className="text-sm text-muted-foreground">Commerce 2012-2017</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="mt-8">
              <CountdownTimer targetDate={electionDate} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};