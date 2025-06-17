'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import LocationIcon from './icons/LocationIcon';

const Gallery = () => {
  return (
    <section className='mt-10 mb-16 md:mt-16 md:mb-24 bg-color-bg-primary relative overflow-hidden'>
      {/* Patrón de fondo sutil */}
      <div className='absolute inset-0 bg-grid-pattern opacity-5'></div>

      <div className='max-w-6xl mx-auto px-4 sm:px-6 relative z-10'>
        <div className='flex items-center mb-2 md:mb-3 lg:mb-5'>
          <div className='h-10 w-1 bg-color-primary mr-4'></div>
          <h3 className='font-light text-2xl sm:text-3xl text-color-title tracking-wide'>
            Sedes
          </h3>
        </div>

        {/* Sede 1 */}
        <div className='flex items-start gap-1 text-color-primary-dark mb-2 md:mb-4'>
          <LocationIcon className='w-5 h-5 lg:w-6 lg:h-6' />
          <div>
            <h4 className='text-xl lg:text-2xl font-medium'>
              Sede Puerto Madero
            </h4>
            <h4 className='text-lg lg:text-xl md:text-base text-color-primary'>
              Aimé Painé 1280, CABA
            </h4>
          </div>
        </div>

        {/* Collage de imágenes */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 lg:mb-12'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            className='relative'
          >
            <div className='overflow-hidden rounded-lg relative'>
              {/* Línea decorativa superior fija */}
              <div className='absolute top-0 left-0 h-1 w-full bg-color-primary z-20'></div>

              {/* Overlay con gradiente sutil siempre visible */}
              <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10'></div>
              <Image
                src='/assets/gallery/gallery-608-1-1.webp'
                alt='Imagen 1'
                width={608}
                height={480}
                className='w-full h-auto object-cover'
              />
            </div>
            {/* Borde con sombra fija */}
            <div className='absolute inset-0 rounded-lg shadow-[0_5px_30px_-15px_rgba(0,0,0,0.5)] border border-neutral-200'></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            className='relative'
          >
            <div className='overflow-hidden rounded-lg relative'>
              <div className='absolute top-0 left-0 h-1 w-full bg-color-primary z-20'></div>

              <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10'></div>
              <Image
                src='/assets/gallery/gallery-608-1-2.webp'
                alt='Imagen 2'
                width={608}
                height={480}
                className='w-full h-auto object-cover'
              />
            </div>
            <div className='absolute inset-0 rounded-lg shadow-[0_5px_30px_-15px_rgba(0,0,0,0.5)] border border-neutral-200'></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            className='relative'
          >
            <div className='overflow-hidden rounded-lg relative'>
              <div className='absolute top-0 left-0 h-1 w-full bg-color-primary z-20'></div>

              <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10'></div>
              <Image
                src='/assets/gallery/gallery-608-1-3.webp'
                alt='Imagen 3'
                width={608}
                height={480}
                className='w-full h-auto object-cover'
              />
            </div>
            <div className='absolute inset-0 rounded-lg shadow-[0_5px_30px_-15px_rgba(0,0,0,0.5)] border border-neutral-200'></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            className='relative'
          >
            <div className='overflow-hidden rounded-lg relative'>
              <div className='absolute top-0 left-0 h-1 w-full bg-color-primary z-20'></div>

              <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10'></div>
              <Image
                src='/assets/gallery/gallery-608-1-4.webp'
                alt='Imagen 4'
                width={608}
                height={480}
                className='w-full h-auto object-cover'
              />
            </div>
            <div className='absolute inset-0 rounded-lg shadow-[0_5px_30px_-15px_rgba(0,0,0,0.5)] border border-neutral-200'></div>
          </motion.div>
        </div>

        {/* Sede 2 */}
        <div className='flex items-start gap-1 text-color-primary-dark mb-2 md:mb-4'>
          <LocationIcon className='w-5 h-5 lg:w-6 lg:h-6' />
          <div>
            <h4 className='text-xl lg:text-2xl font-medium'>Sede Villa Luro</h4>
            <h4 className='text-lg lg:text-xl md:text-base text-color-primary'>
              Av. Rivadavia 10424, CABA
            </h4>
          </div>
        </div>

        {/* Collage de imágenes */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            className='relative'
          >
            <div className='overflow-hidden rounded-lg relative'>
              {/* Línea decorativa superior fija */}
              <div className='absolute top-0 left-0 h-1 w-full bg-color-primary z-20'></div>

              {/* Overlay con gradiente sutil siempre visible */}
              <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10'></div>
              <Image
                src='/assets/gallery/gallery-608-2-1.webp'
                alt='Imagen 1'
                width={608}
                height={480}
                className='w-full h-auto object-cover'
              />
            </div>
            {/* Borde con sombra fija */}
            <div className='absolute inset-0 rounded-lg shadow-[0_5px_30px_-15px_rgba(0,0,0,0.5)] border border-neutral-200'></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            className='relative'
          >
            <div className='overflow-hidden rounded-lg relative'>
              <div className='absolute top-0 left-0 h-1 w-full bg-color-primary z-20'></div>

              <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10'></div>
              <Image
                src='/assets/gallery/gallery-608-2-2.webp'
                alt='Imagen 2'
                width={608}
                height={480}
                className='w-full h-auto object-cover'
              />
            </div>
            <div className='absolute inset-0 rounded-lg shadow-[0_5px_30px_-15px_rgba(0,0,0,0.5)] border border-neutral-200'></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            className='relative'
          >
            <div className='overflow-hidden rounded-lg relative'>
              <div className='absolute top-0 left-0 h-1 w-full bg-color-primary z-20'></div>

              <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10'></div>
              <Image
                src='/assets/gallery/gallery-608-2-3.webp'
                alt='Imagen 3'
                width={608}
                height={480}
                className='w-full h-auto object-cover'
              />
            </div>
            <div className='absolute inset-0 rounded-lg shadow-[0_5px_30px_-15px_rgba(0,0,0,0.5)] border border-neutral-200'></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            className='relative'
          >
            <div className='overflow-hidden rounded-lg relative'>
              <div className='absolute top-0 left-0 h-1 w-full bg-color-primary z-20'></div>

              <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10'></div>
              <Image
                src='/assets/gallery/gallery-608-2-4.webp'
                alt='Imagen 4'
                width={608}
                height={480}
                className='w-full h-auto object-cover'
              />
            </div>
            <div className='absolute inset-0 rounded-lg shadow-[0_5px_30px_-15px_rgba(0,0,0,0.5)] border border-neutral-200'></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
