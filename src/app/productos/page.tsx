'use client';

import products from '@/data/products.json';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'; // Importar useSearchParams
import { Suspense } from 'react'; // Importar Suspense

const ProductosPage = () => {
  const searchParams = useSearchParams(); // Obtener los parámetros de búsqueda
  const searchTerm = searchParams.get('search') || ''; // Leer el término de búsqueda

  // Normalizar el término de búsqueda
  const normalizedSearchTerm = searchTerm
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  const filteredProducts = products.filter((product) => {
    // Normalizar el nombre del producto
    const normalizedProductName = product.name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    return normalizedProductName
      .toLowerCase()
      .includes(normalizedSearchTerm.toLowerCase()); // Filtrar productos
  });

  return (
    <section className='flex flex-col items-center w-full'>
      <section className='w-full max-w-[1920px] h-[180px] sm:h-[260px] md:h-[320px] lg:h-[400px] relative'>
        <div className='w-full h-full'>
          <Image
            priority
            className='w-full h-full object-cover'
            src='/assets/products/products-banner.webp'
            alt='products'
            width={1500}
            height={400}
          />
        </div>
        <div className='absolute bottom-0 left-0 w-full h-full flex justify-center items-center z-10'>
          <div className='max-w-5xl w-full flex justify-center'>
            <div className='md:w-full mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
              <h3 className='text-2xl sm:text-4xl lg:text-5xl font-semibold text-color-primary-light'>
                ¡ARMÁ TU PEDIDO!
              </h3>
              <p className='flex flex-col text-sm sm:text-lg md:text-2xl mt-1 text-color-text-light'>
                <span>Seleccioná tus productos y agregalos al carrito.</span>
                <span>Generamos el pedido por Whatsapp.</span>
              </p>
            </div>
          </div>
        </div>
        <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-color-bg-secondary/50 to-color-bg-secondary/40'></div>
      </section>
      <>
        {filteredProducts.length > 0 ? ( // Verificar si hay productos filtrados
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 lg:gap-y-20 gap-x-4 sm:gap-x-6 lg:gap-x-10 my-10 md:my-20 min-h-[600px]'>
            {filteredProducts.map((product) => (
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
        ) : (
          <div className='flex flex-col items-center min-h-[600px] my-8 md:my-16'>
            <div className='col-span-2 md:col-span-3 lg:col-span-4 text-center text-lg text-color-text'>
              No se encontraron resultados para la búsqueda{' '}
              <span className='text-color-title font-semibold'>
                &quot;{searchTerm}&quot;
              </span>
              .
            </div>
            <Link
              className='mt-5 bg-color-primary hover:bg-color-primary-dark transition-colors px-4 md:px-6 pt-3 pb-2 text-color-title-light rounded'
              href='/productos'
            >
              Ver catálogo
            </Link>
          </div>
        )}
      </>
    </section>
  );
};

const ProductosPageWithSuspense = () => (
  <Suspense fallback={<div>Cargando...</div>}>
    <ProductosPage />
  </Suspense>
);

export default ProductosPageWithSuspense;
