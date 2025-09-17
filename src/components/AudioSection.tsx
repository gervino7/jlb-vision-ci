import React, { useState } from 'react';
import { Play, Pause, Volume2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface AudioItem {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  thumbnail: string;
  duration?: string;
}

const audioItems: AudioItem[] = [
  {
    id: '1',
    youtubeId: 'arUlKohGfsc',
    title: "Interview Jean-Louis Billon - Messages de campagne",
    description: "Écoutez les messages et positions politiques de Jean-Louis Billon lors de cette interview exclusive.",
    thumbnail: 'https://img.youtube.com/vi/arUlKohGfsc/maxresdefault.jpg',
    duration: '15:30',
  },
  {
    id: '2', 
    youtubeId: 'VUiVblVU6fE',
    title: "Jean-Louis Billon - Vision pour la Côte d'Ivoire",
    description: "Découvrez la vision et les propositions de Jean-Louis Billon pour l'avenir de la Côte d'Ivoire.",
    thumbnail: 'https://img.youtube.com/vi/VUiVblVU6fE/maxresdefault.jpg',
    duration: '22:45',
  },
];

export const AudioSection = () => {
  const [activeAudio, setActiveAudio] = useState<string | null>(null);

  const handlePlayAudio = (audioId: string) => {
    setActiveAudio(activeAudio === audioId ? null : audioId);
  };

  return (
    <section id="audio" className="min-h-screen py-20 bg-gradient-to-br from-background via-muted/20 to-secondary/5 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-block p-1 rounded-full bg-gradient-to-r from-secondary to-primary mb-6">
            <div className="bg-background rounded-full px-6 py-2">
              <span className="text-sm font-medium bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                CONTENU AUDIO EXCLUSIF
              </span>
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-secondary via-purple-500 to-primary bg-clip-text text-transparent leading-tight">
            Messages Audio
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Écoutez les interviews et messages de campagne de Jean-Louis Billon
            <br />
            <span className="text-secondary font-medium">Audio en streaming direct depuis votre navigateur</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {audioItems.map((audio, index) => (
            <div 
              key={audio.id} 
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <Card className="relative overflow-hidden bg-gradient-to-br from-background/80 via-background/60 to-muted/40 backdrop-blur-xl border-2 border-transparent hover:border-secondary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/20 hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    {/* Audio player or thumbnail */}
                    {activeAudio === audio.id ? (
                      <div className="aspect-video relative bg-gradient-to-br from-secondary/20 via-primary/10 to-secondary/5">
                        <iframe
                          src={`https://www.youtube.com/embed/${audio.youtubeId}?autoplay=1`}
                          title={audio.title}
                          className="w-full h-full"
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <div className="relative aspect-video bg-gradient-to-br from-secondary/20 via-primary/10 to-secondary/5 overflow-hidden">
                        {/* Animated background pattern */}
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-secondary/5 to-primary/10 animate-pulse" />
                        
                        <img
                          src={audio.thumbnail}
                          alt={audio.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 opacity-70"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://img.youtube.com/vi/${audio.youtubeId}/hqdefault.jpg`;
                          }}
                        />
                        
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40 transition-all duration-500" />
                        
                        {/* Audio icon overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative">
                            {/* Outer glow ring */}
                            <div className="absolute inset-0 rounded-full bg-white/10 scale-150 animate-ping" />
                            {/* Middle ring */}
                            <div className="absolute inset-0 rounded-full bg-secondary/20 scale-125 animate-pulse" />
                            {/* Audio button */}
                            <Button
                              onClick={() => handlePlayAudio(audio.id)}
                              size="lg"
                              className="relative bg-white/15 hover:bg-white/25 backdrop-blur-md border-2 border-white/30 hover:border-white/50 text-white rounded-full w-16 h-16 p-0 transition-all duration-300 hover:scale-110 group-hover:shadow-2xl group-hover:shadow-secondary/30"
                            >
                              <Volume2 className="w-7 h-7" fill="currentColor" />
                            </Button>
                          </div>
                        </div>
                        
                        {/* Duration badge */}
                        {audio.duration && (
                          <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full border border-white/20">
                            {audio.duration}
                          </div>
                        )}
                        
                        {/* Audio number badge */}
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-secondary to-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                          #{String(index + 1).padStart(2, '0')}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content section */}
                  <div className="p-6 relative">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-secondary/5 rounded-b-lg" />
                    
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-secondary transition-colors leading-tight">
                        {audio.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {audio.description}
                      </p>
                      
                      {/* Action buttons */}
                      <div className="flex flex-col gap-3">
                        <Button
                          onClick={() => handlePlayAudio(audio.id)}
                          className="w-full bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-secondary/30 hover:scale-[1.02]"
                        >
                          {activeAudio === audio.id ? (
                            <>
                              <Pause className="w-4 h-4 mr-2" />
                              Arrêter
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Écouter
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          asChild
                          className="w-full bg-background/50 backdrop-blur-sm border-secondary/20 hover:border-secondary/40 hover:bg-secondary/5 transition-all duration-300"
                        >
                          <a
                            href={`https://www.youtube.com/watch?v=${audio.youtubeId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Voir sur YouTube
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

        {/* Call-to-action */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary rounded-lg blur-xl opacity-30 animate-pulse" />
            <Button
              variant="outline"
              size="lg"
              asChild
              className="relative bg-background/80 backdrop-blur-xl border-2 border-secondary/30 hover:border-secondary/60 hover:bg-secondary/5 text-lg px-8 py-4 transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/20 hover:scale-105"
            >
              <a
                href="https://www.youtube.com/results?search_query=jean+louis+billon"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <ExternalLink className="w-6 h-6 mr-3" />
                Découvrir plus de contenu audio
              </a>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4 opacity-80">
            Plus d'interviews et messages disponibles sur YouTube
          </p>
        </div>
      </div>
    </section>
  );
};