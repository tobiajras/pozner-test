import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { company } from '@/app/constants/constants';

const HeroHome = () => {
  return (
    <section className='mb-20'>
      <div className='flex justify-center items-center gap-20'>
        <article>
          <h1 className='text-6xl font-semibold text-color-primary'>
            {company.name}
          </h1>
          <p className='text-xl max-w-[450px] mt-2'>
            Café de especialidad, delicias caseras y experiencias únicas
          </p>
          <div className='flex gap-3 mt-8'>
            <Link
              className='bg-color-primary hover:bg-color-primary-dark transition-colors px-6 pt-3 pb-2 text-color-title-light rounded'
              href='/productos'
            >
              Ver catálogo
            </Link>
            {company.menu && (
              <a
                className='border-2 border-color-primary hover:bg-color-primary hover:text-color-title-light transition-colors px-6 pt-3 pb-2 font-medium text-color-primary rounded'
                href={company.menu}
                target='_blank'
                rel='noopener noreferrer'
              >
                Ver Menú
              </a>
            )}
          </div>
        </article>
        <article>
          <div className='w-[550px] relative'>
            <Image
              className='w-full h-full object-contain rounded-b-md'
              src='/assets/inicio/hero-image.webp'
              alt='Imágen de inicio'
              width={400}
              height={400}
            />
            <div className='absolute top-0 right-0 w-full h-20 bg-gradient-to-b from-color-bg-secondary to-transparent'></div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default HeroHome;
