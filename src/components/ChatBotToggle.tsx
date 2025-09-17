import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { ChatBot } from './ChatBot';

export const ChatBotToggle: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-presidential hover:scale-110 transition-all duration-300 shadow-presidential animate-pulse"
          size="icon"
        >
          <MessageSquare className="w-6 h-6 text-white" />
        </Button>
      )}
      
      <ChatBot isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
    </>
  );
};