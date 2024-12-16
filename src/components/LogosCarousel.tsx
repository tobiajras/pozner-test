'use client';

import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';

import Image from 'next/image';

const LogosCarousel = () => {
  const [emblaRef] = useEmblaCarousel({ dragFree: true, loop: true }, [
    AutoScroll({
      speed: 2,
      stopOnInteraction: false,
      startDelay: 0,
      stopOnFocusIn: false,
    }),
  ]);

  return (
    <div className='flex justify-center'>
      <section
        ref={emblaRef}
        className='flex justify-center overflow-hidden relative my-10'
      >
        <div className='flex items-center max-w-6xl md:py-10'>
          <article className='flex-[0_0_25%] sm:flex-[0_0_20%] ml-10 sm:ml-16 lg:ml-10'>
            <Image
              src='/assets/logos-carousel/ford-logo.svg'
              width={150}
              height={150}
              alt='logo ford'
            />
          </article>
          <article className='flex-[0_0_25%] sm:flex-[0_0_20%] ml-10 sm:ml-16 lg:ml-10'>
            <Image
              src='/assets/logos-carousel/chevrolet-logo.svg'
              width={150}
              height={150}
              alt='logo chevrolet'
            />
          </article>
          <article className='flex-[0_0_25%] sm:flex-[0_0_20%] ml-10 sm:ml-16 lg:ml-10'>
            <Image
              src='/assets/logos-carousel/honda-logo.svg'
              width={150}
              height={150}
              alt='logo honda'
            />
          </article>
          <article className='flex-[0_0_25%] sm:flex-[0_0_20%] ml-10 sm:ml-16 lg:ml-10'>
            <Image
              src='/assets/logos-carousel/toyota-logo.svg'
              width={150}
              height={150}
              alt='logo toyota'
            />
          </article>
          <article className='flex-[0_0_25%] sm:flex-[0_0_20%] ml-10 sm:ml-16 lg:ml-10'>
            <Image
              src='/assets/logos-carousel/hyundai-logo.svg'
              width={150}
              height={150}
              alt='logo hyundai'
            />
          </article>
          <article className='flex-[0_0_25%] sm:flex-[0_0_20%] ml-10 sm:ml-16 lg:ml-10'>
            <Image
              src='/assets/logos-carousel/mercedes-logo.svg'
              width={150}
              height={150}
              alt='logo mercedes'
            />
          </article>
          <article className='flex-[0_0_25%] sm:flex-[0_0_20%] ml-10 sm:ml-16 lg:ml-10'>
            <Image
              src='/assets/logos-carousel/audi-logo.svg'
              width={150}
              height={150}
              alt='logo audi'
            />
          </article>
          <article className='flex-[0_0_25%] sm:flex-[0_0_20%] ml-10 sm:ml-16 lg:ml-10'>
            <Image
              src='/assets/logos-carousel/nissan-logo.svg'
              width={150}
              height={150}
              alt='logo nissan'
            />
          </article>
        </div>
        <div className='absolute w-3 sm:w-5 md:w-10 lg:w-16 h-full top-0 left-0 bg-gradient-to-r from-color-bg-primary'></div>
        <div className='absolute w-3 sm:w-5 md:w-10 lg:w-16 h-full top-0 right-0 bg-gradient-to-l from-color-bg-primary'></div>
      </section>
    </div>
  );
};

export default LogosCarousel;
