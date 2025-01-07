'use client';

import { TypeAnimation } from 'react-type-animation';
import { company } from '@/app/constants/constants';
import LocationZoneIcon from './icons/LocationZoneIcon';
import Link from 'next/link';

const HeroHome = () => {
  return (
    <section id='inicioSection' className='flex justify-center overflow-hidden'>
      <div
        className={`h-[400px] md:h-[430px] lg:h-[560px] xl:h-[720px] relative max-w-[1920px] w-full flex flex-col items-center md:flex-row md:justify-center gap-8 md:gap-0 lg:gap-8 py-10 md:py-28 lg:py-40 home-background z-10`}
      >
        <div className='flex justify-center max-w-6xl w-full mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
          <article className='w-full flex flex-col items-center md:items-start md:min-w-[430px] lg:min-w-[540px]'>
            <div className='flex items-center text-lg sm:text-xl md:font-medium mb-1 md:mb-1.5 text-center text-color-title-light'>
              <span>
                <LocationZoneIcon className='w-6 h-6 md:w-7 md:h-7' />
              </span>
              <span>
                {company.adress}, {company.city}
              </span>
            </div>
            <div className='flex flex-col gap-1 text-nowrap'>
              <div className='flex flex-col items-center md:flex-row md:gap-3'>
                <h2 className='text-color-secondary-light text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-extrabold break-words'>
                  {company.name.toUpperCase()}
                </h2>
              </div>
              <div className='flex flex-col items-center md:flex-row md:gap-3 md:w-[400px]'>
                <h2 className='text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-extrabold text-color-title-light'>
                  COMPRÁ TU{' '}
                </h2>
                <h2 className='text-color-primary-light text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-extrabold'>
                  <TypeAnimation
                    sequence={['AUTO', 2000, 'CAMIONETA', 2000, 'PICKUP', 2000]}
                    repeat={Infinity}
                    speed={50}
                  />
                </h2>
              </div>
            </div>
            <p className='sm:text-lg lg:text-xl text-center md:text-start text-color-text-light mt-3 mx-1 sm:mx-0 max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl'>
              Descubrí las mejores opciones, calidad garantizada y financiación
              a tu medida. ¡Esperamos tu mensaje!
            </p>
            <div className='flex mt-4 md:mt-3 gap-5'>
              <Link
                href='/catalogo'
                className={`${
                  company.dark
                    ? 'text-color-title-light bg-color-primary hover:bg-color-primary-light hover:text-color-title'
                    : 'text-color-title bg-color-primary-light hover:bg-color-primary'
                } transition-colors py-2 md:py-3 px-4 md:px-6 rounded font-medium`}
                // className='bg-color-primary hover:bg-color-primary-dark transition-colors py-2 md:py-3 px-4 md:px-6 text-color-title-light rounded font-medium'
                // className='bg-color-primary hover:bg-color-primary-dark transition-colors py-2 md:py-3 px-4 md:px-6 text-color-title rounded font-medium'
              >
                Ver Catálogo
              </Link>
              <Link
                href='/contacto'
                className={`${
                  company.dark
                    ? 'text-color-title bg-color-primary-light hover:bg-color-primary hover:text-color-title-light'
                    : 'text-color-title bg-color-primary-light hover:bg-color-primary hover:text-color-title-light'
                } transition-colors py-2 md:py-3 px-4 md:px-6 rounded font-medium`}
                // className='bg-color-primary hover:bg-color-primary-dark transition-colors py-2 md:py-3 px-4 md:px-6 text-color-title-light rounded font-medium'
                // className='bg-color-primary hover:bg-color-primary-dark transition-colors py-2 md:py-3 px-4 md:px-6 text-color-title rounded font-medium'
              >
                Contactanos
              </Link>
            </div>
          </article>
          <div className='hidden md:block absolute w-3 sm:w-5 md:w-10 lg:w-24 h-full top-0 -left-0 bg-gradient-to-r from-color-primary/40'></div>
          <div className='hidden md:block absolute w-3 sm:w-5 md:w-10 lg:w-24 h-full top-0 -right-0 bg-gradient-to-l from-color-primary/40'></div>
        </div>
        <div className='absolute top-0 left-0 w-full h-full bg-color-primary/30 -z-10'></div>
      </div>
    </section>
  );
};

export default HeroHome;
