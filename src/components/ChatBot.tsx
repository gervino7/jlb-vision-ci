import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, Send, Mic, MicOff, Phone, Calendar, Users, Building2, X, Minimize2, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatBotProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Message d'accueil automatique
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        content: "Bonjour ! Assistant de Jean-Louis Billon, candidat président. Comment puis-je vous aider aujourd'hui ?",
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  const initializeSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'fr-FR';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  };

  useEffect(() => {
    initializeSpeechRecognition();
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const sendMessage = async (message?: string) => {
    const messageToSend = message || inputValue.trim();
    if (!messageToSend || isLoading) return;

    // Validation de sécurité côté client
    if (messageToSend.length > 4000) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "Message trop long. Veuillez limiter votre message à 4000 caractères.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageToSend,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          message: messageToSend,
          systemPrompt: getSystemPrompt(),
        },
      });

      if (error) {
        throw new Error(error.message || 'Erreur de communication avec le serveur');
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: (data as any)?.response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Désolé, je rencontre un problème technique. Pouvez-vous réessayer ?",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getSystemPrompt = () => {
    return `Tu es l'assistant de Jean-Louis Billon, candidat président de Côte d'Ivoire. PDG de SIFCA/PALMCI, ancien ministre.

STYLE : Concis, précis, professionnel. Max 2-3 phrases par réponse.
MISSIONS : Répondre aux questions, expliquer le programme, faciliter les rendez-vous.
CONTACT : WhatsApp +225 05 06 80 31 13 pour RDV.

Sois direct, impactant et va à l'essentiel.`;
  };

  const quickActions = [
    { 
      icon: Phone, 
      label: "Prendre rendez-vous", 
      action: () => sendMessage("Je souhaiterais prendre rendez-vous avec Jean-Louis Billon")
    },
    { 
      icon: Building2, 
      label: "Ses entreprises", 
      action: () => sendMessage("Parlez-moi des entreprises de Jean-Louis Billon")
    },
    { 
      icon: Users, 
      label: "Son programme", 
      action: () => sendMessage("Quel est le programme de Jean-Louis Billon pour la Côte d'Ivoire ?")
    },
    { 
      icon: Calendar, 
      label: "Prochaines élections", 
      action: () => sendMessage("Quand auront lieu les prochaines élections présidentielles ?")
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className={cn(
        "transition-all duration-500 ease-in-out shadow-2xl border border-primary/30 backdrop-blur-2xl bg-white/95 dark:bg-gray-900/95",
        isMinimized ? "w-72 h-14" : "w-[360px] h-[500px]",
        "hover:shadow-presidential"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gradient-to-r from-primary/20 to-secondary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-presidential flex items-center justify-center shadow-lg">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base text-foreground">Assistant JLB</h3>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-xs text-muted-foreground font-medium">En ligne</p>
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMinimized(!isMinimized)}
              className="w-8 h-8"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onToggle}
              className="w-8 h-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <ScrollArea className="flex-1 p-4 h-72">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.isUser ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] p-3 rounded-xl text-sm font-medium leading-relaxed shadow-md transition-all duration-200 hover:shadow-lg",
                        message.isUser
                          ? "bg-gradient-presidential text-white rounded-br-md shadow-primary/20"
                          : "bg-white/80 text-gray-800 border border-gray-200/50 rounded-bl-md"
                      )}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/80 border border-gray-200/50 p-4 rounded-2xl rounded-bl-md shadow-md">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-gradient-presidential rounded-full animate-bounce"></div>
                        <div className="w-3 h-3 bg-gradient-presidential rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-3 h-3 bg-gradient-presidential rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Quick Actions */}
            {messages.length <= 1 && (
              <div className="p-4 border-t border-gradient-to-r from-primary/20 to-secondary/20 bg-gradient-to-r from-primary/3 to-secondary/3">
                <p className="text-xs font-semibold text-foreground mb-3">Actions rapides</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={action.action}
                      className="justify-start text-xs h-10 border-primary/20 hover:bg-gradient-presidential hover:text-white hover:border-primary transition-all duration-300 font-medium shadow-sm hover:shadow-md"
                    >
                      <action.icon className="w-3 h-3 mr-1.5" />
                      {action.label}
                    </Button>
                  ))}
                </div>
                <Separator className="my-3" />
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gradient-to-r from-primary/20 to-secondary/20 bg-gradient-to-r from-primary/3 to-secondary/3">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Posez votre question..."
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  disabled={isLoading}
                  className="flex-1 h-10 bg-white/80 border-gray-200/50 rounded-lg px-3 text-sm font-medium focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm"
                />
                <Button
                  variant={isListening ? "destructive" : "outline"}
                  size="icon"
                  onClick={isListening ? stopListening : startListening}
                  disabled={isLoading}
                  className="w-10 h-10 rounded-lg border-primary/20 hover:bg-primary/10 transition-all duration-300"
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
                <Button
                  onClick={() => sendMessage()}
                  disabled={!inputValue.trim() || isLoading}
                  className="w-10 h-10 bg-gradient-presidential hover:scale-105 rounded-lg shadow-lg hover:shadow-presidential transition-all duration-300"
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};