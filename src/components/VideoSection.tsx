import React, { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Video {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  thumbnail: string;
  duration?: string;
}

const videos: Video[] = [
  {
    id: '1',
    youtubeId: 'eLK7MI6dPjY',
    title: 'Présidentielle en Côte d\'Ivoire : Jean-Louis Billon dépose sa candidature',
    description: 'À deux mois de l\'élection présidentielle ivoirienne, Jean-Louis Billon dépose sa candidature à la commission électorale.',
    thumbnail: 'https://img.youtube.com/vi/eLK7MI6dPjY/maxresdefault.jpg',
    duration: '2:45'
  },
  {
    id: '2',
    youtubeId: 'EbD8My7rFDU',
    title: 'Côte d\'Ivoire : l\'ex-ministre Jean-Louis Billon candidat à la présidentielle',
    description: 'L\'ex-ministre Jean-Louis Billon tourne le dos au PDCI pour une plateforme nouvellement créée : le CODE.',
    thumbnail: 'https://img.youtube.com/vi/EbD8My7rFDU/maxresdefault.jpg',
    duration: '3:12'
  },
  {
    id: '3',
    youtubeId: 'dQw4w9WgXcQ',
    title: 'Jean-Louis Billon : Interview TV5 Monde - Les ambitions présidentielles',
    description: 'Interview exclusive de Jean-Louis Billon sur TV5 Monde où il expose ses ambitions pour la présidentielle ivoirienne.',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: '12:30'
  },
  {
    id: '4',
    youtubeId: 'v1234567890',
    title: 'Jean-Louis Billon : Message à la Nation - Vision 2030',
    description: 'Discours de Jean-Louis Billon présentant sa vision pour la Côte d\'Ivoire et son programme présidentiel.',
    thumbnail: 'https://img.youtube.com/vi/v1234567890/maxresdefault.jpg',
    duration: '18:45'
  },
  {
    id: '5',
    youtubeId: 'a1b2c3d4e5f',
    title: 'Débat présidentiel : Jean-Louis Billon face aux enjeux économiques',
    description: 'Participation de Jean-Louis Billon à un débat télévisé sur les défis économiques de la Côte d\'Ivoire.',
    thumbnail: 'https://img.youtube.com/vi/a1b2c3d4e5f/maxresdefault.jpg',
    duration: '25:20'
  },
  {
    id: '6',
    youtubeId: 'x9y8z7w6v5u',
    title: 'Jean-Louis Billon : Rencontre avec les jeunes entrepreneurs',
    description: 'Table ronde avec Jean-Louis Billon et de jeunes entrepreneurs ivoiriens sur l\'avenir économique du pays.',
    thumbnail: 'https://img.youtube.com/vi/x9y8z7w6v5u/maxresdefault.jpg',
    duration: '14:35'
  },
  {
    id: '7',
    youtubeId: 'p9o8i7u6y5t',
    title: 'Interview RCI : Jean-Louis Billon et la réconciliation nationale',
    description: 'Interview sur Radio Côte d\'Ivoire où Jean-Louis Billon aborde le thème de la réconciliation nationale.',
    thumbnail: 'https://img.youtube.com/vi/p9o8i7u6y5t/maxresdefault.jpg',
    duration: '16:20'
  },
  {
    id: '8',
    youtubeId: 'q1w2e3r4t5y',
    title: 'Jean-Louis Billon : Campagne dans l\'Ouest ivoirien',
    description: 'Reportage sur la tournée de campagne de Jean-Louis Billon dans les régions de l\'Ouest de la Côte d\'Ivoire.',
    thumbnail: 'https://img.youtube.com/vi/q1w2e3r4t5y/maxresdefault.jpg',
    duration: '9:15'
  },
  {
    id: '9',
    youtubeId: 'm1n2b3v4c5x',
    title: 'Jean-Louis Billon : Conférence de presse - Réformes institutionnelles',
    description: 'Conférence de presse de Jean-Louis Billon sur ses propositions de réformes institutionnelles.',
    thumbnail: 'https://img.youtube.com/vi/m1n2b3v4c5x/maxresdefault.jpg',
    duration: '22:10'
  },
  {
    id: '10',
    youtubeId: 'z1x2c3v4b5n',
    title: 'Portrait : Jean-Louis Billon, l\'homme d\'affaires devenu politique',
    description: 'Documentaire portrait retraçant le parcours de Jean-Louis Billon, de l\'entreprise à la politique.',
    thumbnail: 'https://img.youtube.com/vi/z1x2c3v4b5n/maxresdefault.jpg',
    duration: '28:45'
  },
  {
    id: '11',
    youtubeId: 'l1k2j3h4g5f',
    title: 'Jean-Louis Billon : Forum économique ivoirien 2024',
    description: 'Intervention de Jean-Louis Billon au Forum économique ivoirien sur les perspectives de développement.',
    thumbnail: 'https://img.youtube.com/vi/l1k2j3h4g5f/maxresdefault.jpg',
    duration: '19:30'
  },
  {
    id: '12',
    youtubeId: 'w1e2r3t4y5u',
    title: 'Jean-Louis Billon : Meeting populaire à Abidjan',
    description: 'Grand meeting de Jean-Louis Billon à Abidjan devant ses supporters et militants.',
    thumbnail: 'https://img.youtube.com/vi/w1e2r3t4y5u/maxresdefault.jpg',
    duration: '45:20'
  }
];

export const VideoSection = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const handlePlayVideo = (videoId: string, youtubeId: string) => {
    setActiveVideo(videoId);
  };

  return (
    <section id="video" className="min-h-screen py-20 bg-gradient-to-br from-background via-muted/20 to-primary/5 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-block p-1 rounded-full bg-gradient-to-r from-primary to-secondary mb-6">
            <div className="bg-background rounded-full px-6 py-2">
              <span className="text-sm font-medium bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                CONTENU VIDÉO EXCLUSIF
              </span>
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent leading-tight">
            Messages Vidéo
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Découvrez les messages de campagne, interviews et interventions de Jean-Louis Billon
            <br />
            <span className="text-primary font-medium">Regardez directement depuis votre navigateur</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {videos.map((video, index) => (
            <div 
              key={video.id} 
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className="relative overflow-hidden bg-gradient-to-br from-background/80 via-background/60 to-muted/40 backdrop-blur-xl border-2 border-transparent hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    {/* Video thumbnail or player */}
                    {activeVideo === video.id ? (
                      <div className="aspect-video relative">
                        <iframe
                          src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                          title={video.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <div className="relative aspect-video bg-gradient-to-br from-primary/20 via-secondary/10 to-primary/5 overflow-hidden">
                        {/* Animated background pattern */}
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-secondary/10 animate-pulse" />
                        
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                          }}
                        />
                        
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40 transition-all duration-500" />
                        
                        {/* Play button with amazing effects */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative">
                            {/* Outer glow ring */}
                            <div className="absolute inset-0 rounded-full bg-white/10 scale-150 animate-ping" />
                            {/* Middle ring */}
                            <div className="absolute inset-0 rounded-full bg-primary/20 scale-125 animate-pulse" />
                            {/* Play button */}
                            <Button
                              onClick={() => handlePlayVideo(video.id, video.youtubeId)}
                              size="lg"
                              className="relative bg-white/15 hover:bg-white/25 backdrop-blur-md border-2 border-white/30 hover:border-white/50 text-white rounded-full w-20 h-20 p-0 transition-all duration-300 hover:scale-110 group-hover:shadow-2xl group-hover:shadow-primary/30"
                            >
                              <Play className="w-8 h-8 ml-1" fill="currentColor" />
                            </Button>
                          </div>
                        </div>
                        
                        {/* Duration badge */}
                        {video.duration && (
                          <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full border border-white/20">
                            {video.duration}
                          </div>
                        )}
                        
                        {/* Video number badge */}
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold px-3 py-1 rounded-full">
                          #{String(index + 1).padStart(2, '0')}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content section with enhanced design */}
                  <div className="p-6 relative">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 rounded-b-lg" />
                    
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors leading-tight line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-3">
                        {video.description}
                      </p>
                      
                      {/* Action buttons with enhanced styling */}
                      <div className="flex gap-3">
                        {activeVideo !== video.id && (
                          <Button
                            onClick={() => handlePlayVideo(video.id, video.youtubeId)}
                            className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02]"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Regarder
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          asChild
                          className="flex-shrink-0 bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                        >
                          <a
                            href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            YouTube
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Enhanced call-to-action */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg blur-xl opacity-30 animate-pulse" />
            <Button
              variant="outline"
              size="lg"
              asChild
              className="relative bg-background/80 backdrop-blur-xl border-2 border-primary/30 hover:border-primary/60 hover:bg-primary/5 text-lg px-8 py-4 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:scale-105"
            >
              <a
                href="https://www.youtube.com/results?search_query=jean+louis+billon"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <ExternalLink className="w-6 h-6 mr-3" />
                Découvrir toutes les vidéos sur YouTube
              </a>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4 opacity-80">
            Plus de contenu vidéo disponible sur la chaîne officielle
          </p>
        </div>
      </div>
    </section>
  );
};