'use client';

import { company } from '@/app/constants/constants';
import LocationIcon from './icons/LocationIcon';
import HeroCarousel from './HeroCarousel';

const HeroHome = () => {
  return (
    <section
      id='inicioSection'
      className='flex justify-center overflow-hidden bg-black'
    >
      <div className={`max-w-[1920px] w-full flex flex-col items-center z-10`}>
        <div className='flex justify-center max-w-6xl lg:max-w-[1920px] w-full mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
          <article className='pt-8 pb-32 sm:pt-12 sm:pb-32 md:pt-16 md:pb-36 lg:pt-28 lg:pb-52 relative w-full flex flex-col items-center justify-center md:min-w-[430px] lg:min-w-[540px] z-20'>
            <HeroCarousel />
            <div className='absolute w-3 sm:w-5 md:w-20 lg:w-20 h-full top-0 -left-0 bg-gradient-to-r from-black to-transparent -z-10'></div>
            <div className='absolute w-3 sm:w-5 md:w-20 lg:w-20 h-full top-0 -right-0 bg-gradient-to-l from-black to-transparent -z-10'></div>
            <div className='absolute w-full h-20 bottom-0 -right-0 bg-gradient-to-t from-black to-transparent -z-10'></div>
            <div
              className={`absolute w-full h-full top-0 -right-0 bg-black/60 md:bg-black/70 -z-20`}
            ></div>

            <div className='flex flex-col items-center gap-1'>
              <div className='flex flex-col items-center md:flex-row md:gap-3'>
                <h1 className='sr-only text-color-primary-light text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold break-words max-w-xs sm:max-w-none text-center'>
                  {company.name.toUpperCase()}
                </h1>
              </div>
              <div className='flex flex-col items-center md:gap-2 text-nowrap'>
                <h2 className='text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-color-title-light'>
                  CONCESIONARIA
                </h2>
                <h2 className='text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-color-title-light'>
                  PREMIUM
                </h2>
              </div>
              <div className='flex items-center justify-center w-full max-w-xl md:max-w-4xl mx-auto pt-2 pb-3 lg:pt-3 lg:pb-4'>
                <div className='h-1 flex-grow bg-gradient-to-r from-transparent via-color-primary-light to-color-trasparent'></div>
              </div>
            </div>
            <div className='md:my-1'></div>
            <p className='text-xl sm:text-2xl lg:text-3xl text-center text-color-text-light mx-4 max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl'>
              !Tu próximo vehículo te espera!
            </p>
            {company.adress ||
              (company.city && (
                <span
                  className={`${
                    company.shortAdress ? 'flex-row' : 'flex-col sm:flex-row'
                  } flex items-center gap-1 md:gap-1.5 text-lg sm:text-xl md:font-medium mt-6 md:mt-8 lg:mt-10 text-center text-color-title-light text-balance`}
                >
                  <div className='flex items-end gap-0.5'>
                    <span>
                      <LocationIcon className='w-6 h-6 md:w-7 md:h-7 text-color-primary-light' />
                    </span>
                    <span>{company.adress}, </span>
                    <span>{company.city}</span>
                  </div>
                </span>
              ))}
          </article>
        </div>
      </div>
    </section>
  );
};

export default HeroHome;
