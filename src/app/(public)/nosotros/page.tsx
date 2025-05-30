'use client';

import Image from 'next/image';

import { company, sedes } from '@/app/constants/constants';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SedeCard from '@/components/SedeCard';

const NosotrosPage = () => {
  return (
    <>
      <Header />
      <section className='flex flex-col items-center w-full mb-10 md:mb-20'>
        <section className='w-full py-8 md:py-14 lg:py-16 flex justify-center items-center'>
          <div className='max-w-6xl w-full flex justify-center mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
            <div className='text-center'>
              <h3 className='text-sm sm:text-base text-color-primary uppercase tracking-wider mb-1'>
                Sobre Nosotros
              </h3>
              <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-color-title mb-2 md:mb-4'>
                NOSOTROS
              </h2>
              <div className='flex items-center justify-center w-full max-w-sm md:max-w-md mx-auto px-4'>
                <div className='h-0.5 flex-grow bg-gradient-to-r from-transparent via-color-primary to-color-trasparent'></div>
              </div>
            </div>
          </div>
        </section>

        <div className='max-w-6xl flex flex-col gap-10 md:gap-20'>
          {/* Imagen principal y texto descriptivo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            className='flex flex-col lg:flex-row items-center gap-5 md:gap-10 mx-4 sm:mx-6 md:mx-8 lg:mx-10'
          >
            {/* Imagen principal */}
            <div className='w-full max-w-[330px] sm:max-w-[420px] md:max-w-[460px] lg:max-w-[500px] aspect-[4/3] relative overflow-hidden rounded-lg shadow-[0_5px_30px_-15px_rgba(0,0,0,0.5)]'>
              <Image
                priority
                className='w-full h-auto object-cover'
                src='/assets/nosotros/nosotros-1.webp'
                alt='Equipo de GO CARS'
                width={1200}
                height={600}
              />
            </div>

            {/* Texto descriptivo */}
            <div className='max-w-[450px] xl:max-w-lg'>
              <h3 className='text-center lg:text-left text-2xl sm:text-3xl font-semibold text-color-title mb-3'>
                Nuestra <span className='text-color-primary'>pasión</span> por
                los automóviles
              </h3>
              <p className='text-center lg:text-left text-color-text mb-2 md:text-lg'>
                En {company.name} nos mueve una profunda pasión por los
                automóviles y el compromiso de ofrecer una experiencia de compra
                excepcional. Nos distinguimos por nuestra atención
                personalizada, donde cada cliente es único y cada vehículo es
                seleccionado con los más altos estándares de calidad y
                desempeño.
              </p>
              <p className='text-center lg:text-left text-color-text md:text-lg'>
                Nuestro equipo está formado por verdaderos entusiastas del mundo
                automotor que entienden tus necesidades específicas, brindándote
                asesoramiento honesto y transparente en cada paso del proceso.
              </p>
            </div>
          </motion.div>

          <section className='w-full max-w-6xl mb-16'>
            <div className='flex flex-wrap justify-center gap-x-6 gap-y-6 md:gap-x-10 md:gap-y-16 mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
              {sedes.map((sede) => (
                <SedeCard key={sede.id} sede={sede} />
              ))}
            </div>
          </section>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default NosotrosPage;
