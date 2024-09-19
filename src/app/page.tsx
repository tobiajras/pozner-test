import CarrouselFeatured from '@/components/CarrouselFeatured';
import HeroHome from '@/components/HeroHome';

export default function Home() {
  return (
    <div className='flex justify-center min-h-screen'>
      <main className='flex flex-col w-full'>
        <HeroHome />
        <CarrouselFeatured title='Lanzamientos' startIndex={0} lastIndex={10} />
        <CarrouselFeatured title='Destacados' startIndex={10} lastIndex={20} />
      </main>
    </div>
  );
}
