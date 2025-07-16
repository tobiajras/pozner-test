'use client';

import { company } from '@/app/constants/constants';
import Link from 'next/link';
import LocationIcon from './icons/LocationIcon';

const HeroHome = () => {
  return (
    <section
      id='inicioSection'
      className='flex justify-center overflow-hidden bg-black'
    >
      <div className={`max-w-[1920px] w-full flex flex-col items-center z-10`}>
        <div className='flex justify-center max-w-6xl lg:max-w-[1920px] w-full mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
          <article className='h-[450px] md:h-[600px] lg:h-[700px] xl:h-[750px] relative w-full flex flex-col items-center justify-center md:min-w-[430px] lg:min-w-[540px] z-20'>
            <video
              autoPlay
              muted
              loop
              playsInline
              className='absolute w-full h-full object-cover -z-30'
            >
              <source src='/assets/inicio/intro.mp4' type='video/mp4' />
            </video>
            <div className='absolute w-3 sm:w-5 md:w-20 lg:w-20 h-full top-0 -left-0 bg-gradient-to-r from-black to-transparent -z-10'></div>
            <div className='absolute w-3 sm:w-5 md:w-20 lg:w-20 h-full top-0 -right-0 bg-gradient-to-l from-black to-transparent -z-10'></div>
            <div className='absolute w-full h-20 bottom-0 -right-0 bg-gradient-to-t from-black to-transparent -z-10'></div>
            <div
              className={`absolute w-full h-full top-0 -right-0 bg-black/60 md:bg-black/70 -z-20`}
            ></div>

            <div className='flex flex-col items-center gap-1'>
              <div className='flex flex-col items-center md:flex-row md:gap-3'>
                <h1 className='text-color-primary-light text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold break-words max-w-xs sm:max-w-none text-center'>
                  {company.name.toUpperCase()}
                </h1>
              </div>
              <div className='md:gap-3 text-nowrap'>
                <h2 className='text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-color-title-light'>
                  VEHÍCULOS PREMIUM
                </h2>
              </div>
            </div>
            <div className='border-t-2 md:border-t-4  border-color-primary-dark w-48 md:w-64 my-2 md:my-4'></div>
            <p className='sm:text-lg lg:text-xl text-center text-color-text-light mx-4 max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl'>
              Modelos exclusivos, calidad garantizada y planes de financiación a
              tu medida. ¡Esperamos tu consulta!
            </p>
            <div className='flex mt-4 md:mt-3 lg:mt-4 gap-5'>
              <Link
                href='/catalogo'
                className={`${
                  company.dark
                    ? 'text-color-title-light bg-color-primary hover:bg-color-primary-dark hover:ring-color-primary-dark ring ring-color-primary'
                    : 'text-color-title-light bg-color-primary hover:bg-color-primary-dark ring ring-color-primary'
                } transition-colors py-4 px-6 md:px-8 rounded-full font-medium`}
              >
                Ver Catálogo
              </Link>
              {/* <Link
                href='/catalogo'
                className={`${
                  company.dark
                    ? 'text-color-title-light bg-color-primary hover:bg-color-primary-dark'
                    : 'text-color-title bg-color-primary hover:bg-color-primary-dark'
                } transition-colors py-4 px-6 md:px-8 rounded-full font-medium`}
              >
                Ver Catálogo
              </Link> */}
              <Link
                href='/contacto'
                className={`${
                  company.dark
                    ? 'text-color-title-light bg-black/30 backdrop-blur-[2px] ring ring-color-primary-dark hover:bg-color-primary-dark hover:text-color-title-light'
                    : 'text-color-title-light bg-black/30 backdrop-blur-[2px] ring ring-color-primary-dark hover:bg-color-primary-dark hover:text-color-title-light'
                } transition-colors py-4 px-6 md:px-8 rounded-full font-medium`}
              >
                Contactanos
              </Link>
              {/* <Link
                href='/contacto'
                className={`${
                  company.dark
                    ? 'text-color-title-light bg-black/30 backdrop-blur-[2px] ring ring-color-primary-dark hover:bg-color-primary-dark hover:text-color-title-light'
                    : 'text-color-title bg-color-primary-light/20 ring ring-color-primary-light hover:bg-color-primary-dark hover:text-color-title-light'
                } transition-colors py-4 px-6 md:px-8 rounded-full font-medium`}
              >
                Contactanos
              </Link> */}
            </div>
            {company.adress || company.city ? (
              <span
                className={`${
                  company.shortAdress ? 'flex-row' : 'flex-col sm:flex-row'
                } flex items-center gap-1 md:gap-1.5 text-lg sm:text-xl md:font-medium mt-6 md:mt-8 lg:mt-10 text-center text-color-title-light text-balance`}
              >
                <div className='flex items-end gap-1'>
                  <span>
                    <LocationIcon className='w-6 h-6 md:w-7 md:h-7 text-color-primary-light' />
                  </span>
                  <div className='flex gap-1.5'>
                    <span>{company.adress},</span>
                    <span>{company.city}</span>
                  </div>
                </div>
              </span>
            ) : (
              ''
            )}
          </article>
        </div>
      </div>
    </section>
  );
};

export default HeroHome;
