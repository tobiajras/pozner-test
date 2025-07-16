'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import SearchIcon from './icons/SearchIcon';
import { motion } from 'framer-motion';
import { API_BASE_URL, company } from '@/app/constants/constants';

interface Imagen {
  id: string;
  carId: string;
  imageUrl: string;
  thumbnailUrl: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface Categoria {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface Auto {
  id: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  price: string;
  currency: 'USD' | 'ARS';
  description: string;
  position: number;
  featured: boolean;
  favorite: boolean;
  active: boolean;
  categoryId: string;
  mileage: number;
  transmission: string;
  fuel: string;
  doors: number;
  createdAt: string;
  updatedAt: string;
  Images: Imagen[];
  Category: Categoria;
}

interface CarrouselFeaturedProps {
  title: string;
}

const CarrouselFeatured = ({ title }: CarrouselFeaturedProps) => {
  const [emblaRef] = useEmblaCarousel({ dragFree: true });
  const [clicked, setClicked] = useState(false);
  const [favoritos, setFavoritos] = useState<Auto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const obtenerDestacados = async () => {
      setCargando(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/cars/featured`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setFavoritos(data);
      } catch (err) {
        console.error('Error al obtener destacados:', err);
        setError('No se pudieron cargar los vehículos destacados');
      } finally {
        setCargando(false);
      }
    };

    obtenerDestacados();
  }, []);

  if (cargando) {
    return (
      <section className='flex justify-center w-full bg-color-bg-primary'>
        <div className='max-w-6xl w-full px-2 mx-4 sm:mx-6 md:mx-8 lg:mx-10 overflow-hidden'>
          <div className='flex items-center mb-4 md:mb-6 lg:mb-8'>
            <div className='h-10 w-1 bg-color-primary mr-4'></div>
            <h3 className='font-light text-2xl sm:text-3xl text-color-title tracking-wide'>
              {title}
            </h3>
          </div>
          <div className='flex justify-center py-8'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-color-primary'></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className='flex justify-center w-full bg-color-bg-primary'>
        <div className='max-w-6xl w-full px-2 mx-4 sm:mx-6 md:mx-8 lg:mx-10 overflow-hidden'>
          <div className='flex items-center mb-4 md:mb-6 lg:mb-8'>
            <div className='h-10 w-1 bg-color-primary mr-4'></div>
            <h3 className='font-light text-2xl sm:text-3xl text-color-title tracking-wide'>
              {title}
            </h3>
          </div>
          <div className='text-center py-8 text-red-500'>{error}</div>
        </div>
      </section>
    );
  }

  if (favoritos.length === 0) {
    return (
      <section className='flex justify-center w-full bg-color-bg-primary'>
        <div className='max-w-6xl w-full px-2 mx-4 sm:mx-6 md:mx-8 lg:mx-10 overflow-hidden'>
          <div className='flex items-center mb-4 md:mb-6 lg:mb-8'>
            <div className='h-10 w-1 bg-color-primary mr-4'></div>
            <h3 className='font-light text-2xl sm:text-3xl text-color-title tracking-wide'>
              {title}
            </h3>
          </div>
          <div className='text-center py-8 text-color-text'>
            No hay vehículos destacados disponibles
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='flex justify-center w-full bg-color-bg-primary'>
      <div className='max-w-6xl w-full px-2 mx-4 sm:mx-6 md:mx-8 lg:mx-10 overflow-hidden'>
        <div className='flex items-center mb-4 md:mb-6 lg:mb-8'>
          <div className='h-10 w-1 bg-color-primary mr-4'></div>
          <h3 className='font-light text-2xl sm:text-3xl text-color-title tracking-wide'>
            {title}
          </h3>
        </div>

        <div
          onMouseUp={() => setClicked(false)}
          onMouseDown={() => setClicked(true)}
          ref={emblaRef}
          className={`${clicked ? 'cursor-grabbing' : 'cursor-grab'}`}
        >
          <div className='flex gap-6 sm:gap-7 md:gap-8'>
            {favoritos.map((auto) => (
              <Link
                href={`/catalogo/${auto.id}`}
                className='group w-full relative overflow-hidden flex-[0_0_75%] min-[500px]:flex-[0_0_55%] sm:flex-[0_0_40%] lg:flex-[0_0_30%]'
                key={auto.id}
              >
                <div className='relative bg-color-bg-secondary-dark overflow-hidden rounded-lg group-hover:border-color-primary transition-all duration-500 h-full shadow-[0_8px_30px_-15px_rgba(0,0,0,0.7)] group-hover:shadow-[0_8px_30px_-10px_rgba(233,0,2,0.2)]'>
                  {!auto.active && (
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
                          auto.Images.sort((a, b) => a.order - b.order)[0]
                            ?.thumbnailUrl || '/assets/placeholder.webp'
                        }
                        alt={`${auto.model}`}
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
                      {auto.model}
                    </h3>

                    {/* Precio */}
                    {auto.price && parseFloat(auto.price) > 0 && (
                      <p className='text-xl font-semibold text-color-primary-light mb-2 lg:mb-3'>
                        {auto.currency === 'ARS' ? '$' : 'US$'}
                        {parseFloat(auto.price).toLocaleString(
                          auto.currency === 'ARS' ? 'es-AR' : 'en-US'
                        )}
                      </p>
                    )}

                    <div className='flex flex-wrap items-center text-sm text-white/80'>
                      <span className='font-medium'>{auto.brand}</span>
                      <span
                        className={`${
                          company.dark
                            ? 'text-color-primary-light'
                            : 'text-color-primary'
                        } mx-2`}
                      >
                        |
                      </span>
                      <span>{auto.year}</span>
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
                        {auto.Category.name.charAt(0).toUpperCase() +
                          auto.Category.name.slice(1)}
                      </span>
                    </div>

                    <div className='w-full h-[1px] bg-neutral-800 group-hover:bg-neutral-700 my-5 transition-colors duration-300'></div>

                    <div className='flex justify-between items-center'>
                      {auto.mileage === 0 ? (
                        <span className='text-sm bg-color-primary hover:bg-color-primary-dark transition-colors border border-white/15 text-neutral-100 rounded-sm py-1 px-3 uppercase tracking-wider'>
                          Nuevo
                        </span>
                      ) : (
                        <span className='text-xs text-white/60 uppercase tracking-wider'>
                          Usado • {auto.mileage.toLocaleString('es-ES')} km
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarrouselFeatured;
