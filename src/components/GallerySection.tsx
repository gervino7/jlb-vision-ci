import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, ZoomIn } from 'lucide-react';
import portraitImage from '@/assets/jean-louis-billon-portrait-officiel.jpg';
import footballImage from '@/assets/jlb-football-sifca.jpg';
import ordinateurImage from '@/assets/jlb-remise-ordinateur.jpg';
import diplomeImage from '@/assets/jlb-remise-diplome.jpg';
import femmesImage from '@/assets/jlb-femmes-traditionnelles.jpg';
import salonSifcaImage from '@/assets/jlb-salon-sifca.jpg';
import salonCommercialImage from '@/assets/jlb-salon-commercial.jpg';
import meetingImage from '@/assets/jlb-meeting-plein-air.jpg';
import reunionInstImage from '@/assets/jlb-reunion-institutionnelle.jpg';
import supportersImage from '@/assets/jlb-supporters-campagne.jpg';

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
    src: meetingImage,
    alt: 'Jean Louis Billon en meeting de campagne',
    category: 'officiel',
    title: 'Meeting de campagne en plein air',
    description: 'Discours public lors d\'un rassemblement politique'
  },
  {
    id: '3',
    src: supportersImage,
    alt: 'Supporters de Jean Louis Billon',
    category: 'officiel',
    title: 'Supporters en action',
    description: 'Militant arborant le portrait du candidat lors d\'un meeting'
  },
  {
    id: '4',
    src: footballImage,
    alt: 'Jean Louis Billon en maillot SIFCA',
    category: 'terrain',
    title: 'Match de football SIFCA',
    description: 'Participation à un événement sportif du groupe SIFCA'
  },
  {
    id: '5',
    src: ordinateurImage,
    alt: 'Jean Louis Billon - Remise d\'ordinateurs',
    category: 'terrain',
    title: 'Remise d\'équipements informatiques',
    description: 'Action sociale - Don d\'ordinateurs HP aux jeunes'
  },
  {
    id: '6',
    src: femmesImage,
    alt: 'Jean Louis Billon avec des femmes en tenues traditionnelles',
    category: 'terrain',
    title: 'Rencontre avec les femmes de Côte d\'Ivoire',
    description: 'Échange avec les femmes en tenues traditionnelles ivoiriennes'
  },
  {
    id: '7',
    src: diplomeImage,
    alt: 'Jean Louis Billon - Remise de diplôme',
    category: 'institutionnel',
    title: 'Cérémonie de remise de diplômes',
    description: 'Remise d\'un certificat de gratitude lors d\'une cérémonie officielle'
  },
  {
    id: '8',
    src: reunionInstImage,
    alt: 'Jean Louis Billon en réunion institutionnelle',
    category: 'institutionnel',
    title: 'Réunion avec les forces de sécurité',
    description: 'Rencontre officielle avec les responsables sécuritaires'
  },
  {
    id: '9',
    src: salonSifcaImage,
    alt: 'Jean Louis Billon au salon SIFCA',
    category: 'international',
    title: 'Salon international SIFCA',
    description: 'Présentation du groupe SIFCA lors d\'un salon professionnel'
  },
  {
    id: '10',
    src: salonCommercialImage,
    alt: 'Jean Louis Billon dans un salon commercial',
    category: 'international',
    title: 'Salon commercial international',
    description: 'Visite d\'un salon avec les produits du groupe SIFCA'
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