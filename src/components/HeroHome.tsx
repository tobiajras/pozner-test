'use client';

import { company } from '@/app/constants/constants';
import Link from 'next/link';
import HeroCarousel from './HeroCarousel';
import { motion } from 'framer-motion';

const HeroHome = () => {
  return (
    <section
      id='inicioSection'
      className='flex justify-center overflow-hidden bg-color-bg-secondary-dark'
    >
      <div className={`max-w-[1920px] w-full flex flex-col items-center z-10`}>
        <div className='flex justify-center max-w-6xl lg:max-w-[1920px] w-full mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
          <article className='h-[400px] md:h-[480px] lg:h-[600px] xl:h-[680px] relative w-full flex flex-col items-center justify-center md:min-w-[430px] lg:min-w-[540px] z-20'>
            <HeroCarousel />
            <div
              className={`absolute w-full h-full top-0 -right-0 bg-color-bg-secondary-dark/65 md:bg-color-bg-secondary-dark/75 -z-20`}
            ></div>

            {/* Máscara inferior para desvanecimiento sutil */}
            <div className='absolute bottom-0 left-0 w-full h-5 bg-gradient-to-t from-color-bg-secondary-dark via-color-bg-secondary-dark/60 to-transparent -z-10'></div>

            <div className='flex flex-col items-center mb-1'>
              <div className='md:gap-3 text-nowrap'>
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className='text-[28px] sm:text-4xl md:text-4xl lg:text-5xl xl:text-7xl font-semibold text-color-primary-light'
                >
                  Vehículos Seleccionados,
                </motion.h2>
              </div>
              <div className='md:gap-3 text-nowrap lg:mb-1'>
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className='text-[28px] sm:text-4xl md:text-4xl lg:text-5xl xl:text-7xl font-semibold text-color-title-light'
                >
                  Usados y 0km
                </motion.h2>
              </div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='text-lg lg:text-xl xl:text-2xl text-center text-color-text-light mx-4 max-w-md sm:max-w-md lg:max-w-lg xl:max-w-2xl'
            >
              Concesionaria multimarca. Vehículos seleccionados, precios
              competitivos y atención profesional. ¡Contactanos!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className='flex mt-4 md:mt-3 lg:mt-4 xl:mt-5 gap-5 mb-2 md:mb-1 lg:mb-0'
            >
              <Link
                href='/catalogo'
                className={`${
                  company.dark
                    ? 'text-color-title-light bg-color-primary hover:bg-color-primary-dark ring ring-color-primary hover:ring-color-primary-dark'
                    : 'text-color-title-light bg-color-primary hover:bg-color-primary-dark ring ring-color-primary hover:ring-color-primary-dark'
                } lg:text-lg transition-colors py-2.5 md:py-3.5 px-5 md:px-8 rounded-lg`}
              >
                Ver Catálogo
              </Link>
              <Link
                href='/contacto'
                className={`${
                  company.dark
                    ? 'backdrop-blur bg-white/10 text-white font-medium ring ring-color-primary-dark hover:bg-white/20'
                    : 'backdrop-blur bg-white/10 text-white font-medium ring ring-color-primary-dark hover:bg-white/20'
                } lg:text-lg transition-colors py-2.5 md:py-3.5 px-5 md:px-8 rounded-lg`}
              >
                Contactanos
              </Link>
            </motion.div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default HeroHome;
