import products from '@/data/products.json';

import Image from 'next/image';

const ProductosPage = () => {
  return (
    <section className='flex justify-center my-20'>
      <div className='grid grid-cols-4 gap-y-20 gap-x-10'>
        {products.map((product) => (
          <article
            className='flex flex-col items-center p-8 bg-[#f6f6f6] rounded-sm'
            key={product.id}
          >
            <div className='h-48 w-48'>
              <Image
                className='w-full h-full object-contain object-bottom'
                src={`/assets/products/${product.image_url}`}
                alt={product.name}
                width={150}
                height={150}
              />
            </div>
            <div className='mt-8 w-full'>
              <h4 className='text-color-primary font-semibold h-12 line-clamp-2 mb-1 max-w-48'>
                {product.name}
              </h4>
              <span className='font-medium'>${product.price}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProductosPage;
