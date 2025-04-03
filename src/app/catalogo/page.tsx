'use client';

import SearchIcon from '@/components/icons/SearchIcon';
import products from '@/data/catalogo.json';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { company } from '../constants/constants';
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';
import { motion, AnimatePresence } from 'framer-motion';

const ITEMS_PER_PAGE = 12;

const CatalogoPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get('search') || ''
  );
  const marcaFilter = searchParams.get('marca') || '';
  const categoriaFilter = searchParams.get('categoria') || '';
  const currentPage = Number(searchParams.get('page')) || 1;
  const searchFilter = searchParams.get('search') || '';

  // Restaurar la página guardada al recargar
  useEffect(() => {
    // Solo ejecutar si no hay un parámetro de página en la URL
    if (!searchParams.has('page')) {
      const savedPage = sessionStorage.getItem('catalogCurrentPage');
      if (savedPage) {
        const params = new URLSearchParams(window.location.search);
        params.set('page', savedPage);
        router.replace(`/catalogo?${params.toString()}`, { scroll: false });
        sessionStorage.removeItem('catalogCurrentPage');
      }
    }
  }, [router, searchParams]);

  // Obtener marcas y categorías únicas
  const marcas = Array.from(
    new Set(products.map((product) => product.marca))
  ).sort();
  const categorias = Array.from(
    new Set(products.map((product) => product.categoria))
  ).sort();

  // Normalizar el término de búsqueda
  const normalizedSearchTerm = searchFilter
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  const filteredProducts = products.filter((product) => {
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

  // Calcular páginas
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Mantener la posición del scroll solo en recargas
  useEffect(() => {
    // Guardar la posición del scroll antes de recargar
    const handleBeforeUnload = () => {
      sessionStorage.setItem(
        'catalogScrollPosition',
        window.scrollY.toString()
      );
      // También guardar la página actual
      sessionStorage.setItem('catalogCurrentPage', currentPage.toString());
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Recuperar la posición del scroll solo si viene de una recarga
    const savedScrollPosition = sessionStorage.getItem('catalogScrollPosition');
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition));
      sessionStorage.removeItem('catalogScrollPosition');
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [currentPage]);

  // Modificar handlePageChange para hacer scroll hacia arriba al cambiar de página
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', page.toString());
    router.push(`/catalogo?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Modificar updateFilters para mantener el comportamiento actual
  const updateFilters = (key: string, value: string) => {
    // Crear un nuevo objeto URLSearchParams
    const params = new URLSearchParams();

    // Mantener el término de búsqueda si existe
    const currentSearchParam = searchParams.get('search') || '';
    if (currentSearchParam) {
      params.set('search', currentSearchParam);
    }

    // Actualizar los filtros
    if (key === 'marca') {
      if (value) {
        params.set('marca', value);
      }
      // Mantener el filtro de categoría si existe
      if (categoriaFilter) {
        params.set('categoria', categoriaFilter);
      }
    } else if (key === 'categoria') {
      if (value) {
        params.set('categoria', value);
      }
      // Mantener el filtro de marca si existe
      if (marcaFilter) {
        params.set('marca', marcaFilter);
      }
    }

    // Nunca incluir el parámetro de página en un cambio de filtro
    // Siempre empezar desde la página 1

    router.push(`/catalogo?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Actualizar búsqueda - solo actualiza el estado local
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // Ejecutar búsqueda inmediatamente al presionar Enter
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeSearch(searchValue);
    }
  };

  // Función para ejecutar la búsqueda
  const executeSearch = (value: string) => {
    // Crear un nuevo objeto URLSearchParams sin los parámetros actuales
    const params = new URLSearchParams();

    // Mantener los filtros de marca y categoría si existen
    if (marcaFilter) {
      params.set('marca', marcaFilter);
    }

    if (categoriaFilter) {
      params.set('categoria', categoriaFilter);
    }

    // Añadir el término de búsqueda si existe
    if (value) {
      params.set('search', value);
    }

    // Nunca incluir el parámetro de página en una búsqueda nueva
    // Siempre empezar desde la página 1

    router.push(`/catalogo?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Mantener sincronizado el estado local con los query params
  useEffect(() => {
    // Verificar si estamos en la URL base del catálogo sin parámetros
    const hasNoParams = window.location.search === '';
    const isDirectCatalogNavigation =
      window.location.pathname === '/catalogo' && hasNoParams;

    if (isDirectCatalogNavigation) {
      // Si se navega directamente a /catalogo sin parámetros, limpiar todo
      setSearchValue('');
    } else {
      // Comportamiento normal: sincronizar con los parámetros de la URL
      const searchFromParams = searchParams.get('search') || '';
      setSearchValue(searchFromParams);
    }
  }, [searchParams]);

  return (
    <>
      <section className='flex flex-col items-center w-full'>
        <section className='w-full max-w-[1920px] h-[160px] sm:h-[200px] md:h-[240px] lg:h-[320px] relative'>
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
                <h3 className='text-2xl sm:text-4xl lg:text-5xl font-bold text-color-primary-light'>
                  ¡CATÁLOGO ONLINE!
                </h3>
                <p className='flex flex-col sm:text-lg md:text-2xl mt-1 text-color-text-light max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-none'>
                  Explorá nuestro stock disponible y encontrá tu vehículo ideal
                </p>
              </div>
            </div>
          </div>
          <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-color-bg-secondary-dark/70 to-color-bg-secondary-dark/70'></div>
        </section>

        {/* Filtros y Buscador */}
        <div className='w-full max-w-6xl'>
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-5 mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-0 mt-8'>
            {/* Buscador */}
            <div className='relative w-full'>
              <input
                type='text'
                placeholder='Buscar vehículo y presionar Enter...'
                value={searchValue}
                onChange={handleSearch}
                onKeyPress={handleKeyPress}
                className='w-full px-4 py-2.5 rounded [box-shadow:0px_0px_10px_2px_rgba(0,0,0,0.1)] md:[box-shadow:0px_0px_10px_2px_rgba(0,0,0,0.2)] outline-none'
              />
              <SearchIcon className='absolute right-3 top-1/2 -translate-y-1/2 size-5' />
            </div>

            <div className='flex flex-row sm:flex-row gap-3 sm:gap-5'>
              {/* Filtro de Marca */}
              <select
                value={marcaFilter}
                onChange={(e) => updateFilters('marca', e.target.value)}
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
                value={categoriaFilter}
                onChange={(e) => updateFilters('categoria', e.target.value)}
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
          {filteredProducts.length > 0 ? (
            <>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={`${currentPage}-${marcaFilter}-${categoriaFilter}-${searchFilter}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className='max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 lg:gap-y-20 gap-x-4 sm:gap-x-6 lg:gap-x-12 mt-10 min-h-[600px] place-content-start mx-4 sm:mx-6 md:mx-8 lg:mx-10'
                >
                  {paginatedProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Link
                        href={`/catalogo/${product.id}`}
                        className='group w-full h-full overflow-hidden rounded-xl bg-white border-2 border-gray-300 hover:border-color-primary transition-all duration-300 relative block'
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
                            className='object-cover w-full h-full overflow-hidden group-hover:scale-110 transition-transform duration-700 ease-in-out'
                            src={`/assets/catalogo/${product.marcaId?.toLowerCase()}/${
                              product.id
                            }/${product.images?.[0] || 'placeholder.webp'}`}
                            alt={product.name}
                            width={451}
                            height={600}
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
                                {(product.kilometraje ?? 0).toLocaleString(
                                  'es-ES'
                                )}{' '}
                                km
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
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Paginación */}
              {totalPages > 1 && (
                <div className='flex justify-center items-center gap-4 mt-8 mb-8'>
                  <button
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded ${
                      currentPage === 1
                        ? 'bg-color-primary/50 text-color-title-light cursor-not-allowed'
                        : 'bg-color-primary text-color-title-light hover:bg-color-primary-light hover:text-color-title'
                    } transition-colors`}
                  >
                    <ArrowLeftIcon
                      className={`w-4 h-4 ${
                        company.dark
                          ? 'text-color-title-light'
                          : 'text-color-title'
                      }`}
                    />
                  </button>
                  <span className='text-color-text'>
                    Página {currentPage} de {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded ${
                      currentPage === totalPages
                        ? 'bg-color-primary/50 text-color-title-light cursor-not-allowed'
                        : 'bg-color-primary text-color-title-light hover:bg-color-primary-light hover:text-color-title'
                    } transition-colors`}
                  >
                    <ArrowRightIcon
                      className={`w-4 h-4 ${
                        company.dark
                          ? 'text-color-title-light'
                          : 'text-color-title'
                      }`}
                    />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className='flex flex-col items-center min-h-[600px] my-8 md:my-16'>
              <div className='col-span-2 md:col-span-3 lg:col-span-4 text-center text-lg text-color-text'>
                {searchFilter ? (
                  <>
                    No se encontraron resultados para la búsqueda{' '}
                    <span className='text-color-title font-semibold'>
                      &quot;{searchFilter}&quot;
                    </span>
                    {(marcaFilter || categoriaFilter) &&
                      ' con los filtros seleccionados'}
                    .
                  </>
                ) : marcaFilter && categoriaFilter ? (
                  <>
                    No hay vehículos de la marca{' '}
                    <span className='text-color-title font-semibold'>
                      {marcaFilter}
                    </span>{' '}
                    en la categoría{' '}
                    <span className='text-color-title font-semibold'>
                      {categoriaFilter}
                    </span>
                    .
                  </>
                ) : marcaFilter ? (
                  <>
                    No hay vehículos disponibles de la marca{' '}
                    <span className='text-color-title font-semibold'>
                      {marcaFilter}
                    </span>
                    .
                  </>
                ) : categoriaFilter ? (
                  <>
                    No hay vehículos disponibles en la categoría{' '}
                    <span className='text-color-title font-semibold'>
                      {categoriaFilter}
                    </span>
                    .
                  </>
                ) : (
                  'No hay vehículos disponibles.'
                )}
              </div>
              <Link
                className='mt-5 border-2 border-transparent bg-color-primary hover:bg-color-primary-dark transition-colors px-4 md:px-6 py-3 text-color-title-light rounded'
                href='/catalogo'
                onClick={(e) => {
                  e.preventDefault();
                  // Limpiar el estado local
                  setSearchValue('');
                  // Navegar a la URL sin parámetros
                  router.push('/catalogo');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Ver catálogo completo
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
