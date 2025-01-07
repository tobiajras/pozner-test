import Image from 'next/image';

import { company } from '../constants/constants';

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
                <p className='flex flex-col text-sm sm:text-lg md:text-2xl mt-1 text-color-text-light max-w-[300px] sm:max-w-[550px] md:max-w-[650px] lg:max-w-[750px]'>
                  Te acompañamos con transparencia, opciones flexibles de
                  financiación y vehículos sometidos a controles técnicos
                </p>
              </div>
            </div>
          </div>
          <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-color-primary/50 to-color-primary/20'></div>
        </section>
        <div className='max-w-6xl mt-10 md:mt-20 flex flex-col gap-10 md:gap-20'>
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
