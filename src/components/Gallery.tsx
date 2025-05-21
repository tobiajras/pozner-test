'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Gallery = () => {
  return (
    <section className='mt-10 mb-16 md:mt-16 md:mb-24 relative overflow-hidden'>
      {/* Patrón de fondo sutil */}
      <div className='absolute inset-0 bg-grid-pattern opacity-5'></div>

      <div className='max-w-6xl mx-auto px-4 sm:px-6 relative z-10'>
        <div className='flex items-center mb-4 md:mb-6 lg:mb-8'>
          <div className='h-10 w-1 bg-color-primary mr-4'></div>
          <h3 className='font-medium text-2xl sm:text-3xl lg:text-4xl uppercase text-color-title-light tracking-wide'>
            Galería
          </h3>
        </div>

        {/* Collage de imágenes */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8'>
          <div className='flex flex-col gap-6 md:gap-10 lg:gap-16'>
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
                  src='/assets/gallery/gallery-1350-1.webp'
                  alt='Imagen 1'
                  width={1350}
                  height={1000}
                  className='w-full h-auto object-cover'
                />
              </div>
              {/* Borde con sombra fija */}
              <div className='absolute inset-0 rounded-lg shadow-[0_5px_30px_-15px_rgba(0,0,0,0.5)] border border-neutral-800'></div>
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
                  src='/assets/gallery/gallery-1350-2.webp'
                  alt='Imagen 2'
                  width={1350}
                  height={1000}
                  className='w-full h-auto object-cover'
                />
              </div>
              <div className='absolute inset-0 rounded-lg shadow-[0_5px_30px_-15px_rgba(0,0,0,0.5)] border border-neutral-800'></div>
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
                  src='/assets/gallery/gallery-1080-2.webp'
                  alt='Imagen 3'
                  width={1080}
                  height={1350}
                  className='w-full h-auto object-cover'
                />
              </div>
              <div className='absolute inset-0 rounded-lg shadow-[0_5px_30px_-15px_rgba(0,0,0,0.5)] border border-neutral-800'></div>
            </motion.div>
          </div>

          <div className='flex flex-col gap-6 md:gap-10 lg:gap-16'>
            <motion.div
              className='relative'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            >
              <div className='overflow-hidden rounded-lg relative'>
                <div className='absolute top-0 left-0 h-1 w-full bg-color-primary z-20'></div>

                <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10'></div>
                <Image
                  src='/assets/gallery/gallery-1080-1.webp'
                  alt='Imagen 4'
                  width={1080}
                  height={1350}
                  className='w-full h-auto object-cover'
                />
              </div>
              <div className='absolute inset-0 rounded-lg shadow-[0_5px_30px_-15px_rgba(0,0,0,0.5)] border border-neutral-800'></div>
            </motion.div>
            <motion.div
              className='relative'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            >
              <div className='overflow-hidden rounded-lg relative'>
                <div className='absolute top-0 left-0 h-1 w-full bg-color-primary z-20'></div>

                <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10'></div>
                <Image
                  src='/assets/gallery/gallery-1350-3.webp'
                  alt='Imagen 5'
                  width={1350}
                  height={1000}
                  className='w-full h-auto object-cover'
                />
              </div>
              <div className='absolute inset-0 rounded-lg shadow-[0_5px_30px_-15px_rgba(0,0,0,0.5)] border border-neutral-800'></div>
            </motion.div>
            <motion.div
              className='relative'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            >
              <div className='overflow-hidden rounded-lg relative'>
                <div className='absolute top-0 left-0 h-1 w-full bg-color-primary z-20'></div>

                <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10'></div>
                <Image
                  src='/assets/gallery/gallery-1350-4.webp'
                  alt='Imagen 6'
                  width={1350}
                  height={1000}
                  className='w-full h-auto object-cover'
                />
              </div>
              <div className='absolute inset-0 rounded-lg shadow-[0_5px_30px_-15px_rgba(0,0,0,0.5)] border border-neutral-800'></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
