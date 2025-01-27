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
                className='group w-full h-full overflow-hidden flex-[0_0_70%] min-[500px]:flex-[0_0_55%] sm:flex-[0_0_40%] lg:flex-[0_0_28%] rounded [box-shadow:0px_0px_10px_2px_rgba(0,0,0,0.1)] md:[box-shadow:0px_0px_10px_2px_rgba(0,0,0,0.2)] hover:[box-shadow:0px_0px_10px_2px_rgba(0,0,0,0.3)] transition-all relative'
                key={product.id}
              >
                <div className='flex overflow-hidden h-40 sm:h-48 md:h-56 xl:h-64'>
                  <Image
                    width={451}
                    height={600}
                    className='object-cover w-full h-full overflow-hidden group-hover:scale-105 transition-transform duration-700'
                    src={`/assets/catalogo/${product.marcaId?.toLowerCase()}/${
                      product.id
                    }/${product.images?.[0] || 'placeholder.webp'}`}
                    alt={product.name}
                  />
                </div>
                <div className='py-5 px-4 bg-gradient-to-t bg-color-bg-secondary-light relative'>
                  <div className='absolute -top-8 left-0 w-full h-8 bg-gradient-to-t from-color-bg-secondary-light to-transparent'></div>
                  <h3 className='md:text-xl text-color-primary-light font-semibold h-16 line-clamp-2 mb-1 max-w-64'>
                    {product.name}
                  </h3>
                  <div className='flex flex-col gap-1 relative'>
                    <div className='absolute -top-0 left-0 w-full h-full flex justify-end items-center'>
                      <SearchIcon
                        className={`${
                          company.dark
                            ? ' text-color-title bg-color-primary-light hover:bg-color-primary-light/80'
                            : 'text-color-title bg-color-primary hover:bg-color-primary-dark'
                        } size-8 md:size-10 transition-colors rounded-full p-1.5 md:p-2.5 stroke-[3]`}
                      />
                    </div>
                    <span className='text-color-text-light line-clamp-1'>
                      {product.ano} |{' '}
                      {(product.kilometraje ?? 0).toLocaleString('es-ES')} km
                    </span>
                    <span className='text-color-text-light line-clamp-1'>
                      {product.transmision} | {product.combustible}
                    </span>
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
