'use client';

import products from '@/data/catalogo.json';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import SearchIcon from './icons/SearchIcon';
import { company } from '@/app/constants/constants';

interface CarrouselFeaturedProps {
  title: string;
  startIndex: number;
  lastIndex: number;
}

const CarrouselFeatured = ({
  title,
  startIndex,
  lastIndex,
}: CarrouselFeaturedProps) => {
  const [emblaRef] = useEmblaCarousel({ dragFree: true });

  const [clicked, setClicked] = useState(false);

  return (
    <section className='flex justify-center w-full'>
      <div className='max-w-6xl w-full px-2 mx-4 sm:mx-6 md:mx-8 lg:mx-10 overflow-hidden pb-6 md:pb-10'>
        <h3 className='mb-3 font-medium text-xl sm:text-2xl sm:mb-5'>
          {title}
        </h3>
        <div
          onMouseUp={() => setClicked(false)}
          onMouseDown={() => setClicked(true)}
          ref={emblaRef}
          className={` ${clicked ? 'cursor-grabbing' : 'cursor-grab'}`}
        >
          <div className='flex gap-3 sm:gap-5'>
            {products.slice(startIndex, lastIndex).map((product) => (
              <Link
                href={`/catalogo/${product.id}`}
                className='group w-full h-full overflow-hidden flex-[0_0_70%] min-[500px]:flex-[0_0_55%] sm:flex-[0_0_40%] lg:flex-[0_0_28%] rounded-xl bg-white border-2 border-gray-300 hover:border-color-primary transition-all duration-300 relative block'
                key={product.id}
              >
                {/* Badge de marca */}
                <div className='absolute top-3 left-3 z-10'>
                  <span className='bg-color-primary/90 text-color-title-light text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm'>
                    {product.marca}
                  </span>
                </div>

                {/* Imagen con overlay */}
                <div className='relative overflow-hidden h-44 sm:h-48 md:h-52 xl:h-56'>
                  <Image
                    priority
                    width={451}
                    height={600}
                    className='object-cover w-full h-full overflow-hidden group-hover:scale-110 transition-transform duration-700 ease-in-out'
                    src={`/assets/catalogo/${product.marcaId?.toLowerCase()}/${
                      product.id
                    }/${product.images?.[0] || 'placeholder.webp'}`}
                    alt={product.name}
                  />
                  {/* Overlay con degradado */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

                  {/* Botón de búsqueda */}
                  <div className='absolute right-3 bottom-0 translate-y-[-12px] transition-transform duration-300 ease-out'>
                    <div
                      className={`${
                        company.dark
                          ? 'bg-color-primary hover:bg-color-primary-dark text-color-title-light'
                          : 'bg-color-primary hover:bg-color-primary-dark text-color-title-light'
                      } p-2 rounded-full shadow-lg transition-colors`}
                    >
                      <SearchIcon className='size-5 md:size-6 stroke-[3]' />
                    </div>
                  </div>
                </div>

                {/* Contenido */}
                <div className='w-full px-4 py-4'>
                  {/* Nombre del vehículo */}
                  <h3 className='text-lg md:text-xl text-color-title font-semibold line-clamp-2 mb-2 min-h-[3.5rem]'>
                    {product.name}
                  </h3>

                  {/* Línea separadora */}
                  <div className='w-12 md:w-16 h-0.5 bg-color-primary mb-3'></div>

                  {/* Especificaciones */}
                  <div className='flex flex-col gap-1.5'>
                    <div className='flex items-center gap-2'>
                      <span className='text-color-primary font-medium'>
                        {product.ano}
                      </span>
                      <span className='text-xs text-color-text'>•</span>
                      <span className='text-color-text text-sm'>
                        {(product.kilometraje ?? 0).toLocaleString('es-ES')} km
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='text-color-text text-sm'>
                        {product.transmision}
                      </span>
                      <span className='text-xs text-color-text'>•</span>
                      <span className='text-color-text text-sm'>
                        {product.combustible}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarrouselFeatured;
