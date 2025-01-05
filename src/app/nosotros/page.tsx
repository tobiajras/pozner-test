import Image from 'next/image';

import { company } from '../constants/constants';

const NosotrosPage = () => {
  return (
    <>
      <section className='flex justify-center'>
        <div className='max-w-6xl my-10 md:my-20 flex flex-col gap-10 md:gap-20'>
          <article className='flex flex-col md:flex-row items-center gap-5 md:gap-10 mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
            <div className='[box-shadow:0px_0px_19px_3px_rgba(0,0,0,0.2)]'>
              <Image
                priority
                className='rounded w-[300px] md:w-[450px]'
                src='/assets/nosotros/nosotros-1.webp'
                alt='Nosotros'
                width={608}
                height={480}
              />
            </div>
            <div>
              <h3 className='text-2xl sm:text-3xl md:text-4xl font-bold text-color-primary mb-3 max-w-[300px] sm:max-w-[450px] lg:max-w-[480px]'>
                Confianza al Elegir tu Auto
              </h3>
              <div className='flex flex-col gap-2 max-w-[300px] sm:max-w-[400px] text-color-text sm:text-lg'>
                <p className=''>
                  Comprar un auto es una gran decisión, y estamos para
                  acompañarte en cada paso.
                </p>
                <p className=''>
                  Nuestro equipo te brinda asesoramiento honesto y transparente,
                  porque tu confianza es lo más importante para nosotros.
                </p>
              </div>
            </div>
          </article>
          <article className='flex flex-col md:flex-row items-center gap-5 md:gap-10 mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
            <div className='[box-shadow:0px_0px_19px_3px_rgba(0,0,0,0.2)] md:order-2'>
              <Image
                priority
                className='rounded w-[300px] md:w-[450px]'
                src='/assets/nosotros/nosotros-2.webp'
                alt='Nosotros'
                width={608}
                height={480}
              />
            </div>
            <div>
              <h3 className='text-2xl sm:text-3xl md:text-4xl font-bold text-color-secondary mb-3 max-w-[300px] sm:max-w-[450px] lg:max-w-[480px]'>
                Financiación a tu Alcance
              </h3>
              <div className='flex flex-col gap-2 max-w-[300px] sm:max-w-[400px] text-color-text sm:text-lg'>
                <p className=''>
                  Sabemos que cada cliente tiene necesidades únicas, por eso
                  ofrecemos planes de financiación flexibles y adaptados a tu
                  presupuesto.
                </p>
                <p className=''>
                  Te ayudamos a cumplir el sueño de tener tu auto, sin
                  complicaciones.
                </p>
              </div>
            </div>
          </article>
          <article className='flex flex-col md:flex-row items-center gap-5 md:gap-10 mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
            <div className='[box-shadow:0px_0px_19px_3px_rgba(0,0,0,0.2)]'>
              <Image
                className='rounded w-[300px] md:w-[450px]'
                src='/assets/nosotros/nosotros-3.webp'
                alt='Nosotros'
                width={608}
                height={480}
              />
            </div>
            <div>
              <h3 className='text-2xl sm:text-3xl md:text-4xl font-bold text-color-primary mb-3 max-w-[300px] sm:max-w-[450px] lg:max-w-[480px]'>
                Seguridad en Cada Kilómetro
              </h3>
              <div className='flex flex-col gap-2 max-w-[300px] sm:max-w-[400px] text-color-text sm:text-lg'>
                <p className=''>
                  En {company.name}, tu seguridad es nuestra prioridad. Por eso,
                  todos nuestros vehículos son sometidos a rigurosos controles
                  técnicos.
                </p>
                <p className=''>
                  Queremos que disfrutes cada viaje con la tranquilidad de
                  contar con un auto confiable y preparado para cualquier
                  camino.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default NosotrosPage;
