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
          className='relative rounded overflow-hidden flex flex-col items-start md:flex-row md:items-center md:[box-shadow:0px_0px_19px_3px_rgba(0,0,0,0.1)]'
        >
          <div className='px-5 md:px-10 py-8 sm:py-10 lg:py-16 max-w-[320px] sm:max-w-[350px] md:max-w-full md:w-[450px] lg:w-[600px] h-full bg-color-primary-dark/80 md:bg-color-bg-primary'>
            <div className='text-xl sm:text-2xl lg:text-4xl font-aleo-font font-semibold mb-1 sm:mb-2'>
              <h4 className='flex flex-col gap-1'>
                <span className='text-color-title-light md:text-color-primary'>
                  Desayunos y Meriendas
                </span>
              </h4>
            </div>
            <div className='flex flex-col gap-4 md:text-lg lg:text-lg w-full max-w-[380px] sm:max-w-max sm:w-[310px] md:w-[350px] lg:w-[500px]'>
              <p className='text-color-text-light md:text-color-text'>
                Despertá tus sentidos con nuestras delicias matutinas, ¡el café
                perfecto y opciones saludables para arrancar con energía!
              </p>
              <ul className='grid grid-cols-2 text-sm sm:text-base md:text-lg text-color-text-light md:text-color-text'>
                <li>• Café</li>
                <li>• Medialunas</li>
                <li>• Tostadas</li>
                <li>• Huevos revueltos</li>
                <li>• Avocado Toast</li>
                <li>• Jugos</li>
              </ul>
            </div>
          </div>
          <div className='absolute md:relative top-0 left-0 -z-10 md:z-0 w-full md:w-[250px] lg:w-[300px] md:h-full'>
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
          className='relative rounded overflow-hidden flex flex-col items-start md:flex-row md:items-center md:[box-shadow:0px_0px_19px_3px_rgba(0,0,0,0.1)]'
        >
          <div className='px-5 md:px-10 py-8 sm:py-10 lg:py-16 max-w-[320px] sm:max-w-[350px] md:max-w-full md:w-[450px] lg:w-[600px] md:order-2 h-full bg-color-secondary-dark/80 md:bg-color-bg-primary'>
            <div className='text-xl sm:text-2xl lg:text-4xl font-aleo-font font-semibold mb-1 sm:mb-2'>
              <h4 className='flex flex-col gap-1'>
                <span className='text-color-title-light md:text-color-secondary'>
                  Almorzá con sabor y frescura
                </span>
              </h4>
            </div>
            <div className='flex flex-col gap-4 md:text-lg lg:text-lg w-full max-w-[380px] sm:max-w-max sm:w-[310px] md:w-[350px] lg:w-[500px]'>
              <p className='text-color-text-light md:text-color-text'>
                Disfrutá de nuestros almuerzos caseros, preparados con
                ingredientes frescos y un toque único. ¡Ideal para una pausa en
                tu día!
              </p>
              <ul className='grid grid-cols-2 text-sm sm:text-base md:text-lg text-color-text-light md:text-color-text'>
                <li>• Pastas</li>
                <li>• Milanesas</li>
                <li>• Sandwiches</li>
                <li>• Carnes</li>
                <li>• Guarniciones</li>
                <li>• Ensaladas</li>
              </ul>
            </div>
          </div>
          <div className='absolute md:relative top-0 left-0 -z-10 md:z-0 w-full md:w-[250px] lg:w-[300px] md:h-full'>
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
          className=' relative rounded overflow-hidden flex flex-col items-start md:flex-row md:items-center md:[box-shadow:0px_0px_19px_3px_rgba(0,0,0,0.1)]'
        >
          <div className='px-5 md:px-10 py-8 sm:py-10 lg:py-16 max-w-[320px] sm:max-w-[350px] md:max-w-full md:w-[450px] lg:w-[600px] h-full bg-color-primary-dark/80 md:bg-color-bg-primary'>
            <div className='text-xl sm:text-2xl lg:text-4xl font-aleo-font font-semibold mb-1 sm:mb-2'>
              <h4 className='flex flex-col gap-1'>
                <span className='text-color-title-light md:text-color-primary'>
                  Postres caseros y más
                </span>
              </h4>
            </div>
            <div className='flex flex-col gap-4 md:text-lg lg:text-lg w-full max-w-[380px] sm:max-w-max sm:w-[310px] md:w-[350px] lg:w-[500px]'>
              <p className='text-color-text-light md:text-color-text'>
                Deleitate con nuestros irresistibles postres. Desde clásicos que
                enamoran hasta creaciones únicas, cada bocado es una dulce
                celebración para tu paladar. ¡No te vayas sin probarlos!
              </p>
              <ul className='grid grid-cols-2 text-sm sm:text-base md:text-lg text-color-text-light md:text-color-text'>
                <li>• Ensalada de fruta</li>
                <li>• Panqueques</li>
                <li>• Brownie</li>
                <li>• Copas dulces</li>
                <li>• Helado</li>
                <li>• Tortas</li>
              </ul>
            </div>
          </div>
          <div className='absolute md:relative top-0 left-0 -z-10 md:z-0 w-full md:w-[250px] lg:w-[300px] md:h-full'>
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
