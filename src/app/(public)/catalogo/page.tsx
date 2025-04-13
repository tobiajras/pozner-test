'use client';

import SearchIcon from '@/components/icons/SearchIcon';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState, useRef } from 'react';
import { company } from '@/app/constants/constants';
import ArrowIcon from '@/components/icons/ArrowIcon';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const API_BASE_URL = 'https://api.fratelliautomotores.com.ar';

interface ApiCar {
  id: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  price: string;
  description: string;
  categoryId: string;
  mileage: number;
  transmission: string;
  fuel: string;
  doors: number;
  position: number;
  featured: boolean;
  favorite: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  Category: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  Images: {
    thumbnailUrl: string;
  }[];
}

interface ApiResponse {
  total: number;
  totalPages: number;
  currentPage: number;
  cars: ApiCar[];
}

interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

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

  const [cars, setCars] = useState<ApiCar[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [todasLasMarcas, setTodasLasMarcas] = useState<string[]>([]);
  const [categorias, setCategorias] = useState<Category[]>([]);

  // Estados para controlar los dropdowns
  const [showMarcaDropdown, setShowMarcaDropdown] = useState(false);
  const [showCategoriaDropdown, setShowCategoriaDropdown] = useState(false);

  // Referencias para detectar clics fuera de los dropdowns
  const marcaInputRef = useRef<HTMLDivElement>(null);
  const categoriaInputRef = useRef<HTMLDivElement>(null);

  // Cerrar los dropdowns cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        marcaInputRef.current &&
        !marcaInputRef.current.contains(event.target as Node)
      ) {
        setShowMarcaDropdown(false);
      }

      if (
        categoriaInputRef.current &&
        !categoriaInputRef.current.contains(event.target as Node)
      ) {
        setShowCategoriaDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Función para obtener todas las marcas disponibles
  const fetchMarcas = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cars/brands`);
      if (!response.ok) {
        throw new Error('Error al cargar las marcas');
      }
      const data: string[] = await response.json();
      setTodasLasMarcas(data.sort());
    } catch (error) {
      console.error('Error al cargar las marcas:', error);
    }
  };

  // Función para obtener las categorías del API
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/categories`);
      if (!response.ok) {
        throw new Error('Error al cargar las categorías');
      }
      const data: Category[] = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error('Error al cargar las categorías:', error);
    }
  };

  // Función para obtener los autos con filtros
  const fetchCars = async (
    page: number,
    filters?: { search?: string; marca?: string; categoria?: string }
  ) => {
    setLoading(true);
    try {
      let url = `${API_BASE_URL}/api/cars?page=${page}&limit=${ITEMS_PER_PAGE}&sort=position:desc`;

      if (filters?.search) {
        url += `&model=${encodeURIComponent(filters.search)}`;
      }
      if (filters?.marca) {
        url += `&brand=${encodeURIComponent(filters.marca)}`;
      }
      if (filters?.categoria) {
        url += `&category=${encodeURIComponent(filters.categoria)}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error al cargar los vehículos');
      }
      const data: ApiResponse = await response.json();
      setCars(data.cars);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error al cargar los vehículos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Efecto para cargar las marcas y categorías al montar el componente
  useEffect(() => {
    fetchMarcas();
    fetchCategories();
  }, []);

  // Efecto para cargar los autos cuando cambian los filtros
  useEffect(() => {
    fetchCars(currentPage, {
      search: searchFilter,
      marca: marcaFilter,
      categoria: categoriaFilter,
    });
  }, [currentPage, searchFilter, marcaFilter, categoriaFilter]);

  // Restaurar la página guardada al recargar
  useEffect(() => {
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

  // Mantener la posición del scroll solo en recargas
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem(
        'catalogScrollPosition',
        window.scrollY.toString()
      );
      sessionStorage.setItem('catalogCurrentPage', currentPage.toString());
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    const savedScrollPosition = sessionStorage.getItem('catalogScrollPosition');
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition));
      sessionStorage.removeItem('catalogScrollPosition');
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [currentPage]);

  // Función para actualizar filtros
  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Resetear a la página 1 cuando se cambian los filtros (excepto para la paginación)
    if (key !== 'page') {
      params.delete('page');
    }

    router.push(`/catalogo?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Función para cambiar de página
  const handlePageChange = (page: number) => {
    updateFilters('page', page.toString());
  };

  // Manejar la búsqueda
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const executeSearch = (value: string) => {
    updateFilters('search', value);
  };

  return (
    <>
      <section className='flex flex-col items-center w-full mb-16 md:mb-20'>
        <section className='w-full max-w-[1920px] h-[160px] sm:h-[200px] md:h-[240px] lg:h-[300px] relative'>
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
        <div className='flex justify-center w-full max-w-6xl'>
          <div className='max-w-[320px] sm:max-w-none md:max-w-[724px] lg:max-w-none w-full flex flex-col sm:flex-row gap-3 sm:gap-5 mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-0 mt-8'>
            {/* Buscador */}
            <div className='relative w-full'>
              <input
                type='text'
                placeholder='Buscar vehículo...'
                value={searchValue}
                onChange={handleSearch}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    executeSearch(searchValue);
                  }
                }}
                className='w-full px-4 py-2.5 rounded [box-shadow:0px_0px_10px_2px_rgba(0,0,0,0.1)] md:[box-shadow:0px_0px_10px_2px_rgba(0,0,0,0.2)] outline-none'
              />
              <button
                onClick={() => executeSearch(searchValue)}
                className='absolute right-3 top-1/2 -translate-y-1/2'
              >
                <SearchIcon className='size-5' />
              </button>
            </div>

            <div className='flex flex-row sm:flex-row gap-3 sm:gap-5'>
              {/* Filtro de Marca - Nuevo estilo dropdown */}
              <div className='relative w-full sm:w-[180px]' ref={marcaInputRef}>
                <div className='flex items-center relative'>
                  <input
                    type='text'
                    value={marcaFilter}
                    readOnly
                    placeholder='Marcas'
                    onClick={() => setShowMarcaDropdown(!showMarcaDropdown)}
                    className='w-full px-4 py-2.5 rounded cursor-pointer [box-shadow:0px_0px_10px_2px_rgba(0,0,0,0.1)] md:[box-shadow:0px_0px_10px_2px_rgba(0,0,0,0.2)] outline-none'
                  />
                  <button
                    type='button'
                    className='absolute right-3 top-1/2 -translate-y-1/2'
                    onClick={() => setShowMarcaDropdown(!showMarcaDropdown)}
                  >
                    <ChevronDown className='h-4 w-4 text-gray-500' />
                  </button>
                </div>

                {showMarcaDropdown && (
                  <div className='absolute z-20 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-sm max-h-60 overflow-y-auto [box-shadow:0px_5px_15px_rgba(0,0,0,0.15)]'>
                    <div
                      className='px-4 py-2 hover:bg-gray-100 cursor-pointer font-medium'
                      onClick={() => {
                        updateFilters('marca', '');
                        setShowMarcaDropdown(false);
                      }}
                    >
                      Todas las marcas
                    </div>
                    {todasLasMarcas.map((marca) => (
                      <div
                        key={marca}
                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                          marca === marcaFilter ? 'bg-gray-100' : ''
                        }`}
                        onClick={() => {
                          updateFilters('marca', marca);
                          setShowMarcaDropdown(false);
                        }}
                      >
                        {marca}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Filtro de Categoría - Nuevo estilo dropdown */}
              <div
                className='relative w-full sm:w-[180px]'
                ref={categoriaInputRef}
              >
                <div className='flex items-center relative'>
                  <input
                    type='text'
                    value={categoriaFilter}
                    readOnly
                    placeholder='Categorías'
                    onClick={() =>
                      setShowCategoriaDropdown(!showCategoriaDropdown)
                    }
                    className='w-full px-4 py-2.5 rounded cursor-pointer [box-shadow:0px_0px_10px_2px_rgba(0,0,0,0.1)] md:[box-shadow:0px_0px_10px_2px_rgba(0,0,0,0.2)] outline-none'
                  />
                  <button
                    type='button'
                    className='absolute right-3 top-1/2 -translate-y-1/2'
                    onClick={() =>
                      setShowCategoriaDropdown(!showCategoriaDropdown)
                    }
                  >
                    <ChevronDown className='h-4 w-4 text-gray-500' />
                  </button>
                </div>

                {showCategoriaDropdown && (
                  <div className='absolute z-20 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-sm max-h-60 overflow-y-auto [box-shadow:0px_5px_15px_rgba(0,0,0,0.15)]'>
                    <div
                      className='px-4 py-2 hover:bg-gray-100 cursor-pointer font-medium'
                      onClick={() => {
                        updateFilters('categoria', '');
                        setShowCategoriaDropdown(false);
                      }}
                    >
                      Todas las categorías
                    </div>
                    {categorias.map((categoria) => (
                      <div
                        key={categoria.id}
                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                          categoria.name === categoriaFilter
                            ? 'bg-gray-100'
                            : ''
                        }`}
                        onClick={() => {
                          updateFilters('categoria', categoria.name);
                          setShowCategoriaDropdown(false);
                        }}
                      >
                        {categoria.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <>
          {loading && cars.length === 0 ? (
            <div className='flex justify-center items-center min-h-[600px]'>
              <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-color-primary'></div>
            </div>
          ) : cars.length > 0 ? (
            <>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={`${currentPage}-${marcaFilter}-${categoriaFilter}-${searchFilter}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className='max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:w-full gap-y-10 lg:gap-y-20 gap-x-4 sm:gap-x-6 lg:gap-x-12 mt-10 min-h-[600px] place-content-start mx-4 sm:mx-6 md:mx-8 lg:mx-10'
                >
                  {cars.map((car) => (
                    <motion.div
                      key={car.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Link
                        href={`/catalogo/${car.id}`}
                        className='group w-full h-full max-w-[320px] md:max-w-[350px] lg:max-w-none overflow-hidden rounded-xl bg-white border-2 border-gray-300 hover:border-color-primary transition-all duration-300 relative block'
                      >
                        {/* Badge de marca */}
                        <div className='absolute top-3 left-3 z-10'>
                          <span className='bg-color-primary/90 text-color-title-light text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm'>
                            {car.brand}
                          </span>
                        </div>

                        {/* Imagen con overlay */}
                        <div className='relative overflow-hidden '>
                          <Image
                            className='object-cover w-full h-full overflow-hidden group-hover:scale-110 transition-transform duration-700 ease-in-out'
                            src={
                              car.Images[0]?.thumbnailUrl ||
                              '/assets/catalogo/placeholder.webp'
                            }
                            alt={`${car.model}`}
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
                            {`${car.model}`}
                          </h3>

                          {/* Línea separadora */}
                          <div className='w-12 md:w-16 h-0.5 bg-color-primary mb-3'></div>

                          {/* Precio */}
                          {car.price && parseFloat(car.price) > 0 ? (
                            <div className='mb-2'>
                              <span className='text-color-primary font-bold text-lg'>
                                ${' '}
                                {parseFloat(car.price).toLocaleString('es-AR')}
                              </span>
                            </div>
                          ) : (
                            ''
                          )}

                          {/* Especificaciones */}
                          <div className='flex flex-col gap-1.5'>
                            <div className='flex items-center gap-2'>
                              <span className='text-color-primary font-medium'>
                                {car.year}
                              </span>
                              <span className='text-xs text-color-text'>•</span>
                              <span className='text-color-text text-sm'>
                                {car.mileage.toLocaleString('es-ES')} km
                              </span>
                            </div>
                            <div className='flex items-center gap-2'>
                              <span className='text-color-text text-sm'>
                                {car.transmission}
                              </span>
                              <span className='text-xs text-color-text'>•</span>
                              <span className='text-color-text text-sm'>
                                {car.fuel}
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
                    <ArrowIcon
                      className={`w-4 h-4 rotate-180 ${
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
                    <ArrowIcon
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
                  setSearchValue('');
                  updateFilters('search', '');
                  updateFilters('marca', '');
                  updateFilters('categoria', '');
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
