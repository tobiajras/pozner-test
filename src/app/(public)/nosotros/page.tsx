'use client';

import Image from 'next/image';
import { company } from '@/app/constants/constants';
import { motion } from 'framer-motion';

const NosotrosPage = () => {
  return (
    <>
      <section className='flex flex-col items-center w-full mb-10 md:mb-20'>
        <section className='w-full max-w-[1920px] h-[160px] sm:h-[200px] md:h-[240px] lg:h-[320px] relative'>
          <div className='w-full h-full'>
            <Image
              priority
              className='w-full h-full object-cover'
              src='/assets/nosotros/nosotros-banner.webp'
              alt='products'
              width={1500}
              height={400}
            />
          </div>
          <div className='absolute bottom-0 left-0 w-full h-full flex justify-center items-center z-10'>
            <div className='max-w-6xl w-full flex justify-center mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
              <div className='text-center'>
                <h3 className='text-2xl sm:text-4xl lg:text-5xl font-bold text-color-primary-light'>
                  SOMOS {company.name.toUpperCase()}
                </h3>
                <p className='flex flex-col sm:text-lg md:text-2xl mt-1 text-color-text-light max-w-[300px] sm:max-w-[550px] md:max-w-[650px] lg:max-w-[750px]'>
                  Más de 18 años de experiencia brindando confianza y calidad en
                  cada vehículo que vendemos
                </p>
              </div>
            </div>
          </div>
          <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-color-bg-secondary/80 to-color-bg-secondary/80'></div>
        </section>
        <div className='max-w-6xl mt-10 md:mt-20 flex flex-col gap-10 md:gap-20'>
          {/* Historia y local */}
          <motion.article
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '-100px' }}
            className='flex flex-col md:flex-row items-center gap-5 md:gap-10 mx-4 sm:mx-6 md:mx-8 lg:mx-10'
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: '-100px' }}
              className='relative group overflow-hidden rounded-lg [box-shadow:0px_0px_19px_3px_rgba(0,0,0,0.2)]'
            >
              <Image
                priority
                className='rounded w-[300px] md:w-[450px] lg:w-[550px]'
                src='/assets/nosotros/local-historia.webp'
                alt='Local antiguo de Fratelli'
                width={608}
                height={480}
              />
              <div className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent pb-5 pt-9 px-5 transition-opacity duration-300'>
                <p className='text-sm text-white italic'>
                  Nuestro primer local en el año 2005
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <h3 className='text-2xl sm:text-3xl md:text-4xl font-bold text-color-primary mb-3 max-w-[300px] sm:max-w-[450px] lg:max-w-[480px]'>
                Nuestra Historia
              </h3>
              <div className='flex flex-col gap-4 max-w-[300px] sm:max-w-[400px] lg:max-w-[480px] text-color-text sm:text-lg'>
                <div className='w-20 h-1 bg-color-primary'></div>
                <p>
                  {company.name} nació en 2005 como un pequeño emprendimiento
                  familiar con una visión clara: ofrecer vehículos de calidad a
                  precios justos.
                </p>
                <p>
                  Lo que comenzó con apenas 5 vehículos en exhibición, hoy se ha
                  convertido en una de las agencias más reconocidas de la
                  región, con más de 50 unidades en stock y un equipo de
                  profesionales dedicados.
                </p>
                <p>
                  A lo largo de estos años, hemos ayudado a más de 2,000
                  familias a encontrar el vehículo perfecto para sus
                  necesidades.
                </p>
              </div>
            </motion.div>
          </motion.article>

          {/* Misión y filosofía */}
          <motion.article
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '-100px' }}
            className='flex flex-col md:flex-row items-center gap-5 md:gap-10 mx-4 sm:mx-6 md:mx-8 lg:mx-10'
          >
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: '-100px' }}
              className='relative group overflow-hidden rounded-lg [box-shadow:0px_0px_19px_3px_rgba(0,0,0,0.2)] md:order-2'
            >
              <Image
                priority
                className='rounded w-[300px] md:w-[450px]'
                src='/assets/nosotros/nosotros-2.webp'
                alt='Nuestra misión'
                width={608}
                height={480}
              />
              <div className='absolute bottom-0 right-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent h-20'></div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <h3 className='text-2xl sm:text-3xl md:text-4xl font-bold text-color-secondary mb-3 max-w-[300px] sm:max-w-[450px] lg:max-w-[480px]'>
                Nuestra Filosofía
              </h3>
              <div className='flex flex-col gap-4 max-w-[300px] sm:max-w-[400px] lg:max-w-[480px] text-color-text sm:text-lg'>
                <div className='w-20 h-1 bg-color-secondary'></div>
                <p>
                  En {company.name} no vendemos autos, ayudamos a las personas a
                  encontrar el vehículo que necesitan para cumplir sus sueños.
                </p>
                <p>
                  Nuestros valores fundamentales son la honestidad, la
                  transparencia y el compromiso con cada cliente.
                </p>
                <p>
                  Todos nuestros vehículos son sometidos a rigurosos controles
                  técnicos porque tu seguridad es nuestra prioridad.
                </p>
                <p>
                  Ofrecemos planes de financiación flexibles y adaptados a tu
                  presupuesto, porque entendemos que cada cliente tiene
                  necesidades únicas.
                </p>
              </div>
            </motion.div>
          </motion.article>
        </div>
      </section>
    </>
  );
};

export default NosotrosPage;
