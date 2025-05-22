'use client';

import CarrouselFeatured from '@/components/CarrouselFeatured';
import CarrouselFavorites from '@/components/CarrouselFavorites';
import HeroHome from '@/components/HeroHome';
import Gallery from '@/components/Gallery';
import CategoriesHome from '@/components/CategoriesHome';
import PreguntasHome from '@/components/PreguntasHome';

export default function Home() {
  return (
    <div className='relative min-h-screen w-full'>
      {/* Fondo absoluto que crece con el contenido */}
      <div
        className='absolute inset-0 w-full h-full -z-10 pointer-events-none'
        style={{
          backgroundColor: '#000',
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 0 0',
        }}
      />
      <div
        className='absolute inset-0 w-full h-full -z-10 pointer-events-none'
        style={{
          background: `
            linear-gradient(90deg,
              #000 0%,
              rgba(0,0,0,0.85) 10%,
              rgba(0,0,0,0.2) 30%,
              rgba(0,0,0,0) 45%,
              rgba(0,0,0,0) 55%,
              rgba(0,0,0,0.2) 70%,
              rgba(0,0,0,0.85) 90%,
              #000 100%
            )`,
        }}
      />
      {/* Contenido principal */}
      <div className='flex justify-center min-h-screen'>
        <main className='flex flex-col w-full'>
          <HeroHome />
          <CarrouselFeatured title='Ingresos' />
          <CarrouselFavorites title='Destacados' />
          <CategoriesHome />
          <Gallery />
          <PreguntasHome />
        </main>
      </div>
    </div>
  );
}
