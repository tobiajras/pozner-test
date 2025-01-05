'use client';

import SearchIcon from '@/components/icons/SearchIcon';
import products from '@/data/catalogo.json';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'; // Importar useSearchParams
import { Suspense } from 'react'; // Importar Suspense

const CatalogoPage = () => {
  const searchParams = useSearchParams(); // Obtener los parámetros de búsqueda
  const searchTerm = searchParams.get('search') || ''; // Leer el término de búsqueda
  const marcaFilter = searchParams.get('marca') || '';
  const categoriaFilter = searchParams.get('categoria') || '';

  // Obtener marcas y categorías únicas
  const marcas = Array.from(
    new Set(products.map((product) => product.marca))
  ).sort();
  const categorias = Array.from(
    new Set(products.map((product) => product.categoria))
  ).sort();

  // Normalizar el término de búsqueda
  const normalizedSearchTerm = searchTerm
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  const filteredProducts = products.filter((product) => {
    // Normalizar el nombre del producto
    const normalizedProductName = product.name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    const matchesSearch = normalizedProductName
      .toLowerCase()
      .includes(normalizedSearchTerm.toLowerCase());

    const matchesMarca = marcaFilter ? product.marca === marcaFilter : true;
    const matchesCategoria = categoriaFilter
      ? product.categoria === categoriaFilter
      : true;

    return matchesSearch && matchesMarca && matchesCategoria;
  });

  return (
    <>
      <section className='flex flex-col items-center w-full mb-10 md:mb-20'>
        <section className='w-full max-w-[1920px] h-[140px] sm:h-[160px] md:h-[220px] lg:h-[300px] relative'>
          <div className='w-full h-full'>
            <Image
              priority
              className='w-full h-full object-cover'
              src='/assets/catalogo/catalogo-banner.webp'
              alt='products'
              width={1500}
              height={400}
            />
          </div>
          <div className='absolute bottom-0 left-0 w-full h-full flex justify-center items-center z-10'>
            <div className='max-w-6xl w-full flex justify-center mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
              <div className='text-center'>
                <h3 className='text-2xl sm:text-4xl lg:text-5xl font-semibold text-color-primary-light'>
                  ¡CATÁLOGO ONLINE!
                </h3>
                <p className='flex flex-col text-sm sm:text-lg md:text-2xl mt-1 text-color-text-light'>
                  <span>Elegí el que más te guste y contactanos,</span>
                  <span>tenemos variedad de marcas</span>
                </p>
              </div>
            </div>
          </div>
          <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-color-bg-secondary/60 to-color-bg-secondary/50'></div>
        </section>

        {/* Filtros y Buscador */}
        <div className='w-full max-w-6xl'>
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-5 mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-0 mt-8'>
            {/* Buscador */}
            <div className='relative w-full'>
              <input
                type='text'
                placeholder='Buscar vehículo...'
                defaultValue={searchTerm}
                onChange={(e) => {
                  const params = new URLSearchParams(window.location.search);
                  if (e.target.value) {
                    params.set('search', e.target.value);
                  } else {
                    params.delete('search');
                  }
                  window.history.pushState(null, '', `?${params.toString()}`);
                }}
                className='w-full px-4 py-2.5 rounded [box-shadow:0px_0px_10px_2px_rgba(0,0,0,0.1)] md:[box-shadow:0px_0px_10px_2px_rgba(0,0,0,0.2)] outline-none'
              />
              <SearchIcon className='absolute right-3 top-1/2 -translate-y-1/2 size-5' />
            </div>

            <div className='flex flex-row sm:flex-row gap-3 sm:gap-5'>
              {/* Filtro de Marca */}
              <select
                defaultValue={marcaFilter}
                onChange={(e) => {
                  const params = new URLSearchParams(window.location.search);
                  if (e.target.value) {
                    params.set('marca', e.target.value);
                  } else {
                    params.delete('marca');
                  }
                  window.history.pushState(null, '', `?${params.toString()}`);
                }}
                className='w-full sm:w-auto px-4 py-2.5 rounded [box-shadow:0px_0px_10px_2px_rgba(0,0,0,0.1)] md:[box-shadow:0px_0px_10px_2px_rgba(0,0,0,0.2)] outline-none'
              >
                <option value=''>Todas las marcas</option>
                {marcas.map((marca) => (
                  <option key={marca} value={marca}>
                    {marca}
                  </option>
                ))}
              </select>

              {/* Filtro de Categoría */}
              <select
                defaultValue={categoriaFilter}
                onChange={(e) => {
                  const params = new URLSearchParams(window.location.search);
                  if (e.target.value) {
                    params.set('categoria', e.target.value);
                  } else {
                    params.delete('categoria');
                  }
                  window.history.pushState(null, '', `?${params.toString()}`);
                }}
                className='w-full sm:w-auto px-4 py-2.5 rounded [box-shadow:0px_0px_10px_2px_rgba(0,0,0,0.1)] md:[box-shadow:0px_0px_10px_2px_rgba(0,0,0,0.2)] outline-none'
              >
                <option value=''>Todas las categorías</option>
                {categorias.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <>
          {filteredProducts.length > 0 ? ( // Verificar si hay productos filtrados
            <div className='max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 lg:gap-y-20 gap-x-4 sm:gap-x-6 lg:gap-x-12 mt-10 min-h-[600px] place-content-start mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
              {filteredProducts.map((product) => (
                <Link
                  href={`/catalogo/${product.id}`}
                  className='relative group flex flex-col items-center overflow-hidden rounded [box-shadow:0px_0px_10px_2px_rgba(0,0,0,0.1)] md:[box-shadow:0px_0px_10px_2px_rgba(0,0,0,0.2)] hover:[box-shadow:0px_0px_10px_2px_rgba(0,0,0,0.3)] transition-all'
                  key={product.id}
                >
                  <div className='w-full h-full'>
                    <Image
                      className='w-full h-full object-cover overflow-hidden group-hover:scale-105 transition-transform duration-700'
                      src={`/assets/catalogo/${product.marcaId?.toLowerCase()}/${
                        product.id
                      }/${product.images?.[0] || 'placeholder.webp'}`}
                      alt={product.name}
                      width={150}
                      height={150}
                    />
                  </div>
                  <div className='w-full px-4 py-5'>
                    <h4 className='md:text-xl text-color-title font-semibold h-12 sm:h-16 line-clamp-2 mb-1 max-w-[150px] sm:max-w-44 lg:max-w-64'>
                      {product.name}
                    </h4>
                    <div className='flex flex-col gap-1 relative'>
                      <div className='absolute -top-0 left-0 w-full h-full flex justify-end items-center'>
                        <SearchIcon className='text-color-primary hover:text-color-primary-light size-10 bg-color-bg-secondary-light group-hover:bg-color-bg-secondary-light transition-colors rounded-full p-2.5 stroke-[3]' />
                      </div>
                      <span className=' text-color-text'>
                        {product.ano} |{' '}
                        {(product.kilometraje ?? 0).toLocaleString('es-ES')} km
                      </span>
                      <span className=' text-color-text'>
                        {product.transmision} | {product.combustible}
                      </span>
                    </div>
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
                className='mt-5 border-2 border-transparent bg-color-primary hover:bg-color-primary-dark transition-colors px-4 md:px-6 py-3 text-color-title-light rounded'
                href='/catalogo'
              >
                Ver catálogo
              </Link>
            </div>
          )}
        </>
      </section>
    </>
  );
};

const CatalogoPageWithSuspense = () => (
  <Suspense fallback={<div>Cargando...</div>}>
    <CatalogoPage />
  </Suspense>
);

export default CatalogoPageWithSuspense;
