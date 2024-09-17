'use client';

import products from '@/data/products.json';

import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';

const CarrouselFeatured = ({ title, startIndex, lastIndex }) => {
  const [emblaRef] = useEmblaCarousel({ dragFree: true });

  return (
    <section className='flex justify-center w-full'>
      <div className=' max-w-6xl m-3 sm:m-5 overflow-hidden pb-10 md:pb-16'>
        <h3 className='mb-3 font-medium text-xl sm:text-2xl sm:mb-5'>
          {title}
        </h3>
        <div ref={emblaRef}>
          <div className='flex gap-3 sm:gap-5'>
            {products.slice(startIndex, lastIndex).map((product) => (
              <Link
                href={`/productos/${product.id}`}
                className='w-full flex-[0_0_43%] p-3 bg-[#f6f6f6] hover:bg-[#EEEEEE] transition-colors rounded-sm relative sm:p-5 sm:flex-[0_0_30%] md:flex-[0_0_25%] lg:flex-[0_0_21%]'
                key={product.id}
              >
                <div className='flex flex-col w-full h-full'>
                  <img
                    className='object-contain px-3 py-5 md:px-5 md:py-12 h-36 min-[500px]:h-44 md:h-56 lg:h-72'
                    src={`/assets/products/${
                      product.image_url
                        ? product.image_url
                        : product.color[0].image_url
                    }`}
                    alt={product.name}
                  />
                  <h3 className='text-color-primary font-semibold h-12 line-clamp-2 mb-1 max-w-48'>
                    {product.name}
                  </h3>
                  <span className='font-medium text-lg'>
                    ${parseInt(product.price).toLocaleString('es-ES')}
                  </span>
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
