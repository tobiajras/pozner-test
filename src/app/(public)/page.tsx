import CarrouselFeatured from '@/components/CarrouselFeatured';
import CarrouselFavorites from '@/components/CarrouselFavorites';
import HeroHome from '@/components/HeroHome';
import ServiciosHome from '@/components/ServiciosHome';
import PreguntasHome from '@/components/PreguntasHome';
// import InstagramFeed from '@/components/InstagramFeed';
import LogosCarousel from '@/components/LogosCarousel';

export default function Home() {
  return (
    <>
      <div className='flex justify-center min-h-screen'>
        <main className='flex flex-col w-full'>
          <HeroHome />
          <ServiciosHome />
          <CarrouselFeatured title='Ingresos' />
          <CarrouselFavorites title='Destacados' />
          <PreguntasHome />
          <LogosCarousel />
        </main>
      </div>
    </>
  );
}
