'use client';

import Image from 'next/image';

const HeroCarousel = () => {
  return (
    <div className='absolute inset-0 -z-30 bg-black'>
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
          {/* Imagen para desktop */}
          <Image
            src='/assets/inicio/home-background-1.webp'
            alt='Fondo de inicio desktop'
            fill
            priority
            sizes='100vw'
            className='object-cover object-center hidden md:block'
          />
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
