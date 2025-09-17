import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, Send, Phone, Mail, MapPin, Calendar, Clock, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCalendly } from '@/hooks/useCalendly';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactSection = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('message');
  const { loading, eventTypes, getEventTypes, openCalendlyPopup } = useCalendly();

  const onSubmit = (data: FormData) => {
    // Simuler l'envoi du formulaire
    console.log('Form data:', data);
    toast({
      title: "Message envoyé!",
      description: "Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.",
    });
    reset();
  };

  // Charger les types d'événements Calendly au montage du composant
  useEffect(() => {
    getEventTypes();
  }, []);

  const whatsappMessage = encodeURIComponent(
    "Bonjour M. Jean-Louis Billon, je vous contacte via votre site web officiel. J'aimerais échanger avec vous concernant vos projets pour la Côte d'Ivoire."
  );
  
  const whatsappLink = `https://wa.me/2250506803113?text=${whatsappMessage}`;

  return (
    <section id="contact" className="relative min-h-screen py-20 overflow-hidden">
      {/* Background avec pattern kente */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10" />
      <div className="absolute inset-0 kente-pattern opacity-5" />
      
      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gradient-presidential mb-6">
            Contactez-nous
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ensemble, construisons l'avenir de la Côte d'Ivoire. 
            Votre voix compte, vos idées nous inspirent.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Formulaire de contact avec onglets */}
          <Card className="glass-card p-8 border-primary/20 shadow-presidential hover:shadow-glow transition-all duration-500">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger 
                  value="message" 
                  className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Send className="h-4 w-4" />
                  Message
                </TabsTrigger>
                <TabsTrigger 
                  value="appointment" 
                  className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Calendar className="h-4 w-4" />
                  Rendez-vous
                </TabsTrigger>
              </TabsList>

              <TabsContent value="message" className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-primary mb-3">Envoyez-nous un message</h3>
                  <p className="text-muted-foreground">
                    Partagez vos préoccupations, suggestions ou questions. Chaque message est important pour nous.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">Nom complet *</Label>
                      <Input
                        id="name"
                        {...register('name', { required: 'Le nom est requis' })}
                        className="bg-background/80 border-primary/30 focus:border-primary focus:ring-primary/20"
                        placeholder="Votre nom complet"
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive">{errors.name.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register('email', { 
                          required: 'L\'email est requis',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Adresse email invalide'
                          }
                        })}
                        className="bg-background/80 border-primary/30 focus:border-primary focus:ring-primary/20"
                        placeholder="votre.email@exemple.com"
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-medium">Sujet *</Label>
                    <Input
                      id="subject"
                      {...register('subject', { required: 'Le sujet est requis' })}
                      className="bg-background/80 border-primary/30 focus:border-primary focus:ring-primary/20"
                      placeholder="Objet de votre message"
                    />
                    {errors.subject && (
                      <p className="text-sm text-destructive">{errors.subject.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">Message *</Label>
                    <Textarea
                      id="message"
                      rows={6}
                      {...register('message', { required: 'Le message est requis' })}
                      className="bg-background/80 border-primary/30 focus:border-primary focus:ring-primary/20 resize-none"
                      placeholder="Votre message détaillé..."
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive">{errors.message.message}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full btn-shine bg-gradient-to-r from-primary to-primary-glow hover:shadow-presidential transition-all duration-300 group"
                  >
                    <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    Envoyer le message
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="appointment" className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-primary mb-3">Réserver un rendez-vous</h3>
                  <p className="text-muted-foreground">
                    Planifiez une rencontre directe avec Jean-Louis Billon pour discuter de vos préoccupations.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Liste des types d'événements depuis l'API Calendly */}
                  {loading ? (
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 border border-primary/20">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        <span className="ml-3 text-muted-foreground">Chargement des créneaux disponibles...</span>
                      </div>
                    </div>
                  ) : eventTypes.length > 0 ? (
                    <>
                      {eventTypes.map((eventType, index) => (
                        <div 
                          key={eventType.uri} 
                          className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 border border-primary/20 hover:border-primary/40 transition-colors duration-300"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                                index === 0 ? 'bg-primary text-primary-foreground' :
                                index === 1 ? 'bg-secondary text-secondary-foreground' :
                                'bg-accent text-accent-foreground'
                              }`}>
                                <Calendar className="h-5 w-5" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground">{eventType.name}</h4>
                                {eventType.description_plain && (
                                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                    {eventType.description_plain}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>{eventType.duration} min</span>
                            </div>
                          </div>

                          <Button 
                            size="lg"
                            className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-presidential transition-all duration-300 group"
                            onClick={() => openCalendlyPopup(eventType.booking_url)}
                          >
                            <Calendar className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                            Réserver ce type de rendez-vous
                          </Button>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {/* Fallback avec bouton générique si l'API n'est pas configurée */}
                      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 border border-primary/20">
                        <div className="flex items-center gap-3 mb-4">
                          <Calendar className="h-6 w-6 text-primary" />
                          <h4 className="font-semibold text-foreground">Calendly - Réservation en ligne</h4>
                        </div>
                        <p className="text-muted-foreground mb-4">
                          Choisissez un créneau qui vous convient et réservez directement votre rendez-vous.
                        </p>
                        <Button 
                          size="lg"
                          className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-presidential transition-all duration-300 group"
                          onClick={() => {
                            // Ouvrir Calendly dans un nouvel onglet
                            window.open('https://calendly.com/jeanllouisbillon', '_blank', 'noopener,noreferrer');
                          }}
                        >
                          <Calendar className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                          Réserver un rendez-vous
                        </Button>
                      </div>

                      <div className="bg-gradient-to-r from-secondary/10 to-accent/10 rounded-lg p-6 border border-secondary/20">
                        <h4 className="font-semibold text-foreground mb-2">Types de rendez-vous disponibles :</h4>
                        <ul className="text-muted-foreground space-y-2">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            Consultation politique (30 min)
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-secondary rounded-full"></div>
                            Rencontre économique (45 min)
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-accent rounded-full"></div>
                            Discussion communautaire (60 min)
                          </li>
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </Card>

          {/* Informations de contact et WhatsApp */}
          <div className="space-y-8">
            {/* WhatsApp Card */}
            <Card className="glass-card p-8 border-secondary/20 shadow-presidential hover:shadow-glow transition-all duration-500 group">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-secondary to-secondary-glow rounded-full mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="h-8 w-8 text-secondary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-secondary mb-4">Discussion WhatsApp</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Contactez directement Jean-Louis Billon sur WhatsApp pour un échange plus personnel et immédiat.
                </p>
                <Button 
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-secondary to-secondary-glow hover:shadow-glow transition-all duration-300 group/btn"
                >
                  <a 
                    href={whatsappLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center"
                  >
                    <MessageCircle className="mr-2 h-5 w-5 group-hover/btn:scale-110 transition-transform duration-300" />
                    Ouvrir WhatsApp
                  </a>
                </Button>
              </div>
            </Card>

            {/* Informations de contact */}
            <Card className="glass-card p-8 border-accent/20 shadow-presidential">
              <h3 className="text-2xl font-bold text-accent mb-6">Autres moyens de contact</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-accent to-accent-glow rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Téléphone</h4>
                    <p className="text-muted-foreground">+225 05 06 80 31 13</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Email</h4>
                    <p className="text-muted-foreground">contact@jeanllouisbillon.ci</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-secondary to-secondary-glow rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Localisation</h4>
                    <p className="text-muted-foreground">Abidjan, Côte d'Ivoire</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Engagement de réponse :</strong> Nous nous engageons à répondre à tous les messages dans les 24-48 heures. Votre participation citoyenne est précieuse pour construire ensemble une Côte d'Ivoire prospère.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};