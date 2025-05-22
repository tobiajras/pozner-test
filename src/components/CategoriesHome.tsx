'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';

const CATEGORIES = [
  {
    name: 'SUV',
    image: '/assets/categories/suv.webp',
    url: '/catalogo?categoria=suv',
  },
  {
    name: 'Pickup',
    image: '/assets/categories/pickup.webp',
    url: '/catalogo?categoria=pickup',
  },
  {
    name: 'Hatchback',
    image: '/assets/categories/hatchback.webp',
    url: '/catalogo?categoria=hatchback',
  },
  {
    name: 'Sedán',
    image: '/assets/categories/sedan.webp',
    url: '/catalogo?categoria=sedán',
  },
];

const CategoriesHome = () => {
  const [emblaRef] = useEmblaCarousel({ dragFree: true });

  return (
    <section className='flex justify-center w-full'>
      <div className='max-w-6xl w-full px-2 mx-4 sm:mx-6 md:mx-8 lg:mx-10 overflow-hidden mt-10 mb-10 md:mt-16 md:mb-16'>
        <div className='flex items-center mb-5'>
          <div className='w-1 h-16 md:h-20 bg-color-primary rounded mr-3 lg:mr-4'></div>
          <div>
            <h2 className='lg:mb-1 text-xl sm:text-2xl md:text-3xl font-semibold text-white drop-shadow-md'>
              Elegí tu estilo
            </h2>
            <p className='mb-0 sm:text-lg md:text-xl text-white drop-shadow-md'>
              Estas son algunas de las categorías que tenemos para vos
            </p>
          </div>
        </div>
        {/* Carrusel responsivo siempre activo */}
        <div ref={emblaRef} className='overflow-x-hidden'>
          <div className='flex gap-4 lg:gap-6 py-1'>
            {CATEGORIES.map((category) => (
              <Link
                key={category.name}
                href={category.url}
                className='group relative aspect-[3/4] rounded-lg overflow-hidden border border-neutral-800 flex-[0_0_65%] min-[500px]:flex-[0_0_50%] sm:flex-[0_0_40%] md:flex-[0_0_35%] lg:flex-[0_0_30%] xl:flex-[0_0_23%]'
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className='w-full h-full'
                >
                  <Image
                    priority
                    src={category.image}
                    alt={category.name}
                    fill
                    className='object-cover transition-transform duration-700 ease-in-out'
                  />
                  {/* Gradiente base siempre visible */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent'></div>
                  {/* Gradiente hover más fuerte */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  {/* Nombre de la categoría y Ver más animados */}
                  <div className='absolute left-4 bottom-0 lg:bottom-3 flex flex-col items-start justify-end h-[60px] z-10 w-auto'>
                    <h3 className='text-xl font-semibold text-white drop-shadow-md transform transition-all duration-300 translate-y-0 group-hover:-translate-y-5'>
                      {category.name.toUpperCase()}
                    </h3>
                    <span className='flex items-center gap-1 text-white hover:text-color-primary-dark text-base font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-5 group-hover:translate-y-0'>
                      Ver más <span className='text-lg'>→</span>
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesHome;
