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
        content: "Bonjour ! Je suis l'assistant personnel de Jean-Louis Billon, candidat à la présidence de la Côte d'Ivoire. Je suis là pour vous écouter, comprendre vos préoccupations et vous expliquer comment notre vision peut transformer notre pays. Quelles sont vos principales préoccupations aujourd'hui ?",
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
    return `Tu es l'assistant personnel officiel de Jean-Louis Billon, candidat à la présidence de la République de Côte d'Ivoire. Tu es un expert en politique ivoirienne, économie et développement social.

CONTEXTE SUR JEAN-LOUIS BILLON :
- Homme d'affaires et homme politique ivoirien
- Président-Directeur Général du groupe SIFCA (Société Ivoirienne de Financement du Commerce et de l'Agriculture)
- Ancien Ministre du Commerce, de l'Industrie et de la Promotion des PME
- Dirigeant de PALMCI (spécialisé dans l'huile de palme)
- Vision : "Une Côte d'Ivoire prospère, juste et unie"

TES MISSIONS :
1. ÉCOUTER avec empathie les préoccupations des citoyens
2. EXPLIQUER les solutions concrètes de Jean-Louis Billon
3. INFORMER sur ses réalisations (SIFCA, PALMCI, ministère)
4. CONVAINCRE de voter pour lui aux prochaines élections
5. AIDER pour les demandes de rendez-vous

DOMAINES D'EXPERTISE :
- Économie et création d'emplois
- Agriculture et agro-industrie
- PME et entrepreneuriat
- Infrastructure et développement
- Éducation et formation
- Santé et social
- Jeunesse et sport

STYLE DE COMMUNICATION :
- Chaleureux et proche du peuple
- Professionnel mais accessible
- Utilise "vous" pour respecter
- Donne des exemples concrets
- Reste positif et optimiste
- Évite les attaques contre les opposants

ACTIONS SPÉCIFIQUES :
- Pour les rendez-vous : dirige vers le numéro WhatsApp +225 05 06 80 31 13
- Mentionne les réussites de SIFCA et PALMCI comme preuves de compétence
- Propose des solutions concrètes aux problèmes soulevés
- Encourage l'engagement citoyen et le vote

Réponds toujours en français et adapte ton langage au niveau de ton interlocuteur.`;
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
        "transition-all duration-300 ease-in-out glass-card border-primary/20",
        isMinimized ? "w-80 h-16" : "w-96 h-[600px]"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-primary/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-presidential flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Assistant JLB</h3>
              <p className="text-xs text-muted-foreground">En ligne</p>
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
            <ScrollArea className="flex-1 p-4 h-96">
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
                        "max-w-[85%] p-3 rounded-lg text-sm",
                        message.isUser
                          ? "bg-primary text-primary-foreground rounded-br-none"
                          : "bg-muted text-foreground rounded-bl-none"
                      )}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted p-3 rounded-lg rounded-bl-none">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Quick Actions */}
            {messages.length <= 1 && (
              <div className="p-4 border-t border-primary/10">
                <p className="text-xs text-muted-foreground mb-3">Actions rapides :</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={action.action}
                      className="justify-start text-xs h-8"
                    >
                      <action.icon className="w-3 h-3 mr-1" />
                      {action.label}
                    </Button>
                  ))}
                </div>
                <Separator className="my-3" />
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-primary/10">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Posez votre question..."
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  variant={isListening ? "destructive" : "outline"}
                  size="icon"
                  onClick={isListening ? stopListening : startListening}
                  disabled={isLoading}
                  className="w-10 h-10"
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
                <Button
                  onClick={() => sendMessage()}
                  disabled={!inputValue.trim() || isLoading}
                  className="w-10 h-10 bg-primary hover:bg-primary/90"
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