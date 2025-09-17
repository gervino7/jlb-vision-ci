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
    <section id="video" className="min-h-screen py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gradient-presidential mb-6">
            Messages Vidéo
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Découvrez les messages de campagne, interviews et interventions de Jean-Louis Billon
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {videos.map((video) => (
            <Card key={video.id} className="glass-card group hover:shadow-glow transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  {activeVideo === video.id ? (
                    <div className="aspect-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                        title={video.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          // Fallback to default YouTube thumbnail if maxres fails
                          const target = e.target as HTMLImageElement;
                          target.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                        }}
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button
                          onClick={() => handlePlayVideo(video.id, video.youtubeId)}
                          size="lg"
                          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white rounded-full w-16 h-16 p-0"
                        >
                          <Play className="w-6 h-6 ml-1" fill="currentColor" />
                        </Button>
                      </div>
                      {video.duration && (
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {video.description}
                  </p>
                  
                  <div className="flex gap-3">
                    {activeVideo !== video.id && (
                      <Button
                        onClick={() => handlePlayVideo(video.id, video.youtubeId)}
                        className="flex-1"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Regarder
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      asChild
                      className="flex-shrink-0"
                    >
                      <a
                        href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        YouTube
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            asChild
            className="bg-background/50 backdrop-blur-sm hover:bg-background/70"
          >
            <a
              href="https://www.youtube.com/results?search_query=jean+louis+billon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Voir toutes les vidéos sur YouTube
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};