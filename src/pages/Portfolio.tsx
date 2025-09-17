import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Award, 
  MapPin, 
  Calendar,
  Target,
  Briefcase,
  GraduationCap,
  Globe,
  Heart,
  ChevronRight,
  Star
} from 'lucide-react';
import { ChatBotToggle } from '@/components/ChatBotToggle';

const Portfolio = () => {
  const experiences = [
    {
      period: "2011 - 2016",
      title: "Ministre du Commerce, de l'Industrie et de la Promotion des PME",
      company: "République de Côte d'Ivoire",
      description: "Direction des politiques commerciales et industrielles nationales. Promotion de l'entrepreneuriat et développement du secteur privé.",
      achievements: [
        "Création de plus de 50 000 emplois dans le secteur privé",
        "Augmentation de 40% des exportations ivoiriennes",
        "Mise en place du guichet unique pour les entreprises"
      ]
    },
    {
      period: "1993 - Présent",
      title: "Président Directeur Général",
      company: "Groupe SIFCA",
      description: "Leadership du premier groupe agro-industriel de Côte d'Ivoire, acteur majeur en Afrique de l'Ouest.",
      achievements: [
        "Croissance du CA de 200M€ à 1.2Md€",
        "Extension dans 8 pays africains",
        "Plus de 30 000 emplois créés",
        "Leader africain en hévéaculture et palmier à huile"
      ]
    },
    {
      period: "1985 - 1993",
      title: "Directeur Général",
      company: "PALMCI",
      description: "Transformation et modernisation de la plus grande palmeraie industrielle de Côte d'Ivoire.",
      achievements: [
        "Triplement de la production",
        "Modernisation des outils industriels",
        "Création de 5 000 emplois directs"
      ]
    }
  ];

  const achievements = [
    {
      icon: Building2,
      title: "Entrepreneur Visionnaire",
      description: "Bâtisseur du premier groupe agro-industriel ivoirien",
      metrics: "1.2Md€ de CA annuel"
    },
    {
      icon: Users,
      title: "Créateur d'Emplois",
      description: "Plus de 80 000 emplois créés tout au long de sa carrière",
      metrics: "30 000 emplois directs"
    },
    {
      icon: Globe,
      title: "Rayonnement International",
      description: "Présence du Groupe SIFCA dans 8 pays africains",
      metrics: "8 pays, 15 filiales"
    },
    {
      icon: TrendingUp,
      title: "Performance Économique",
      description: "Croissance exceptionnelle sous son leadership",
      metrics: "+500% de croissance"
    }
  ];

  const visionPoints = [
    {
      icon: Target,
      title: "Économie Diversifiée",
      description: "Transformer la Côte d'Ivoire en hub économique régional avec une économie diversifiée et compétitive."
    },
    {
      icon: GraduationCap,
      title: "Capital Humain",
      description: "Investir massivement dans l'éducation et la formation pour préparer la jeunesse aux défis du futur."
    },
    {
      icon: Heart,
      title: "Cohésion Sociale",
      description: "Construire une société unie, inclusive et solidaire où chaque Ivoirien peut s'épanouir."
    },
    {
      icon: Building2,
      title: "Infrastructure Moderne",
      description: "Développer des infrastructures de classe mondiale pour soutenir la croissance économique."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10" />
        <div className="absolute inset-0 kente-pattern opacity-5" />
        
        <div className="relative container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 text-lg px-4 py-2">
            Portfolio Professionnel
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gradient-presidential mb-6">
            Jean Louis Billon
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
            Entrepreneur visionnaire • Ex-Ministre • Leader transformationnel
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Award className="w-4 h-4 mr-2" />
              30+ ans d'expérience
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              80K+ emplois créés
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Globe className="w-4 h-4 mr-2" />
              8 pays africains
            </Badge>
          </div>
          
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-presidential transition-all duration-300 group"
          >
            Découvrir le parcours
            <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </section>

      {/* Parcours Professionnel */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient-presidential mb-6">
              Parcours Professionnel
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Plus de trois décennies d'excellence dans le leadership économique et politique
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {experiences.map((exp, index) => (
              <div key={index} className="relative mb-12 last:mb-0">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg" />
                    {index < experiences.length - 1 && (
                      <div className="w-0.5 h-24 bg-primary/30 mx-auto mt-4" />
                    )}
                  </div>
                  
                  <Card className="flex-1 glass-card border-primary/20 shadow-presidential hover:shadow-glow transition-all duration-500">
                    <div className="p-8">
                      <div className="flex flex-wrap items-center justify-between mb-4">
                        <Badge className="bg-primary/10 text-primary border-primary/20">
                          <Calendar className="w-4 h-4 mr-2" />
                          {exp.period}
                        </Badge>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-foreground mb-2">{exp.title}</h3>
                      <p className="text-lg text-primary font-semibold mb-4">{exp.company}</p>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{exp.description}</p>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground flex items-center">
                          <Star className="w-4 h-4 mr-2 text-primary" />
                          Réalisations clés
                        </h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start space-x-3">
                              <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Réalisations */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient-presidential mb-6">
              Réalisations Majeures
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Des résultats concrets qui témoignent d'un leadership transformationnel
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="glass-card border-primary/20 shadow-presidential hover:shadow-glow transition-all duration-500 group">
                <div className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-primary-glow rounded-full mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <achievement.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3">{achievement.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{achievement.description}</p>
                  
                  <Badge className="bg-primary/10 text-primary border-primary/20 text-lg px-3 py-1">
                    {achievement.metrics}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Politique */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient-presidential mb-6">
              Vision pour la Côte d'Ivoire
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Un projet ambitieux pour transformer notre pays en puissance économique régionale
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {visionPoints.map((point, index) => (
              <Card key={index} className="glass-card border-primary/20 shadow-presidential hover:shadow-glow transition-all duration-500 group">
                <div className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <point.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-3">{point.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{point.description}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-glow">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Ensemble, Construisons l'Avenir
          </h2>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            Rejoignez-moi dans cette vision d'une Côte d'Ivoire prospère, unie et moderne. 
            Votre soutien est essentiel pour transformer notre pays.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 hover:shadow-lg transition-all duration-300"
            >
              Découvrir le Programme
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary transition-all duration-300"
            >
              Nous Contacter
            </Button>
          </div>
        </div>
      </section>

      <ChatBotToggle />
    </div>
  );
};

export default Portfolio;