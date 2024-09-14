import products from '@/data/products.json';

import Image from 'next/image';

export default function Home() {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <section className='grid grid-cols-4 gap-y-40 gap-x-10'>
          {products.map((product) => (
            <article key={product.id}>
              <div className='m-auto h-72 w-48 bg-[#e9e6dc]/50 relative'>
                <div className='absolute bottom-1/2 left-0 px-5 w-full h-full'>
                  <Image
                    className='w-full h-full object-contain object-bottom'
                    src={`/assets/products/${product.image_url}`}
                    alt={product.name}
                    width={150}
                    height={150}
                  />
                </div>
                <div className='absolute bottom-0 left-0 p-5'>
                  <h4 className='text-color-primary font-semibold h-12 line-clamp-2 mb-1'>
                    {product.name}
                  </h4>
                  <span className='font-medium'>${product.price}</span>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
