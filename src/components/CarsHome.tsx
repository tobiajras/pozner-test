'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { API_BASE_URL, company, TENANT } from '@/app/constants/constants';
import CarStrokeIcon from './icons/CarStrokeIcon';

interface Imagen {
  thumbnailUrl: string;
}

interface Categoria {
  id: string;
  name: string;
}

interface Auto {
  id: string;
  brand: string;
  model: string;
  mlTitle: string;
  year: number;
  color: string;
  price: number;
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
  images: Imagen[];
  Category: Categoria;
}

interface CarsHomeProps {
  title: string;
}

const CarsHome = ({ title }: CarsHomeProps) => {
  const [emblaRef] = useEmblaCarousel({ dragFree: true });
  const [clicked, setClicked] = useState(false);
  const [vehiculos, setVehiculos] = useState<Auto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehiculos = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/cars?tenant=${TENANT}&limit=6`
        );
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setVehiculos(data.cars || []);
      } catch (err) {
        console.error('Error al obtener vehículos:', err);
        setError('No se pudieron cargar los vehículos');
      } finally {
        setLoading(false);
      }
    };

    fetchVehiculos();
  }, []);

  if (loading) {
    return (
      <section className='flex justify-center w-full'>
        <div className='max-w-7xl w-full mx-4 sm:mx-6 md:mx-8 lg:mx-10 overflow-hidden'>
          <div className='flex items-center mb-4 md:mb-6 lg:mb-8'>
            <div className='h-10 w-1 bg-color-primary mr-4'></div>
            <h3 className='text-2xl sm:text-3xl text-color-title-light tracking-wide font-semibold'>
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
      <section className='flex justify-center w-full'>
        <div className='max-w-7xl w-full mx-4 sm:mx-6 md:mx-8 lg:mx-10 overflow-hidden'>
          <div className='flex items-center mb-4 md:mb-6 lg:mb-8'>
            <div className='h-10 w-1 bg-color-primary mr-4'></div>
            <h3 className='text-2xl sm:text-3xl text-color-title-light tracking-wide font-semibold'>
              {title}
            </h3>
          </div>
          <div className='text-center py-8 text-red-500'>{error}</div>
        </div>
      </section>
    );
  }

  if (vehiculos.length === 0) {
    return (
      <section className='flex justify-center w-full'>
        <div className='max-w-7xl w-full mx-4 sm:mx-6 md:mx-8 lg:mx-10 overflow-hidden'>
          <div className='flex items-center mb-4 md:mb-6 lg:mb-8'>
            <div className='h-10 w-1 bg-color-primary mr-4'></div>
            <h3 className='text-2xl sm:text-3xl text-color-title-light tracking-wide font-semibold'>
              {title}
            </h3>
          </div>
          <div className='text-center py-8 text-color-text'>
            No hay vehículos disponibles
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='flex justify-center w-full'>
      <div className='max-w-7xl w-full mx-4 sm:mx-6 md:mx-8 lg:mx-10 overflow-hidden'>
        <div className='flex items-center mb-4 md:mb-6 lg:mb-8'>
          <div className='h-10 w-1 bg-color-primary mr-4'></div>
          <h3 className='text-2xl sm:text-3xl text-color-title-light tracking-wide font-semibold'>
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
            {/* Vehículos */}
            {vehiculos.map((auto) => (
              <Link
                href={`/catalogo/${auto.id}`}
                className='w-full relative overflow-hidden flex-[0_0_75%] min-[500px]:flex-[0_0_55%] sm:flex-[0_0_40%] lg:flex-[0_0_30%] xl:flex-[0_0_26%]'
                key={auto.id}
              >
                {/* Card container con borde que se ilumina */}
                <div className='relative overflow-hidden group-hover:border-color-primary transition-all duration-500 h-full shadow-[0_8px_30px_-15px_rgba(0,0,0,0.7)] group-hover:shadow-[0_8px_30px_-10px_rgba(233,0,2,0.2)]'>
                  {!auto.active && (
                    <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center z-20'>
                      <span className='bg-red-500 text-white text-sm font-medium px-3 py-1.5 rounded'>
                        Pausado
                      </span>
                    </div>
                  )}

                  {/* Contenedor de la imagen */}
                  <div className='relative overflow-hidden aspect-[4/3] rounded-lg group border border-neutral-600'>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className='w-full h-full '
                    >
                      <Image
                        priority
                        width={600}
                        height={600}
                        className='object-cover w-full h-full transition-transform duration-700'
                        style={{
                          objectPosition: `center ${company.objectCover}`,
                        }}
                        src={
                          auto.images[0]?.thumbnailUrl ||
                          '/assets/placeholder.webp'
                        }
                        alt={`${auto.model}`}
                      />
                    </motion.div>

                    {/* Overlay con "Ver más" al hacer hover */}
                    <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                    <div className='absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center'>
                      <div className='flex flex-col items-center gap-2 text-white'>
                        <div className='w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center border border-white/30 [backdrop-filter:blur(4px)]'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                            />
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                            />
                          </svg>
                        </div>
                        <span className='text-sm font-medium tracking-wide'>
                          Ver más
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Información del vehículo */}
                  <div className='relative group'>
                    {/* Gradiente base */}
                    <div className='absolute inset-0 bg-gradient-to-b from-transparent to-color-primary/20 rounded-lg'></div>
                    {/* Gradiente hover */}
                    <div className='absolute inset-0 bg-gradient-to-b from-transparent to-color-primary/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out'></div>
                    {/* Contenido */}
                    <div className='relative z-10 p-4'>
                      <h3
                        className={`${
                          company.dark
                            ? 'group-hover:text-color-primary'
                            : 'group-hover:text-color-primary'
                        } text-color-title-light text-lg md:text-xl font-semibold tracking-tight truncate md:mb-1 transition-colors duration-300`}
                      >
                        {auto.mlTitle}
                      </h3>

                      <div
                        className={`${
                          company.price ? '' : 'hidden'
                        } text-color-primary text-lg md:text-xl font-semibold tracking-tight truncate md:mb-1 transition-colors duration-300`}
                      >
                        {auto.currency === 'ARS' ? '$' : 'US$'}
                        {auto.price.toLocaleString('es-ES')}
                      </div>

                      {/* Diseño minimalista con separadores tipo | */}
                      <div className='flex flex-wrap items-center text-color-text-light font-medium'>
                        <span className=''>{auto.brand}</span>
                        <span
                          className={`${
                            company.dark
                              ? 'text-color-primary'
                              : 'text-color-primary'
                          } mx-2`}
                        >
                          |
                        </span>
                        <span>{auto.year}</span>
                      </div>

                      {/* Precio o etiqueta destacada */}
                      <div className='flex justify-between items-center text-color-text-light mt-0.5'>
                        {auto.mileage === 0 ? (
                          <span className='text-sm font-semibold uppercase tracking-wider text-color-primary'>
                            Nuevo <span className='text-color-primary'>•</span>{' '}
                            {auto.mileage.toLocaleString('es-ES')} km
                          </span>
                        ) : (
                          <span className='text-sm text-color-text-light font-medium uppercase tracking-wider'>
                            Usado <span className='text-color-primary'>•</span>{' '}
                            {auto.mileage.toLocaleString('es-ES')} km
                          </span>
                        )}
                      </div>

                      <div className='md:mt-1'>
                        <span
                          className={`${
                            company.dark
                              ? 'text-color-primary-light'
                              : 'text-color-primary-light'
                          } inline-flex items-center  transition-colors font-medium`}
                        >
                          Ver más
                          <span className='inline-block transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300 ml-1'>
                            →
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {/* Card "Ver todos" */}
            <div className='w-full relative overflow-hidden flex-[0_0_75%] min-[500px]:flex-[0_0_55%] sm:flex-[0_0_40%] lg:flex-[0_0_30%] xl:flex-[0_0_26%]'>
              <div className='relative overflow-hidden group-hover:border-color-primary transition-all duration-500 h-full shadow-[0_8px_30px_-15px_rgba(0,0,0,0.7)] group-hover:shadow-[0_8px_30px_-10px_rgba(233,0,2,0.2)]'>
                {/* Contenedor de la imagen de fondo */}
                <Link href='/catalogo'>
                  <div className='relative overflow-hidden aspect-[4/3] rounded-xl hover:bg-color-primary/5 border border-color-border group transition-colors'>
                    {/* Contenido centrado */}
                    <div className='absolute inset-0 flex flex-col items-center justify-center p-6 '>
                      <div className='text-center'>
                        {/* Icono de auto */}
                        <div className='w-20 h-20 rounded-full bg-color-primary/10 flex items-center justify-center mb-6 mx-auto'>
                          <CarStrokeIcon className='w-12 h-12 text-color-primary' />
                        </div>

                        {/* Título con flecha */}
                        <div className='md:mt-1'>
                          <span
                            className={`${
                              company.dark
                                ? 'text-color-primary group-hover:text-color-primary-dark'
                                : 'text-color-primary group-hover:text-color-primary-dark'
                            } inline-flex items-center text-lg transition-colors font-semibold`}
                          >
                            Ver catálogo
                            <span className='inline-block transform translate-x-0 text-xl group-hover:translate-x-1 transition-transform duration-300 ml-1.5 font-bold'>
                              →
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarsHome;
