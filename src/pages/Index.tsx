import React from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { GallerySection } from '@/components/GallerySection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <GallerySection />
      
      <div id="audio" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gradient-presidential mb-4">Section Audio</h2>
          <p className="text-muted-foreground">Section à venir - Messages de campagne et interviews</p>
        </div>
      </div>
      
      <div id="video" className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gradient-presidential mb-4">Section Vidéo</h2>
          <p className="text-muted-foreground">Section à venir - Vidéos YouTube, Facebook, institutionnelles</p>
        </div>
      </div>
      
      <div id="contact" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gradient-presidential mb-4">Contact</h2>
          <p className="text-muted-foreground">Section à venir - Formulaire, coordonnées, réseaux sociaux</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
