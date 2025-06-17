'use client';

import { company } from '@/app/constants/constants';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ConsignacionPage = () => {
  const beneficios = [
    {
      titulo: 'Gestión de Documentación',
      descripcion:
        'Nos encargamos de toda la documentación y trámites necesarios para la venta de tu vehículo.',
      icono: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-8 w-8'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={1.5}
            d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
          />
        </svg>
      ),
    },
    {
      titulo: 'Exposición Garantizada',
      descripcion:
        'Tu vehículo estará expuesto en nuestras redes y plataformas digitales para máxima visibilidad.',
      icono: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-8 w-8'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={1.5}
            d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
          />
        </svg>
      ),
    },
    {
      titulo: 'Asesoramiento Profesional',
      descripcion:
        'Te ayudamos a establecer el mejor precio de mercado para tu vehículo.',
      icono: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-8 w-8'
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

  return (
    <>
      <Header />
      <main className='bg-gradient-to-b '>
        {/* Hero Section */}
        <section className='m-auto w-full max-w-[1920px] h-[130px] sm:h-[150px] md:h-[200px] lg:h-[260px] relative'>
          <div className='w-full h-full'>
            <Image
              priority
              className='w-full h-full object-cover'
              src='/assets/consignacion/banner-consignacion.webp'
              alt='banner-consignacion'
              width={1500}
              height={400}
            />
          </div>
          <div className='absolute bottom-0 left-0 w-full h-full flex justify-center items-center z-10'>
            <div className='max-w-6xl w-full flex justify-center mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
              <div className='text-center'>
                <h3 className='text-2xl sm:text-4xl lg:text-5xl font-bold text-color-text-light'>
                  CONSIGNÁ TU VEHÍCULO
                </h3>
              </div>
            </div>
          </div>
          <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-color-bg-secondary-dark/75 to-color-bg-secondary-dark/75'></div>
        </section>

        {/* Beneficios */}
        <section className='mt-8 md:mt-12'>
          <div className='max-w-6xl mx-auto px-4 sm:px-6'>
            <div className='flex justify-center text-center mb-8 md:mb-12'>
              <p className='text-xl lg:text-2xl text-color-text max-w-xl lg:max-w-2xl text-center'>
                Vendemos tu vehículo al mejor precio de mercado. La seguridad y
                la transparencia son nuestra prioridad.
              </p>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 xl:gap-12 place-items-center'>
              {beneficios.map((beneficio, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className='bg-gradient-to-b from-color-primary-dark to-color-secondary p-6 rounded-xl shadow-lg hover:shadow-xl aspect-[4/3] transition-shadow duration-300 max-w-sm'
                >
                  <div className='text-color-primary-light mb-4'>
                    {beneficio.icono}
                  </div>
                  <h3 className='text-xl font-semibold text-color-title-light mb-2'>
                    {beneficio.titulo}
                  </h3>
                  <p className='text-color-text-light'>
                    {beneficio.descripcion}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className='flex justify-center pt-10 md:pt-16 pb-10 md:pb-16'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            viewport={{
              once: true,
              margin: '0px 0px -100px 0px',
            }}
            className='max-w-2xl lg:max-w-6xl w-full bg-color-secondary rounded-lg shadow-[0_8px_30px_-15px_rgba(0,0,0,0.7)] p-6 md:p-8 border border-neutral-800 mx-4 sm:mx-6 md:mx-8 lg:mx-10 text-center'
          >
            <h3 className='text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-2 md:mb-4'>
              ¿Estás listo para consignar tu vehículo?
            </h3>
            <p className='text-white/70 max-w-2xl mx-auto mb-3 md:mb-5 lg:text-lg'>
              Nuestro equipo está listo para asesorarte y concretar la
              consignación de tu auto. Contáctanos para obtener más información.
            </p>
            <div className='flex gap-4 justify-center'>
              <a
                href={`https://api.whatsapp.com/send?phone=549${company.whatsapp[0]}&text=Hola! Quiero consignar mi vehículo`}
                target='_blank'
                rel='noopener noreferrer'
                className='lg:text-lg bg-color-primary hover:bg-color-primary-dark text-white py-3 px-8 rounded-md font-medium transition-all duration-300'
              >
                Consignar
              </a>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ConsignacionPage;
