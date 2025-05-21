'use client';

import { company } from '@/app/constants/constants';
import Link from 'next/link';
import Image from 'next/image';
import LogosCarousel from './LogosCarousel';

const HeroHome = () => {
  return (
    <section
      id='inicioSection'
      className='flex justify-center overflow-hidden relative'
    >
      <div className={`max-w-7xl w-full flex flex-col items-center z-10`}>
        <div className='flex justify-center max-w-lg md:max-w-xl lg:max-w-7xl w-full'>
          <article className='mx-4 sm:mx-6 md:mx-8 lg:mx-10 pt-6 sm:pt-8 pb-8 md:pt-16 md:pb-10 lg:pt-20 lg:pb-12 relative w-full flex flex-col lg:flex-row md:gap-5 items-center justify-between md:min-w-[430px] lg:min-w-[540px] z-20'>
            {/* Columna izquierda - Texto */}
            <div className='flex-1 flex flex-col items-center lg:items-start justify-center mb-8 lg:mb-0 z-20'>
              <div className='flex flex-col items-center lg:items-start gap-1'>
                <div className='flex flex-col items-center lg:items-start md:gap-3'>
                  <h1 className='text-color-primary-light text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl font-extrabold break-words max-w-xs sm:max-w-none text-center lg:text-left'>
                    {company.name.toUpperCase()}
                  </h1>
                </div>
                <div className='md:gap-3 max-w-[300px] sm:max-w-sm md:max-w-md xl:max-w-xl'>
                  <h2 className='text-center lg:text-left text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-color-title-light'>
                    Encontrá el auto que buscas, usados y 0km
                  </h2>
                </div>
              </div>
              <div className='w-48 md:w-64 my-1 md:my-2'></div>
              <p className='text-center lg:text-left text-lg lg:text-xl xl:text-2xl text-color-title-light max-w-sm sm:max-w-md lg:max-w-[500px] xl:max-w-xl'>
                Explorá nuestro stock y encontrá el modelo que más se ajusta a
                tus necesidades. ¡Consultanos!
              </p>
              <div className='flex mt-4 lg:mt-5 gap-5'>
                <Link
                  href='/catalogo'
                  className={`${
                    company.dark
                      ? 'text-color-title-light bg-color-primary hover:bg-color-primary-dark ring ring-color-primary-dark hover:ring-color-primary-dark'
                      : 'text-color-title-light bg-color-primary hover:bg-color-primary-dark ring ring-color-primary-dark hover:ring-color-primary-dark'
                  } transition-colors py-3 md:py-3.5 px-6 md:px-8 rounded-lg font-medium`}
                >
                  Ver Catálogo
                </Link>
                <Link
                  href='/contacto'
                  className={`${
                    company.dark
                      ? 'text-color-title-light bg-color-primary/10 backdrop-blur-[2px] ring ring-color-primary-dark hover:bg-color-primary-dark hover:text-color-title-light'
                      : 'text-color-title-light bg-color-primary/10 backdrop-blur-[2px] ring ring-color-primary-dark hover:bg-color-primary-dark hover:text-color-title-light'
                  } transition-colors py-3 md:py-3.5 px-6 md:px-8 rounded-lg font-medium`}
                >
                  Contactanos
                </Link>
              </div>
              {company.adress || company.city ? (
                <span
                  className={`${
                    company.shortAdress ? 'flex-row' : 'flex-col sm:flex-row'
                  } flex items-center gap-1 md:gap-1.5 text-lg sm:text-xl md:font-medium mt-5 md:mt-6 lg:mt-8 text-left text-color-title-light text-balance`}
                >
                  <div className='flex items-center gap-2'>
                    <span className='w-1 h-7 bg-color-primary'></span>
                    <span>{company.adress}, </span>
                    <span>{company.city}</span>
                  </div>
                </span>
              ) : (
                ''
              )}
            </div>

            {/* Columna derecha - Imagen */}
            <div className='flex-1 aspect-[4/3] w-full max-w-[400px] sm:max-w-md lg:max-w-full relative flex items-center justify-center'>
              {/* Contenedor de la imagen con efectos */}
              <div className='relative w-full h-full group'>
                <div className='absolute -inset-0.5 lg:-inset-1 bg-gradient-to-r from-color-primary/60 to-color-primary/60 rounded-xl blur opacity-70 transition duration-500'></div>

                {/* Imagen principal */}
                <div className='border border-neutral-800 relative w-full h-full overflow-hidden rounded-2xl transform transition-all duration-500'>
                  <Image
                    src='/assets/inicio/hero-home.webp'
                    alt='Local de Microcentro Motors'
                    fill
                    className='object-cover'
                    priority
                  />
                  {/* Overlay sutil */}
                  <div className='absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent'></div>
                </div>
              </div>
            </div>
          </article>
        </div>
        <LogosCarousel />
      </div>
    </section>
  );
};

export default HeroHome;
