import CarrouselFeatured from '@/components/CarrouselFeatured';
import HeroHome from '@/components/HeroHome';
import ServiciosHome from '@/components/ServiciosHome';
import PreguntasHome from '@/components/PreguntasHome';
import InstagramFeed from '@/components/InstagramFeed';
import LogosCarousel from '@/components/LogosCarousel';

export default function Home() {
  return (
    <>
      <div className='flex justify-center min-h-screen'>
        <main className='flex flex-col w-full'>
          <HeroHome />
          <ServiciosHome />
          <CarrouselFeatured
            title='Lanzamientos'
            startIndex={0}
            lastIndex={8}
          />
          <CarrouselFeatured title='Destacados' startIndex={8} lastIndex={16} />
          <PreguntasHome />
          <LogosCarousel />
          <InstagramFeed />
        </main>
      </div>
    </>
  );
}
