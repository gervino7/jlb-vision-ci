import React from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { GallerySection } from '@/components/GallerySection';
import { VideoSection } from '@/components/VideoSection';
import { AudioSection } from '@/components/AudioSection';
import { ContactSection } from '@/components/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <GallerySection />
      
      <AudioSection />
      
      <VideoSection />
      
      <ContactSection />
    </div>
  );
};

export default Index;
