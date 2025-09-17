import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, SkipBack, SkipForward, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

interface AudioItem {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  thumbnail: string;
  duration?: string;
  youtubeUrl: string;
}

const audioItems: AudioItem[] = [
  {
    id: '1',
    title: "Interview Jean-Louis Billon - Messages de campagne",
    description: "Écoutez les messages et positions politiques de Jean-Louis Billon lors de cette interview exclusive.",
    audioUrl: "/audio/jean-louis-billon-interview-1.mp3", // Placeholder - vous devrez ajouter le fichier
    thumbnail: 'https://img.youtube.com/vi/arUlKohGfsc/maxresdefault.jpg',
    duration: '15:30',
    youtubeUrl: 'https://www.youtube.com/watch?v=arUlKohGfsc',
  },
  {
    id: '2', 
    title: "Jean-Louis Billon - Vision pour la Côte d'Ivoire",
    description: "Découvrez la vision et les propositions de Jean-Louis Billon pour l'avenir de la Côte d'Ivoire.",
    audioUrl: "/audio/jean-louis-billon-interview-2.mp3", // Placeholder - vous devrez ajouter le fichier
    thumbnail: 'https://img.youtube.com/vi/VUiVblVU6fE/maxresdefault.jpg',
    duration: '22:45',
    youtubeUrl: 'https://www.youtube.com/watch?v=VUiVblVU6fE',
  },
];

export const AudioSection = () => {
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  const handlePlayPause = (audioId: string) => {
    const audio = audioRefs.current[audioId];
    if (!audio) return;

    if (currentAudio && currentAudio !== audioId) {
      // Pause other audio if playing
      const currentAudioElement = audioRefs.current[currentAudio];
      if (currentAudioElement) {
        currentAudioElement.pause();
      }
    }

    if (isPlaying && currentAudio === audioId) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
      setCurrentAudio(audioId);
    }
  };

  const handleTimeUpdate = (audioId: string) => {
    const audio = audioRefs.current[audioId];
    if (audio && currentAudio === audioId) {
      setCurrentTime(audio.currentTime);
    }
  };

  const handleLoadedMetadata = (audioId: string) => {
    const audio = audioRefs.current[audioId];
    if (audio && currentAudio === audioId) {
      setDuration(audio.duration);
    }
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRefs.current[currentAudio!];
    if (audio) {
      audio.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    Object.values(audioRefs.current).forEach(audio => {
      audio.volume = newVolume;
    });
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
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
                  {/* Hidden audio element */}
                  <audio
                    ref={(el) => {
                      if (el) audioRefs.current[audio.id] = el;
                    }}
                    src={audio.audioUrl}
                    onTimeUpdate={() => handleTimeUpdate(audio.id)}
                    onLoadedMetadata={() => handleLoadedMetadata(audio.id)}
                    onEnded={() => {
                      setIsPlaying(false);
                      setCurrentAudio(null);
                      setCurrentTime(0);
                    }}
                  />

                  <div className="relative overflow-hidden">
                    <div className="relative aspect-video bg-gradient-to-br from-secondary/20 via-primary/10 to-secondary/5 overflow-hidden">
                      {/* Animated background pattern */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-secondary/5 to-primary/10 animate-pulse" />
                      
                      <img
                        src={audio.thumbnail}
                        alt={audio.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 opacity-70"
                      />
                      
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40 transition-all duration-500" />
                      
                      {/* Audio visualizer effect when playing */}
                      {isPlaying && currentAudio === audio.id && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className="w-1 bg-white rounded-full animate-pulse"
                                style={{
                                  height: Math.random() * 40 + 10,
                                  animationDelay: `${i * 0.1}s`,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Play/Pause button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          {/* Outer glow ring */}
                          <div className="absolute inset-0 rounded-full bg-white/10 scale-150 animate-ping" />
                          {/* Middle ring */}
                          <div className="absolute inset-0 rounded-full bg-secondary/20 scale-125 animate-pulse" />
                          {/* Audio button */}
                          <Button
                            onClick={() => handlePlayPause(audio.id)}
                            size="lg"
                            className="relative bg-white/15 hover:bg-white/25 backdrop-blur-md border-2 border-white/30 hover:border-white/50 text-white rounded-full w-16 h-16 p-0 transition-all duration-300 hover:scale-110 group-hover:shadow-2xl group-hover:shadow-secondary/30"
                          >
                            {isPlaying && currentAudio === audio.id ? (
                              <Pause className="w-7 h-7" fill="currentColor" />
                            ) : (
                              <Play className="w-7 h-7 ml-1" fill="currentColor" />
                            )}
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
                  </div>

                  {/* Enhanced audio controls section */}
                  <div className="p-6 relative">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-secondary/5 rounded-b-lg" />
                    
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-secondary transition-colors leading-tight">
                        {audio.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {audio.description}
                      </p>

                      {/* Audio controls when this audio is active */}
                      {currentAudio === audio.id && (
                        <div className="mb-6 p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                          {/* Progress bar */}
                          <div className="mb-4">
                            <Slider
                              value={[currentTime]}
                              max={duration || 100}
                              step={1}
                              onValueChange={handleSeek}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                              <span>{formatTime(currentTime)}</span>
                              <span>{formatTime(duration)}</span>
                            </div>
                          </div>

                          {/* Control buttons */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const audio = audioRefs.current[currentAudio];
                                  if (audio) audio.currentTime = Math.max(0, audio.currentTime - 10);
                                }}
                              >
                                <SkipBack className="w-4 h-4" />
                              </Button>
                              <Button
                                onClick={() => handlePlayPause(audio.id)}
                                size="sm"
                                className="bg-secondary hover:bg-secondary/90"
                              >
                                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const audio = audioRefs.current[currentAudio];
                                  if (audio) audio.currentTime = Math.min(duration, audio.currentTime + 10);
                                }}
                              >
                                <SkipForward className="w-4 h-4" />
                              </Button>
                            </div>

                            {/* Volume control */}
                            <div className="flex items-center space-x-2 w-24">
                              <Volume2 className="w-4 h-4 text-muted-foreground" />
                              <Slider
                                value={[volume]}
                                max={1}
                                step={0.1}
                                onValueChange={handleVolumeChange}
                                className="flex-1"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Action buttons */}
                      <div className="flex flex-col gap-3">
                        <Button
                          onClick={() => handlePlayPause(audio.id)}
                          className="w-full bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-secondary/30 hover:scale-[1.02]"
                        >
                          {isPlaying && currentAudio === audio.id ? (
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
                        
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            asChild
                            className="flex-1 bg-background/50 backdrop-blur-sm border-secondary/20 hover:border-secondary/40 hover:bg-secondary/5 transition-all duration-300"
                          >
                            <a
                              href={audio.youtubeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center"
                            >
                              <Volume2 className="w-4 h-4 mr-2" />
                              YouTube
                            </a>
                          </Button>
                          <Button
                            variant="outline"
                            asChild
                            className="flex-1 bg-background/50 backdrop-blur-sm border-secondary/20 hover:border-secondary/40 hover:bg-secondary/5 transition-all duration-300"
                          >
                            <a
                              href={audio.audioUrl}
                              download
                              className="inline-flex items-center justify-center"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Télécharger
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Enhanced call-to-action */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-xl p-8 backdrop-blur-sm border border-secondary/20">
            <h3 className="text-2xl font-bold mb-4 text-foreground">Fichiers audio requis</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Pour utiliser cette section audio, vous devez télécharger les fichiers MP3 des deux vidéos YouTube et les placer dans le dossier <code className="bg-muted px-2 py-1 rounded text-sm">/public/audio/</code>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {audioItems.map((audio, index) => (
                <div key={audio.id} className="bg-background/50 rounded-lg p-4 border border-secondary/20">
                  <p className="font-medium mb-2">Fichier {index + 1}:</p>
                  <code className="text-sm bg-muted px-2 py-1 rounded block mb-2">
                    {audio.audioUrl}
                  </code>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <a href={audio.youtubeUrl} target="_blank" rel="noopener noreferrer">
                      Convertir depuis YouTube
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};