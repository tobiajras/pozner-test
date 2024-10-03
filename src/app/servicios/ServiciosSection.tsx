'use client';

import { motion } from 'framer-motion';

import Image from 'next/image';

const ServiciosSection = () => {
  return (
    <section
      id='serviciosSection'
      className='flex justify-center my-8 md:my-14 lg:my-20 mx-4 sm:mx-6 md:mx-8 lg:mx-10'
    >
      <div className='flex flex-col items-center gap-10 sm:gap-16 md:gap-28'>
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
          className='bg-color-primary rounded overflow-hidden flex flex-col items-start md:flex-row md:items-center max-w-[700px]'
        >
          <div className='pl-10 pr-16 py-16'>
            <div className='text-3xl sm:text-4xl lg:text-5xl font-aleo-font font-semibold mb-1 sm:mb-2'>
              <h4 className='flex flex-col gap-1'>
                <span className='text-color-title-light'>Desayuno</span>
                <span className='text-color-title-light'>Merienda</span>
              </h4>
            </div>
            <div className='flex flex-col gap-2 md:text-lg lg:text-xl w-full max-w-[380px] sm:max-w-max sm:w-[480px] md:w-[350px] lg:w-[500px] text-color-text'>
              <ul className='flex flex-col gap-1 text-color-title-light/75'>
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
          <div className='relative w-[300px] h-full'>
            <Image
              className='w-full h-full object-cover'
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
          className='bg-color-primary rounded overflow-hidden flex flex-col items-start md:flex-row md:items-center'
        >
          <div className='pl-10 pr-16 py-16 md:order-2'>
            <div className='text-3xl sm:text-4xl lg:text-5xl font-aleo-font font-semibold mb-1 sm:mb-2'>
              <h4 className='flex flex-col gap-1'>
                <span className='text-color-title-light'>Almuerzo</span>
              </h4>
            </div>
            <div className='flex flex-col gap-2 md:text-lg lg:text-xl w-full max-w-[380px] sm:max-w-max sm:w-[480px] md:w-[350px] lg:w-[500px] text-color-text'>
              <ul className='flex flex-col gap-1 text-color-title-light/75'>
                <li>• Pastas</li>
                <li>• Milanesas</li>
                <li>• Sandwiches</li>
                <li>• Carnes</li>
                <li>• Guarniciones</li>
                <li>• Ensaladas</li>
              </ul>
            </div>
          </div>
          <div className='relative w-[300px] h-full'>
            <Image
              className='w-full h-full object-cover'
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
          className='bg-color-primary rounded overflow-hidden flex flex-col items-start md:flex-row md:items-center'
        >
          <div className='pl-10 pr-16 py-16'>
            <div className='text-3xl sm:text-4xl lg:text-5xl font-aleo-font font-semibold mb-1 sm:mb-2'>
              <h4>
                <span className='text-color-title-light'>Postres</span>
              </h4>
            </div>
            <div className='flex flex-col gap-2 md:text-lg lg:text-xl w-full max-w-[380px] sm:max-w-max sm:w-[480px] md:w-[350px] lg:w-[500px] text-color-text'>
              <ul className='flex flex-col gap-1 text-color-title-light/75'>
                <li>• Ensalada de fruta</li>
                <li>• Panqueques</li>
                <li>• Brownie</li>
                <li>• Copas dulces</li>
                <li>• Helado</li>
                <li>• Tortas</li>
              </ul>
            </div>
          </div>
          <div className='relative w-[300px] h-full'>
            <Image
              className='w-full h-full object-cover'
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
