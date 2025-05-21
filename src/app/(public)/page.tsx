'use client';

import CarrouselFeatured from '@/components/CarrouselFeatured';
import CarrouselFavorites from '@/components/CarrouselFavorites';
import HeroHome from '@/components/HeroHome';
import Gallery from '@/components/Gallery';
import WhyChooseUs from '@/components/WhyChooseUs';
import PreguntasHome from '@/components/PreguntasHome';

export default function Home() {
  return (
    <>
      {/* Fondo con efecto grilla */}
      <div
        className='fixed inset-0 -z-10 pointer-events-none min-h-[100vh] h-full'
        style={{
          backgroundColor: '#000000',
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 0 0',
          height: '100%',
          minHeight: '100vh',
        }}
      ></div>
      {/* Máscara de gradiente suave a los costados */}
      <div
        className='fixed inset-0 -z-10 pointer-events-none min-h-[100vh] h-full'
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
          height: '100%',
          minHeight: '100vh',
        }}
      ></div>

      <div className='flex justify-center min-h-screen'>
        <main className='flex flex-col w-full'>
          <HeroHome />
          <CarrouselFeatured title='Ingresos' />
          <CarrouselFavorites title='Destacados' />
          <WhyChooseUs />
          <Gallery />
          <PreguntasHome />
        </main>
      </div>
    </>
  );
}
