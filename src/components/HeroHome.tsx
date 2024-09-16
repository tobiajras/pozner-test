import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const HeroHome = () => {
  return (
    <section className='my-28'>
      <div className='flex justify-center items-center gap-20'>
        <article>
          <h2 className='text-5xl font-semibold text-color-primary'>
            Tu Café preferido
          </h2>
          <p className='text-xl max-w-96 mt-3'>
            Café en granos, mólido, cápsulas, productos de calidad y más
          </p>
          <div className='mt-8'>
            <Link
              className='bg-color-primary hover:bg-color-primary-dark transition-colors px-5 py-4 text-color-title-light rounded-sm'
              href='/productos'
            >
              Ver catálogo
            </Link>
          </div>
        </article>
        <article>
          <div className='w-72 h-72 bg-color-secondary-light rounded-full relative'>
            <Image
              className='absolute bottom-14 right-0 w-full h-full object-contain drop-shadow-xl'
              src='/assets/home/hero-image.webp'
              alt='Imágen de inicio'
              width={400}
              height={400}
            />
          </div>
        </article>
      </div>
    </section>
  );
};

export default HeroHome;
