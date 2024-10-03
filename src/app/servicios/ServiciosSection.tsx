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
          className='rounded overflow-hidden flex flex-col items-start md:flex-row md:items-'
        >
          <div className='px-5 md:px-10 py-5 md:py-10 lg:py-16 max-w-[400px] sm:max-w-[450px] md:max-w-full md:w-[450px] lg:w-[600px] h-full bg-color-primary border-b-4 md:border-b-0 md:border-r-8 border-color-secondary-light'>
            <div className='text-3xl sm:text-3xl lg:text-4xl font-aleo-font font-semibold mb-1 sm:mb-2'>
              <h4 className='flex flex-col gap-1'>
                <span className='text-color-title-light'>
                  Desayunos y Meriendas
                </span>
              </h4>
            </div>
            <div className='flex flex-col gap-4 md:text-lg lg:text-lg w-full max-w-[380px] sm:max-w-max sm:w-[420px] md:w-[350px] lg:w-[500px]'>
              <p className='text-color-text-light'>
                Despertá tus sentidos con nuestras delicias matutinas, ¡el café
                perfecto y opciones saludables para arrancar con energía!
              </p>
              <ul className='grid grid-cols-2 text-sm sm:text-base md:text-lg text-color-title-light/60'>
                <li>• Café</li>
                <li>• Medialunas</li>
                <li>• Tostadas</li>
                <li>• Huevos revueltos</li>
                <li>• Avocado Toast</li>
                <li>• Jugos</li>
              </ul>
            </div>
          </div>
          <div className='relative h-[220px] w-full md:w-[250px] lg:w-[300px] md:h-full'>
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
          className='rounded overflow-hidden flex flex-col items-start md:flex-row md:items-center'
        >
          <div className='px-5 md:px-10 py-5 md:py-10 lg:py-16 max-w-[400px] sm:max-w-[450px] md:max-w-full md:w-[450px] lg:w-[600px] md:order-2 h-full bg-color-primary border-b-4 md:border-b-0 md:border-l-8 border-color-secondary-light'>
            <div className='text-3xl sm:text-3xl lg:text-4xl font-aleo-font font-semibold mb-1 sm:mb-2'>
              <h4 className='flex flex-col gap-1'>
                <span className='text-color-title-light'>
                  Almorzá con sabor y frescura
                </span>
              </h4>
            </div>
            <div className='flex flex-col gap-4 md:text-lg lg:text-lg w-full max-w-[380px] sm:max-w-max sm:w-[420px] md:w-[350px] lg:w-[500px]'>
              <p className='text-color-text-light'>
                Disfrutá de nuestros almuerzos caseros, preparados con
                ingredientes frescos y un toque único. ¡Ideal para una pausa en
                tu día!
              </p>
              <ul className='grid grid-cols-2 text-sm sm:text-base md:text-lg text-color-title-light/60'>
                <li>• Pastas</li>
                <li>• Milanesas</li>
                <li>• Sandwiches</li>
                <li>• Carnes</li>
                <li>• Guarniciones</li>
                <li>• Ensaladas</li>
              </ul>
            </div>
          </div>
          <div className='relative h-[220px] w-full md:w-[250px] lg:w-[300px] md:h-full'>
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
          className=' rounded overflow-hidden flex flex-col items-start md:flex-row md:items-center'
        >
          <div className='px-5 md:px-10 py-5 md:py-10 lg:py-16 max-w-[400px] sm:max-w-[450px] md:max-w-full md:w-[450px] lg:w-[600px] h-full bg-color-primary border-b-4 md:border-b-0 md:border-r-8 border-color-secondary-light'>
            <div className='text-3xl sm:text-3xl lg:text-4xl font-aleo-font font-semibold mb-1 sm:mb-2'>
              <h4 className='flex flex-col gap-1'>
                <span className='text-color-title-light'>
                  Postres caseros y más
                </span>
              </h4>
            </div>
            <div className='flex flex-col gap-4 md:text-lg lg:text-lg w-full max-w-[380px] sm:max-w-max sm:w-[420px] md:w-[350px] lg:w-[500px]'>
              <p className='text-color-text-light'>
                Deleitate con nuestros irresistibles postres. Desde clásicos que
                enamoran hasta creaciones únicas, cada bocado es una dulce
                celebración para tu paladar. ¡No te vayas sin probarlos!
              </p>
              <ul className='grid grid-cols-2 text-sm sm:text-base md:text-lg text-color-title-light/60'>
                <li>• Ensalada de fruta</li>
                <li>• Panqueques</li>
                <li>• Brownie</li>
                <li>• Copas dulces</li>
                <li>• Helado</li>
                <li>• Tortas</li>
              </ul>
            </div>
          </div>
          <div className='relative h-[220px] w-full md:w-[250px] lg:w-[300px] md:h-full'>
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
