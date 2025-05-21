'use client';

import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import Image from 'next/image';
import { useMediaQuery } from '@/hooks/UseMediaQuery';

const HeroCarousel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [key, setKey] = useState(0);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const autoplayOptions = {
    delay: 4000,
    stopOnInteraction: false,
    stopOnMouseEnter: false,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay(autoplayOptions),
    Fade(),
  ]);

  const handleVisibilityChange = useCallback(() => {
    if (!document.hidden) {
      // Solo reiniciamos la animación cuando la pestaña vuelve a estar visible
      setKey((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  useEffect(() => {
    // Simular un pequeño delay para asegurar que las imágenes estén listas
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  const getImageSrc = (index: number) => {
    const basePath = '/assets/inicio';
    const prefix = isMobile ? 'mobile-background' : 'home-background';
    return `${basePath}/${prefix}-${index}.webp`;
  };

  return (
    <div ref={emblaRef} className='absolute inset-0 -z-30 bg-black'>
      <div
        className={`flex h-full transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className='flex-[0_0_100%] h-full relative overflow-hidden'>
          <Image
            key={`img-1-${key}`}
            src={getImageSrc(1)}
            alt='Fondo de inicio 1'
            fill
            priority
            sizes='(max-width: 768px) 100vw, 100vw'
            className={`object-cover object-center ${
              selectedIndex === 0 ? 'animate-zoom' : ''
            }`}
            onLoadingComplete={() => setIsLoading(false)}
          />
        </div>
        <div className='flex-[0_0_100%] h-full relative overflow-hidden'>
          <Image
            key={`img-2-${key}`}
            src={getImageSrc(2)}
            alt='Fondo de inicio 2'
            fill
            priority
            sizes='(max-width: 768px) 100vw, 100vw'
            className={`object-cover object-center ${
              selectedIndex === 1 ? 'animate-zoom' : ''
            }`}
          />
        </div>
        <div className='flex-[0_0_100%] h-full relative overflow-hidden'>
          <Image
            key={`img-3-${key}`}
            src={getImageSrc(3)}
            alt='Fondo de inicio 3'
            fill
            priority
            sizes='(max-width: 768px) 100vw, 100vw'
            className={`object-cover object-center ${
              selectedIndex === 2 ? 'animate-zoom' : ''
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
