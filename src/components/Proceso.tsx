'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { company } from '@/app/constants/constants';

const beneficios = [
  {
    titulo: 'Vehículos seleccionados',
    descripcion:
      'Cada auto de nuestro catálogo pasa por una rigurosa selección para garantizar calidad y confiabilidad en tu próxima compra.',
    icono: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='w-full h-full'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.5}
          d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        />
      </svg>
    ),
  },
  {
    titulo: 'Asesoramiento personalizado',
    descripcion:
      'Nuestro equipo experto te guía en cada paso, ayudándote a encontrar el vehículo perfecto que se adapte a tus necesidades.',
    icono: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='w-full h-full'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.5}
          d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
        />
      </svg>
    ),
  },
  {
    titulo: 'Garantía y confianza',
    descripcion:
      'Trabajamos con transparencia total, ofreciendo garantías y respaldo completo para que compres con total tranquilidad.',
    icono: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='w-full h-full'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.5}
          d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        />
      </svg>
    ),
  },
];

const Proceso = () => {
  return (
    <section className='flex flex-col items-center justify-center py-10 md:py-16'>
      <div className='max-w-7xl w-full flex flex-col px-4 md:px-8'>
        {/* Título y subtítulo */}
        <div className='text-center mb-3 md:mb-5 lg:mb-10'>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            className='text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2'
          >
            Por qué elegir{' '}
            <span className='text-color-primary-light'>
              {' '}
              nuestros vehículos
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            className='text-color-text-light max-w-xl mx-auto md:text-lg font-medium'
          >
            En {company.name} nos especializamos en ofrecer vehículos de calidad
            con el respaldo y confianza que mereces.
          </motion.p>
        </div>
        {/* Layout principal */}
        <div className='flex flex-col lg:flex-row items-center justify-center gap-3 md:gap-5 lg:gap-10 w-full'>
          {/* Imagen del auto */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            className='flex justify-center'
          >
            <div className='relative max-w-md lg:max-w-full'>
              <Image
                src='/assets/proceso/proceso-1.webp'
                alt='Auto destacado'
                width={608}
                height={480}
                className='object-cover aspect-[4/3] w-[300px] sm:w-[350px] md:w-[400px] lg:w-[460px] xl:w-[500px] rounded-lg md:rounded-xl'
                priority
              />
            </div>
          </motion.div>
          {/* Beneficios */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            className='w-full lg:w-1/2 flex flex-col gap-6'
          >
            {beneficios.map((b, i) => (
              <div
                key={i}
                className='flex justify-center lg:justify-start items-start gap-3 md:gap-4'
              >
                <div className='flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 p-1.5 md:p-2 lg:p-3 rounded-full bg-gradient-to-l from-neutral-800 to-neutral-700 text-color-title-light'>
                  {b.icono}
                </div>
                <div>
                  <h4 className='text-lg font-semibold text-color-title-light mb-1'>
                    {b.titulo}
                  </h4>
                  <p className='text-color-text-light font-medium max-w-xs md:max-w-sm lg:max-w-md'>
                    {b.descripcion}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Proceso;
