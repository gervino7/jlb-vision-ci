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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
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