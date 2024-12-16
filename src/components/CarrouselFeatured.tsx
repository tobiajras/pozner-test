'use client';

import products from '@/data/catalogo.json';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

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
                className='w-full h-full overflow-hidden flex-[0_0_40%] rounded [box-shadow:0px_0px_10px_2px_rgba(0,0,0,0.2)] hover:[box-shadow:0px_0px_10px_2px_rgba(0,0,0,0.3)] transition-all relative1 sm:flex-[0_0_33%] lg:flex-[0_0_28%]'
                key={product.id}
              >
                <div className='flex overflow-hidden max-h-64'>
                  <Image
                    width={451}
                    height={600}
                    className='object-cover w-full h-full overflow-hidden'
                    src={`/assets/catalogo/${product.marca?.toLowerCase()}/${
                      product.id
                    }/${product.images?.[0] || 'placeholder.webp'}`}
                    alt={product.name}
                  />
                </div>
                <div className='py-5 px-3'>
                  <h3 className='md:text-xl text-color-title font-semibold h-16 line-clamp-2 mb-1 max-w-64'>
                    {product.name}
                  </h3>
                  <div className='flex flex-col gap-1'>
                    <span className='text-color-text'>
                      {product.ano} |{' '}
                      {(product.kilometraje ?? 0).toLocaleString('es-ES')} km
                    </span>
                    <span className='text-color-text'>
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
