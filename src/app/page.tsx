import CarrouselFeatured from '@/components/CarrouselFeatured';
import HeroHome from '@/components/HeroHome';
import ServiciosHome from '@/components/ServiciosHome';
import PreguntasHome from '@/components/PreguntasHome';
// import InstagramFeed from '@/components/InstagramFeed';
import LogosCarousel from '@/components/LogosCarousel';
import { company } from './constants/constants';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <div className='flex justify-center min-h-screen'>
        <main className='flex flex-col w-full'>
          <HeroHome />
          <ServiciosHome />
          <CarrouselFeatured title='Ingresos' startIndex={0} lastIndex={8} />
          <CarrouselFeatured title='Destacados' startIndex={8} lastIndex={16} />
          <PreguntasHome />
          <LogosCarousel />
          {company.whatsapp && (
            <a
              href={`https://api.whatsapp.com/send?phone=549${company.whatsapp[0]}&text=Hola! Quería hacer una consulta`}
              target='_blank'
              rel='noopener noreferrer'
              className='fixed bottom-0 right-0 mx-5 my-10 md:m-10 2xl:m-16 z-50 hover:scale-110 transition-all duration-300 hover:drop-shadow-xl'
            >
              <Image
                priority
                className='drop-shadow-2xl w-16 h-16 md:w-20 md:h-20'
                src='/assets/whatsapp-banner/whatsapp-fixed.svg'
                width={80}
                height={80}
                alt='whatsapp logo'
              />
            </a>
          )}
        </main>
      </div>
    </>
  );
}
