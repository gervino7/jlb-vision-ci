import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, ZoomIn } from 'lucide-react';
import portraitImage from '@/assets/jean-louis-billon-portrait.jpg';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'officiel' | 'terrain' | 'institutionnel' | 'familial' | 'international';
  title: string;
  description?: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: portraitImage,
    alt: 'Jean Louis Billon - Portrait officiel',
    category: 'officiel',
    title: 'Portrait officiel de campagne',
    description: 'Photo officielle pour la campagne présidentielle 2025'
  },
  {
    id: '2',
    src: portraitImage,
    alt: 'Jean Louis Billon en visite terrain',
    category: 'terrain',
    title: 'Visite des plantations SIFCA',
    description: 'Rencontre avec les agriculteurs et producteurs'
  },
  {
    id: '3',
    src: portraitImage,
    alt: 'Jean Louis Billon - Ministre du Commerce',
    category: 'institutionnel',
    title: 'En fonction de Ministre',
    description: 'Période ministérielle 2012-2017'
  },
  {
    id: '4',
    src: portraitImage,
    alt: 'Jean Louis Billon et sa famille',
    category: 'familial',
    title: 'Moments en famille',
    description: 'Avec son épouse Henriette Gomis'
  },
  {
    id: '5',
    src: portraitImage,
    alt: 'Jean Louis Billon - Conférence internationale',
    category: 'international',
    title: 'Conférence économique',
    description: 'Forum international des affaires'
  },
  {
    id: '6',
    src: portraitImage,
    alt: 'Jean Louis Billon - Meeting politique',
    category: 'officiel',
    title: 'Meeting de campagne',
    description: 'Rassemblement politique à Abidjan'
  }
];

const categories = [
  { key: 'all', label: 'Toutes les photos', count: galleryImages.length },
  { key: 'officiel', label: 'Photos officielles', count: galleryImages.filter(img => img.category === 'officiel').length },
  { key: 'terrain', label: 'Terrain', count: galleryImages.filter(img => img.category === 'terrain').length },
  { key: 'institutionnel', label: 'Institutionnelles', count: galleryImages.filter(img => img.category === 'institutionnel').length },
  { key: 'familial', label: 'Familiales', count: galleryImages.filter(img => img.category === 'familial').length },
  { key: 'international', label: 'Internationales', count: galleryImages.filter(img => img.category === 'international').length }
];

export const GallerySection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const colors = {
      officiel: 'bg-presidential-orange',
      terrain: 'bg-presidential-green', 
      institutionnel: 'bg-presidential-navy',
      familial: 'bg-accent',
      international: 'bg-primary'
    };
    return colors[category as keyof typeof colors] || 'bg-muted';
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient-presidential mb-6">
            Galerie Photos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez Jean Louis Billon à travers ses moments officiels, terrain et institutionnels
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.key}
              variant={selectedCategory === category.key ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.key)}
              className="transition-all duration-300 hover:scale-105"
            >
              {category.label}
              <Badge variant="secondary" className="ml-2 text-xs">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <Card 
              key={image.id}
              className="group relative overflow-hidden bg-card/60 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-presidential cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4">
                  <Badge className={`${getCategoryColor(image.category)} text-white`}>
                    {image.category}
                  </Badge>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <ZoomIn className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
                  {image.title}
                </h3>
                {image.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {image.description}
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-12 right-0 text-white hover:bg-white/20"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-6 w-6" />
              </Button>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="mt-4 text-center">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {selectedImage.title}
                </h3>
                {selectedImage.description && (
                  <p className="text-gray-300">
                    {selectedImage.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};