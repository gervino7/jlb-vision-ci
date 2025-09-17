import React from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { GallerySection } from '@/components/GallerySection';
import { VideoSection } from '@/components/VideoSection';
import { AudioSection } from '@/components/AudioSection';
import { ContactSection } from '@/components/ContactSection';
import { ChatBotToggle } from '@/components/ChatBotToggle';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <GallerySection />
      
      <AudioSection />
      
      <VideoSection />
      
      <ContactSection />
      
      <ChatBotToggle />
    </div>
  );
};

export default Index;
