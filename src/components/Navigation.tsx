import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Image, Headphones, Video, Phone, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Accueil', href: '/', icon: Home, type: 'route' },
    { name: 'Portfolio', href: '/portfolio', icon: User, type: 'route' },
    { name: 'Galerie', href: '#gallery', icon: Image, type: 'scroll' },
    { name: 'Audio', href: '#audio', icon: Headphones, type: 'scroll' },
    { name: 'Vidéo', href: '#video', icon: Video, type: 'scroll' },
    { name: 'Contact', href: '#contact', icon: Phone, type: 'scroll' },
  ];

  const handleNavigation = (href: string, type: string) => {
    setIsOpen(false);
    
    if (type === 'route') {
      navigate(href);
    } else if (type === 'scroll') {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-background/80 backdrop-blur-xl shadow-elegant' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Name */}
          <button 
            onClick={() => navigate('/')}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-presidential rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">JLB</span>
            </div>
            <div className="hidden sm:block text-left">
              <h2 className="text-xl font-bold text-foreground">Jean Louis Billon</h2>
              <p className="text-sm text-primary">Candidat Présidentiel 2025</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href, item.type)}
                className={`flex items-center space-x-2 transition-colors ${
                  (item.type === 'route' && location.pathname === item.href) 
                    ? 'text-primary font-semibold' 
                    : 'text-foreground hover:text-primary'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              variant="default" 
              className="btn-shine bg-gradient-presidential hover:shadow-glow"
              onClick={() => handleNavigation('#contact', 'scroll')}
            >
              Me Contacter
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-xl rounded-lg mt-2 p-4 shadow-elegant animate-fade-in">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href, item.type)}
                className={`flex items-center space-x-3 w-full p-3 text-left hover:bg-muted/50 rounded-lg transition-colors ${
                  (item.type === 'route' && location.pathname === item.href) 
                    ? 'text-primary font-semibold bg-muted/30' 
                    : 'text-foreground hover:text-primary'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </button>
            ))}
            <Button 
              variant="default" 
              className="w-full mt-4 btn-shine bg-gradient-presidential"
              onClick={() => handleNavigation('#contact', 'scroll')}
            >
              Me Contacter
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};