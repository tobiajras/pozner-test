'use client';

import { company } from '@/app/constants/constants';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const HeroHome = () => {
  return (
    <section className='flex justify-center items-center bg-color-bg-secondary-dark/50 lg:bg-color-bg-secondary-dark'>
      <div className='relative flex flex-col lg:flex-row gap-10 items-center overflow-hidden min-h-[400px] max-w-7xl w-full pt-5 pb-5 sm:pt-10 sm:pb-10 md:pt-24 md:pb-24 lg:pt-8 lg:pb-20'>
        {/* Columna Izquierda: Textos */}
        <div className='relative z-10 flex flex-col justify-center items-start px-6 py-12 md:py-0 md:items-start'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='flex items-center gap-2 mb-4 px-4 py-1 md:py-1.5 rounded-full bg-white/20 lg:bg-white/15 text-white md:text-lg'
          >
            <div className='w-3 h-3 bg-color-primary-light rounded-full'></div>

            <h1 className=''>{company.name}</h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-color-title-light mb-4 text-left max-w-md xl:max-w-xl'
          >
            Encontrá el vehículo que estás buscando al mejor precio y
            financiación
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='text-lg md:text-xl text-gray-300 mb-6 max-w-md text-left'
          >
            Compra segura, vehículos garantizados y atención especializada.
            ¡Esperamos tu consulta!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='flex gap-4'
          >
            <Link
              href='/catalogo'
              className='bg-color-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-color-primary-dark transition md:text-lg'
            >
              Ver Catálogo
            </Link>
            <Link
              href='/contacto'
              className='bg-white/20 lg:bg-white/15 text-white px-6 py-3 rounded-md font-semibold hover:bg-color-primary-dark transition md:text-lg'
            >
              Contáctanos
            </Link>
          </motion.div>
        </div>
        {/* Columna Derecha: Imagen */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='hidden lg:block lg:h-[500px] xl:h-[650px] aspect-[4/5] relative mx-auto'
        >
          <Image
            src='/assets/inicio/home-background-1.webp'
            alt='Hero'
            fill
            className='object-cover w-full h-full rounded-xl shadow-lg'
            priority
          />
        </motion.div>
        {/* Imagen de fondo y gradiente en mobile */}
        <div className='absolute inset-0 lg:hidden -z-10'>
          <Image
            src='/assets/inicio/home-background-1.webp'
            alt='Hero'
            fill
            className='object-cover w-full h-full'
            priority
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-black/30'></div>
        </div>
      </div>
    </section>
  );
};

export default HeroHome;
