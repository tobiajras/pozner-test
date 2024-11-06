import Image from 'next/image';

import { company, metadataCompany } from '@/app/constants/constants';

const HeroHome = () => {
  return (
    <section className='mb-20 bg-color-primary flex justify-center overflow-hidden'>
      <div className='flex flex-col md:flex-row justify-center items-center gap-10 md:gap-3 lg:gap-8 xl:gap-10 max-w-6xl mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
        <article className='mt-10 mb-5 mx-6 sm:mx-8 md:mx-0 md:mt-0 md:mb-0'>
          <h1 className='text-nowrap text-center md:text-left text-[35px] sm:text-[40px] leading-10 lg:text-6xl font-semibold text-color-title-light'>
            {company.name}
          </h1>
          <h3 className='text-nowrap text-center md:text-left text-3xl sm:text-4xl lg:text-5xl font-medium text-color-title-light'>
            Brunch & Café
          </h3>
          <div className='text-color-text-light text-center md:text-left text-sm sm:text-base lg:text-xl max-w-[300px] md:max-w-[360px] lg:max-w-[650px] mt-3 md:mt-5 lg:mt-8'>
            <p className='text-nowrap'>
              Café de especialidad + Delicias caseras,
            </p>
            <p className='text-nowrap'>
              la combinación ideal para empezar tu día
            </p>
          </div>
        </article>
        <article>
          <div className='w-[220px] sm:w-[250px] md:w-[300px] lg:w-[400px] xl:w-[550px] relative'>
            <Image
              priority
              className='md:ml-20 lg:ml-32 w-full h-full md:object-contain'
              src='/assets/inicio/home-background.webp'
              alt='Imágen de inicio'
              width={400}
              height={400}
            />
            <div className='absolute -top-10 left-0 w-full md:w-auto md:top-0 md:left-6 lg:left-16 h-full flex justify-center md:items-center'>
              {company.menu ? (
                <a
                  className='px-4 md:px-6 py-3 w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-color-primary hover:bg-color-primary-dark transition-colors text-color-title-light font-medium text-sm md:text-lg lg:text-xl ring lg:ring-4 ring-color-title-light flex items-center justify-center'
                  href={company.menu}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  MENÚ
                </a>
              ) : (
                <a
                  className='px-4 md:px-6 py-3 w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-color-primary hover:bg-color-primary-dark transition-colors text-color-title-light font-medium text-sm md:text-lg lg:text-xl ring lg:ring-4 ring-color-title-light flex items-center justify-center'
                  href={`${metadataCompany.metadataBase}/menu`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  MENÚ
                </a>
              )}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default HeroHome;
