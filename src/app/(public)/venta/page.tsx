'use client';

import { company } from '@/app/constants/constants';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { motion } from 'framer-motion';
import Image from 'next/image';

const VentaPage = () => {
  const pasos = [
    {
      numero: '01',
      titulo: 'Evaluación Inicial',
      descripcion:
        'Realizamos una inspección detallada de tu vehículo para determinar su estado y valor de mercado.',
    },
    {
      numero: '02',
      titulo: 'Documentación',
      descripcion:
        'Firmamos el contrato de consignación y recopilamos toda la documentación necesaria.',
    },
    {
      numero: '03',
      titulo: 'Marketing',
      descripcion:
        'Preparamos tu vehículo para la venta y creamos una estrategia de marketing personalizada.',
    },
    {
      numero: '04',
      titulo: 'Venta y Entrega',
      descripcion:
        'Nos encargamos de la negociación, venta y transferencia del vehículo.',
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
              src='/assets/venta/banner-venta.webp'
              alt='banner-venta'
              width={1500}
              height={400}
            />
          </div>
          <div className='absolute bottom-0 left-0 w-full h-full flex justify-center items-center z-10'>
            <div className='max-w-6xl w-full flex justify-center mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
              <div className='text-center'>
                <h3 className='text-2xl sm:text-4xl lg:text-5xl font-bold text-color-text-light'>
                  VENDÉ TU VEHÍCULO
                </h3>
              </div>
            </div>
          </div>
          <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-color-bg-secondary-dark/75 to-color-bg-secondary-dark/75'></div>
        </section>

        <section className='mt-8 md:mt-12'>
          <div className='max-w-6xl mx-auto px-4 sm:px-6'>
            <div className='flex justify-center text-center mb-16'>
              <p className='text-xl lg:text-2xl text-color-text max-w-xl lg:max-w-2xl text-center'>
                Te guiamos en cada paso del camino para que puedas vender tu
                vehículo de manera fácil y rápida.
              </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center'>
              {pasos.map((paso, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className='relative'
                >
                  <div className='text-6xl font-bold text-color-primary-light mb-4'>
                    {paso.numero}
                  </div>
                  <h3 className='text-xl font-semibold text-color-title mb-2'>
                    {paso.titulo}
                  </h3>
                  <p className='text-color-text max-w-sm'>{paso.descripcion}</p>
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
              ¿Estás listo para vender tu vehículo?
            </h3>
            <p className='text-white/70 max-w-2xl mx-auto mb-3 md:mb-5 lg:text-lg'>
              Nuestro equipo está listo para asesorarte y concretar la venta de
              tu auto. Contáctanos para obtener más información.
            </p>
            <div className='flex gap-4 justify-center'>
              <a
                href={`https://api.whatsapp.com/send?phone=549${company.whatsapp[0]}&text=Hola! Quiero vender mi vehículo`}
                target='_blank'
                rel='noopener noreferrer'
                className='lg:text-lg bg-color-primary hover:bg-color-primary-dark text-white py-3 px-8 rounded-md font-medium transition-all duration-300'
              >
                Vender
              </a>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default VentaPage;
