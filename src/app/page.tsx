import CarrouselFeatured from '@/components/CarrouselFeatured';
import HeroHome from '@/components/HeroHome';
import ServiciosSection from '@/app/servicios/ServiciosSection';
import NosotrosSection from '@/app/nosotros/NosotrosSection';
import InstagramFeed from '@/components/InstagramFeed';
import WhatsappBanner from '@/components/WhatsappBanner';

import Footer from '@/components/Footer';
import HeaderWithSuspense from '@/components/Header';

export default function Home() {
  return (
    <>
      <HeaderWithSuspense />
      <div className='flex justify-center min-h-screen'>
        <main className='flex flex-col w-full'>
          <HeroHome />
          <CarrouselFeatured
            title='Lanzamientos'
            startIndex={0}
            lastIndex={8}
          />
          <CarrouselFeatured title='Destacados' startIndex={8} lastIndex={16} />
          <ServiciosSection />
          <WhatsappBanner />
          <NosotrosSection />
          <InstagramFeed />
        </main>
      </div>
      <Footer />
    </>
  );
}
