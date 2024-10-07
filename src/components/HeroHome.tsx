'use client';

import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';

import { company } from '@/app/constants/constants';

const HeroHome = () => {
  return (
    <section className='mb-20'>
      <div className='flex flex-col md:flex-row justify-center items-center md:gap-6 lg:gap-8 xl:gap-10'>
        <motion.article
          initial={{ opacity: 0, x: -10 }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.3,
              ease: 'easeOut',
            },
          }}
          viewport={{ once: true }}
          className='mt-10 mb-5 mx-6 sm:mx-8 md:mx-0 md:mt-0 md:mb-0'
        >
          <h1 className='text-center md:text-left text-[40px] sm:text-5xl lg:text-6xl font-semibold text-color-primary'>
            {company.name}
          </h1>
          <p className='text-center md:text-left text-base sm:text-lg lg:text-xl max-w-[300px] md:max-w-[350px] lg:max-w-[450px] sm:mt-1 md:mt-2'>
            Café de especialidad, delicias caseras y experiencias únicas
          </p>
          <div className='flex justify-center md:justify-start gap-3 mt-4 md:mt-6 lg:mt-8 text-xs sm:text-sm lg:text-base'>
            <Link
              className='border-2 border-transparent bg-color-primary hover:bg-color-primary-dark transition-colors px-4 md:px-6 py-3 text-color-title-light rounded'
              href='/productos'
            >
              Ver catálogo
            </Link>
            {company.menu && (
              <a
                className='border-2 border-color-primary hover:bg-color-primary hover:text-color-title-light transition-colors px-4 md:px-6 py-3 font-medium text-color-primary rounded'
                href={company.menu}
                target='_blank'
                rel='noopener noreferrer'
              >
                Ver Menú
              </a>
            )}
          </div>
        </motion.article>
        <motion.article
          initial={{ opacity: 0, x: 10 }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.3,
              ease: 'easeOut',
            },
          }}
          viewport={{ once: true }}
        >
          <div className='w-[280px] sm:w-[320px] md:w-[340px] lg:w-[440px] xl:w-[520px] relative'>
            <Image
              priority
              className='w-full h-full md:object-contain rounded-b-md'
              src='/assets/inicio/home-background.webp'
              alt='Imágen de inicio'
              width={400}
              height={400}
            />
          </div>
        </motion.article>
      </div>
    </section>
  );
};

export default HeroHome;
