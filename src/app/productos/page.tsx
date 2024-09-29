import products from '@/data/products.json';

import Image from 'next/image';
import Link from 'next/link';

const ProductosPage = () => {
  return (
    <section className='flex flex-col items-center w-full'>
      <section className='w-full max-w-[1920px] h-[400px] relative'>
        <div className='w-full h-full'>
          <Image
            className='w-full h-full object-cover'
            src='/assets/products/products-banner.webp'
            alt='products'
            width={1500}
            height={400}
          />
        </div>
        <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-color-bg-secondary/50 to-color-bg-secondary/30'></div>
      </section>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 lg:gap-y-20 gap-x-4 sm:gap-x-6 lg:gap-x-10 my-20'>
        {products.map((product) => (
          <Link
            href={`/productos/${product.id}`}
            className='flex flex-col items-center py-6 px-4 sm:py-8 sm:px-8 bg-[#f6f6f6] hover:bg-[#EEEEEE] transition-colors rounded-sm'
            key={product.id}
          >
            <div className='h-[120px] sm:h-36 lg:h-44 w-[120px] sm:w-36 lg:w-44'>
              <Image
                className='w-full h-full object-contain object-bottom'
                src={`/assets/products/${product.image}`}
                alt={product.name}
                width={150}
                height={150}
              />
            </div>
            <div className='mt-8 w-full'>
              <h4 className='text-sm sm:text-base text-color-primary font-semibold h-10 sm:h-12 line-clamp-2 mb-1 max-w-[120px] sm:max-w-36 lg:max-w-44'>
                {product.name}
              </h4>
              <span className='font-medium text-lg'>
                ${product.price.toLocaleString('es-ES')}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductosPage;
