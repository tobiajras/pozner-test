'use client';

import Image from 'next/image';
import { company } from '../constants/constants';
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
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className='flex flex-col md:flex-row items-center gap-5 md:gap-10 mx-4 sm:mx-6 md:mx-8 lg:mx-10'
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: '-100px' }}
              className='relative group overflow-hidden rounded-lg [box-shadow:0px_0px_19px_3px_rgba(0,0,0,0.2)]'
            >
              <Image
                priority
                className='rounded w-[300px] md:w-[450px] lg:w-[550px] transition-transform duration-700 group-hover:scale-105'
                src='/assets/nosotros/local-historia.webp'
                alt='Local antiguo de Fratelli'
                width={608}
                height={480}
              />
              <div className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <p className='text-sm text-white italic'>
                  Nuestro primer local en el año 2005
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
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
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className='flex flex-col md:flex-row items-center gap-5 md:gap-10 mx-4 sm:mx-6 md:mx-8 lg:mx-10'
          >
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: '-100px' }}
              className='relative group overflow-hidden rounded-lg [box-shadow:0px_0px_19px_3px_rgba(0,0,0,0.2)] md:order-2'
            >
              <Image
                priority
                className='rounded w-[300px] md:w-[450px] transition-transform duration-700 group-hover:scale-105'
                src='/assets/nosotros/nosotros-2.webp'
                alt='Nuestra misión'
                width={608}
                height={480}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
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

          {/* Valores y compromiso */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className='w-full bg-color-primary/10 py-10 md:py-16 mt-10'
          >
            <div className='max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10'>
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className='text-2xl sm:text-3xl md:text-4xl font-bold text-color-primary text-center mb-8'
              >
                Nuestro Compromiso
              </motion.h3>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10'>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className='bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300'
                >
                  <h4 className='text-xl font-bold text-color-primary mb-3'>
                    Calidad Garantizada
                  </h4>
                  <p className='text-color-text'>
                    Cada vehículo pasa por un riguroso proceso de inspección de
                    más de 50 puntos antes de llegar a nuestro showroom.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                  className='bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300'
                >
                  <h4 className='text-xl font-bold text-color-secondary mb-3'>
                    Atención Personalizada
                  </h4>
                  <p className='text-color-text'>
                    Entendemos que cada cliente es único, por eso ofrecemos un
                    servicio adaptado a tus necesidades específicas.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  viewport={{ once: true }}
                  className='bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300'
                >
                  <h4 className='text-xl font-bold text-color-primary mb-3'>
                    Transparencia Total
                  </h4>
                  <p className='text-color-text'>
                    Te brindamos toda la información sobre el vehículo que estás
                    por adquirir, sin sorpresas ni letra chica.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default NosotrosPage;
