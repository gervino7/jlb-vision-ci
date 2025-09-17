import React from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { GallerySection } from '@/components/GallerySection';
import { VideoSection } from '@/components/VideoSection';
import { AudioSection } from '@/components/AudioSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <GallerySection />
      
      <AudioSection />
      
      <VideoSection />
      
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
