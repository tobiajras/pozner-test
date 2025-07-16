'use client';

import SearchIcon from '@/components/icons/SearchIcon';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { company } from '@/app/constants/constants';
import ArrowIcon from '@/components/icons/ArrowIcon';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import CloseIcon from '@/components/icons/CloseIcon';
import { API_BASE_URL, TENANT } from '@/app/constants/constants';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

interface ApiCar {
  id: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  price: string;
  currency: 'USD' | 'ARS';
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
  images: {
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

  // Función para obtener todas las marcas disponibles
  const fetchMarcas = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/cars/brands?tenant=${TENANT}`
      );
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
      const response = await fetch(
        `${API_BASE_URL}/api/categories?tenant=${TENANT}`
      );
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
      let url = `${API_BASE_URL}/api/cars?page=${page}&limit=${ITEMS_PER_PAGE}&sort=position:desc&tenant=${TENANT}`;

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(searchValue);
  };

  const filteredProducts = cars.filter((car) => {
    const normalizedProductName = car.model
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    const matchesSearch = normalizedProductName
      .toLowerCase()
      .includes(searchFilter.toLowerCase());

    const matchesMarca = !marcaFilter || car.brand === marcaFilter;
    const matchesCategoria =
      !categoriaFilter || car.Category.name === categoriaFilter;

    return matchesSearch && matchesMarca && matchesCategoria;
  });

  return (
    <div className='relative'>
      <section className='flex flex-col items-center w-full mb-16 md:mb-20'>
        {/* Sección de filtros modernizada */}
        <div className='w-full flex justify-center mt-8 md:mt-10'>
          <div className='max-w-md sm:max-w-2xl lg:max-w-6xl w-full mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-0'>
            {/* Contenedor principal con fondo oscuro y sombra */}
            <div className='bg-color-secondary rounded-lg shadow-[0_8px_30px_-15px_rgba(0,0,0,0.7)] p-5'>
              {/* Título de la sección de filtros */}
              <div className='mb-5 flex items-center justify-between'>
                <div className='flex items-center'>
                  <div
                    className={`${
                      company.dark
                        ? 'bg-color-primary-light'
                        : 'bg-color-primary'
                    } w-1 h-5 rounded mr-3`}
                  ></div>
                  <h4 className='text-white font-medium'>Filtrar vehículos</h4>
                </div>
              </div>

              {/* Vista móvil - Buscador y filtros en acordeón */}
              <div className='sm:hidden space-y-4'>
                {/* Buscador móvil */}
                <form onSubmit={handleSubmit} className='relative'>
                  <input
                    type='text'
                    placeholder='Buscar vehículo...'
                    value={searchValue}
                    onChange={handleSearch}
                    className='w-full pl-10 pr-4 py-3 border border-neutral-700 rounded-md bg-black outline-none text-white placeholder-white/40 focus:border-color-primary focus:ring-1 focus:ring-color-primary/40 transition-all'
                  />
                  <div className='absolute left-0 top-0 h-full px-3 flex items-center text-white/50'>
                    <SearchIcon className='w-5 h-5' />
                  </div>
                  <button
                    type='submit'
                    className={`${
                      company.dark
                        ? 'hover:text-color-primary-light'
                        : 'hover:text-color-primary'
                    } absolute right-0 top-0 h-full px-4 text-white/50 transition-colors`}
                  >
                    Buscar
                  </button>
                </form>

                {/* Filtros en línea para móvil */}
                <div className='flex gap-2'>
                  <Select
                    value={marcaFilter || 'all'}
                    onValueChange={(value) => {
                      updateFilters('marca', value === 'all' ? '' : value);
                    }}
                  >
                    <SelectTrigger className='h-10 flex-1 px-3 py-2 border border-neutral-700 rounded-md bg-black text-white text-sm outline-none focus:border-color-primary focus:ring-1 focus:ring-color-primary/40 transition-all appearance-none'>
                      <SelectValue placeholder='Marca' />
                    </SelectTrigger>
                    <SelectContent className='bg-black border border-neutral-700 text-white rounded-lg shadow-lg max-h-60 overflow-y-auto'>
                      <SelectItem
                        value='all'
                        className='text-neutral-400 hover:text-white hover:bg-black'
                      >
                        Todas las marcas
                      </SelectItem>
                      {todasLasMarcas.map((marca) => (
                        <SelectItem
                          key={marca}
                          value={marca}
                          className='hover:text-color-primary hover:bg-black'
                        >
                          {marca}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={categoriaFilter || 'all'}
                    onValueChange={(value) => {
                      updateFilters('categoria', value === 'all' ? '' : value);
                    }}
                  >
                    <SelectTrigger className='h-10 flex-1 px-3 py-2 border border-neutral-700 rounded-md bg-black text-white text-sm outline-none focus:border-color-primary focus:ring-1 focus:ring-color-primary/40 transition-all appearance-none'>
                      <SelectValue placeholder='Categoría' />
                    </SelectTrigger>
                    <SelectContent className='bg-black border border-neutral-700 text-white rounded-lg shadow-lg max-h-60 overflow-y-auto'>
                      <SelectItem
                        value='all'
                        className='text-neutral-400 hover:text-white hover:bg-black'
                      >
                        Todas las categorías
                      </SelectItem>
                      {categorias.map((categoria) => (
                        <SelectItem
                          key={categoria.id}
                          value={categoria.name}
                          className='hover:text-color-primary hover:bg-black'
                        >
                          {categoria.name.charAt(0).toUpperCase() +
                            categoria.name.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Vista desktop - Filtros completos */}
              <div className='hidden sm:flex sm:flex-row gap-4 sm:gap-6'>
                {/* Buscador mejorado */}
                <div className='relative flex-grow'>
                  <label className='block text-xs text-white/70 uppercase tracking-wider mb-1.5'>
                    Buscar por nombre
                  </label>
                  <form onSubmit={handleSubmit} className='relative'>
                    <input
                      type='text'
                      placeholder='Ej: Mercedes Benz, Ford...'
                      value={searchValue}
                      onChange={handleSearch}
                      className='w-full px-4 py-3 border border-neutral-700 rounded-md bg-black outline-none text-white placeholder-white/40 focus:border-color-primary focus:ring-1 focus:ring-color-primary/40 transition-all'
                    />
                    <button
                      type='submit'
                      className={`${
                        company.dark
                          ? 'hover:text-color-primary-light'
                          : 'hover:text-color-primary'
                      } absolute right-0 top-0 h-full px-4 text-white/50 transition-colors`}
                    >
                      <SearchIcon className='w-5 h-5' />
                    </button>
                  </form>
                </div>

                {/* Filtros en columna en móvil, fila en escritorio */}
                <div className='flex flex-col sm:flex-row gap-4 sm:gap-6'>
                  {/* Filtro de Marca */}
                  <div>
                    <label className='block text-xs text-white/70 uppercase tracking-wider mb-1.5'>
                      Marca
                    </label>
                    <div className='relative'>
                      <Select
                        value={marcaFilter || 'all'}
                        onValueChange={(value) => {
                          updateFilters('marca', value === 'all' ? '' : value);
                        }}
                      >
                        <SelectTrigger className='h-full w-full sm:w-44 px-4 py-3 pr-10 border border-neutral-700 rounded-md bg-black text-white outline-none focus:border-color-primary focus:ring-1 focus:ring-color-primary/40 transition-all appearance-none'>
                          <SelectValue placeholder='Todas las marcas' />
                        </SelectTrigger>
                        <SelectContent className='bg-black border border-neutral-700 text-white rounded-lg shadow-lg'>
                          <SelectItem
                            value='all'
                            className='text-neutral-400 hover:text-white hover:bg-black'
                          >
                            Todas las marcas
                          </SelectItem>
                          {todasLasMarcas.map((marca) => (
                            <SelectItem
                              key={marca}
                              value={marca}
                              className={`${
                                company.dark
                                  ? 'hover:text-color-primary-light'
                                  : 'hover:text-color-primary'
                              } hover:bg-black`}
                            >
                              {marca}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Filtro de Categoría */}
                  <div>
                    <label className='block text-xs text-white/70 uppercase tracking-wider mb-1.5'>
                      Categoría
                    </label>
                    <div className='relative'>
                      <Select
                        value={categoriaFilter || 'all'}
                        onValueChange={(value) => {
                          updateFilters(
                            'categoria',
                            value === 'all' ? '' : value
                          );
                        }}
                      >
                        <SelectTrigger className='h-full w-full sm:w-44 px-4 py-3 pr-10 border border-neutral-700 rounded-md bg-black text-white outline-none focus:border-color-primary focus:ring-1 focus:ring-color-primary/40 transition-all appearance-none'>
                          <SelectValue placeholder='Todas las categorías' />
                        </SelectTrigger>
                        <SelectContent className='bg-black border border-neutral-700 text-white rounded-lg shadow-lg'>
                          <SelectItem
                            value='all'
                            className='text-neutral-400 hover:text-white hover:bg-black'
                          >
                            Todas las categorías
                          </SelectItem>
                          {categorias.map((categoria) => (
                            <SelectItem
                              key={categoria.id}
                              value={categoria.name}
                              className={`${
                                company.dark
                                  ? 'hover:text-color-primary-light'
                                  : 'hover:text-color-primary'
                              } hover:bg-black`}
                            >
                              {categoria.name.charAt(0).toUpperCase() +
                                categoria.name.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filtros activos */}
              {(searchFilter || marcaFilter || categoriaFilter) && (
                <div className='mt-4 flex flex-wrap gap-2'>
                  {searchFilter && (
                    <div className='flex items-center gap-2 px-3 py-2 rounded-full bg-black/90 border border-neutral-700 text-white'>
                      <span>Búsqueda: {searchFilter}</span>
                      <button
                        onClick={() => updateFilters('search', '')}
                        className='text-neutral-400 hover:text-white transition-colors'
                      >
                        <CloseIcon className='w-4 h-4 stroke-[2]' />
                      </button>
                    </div>
                  )}
                  {marcaFilter && (
                    <div className='flex items-center gap-2 px-3 py-2 rounded-full bg-black/90 border border-neutral-700 text-white'>
                      <span>Marca: {marcaFilter}</span>
                      <button
                        onClick={() => updateFilters('marca', '')}
                        className='text-neutral-400 hover:text-white transition-colors'
                      >
                        <CloseIcon className='w-4 h-4 stroke-[2]' />
                      </button>
                    </div>
                  )}
                  {categoriaFilter && (
                    <div className='flex items-center gap-2 px-3 py-2 rounded-full bg-black/90 border border-neutral-700 text-white'>
                      <span>Categoría: {categoriaFilter}</span>
                      <button
                        onClick={() => updateFilters('categoria', '')}
                        className='text-neutral-400 hover:text-white transition-colors'
                      >
                        <CloseIcon className='w-4 h-4 stroke-[2]' />
                      </button>
                    </div>
                  )}
                  {(searchFilter || marcaFilter || categoriaFilter) && (
                    <button
                      onClick={() => {
                        setSearchValue('');
                        router.push('/catalogo');
                      }}
                      className='flex items-center gap-2 px-3 py-2 rounded-full bg-color-primary hover:bg-color-primary-dark text-white transition-colors'
                    >
                      <span>Limpiar filtros</span>
                      <CloseIcon className='w-4 h-4 stroke-[2]' />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <>
          {loading && filteredProducts.length === 0 ? (
            <div className='flex justify-center items-center min-h-[600px]'>
              <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-color-primary'></div>
            </div>
          ) : filteredProducts.length > 0 ? (
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
                  {filteredProducts.map((car) => (
                    <motion.div
                      key={car.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Link
                        href={`/catalogo/${car.id}`}
                        className='group w-full relative overflow-hidden flex-[0_0_75%] min-[500px]:flex-[0_0_55%] sm:flex-[0_0_40%] lg:flex-[0_0_30%]'
                      >
                        <div className='relative bg-color-bg-secondary-dark overflow-hidden rounded-lg group-hover:border-color-primary transition-all duration-500 h-full shadow-[0_8px_30px_-15px_rgba(0,0,0,0.7)] group-hover:shadow-[0_8px_30px_-10px_rgba(233,0,2,0.2)]'>
                          {!car.active && (
                            <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center z-20'>
                              <span className='bg-red-500 text-white text-sm font-medium px-3 py-1.5 rounded'>
                                Pausado
                              </span>
                            </div>
                          )}

                          <div className='relative overflow-hidden aspect-[4/3]'>
                            <div className='absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-color-bg-secondary-dark to-transparent z-10'></div>
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5, ease: 'easeOut' }}
                              className='w-full h-full'
                            >
                              <Image
                                priority
                                width={600}
                                height={600}
                                className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out'
                                src={
                                  car.images[0]?.thumbnailUrl ||
                                  '/assets/placeholder.webp'
                                }
                                alt={`${car.model}`}
                              />
                            </motion.div>
                            <div className='absolute top-0 left-0 w-0 h-1 bg-color-primary group-hover:w-full transition-all duration-500 z-20'></div>
                          </div>

                          <div className='px-5 py-5'>
                            <h3
                              className={`${
                                company.dark
                                  ? 'group-hover:text-color-primary-light'
                                  : 'group-hover:text-color-primary'
                              } text-white text-lg md:text-xl font-medium tracking-tight truncate mb-5 transition-colors duration-300`}
                            >
                              {car.model}
                            </h3>

                            {/* Precio */}
                            {car.price && parseFloat(car.price) > 0 ? (
                              <p className='text-xl font-semibold text-color-primary-light mb-2 lg:mb-3'>
                                {car.currency === 'ARS' ? '$' : 'US$'}
                                {parseFloat(car.price).toLocaleString(
                                  car.currency === 'ARS' ? 'es-AR' : 'en-US'
                                )}
                              </p>
                            ) : (
                              ''
                            )}

                            <div className='flex flex-wrap items-center text-sm text-white/80'>
                              <span className='font-medium'>{car.brand}</span>
                              <span
                                className={`${
                                  company.dark
                                    ? 'text-color-primary-light'
                                    : 'text-color-primary'
                                } mx-2`}
                              >
                                |
                              </span>
                              <span>{car.year}</span>
                              <span
                                className={`${
                                  company.dark
                                    ? 'text-color-primary-light'
                                    : 'text-color-primary'
                                } mx-2`}
                              >
                                |
                              </span>
                              <span>
                                {car.Category.name.charAt(0).toUpperCase() +
                                  car.Category.name.slice(1)}
                              </span>
                            </div>

                            <div className='w-full h-[1px] bg-neutral-800 group-hover:bg-neutral-700 my-5 transition-colors duration-300'></div>

                            <div className='flex justify-between items-center'>
                              {car.mileage === 0 ? (
                                <span className='text-sm bg-color-primary hover:bg-color-primary-dark transition-colors border border-white/15 text-neutral-100 rounded-sm py-1 px-3 uppercase tracking-wider'>
                                  Nuevo
                                </span>
                              ) : (
                                <span className='text-xs text-white/60 uppercase tracking-wider'>
                                  Usado • {car.mileage.toLocaleString('es-ES')}{' '}
                                  km
                                </span>
                              )}

                              <div className='flex items-center'>
                                <span className='text-white/60 text-xs uppercase mr-2 tracking-wider'>
                                  Ver
                                </span>
                                <div
                                  className={`${
                                    company.dark
                                      ? 'group-hover:border-color-primary-light'
                                      : 'group-hover:border-color-primary'
                                  } w-10 h-10 rounded-full flex items-center justify-center border border-neutral-400 transition-all duration-300`}
                                >
                                  <SearchIcon
                                    className={`${
                                      company.dark
                                        ? 'group-hover:text-color-primary-light'
                                        : 'group-hover:text-color-primary'
                                    } w-full h-full p-2 text-neutral-400 transition-colors stroke-[1.5] duration-300`}
                                  />
                                </div>
                              </div>
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
                        : 'bg-color-primary text-color-title-light hover:bg-color-primary-dark hover:text-color-title'
                    } transition-colors`}
                  >
                    <ArrowIcon
                      className={`w-4 h-4 rotate-180 ${
                        company.dark
                          ? 'text-color-title-light'
                          : 'text-color-title-light'
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
                        : 'bg-color-primary text-color-title-light hover:bg-color-primary-dark hover:text-color-title'
                    } transition-colors`}
                  >
                    <ArrowIcon
                      className={`w-4 h-4 ${
                        company.dark
                          ? 'text-color-title-light'
                          : 'text-color-title-light'
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
    </div>
  );
};

const CatalogoPageWithSuspense = () => {
  return (
    <div className='relative min-h-screen w-full'>
      {/* Contenido principal */}
      <Header />
      <Suspense fallback={<div>Cargando...</div>}>
        <CatalogoPage />
      </Suspense>
      <Footer />
    </div>
  );
};

export default CatalogoPageWithSuspense;
