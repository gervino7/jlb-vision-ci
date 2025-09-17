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
import { AppointmentTypes } from '@/components/AppointmentTypes';
import { CalendlyWidget } from '@/components/CalendlyWidget';

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
  const [selectedAppointmentUrl, setSelectedAppointmentUrl] = useState<string>('');
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
              <TabsList className="grid w-full grid-cols-3 mb-8">
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
                  Types de RDV
                </TabsTrigger>
                <TabsTrigger 
                  value="calendly" 
                  className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  disabled={!selectedAppointmentUrl}
                >
                  <Calendar className="h-4 w-4" />
                  Réserver
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
                  <h3 className="text-2xl font-bold text-primary mb-3">Choisissez votre type de rendez-vous</h3>
                  <p className="text-muted-foreground">
                    Sélectionnez le type de rencontre qui correspond le mieux à vos besoins et objectifs.
                  </p>
                </div>

                <AppointmentTypes 
                  onSelectAppointment={(url) => {
                    setSelectedAppointmentUrl(url);
                    setActiveTab('calendly');
                  }} 
                />
              </TabsContent>

              <TabsContent value="calendly" className="space-y-6">
                {selectedAppointmentUrl ? (
                  <CalendlyWidget 
                    url={selectedAppointmentUrl}
                    className="border-primary/30"
                  />
                ) : (
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-12 border border-primary/20 text-center">
                    <Calendar className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Sélectionnez d'abord un type de rendez-vous
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Retournez à l'onglet "Types de RDV" pour choisir le type de rencontre qui vous convient.
                    </p>
                    <Button 
                      onClick={() => setActiveTab('appointment')}
                      className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-presidential"
                    >
                      Choisir un type de rendez-vous
                    </Button>
                  </div>
                )}
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