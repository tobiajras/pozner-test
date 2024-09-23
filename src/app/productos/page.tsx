import products from '@/data/products.json';

import Image from 'next/image';
import Link from 'next/link';

const ProductosPage = () => {
  return (
    <section className='flex justify-center my-20'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 lg:gap-y-20 gap-x-4 sm:gap-x-6 lg:gap-x-10'>
        {products.map((product) => (
          <Link
            href={`/productos/${product.id}`}
            className='flex flex-col items-center py-6 px-4 sm:py-8 sm:px-8 bg-[#f6f6f6] hover:bg-[#EEEEEE] transition-colors rounded-sm'
            key={product.id}
          >
            <div className='h-28 sm:h-36 lg:h-44 w-28 sm:w-36 lg:w-44'>
              <Image
                className='w-full h-full object-contain object-bottom'
                src={`/assets/products/${
                  product.image_url || product.color?.[0]?.image_url
                }`}
                alt={product.name}
                width={150}
                height={150}
              />
            </div>
            <div className='mt-8 w-full'>
              <h4 className='text-sm sm:text-base text-color-primary font-semibold h-10 sm:h-12 line-clamp-2 mb-1 max-w-28 sm:max-w-36 lg:max-w-44'>
                {product.name}
              </h4>
              <span className='font-medium text-lg'>
                ${parseInt(product.price).toLocaleString('es-ES')}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductosPage;
