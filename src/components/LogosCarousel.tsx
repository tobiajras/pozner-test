'use client';

import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';

import Image from 'next/image';

const LogosCarousel = () => {
  const [emblaRef] = useEmblaCarousel({ dragFree: true, loop: true }, [
    AutoScroll({
      speed: 1.5,
      stopOnInteraction: false,
      startDelay: 0,
      stopOnFocusIn: false,
    }),
  ]);

  return (
    <div className='flex justify-center w-[450px] md:w-[600px] lg:w-[700px] xl:max-w-7xl xl:w-full'>
      <section
        ref={emblaRef}
        className='flex justify-center overflow-hidden relative mb-5 md:mb-10 lg:mb-14 pointer-events-none'
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div className='flex items-center max-w-6xl md:pt-5'>
          <article className='flex-[0_0_25%] sm:flex-[0_0_20%] lg:flex-[0_0_15%] ml-10 sm:ml-16 lg:ml-10'>
            <Image
              priority
              src='/assets/logos-carousel/audi-logo.webp'
              width={300}
              height={300}
              alt='logo audi'
            />
          </article>
          <article className='flex-[0_0_25%] sm:flex-[0_0_20%] lg:flex-[0_0_15%] ml-10 sm:ml-16 lg:ml-10'>
            <Image
              priority
              src='/assets/logos-carousel/bmw-logo.webp'
              width={300}
              height={300}
              alt='logo bmw'
            />
          </article>
          <article className='flex-[0_0_25%] sm:flex-[0_0_20%] lg:flex-[0_0_15%] ml-10 sm:ml-16 lg:ml-10'>
            <Image
              priority
              src='/assets/logos-carousel/ford-logo.webp'
              width={300}
              height={300}
              alt='logo ford'
            />
          </article>
          <article className='flex-[0_0_25%] sm:flex-[0_0_20%] lg:flex-[0_0_15%] ml-10 sm:ml-16 lg:ml-10'>
            <Image
              priority
              src='/assets/logos-carousel/mercedesbenz-logo.webp'
              width={300}
              height={300}
              alt='logo mercedesbenz'
            />
          </article>
          <article className='flex-[0_0_25%] sm:flex-[0_0_20%] lg:flex-[0_0_15%] ml-10 sm:ml-16 lg:ml-10'>
            <Image
              priority
              src='/assets/logos-carousel/peugeot-logo.webp'
              width={300}
              height={300}
              alt='logo peugeot'
            />
          </article>
          <article className='flex-[0_0_25%] sm:flex-[0_0_20%] lg:flex-[0_0_15%] ml-10 sm:ml-16 lg:ml-10'>
            <Image
              priority
              src='/assets/logos-carousel/volkswagen-logo.webp'
              width={300}
              height={300}
              alt='logo volkswagen'
            />
          </article>
          <article className='flex-[0_0_25%] sm:flex-[0_0_20%] lg:flex-[0_0_15%] ml-10 sm:ml-16 lg:ml-10'>
            <Image
              priority
              src='/assets/logos-carousel/jeep-logo.webp'
              width={300}
              height={300}
              alt='logo jeep'
            />
          </article>
          <article className='flex-[0_0_25%] sm:flex-[0_0_20%] lg:flex-[0_0_15%] ml-10 sm:ml-16 lg:ml-10'>
            <Image
              priority
              src='/assets/logos-carousel/fiat-logo.webp'
              width={300}
              height={300}
              alt='logo fiat'
            />
          </article>
          <article className='flex-[0_0_25%] sm:flex-[0_0_20%] lg:flex-[0_0_15%] ml-10 sm:ml-16 lg:ml-10'>
            <Image
              priority
              src='/assets/logos-carousel/toyota-logo.webp'
              width={300}
              height={300}
              alt='logo toyota'
            />
          </article>
          <article className='flex-[0_0_25%] sm:flex-[0_0_20%] lg:flex-[0_0_15%] ml-10 sm:ml-16 lg:ml-10'>
            <Image
              priority
              src='/assets/logos-carousel/hyundai-logo.webp'
              width={300}
              height={300}
              alt='logo hyundai'
            />
          </article>
        </div>
      </section>
    </div>
  );
};

export default LogosCarousel;
