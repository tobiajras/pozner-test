import Image from 'next/image';

import { company } from '../constants/constants';

const NosotrosPage = () => {
  return (
    <section className='flex justify-center'>
      <div className='max-w-6xl my-10 md:my-20 flex flex-col gap-10 md:gap-20'>
        <article className='flex flex-col md:flex-row items-center gap-5 md:gap-10 mx-6 sm:mx-8 md:mx-10'>
          <div>
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
            <h3 className='text-3xl sm:text-4xl md:text-5xl font-bold text-color-primary mb-3 max-w-[300px] sm:max-w-[450px] lg:max-w-[550px]'>
              Pasión por el Café
            </h3>
            <div className='flex flex-col gap-2 max-w-[300px] sm:max-w-[500px] text-color-text sm:text-lg'>
              <p className=''>
                En {company.name}, nuestra pasión por el café nos lleva a
                seleccionar solo los mejores granos de especialidad.
              </p>
              <p className=''>
                Cada taza que servimos es el resultado de un proceso cuidadoso,
                desde la finca hasta tu mesa.
              </p>
            </div>
          </div>
        </article>
        <article className='flex flex-col md:flex-row items-center gap-5 md:gap-10 mx-6 sm:mx-8 md:mx-10'>
          <div>
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
            <h3 className='text-3xl sm:text-4xl md:text-5xl font-bold text-color-secondary mb-3 max-w-[300px] sm:max-w-[450px] lg:max-w-[550px]'>
              Un Espacio para Compartir Momentos
            </h3>
            <div className='flex flex-col gap-2 max-w-[300px] sm:max-w-[500px] text-color-text sm:text-lg'>
              <p className=''>
                Más que una cafetería, somos un lugar para disfrutar, relajarse
                y compartir momentos.
              </p>
              <p className=''>
                Nos encanta ver cómo el café une a las personas, y nos
                esforzamos para que cada visita sea una experiencia memorable.
              </p>
            </div>
          </div>
        </article>
        <article className='flex flex-col md:flex-row items-center gap-5 md:gap-10 mx-6 sm:mx-8 md:mx-10'>
          <div>
            <Image
              className='rounded w-[300px] md:w-[450px]'
              src='/assets/nosotros/nosotros-3.webp'
              alt='Nosotros'
              width={608}
              height={480}
            />
          </div>
          <div>
            <h3 className='text-3xl sm:text-4xl md:text-5xl font-bold text-color-primary mb-3 max-w-[300px] sm:max-w-[450px] lg:max-w-[550px]'>
              Calidad Artesanal en Cada Taza
            </h3>
            <div className='flex flex-col gap-2 max-w-[300px] sm:max-w-[500px] text-color-text sm:text-lg'>
              <p className=''>
                Trabajamos con productores locales y tostadores expertos para
                ofrecerte un café de calidad inigualable.
              </p>
              <p className=''>
                Nuestro equipo está comprometido con técnicas artesanales que
                resaltan lo mejor de cada grano, sin comprometer la frescura ni
                el sabor.
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default NosotrosPage;
