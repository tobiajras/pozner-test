'use client';

import Image from 'next/image';
import { company } from '@/app/constants/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const NosotrosPage = () => {
  return (
    <>
      <Header />
      {/* Título y subtítulo al estilo Proceso */}
      <div className='py-8 md:py-14 lg:py-16'>
        <section className='flex flex-col items-center w-full'>
          <div className='text-center mb-3 sm:mb-4 md:mb-5 lg:mb-10'>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className='text-2xl md:text-3xl lg:text-4xl font-extrabold text-color-title mb-2'
            >
              <span className='text-color-primary'>Sobre {company.name}</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='text-color-text-light max-w-sm sm:max-w-lg lg:max-w-2xl mx-auto md:text-lg font-medium'
            >
              En {company.name} nos dedicamos a ofrecer la mejor experiencia de
              compra de autos usados, con la mejor calidad y el mejor servicio.
            </motion.p>
          </div>
        </section>

        {/* Imagen y texto descriptivo en fila en desktop */}
        <section className='flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-10 mx-auto px-4 mb-10'>
          {/* Imagen a la izquierda */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='w-full max-w-md xl:max-w-lg overflow-hidden [box-shadow:0px_0px_19px_5px_rgba(0,0,0,0.15)] rounded-xl mb-6 md:mb-0 '
          >
            <Image
              src='/assets/nosotros/nosotros-1.webp'
              alt={`Equipo de ${company.name}`}
              width={1000}
              height={600}
              className='object-cover w-full h-auto'
              priority
            />
          </motion.div>
          {/* Texto a la derecha */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='text-center lg:text-left max-w-lg'
          >
            <h3 className='text-2xl lg:text-3xl font-semibold text-color-title-light mb-3'>
              Experiencia y compromiso
            </h3>
            <p className='text-color-text-light mb-2 lg:text-lg font-medium'>
              Nuestra experiencia en el mercado nos permite ofrecer la mejor
              calidad y el mejor servicio. Desde la selección de los autos hasta
              la entrega, te acompañamos en cada paso.
            </p>
            <p className='text-color-text-light lg:text-lg font-medium'>
              Contamos con un equipo de profesionales especializados en el
              sector automotriz. Nuestro objetivo es convertir tu sueño de tener
              un auto en una realidad, ofreciendo opciones de financiamiento
              flexibles y asesoramiento integral en cada etapa de tu compra.
            </p>
          </motion.div>
        </section>

        {/* Cards de valores */}
        <section className='max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 place-items-center gap-6 mb-16 md:mt-16'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='max-w-xs h-full bg-color-bg-secondary rounded-2xl shadow-md px-6 py-8 flex flex-col items-center text-center border-t-4 border-color-primary/70'
          >
            {/* Icono de variedad/estrellas */}
            <svg
              className='text-color-primary text-3xl mb-2'
              width='32'
              height='32'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
            </svg>
            <h4 className='font-bold text-lg mb-1 text-color-title-light'>
              Variedad y calidad
            </h4>
            <p className='text-color-text-light text-sm lg:text-base'>
              Catálogo seleccionado de autos de todas las marcas y modelos, con
              altos estándares de calidad.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className='max-w-xs h-full bg-color-bg-secondary rounded-2xl shadow-md p-6 flex flex-col items-center text-center border-t-4 border-color-primary/70'
          >
            {/* Icono de atención personalizada */}
            <svg
              className='text-color-primary text-3xl mb-2'
              width='32'
              height='32'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
              <circle cx='12' cy='7' r='4' />
            </svg>
            <h4 className='font-bold text-lg mb-1 text-color-title-light'>
              Atención personalizada
            </h4>
            <p className='text-color-text-light text-sm lg:text-base'>
              Acompañamiento profesional y asesoramiento honesto en todo el
              proceso de compra.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className='max-w-xs h-full bg-color-bg-secondary rounded-2xl shadow-md p-6 flex flex-col items-center text-center border-t-4 border-color-primary/70'
          >
            {/* Icono de garantía */}
            <svg
              className='text-color-primary text-3xl mb-2'
              width='32'
              height='32'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
              <path d='m9 12 2 2 4-4' />
            </svg>
            <h4 className='font-bold text-lg mb-1 text-color-title-light'>
              Compromiso y confianza
            </h4>
            <p className='text-color-text-light text-sm lg:text-base'>
              Garantía, servicio postventa y transparencia en cada operación.
            </p>
          </motion.div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default NosotrosPage;
