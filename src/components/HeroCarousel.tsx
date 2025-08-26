'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

const HeroCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array de imágenes de fondo para desktop
  const desktopImages = [
    '/assets/inicio/home-background-1.webp',
    '/assets/inicio/home-background-2.webp',
    '/assets/inicio/home-background-3.webp',
    '/assets/inicio/home-background-4.webp',
  ];

  // Efecto para cambiar imagen automáticamente cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === desktopImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, [desktopImages.length]);

  return (
    <div className='absolute inset-0 -z-30 bg-black'>
      <style jsx>{`
        @keyframes zoomIn {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.1);
          }
        }
      `}</style>
      <div className='h-full'>
        <div className='relative h-full overflow-hidden'>
          {/* Imagen para mobile */}
          <Image
            src='/assets/inicio/home-mobile-1.webp'
            alt='Fondo de inicio mobile'
            fill
            priority
            sizes='100vw'
            className='object-cover object-center md:hidden'
          />

          {/* Imágenes para desktop con transición */}
          {desktopImages.map((image, index) => (
            <Image
              key={image}
              src={image}
              alt={`Fondo de inicio desktop ${index + 1}`}
              fill
              priority={index === 0}
              sizes='100vw'
              className={`object-cover object-center hidden md:block ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                transform: 'scale(1)',
                transition: 'opacity 1s ease-in-out, transform 5s ease-out',
                ...(index === currentImageIndex && {
                  animation: 'zoomIn 6s ease-out forwards',
                }),
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
