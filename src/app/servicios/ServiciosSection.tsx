'use client';

import { motion } from 'framer-motion';

import Image from 'next/image';

const ServiciosSection = () => {
  return (
    <section
      id='serviciosSection'
      className='flex justify-center my-8 md:my-14 lg:my-20 mx-4 sm:mx-6 md:mx-8 lg:mx-10'
    >
      <div className='flex flex-col gap-10 sm:gap-16 md:gap-28'>
        <motion.article
          initial={{ opacity: 0, y: 10 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.3,
              ease: 'easeOut',
            },
          }}
          viewport={{ margin: '0px 0px -300px 0px', once: true }}
          className='flex flex-col items-start md:flex-row md:items-center md:justify-center gap-12 sm:gap-14 md:gap-20'
        >
          <div className='md:min-w-52'>
            <div className='text-3xl sm:text-4xl lg:text-5xl font-aleo-font font-semibold mb-1 sm:mb-2'>
              <h4 className='flex flex-col gap-1'>
                <span className='text-color-primary'>Desayuno</span>
                <span className='text-color-primary'>Merienda</span>
              </h4>
            </div>
            <div className='flex flex-col gap-2 md:text-lg lg:text-xl w-full max-w-[380px] sm:max-w-max sm:w-[480px] md:w-[350px] lg:w-[500px] text-color-text'>
              <ul className='flex flex-col gap-1'>
                <li>• Café</li>
                <li>• Medialunas</li>
                <li>• Tostadas</li>
                <li>• Huevos revueltos</li>
                <li>• Avocado Toast</li>
                <li>• Jugos</li>
                <li>• Tortas</li>
              </ul>
            </div>
          </div>
          <div className='relative'>
            <Image
              className='w-52 sm:w-60 md:w-80 rounded'
              src='/assets/servicios/servicio-1.webp'
              width={461}
              height={366}
              alt='servicio 1 imagen'
            />
          </div>
        </motion.article>
        <motion.article
          initial={{ opacity: 0, y: 10 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.3,
              ease: 'easeOut',
            },
          }}
          viewport={{ margin: '0px 0px -300px 0px', once: true }}
          className='flex flex-col items-start md:flex-row md:items-center md:justify-center gap-12 sm:gap-14 md:gap-20'
        >
          <div className='md:order-2 md:min-w-52'>
            <div className='text-3xl sm:text-4xl lg:text-5xl font-aleo-font font-semibold mb-1 sm:mb-2'>
              <h4 className='flex flex-col gap-1'>
                <span className='text-color-primary'>Almuerzo</span>
              </h4>
            </div>
            <div className='flex flex-col gap-2 md:text-lg lg:text-xl w-full max-w-[380px] sm:max-w-max sm:w-[480px] md:w-[350px] lg:w-[500px] text-color-text'>
              <ul className='flex flex-col gap-1'>
                <li>• Pastas</li>
                <li>• Milanesas</li>
                <li>• Sandwiches</li>
                <li>• Carnes</li>
                <li>• Guarniciones</li>
                <li>• Ensaladas</li>
              </ul>
            </div>
          </div>
          <div className='relative'>
            <Image
              className='w-52 sm:w-60 md:w-80 rounded'
              src='/assets/servicios/servicio-2.webp'
              width={461}
              height={366}
              alt='servicio 2 imagen'
            />
          </div>
        </motion.article>
        <motion.article
          initial={{ opacity: 0, y: 10 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.3,
              ease: 'easeOut',
            },
          }}
          viewport={{ margin: '0px 0px -300px 0px', once: true }}
          className='flex flex-col items-start md:flex-row md:items-center md:justify-center gap-12 sm:gap-14 md:gap-20'
        >
          <div className='md:min-w-52'>
            <div className='text-3xl sm:text-4xl lg:text-5xl font-aleo-font font-semibold mb-1 sm:mb-2'>
              <h4>
                <span className='text-color-primary'>Postres</span>
              </h4>
            </div>
            <div className='flex flex-col gap-2 md:text-lg lg:text-xl w-full max-w-[380px] sm:max-w-max sm:w-[480px] md:w-[350px] lg:w-[500px] text-color-text'>
              <ul className='flex flex-col gap-1'>
                <li>• Ensalada de fruta</li>
                <li>• Panqueques</li>
                <li>• Brownie</li>
                <li>• Copas dulces</li>
                <li>• Helado</li>
                <li>• Tortas</li>
              </ul>
            </div>
          </div>
          <div className='relative'>
            <Image
              className='w-52 sm:w-60 md:w-80 rounded'
              src='/assets/servicios/servicio-3.webp'
              width={461}
              height={366}
              alt='servicio 3 imagen'
            />
          </div>
        </motion.article>
      </div>
    </section>
  );
};

export default ServiciosSection;
