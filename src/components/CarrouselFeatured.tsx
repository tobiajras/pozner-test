'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import SearchIcon from './icons/SearchIcon';
import { company } from '@/app/constants/constants';

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
        const response = await fetch(
          'https://api.fratelliautomotores.com.ar/api/cars/featured'
        );
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

  console.log(favoritos);

  if (cargando) {
    return (
      <section className='flex justify-center w-full'>
        <div className='max-w-6xl w-full px-2 mx-4 sm:mx-6 md:mx-8 lg:mx-10 overflow-hidden pb-6 md:pb-10'>
          <h3 className='mb-3 font-medium text-xl sm:text-2xl sm:mb-5'>
            {title}
          </h3>
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
        <div className='max-w-6xl w-full px-2 mx-4 sm:mx-6 md:mx-8 lg:mx-10 overflow-hidden pb-6 md:pb-10'>
          <h3 className='mb-3 font-medium text-xl sm:text-2xl sm:mb-5'>
            {title}
          </h3>
          <div className='text-center py-8 text-red-500'>{error}</div>
        </div>
      </section>
    );
  }

  if (favoritos.length === 0) {
    return (
      <section className='flex justify-center w-full'>
        <div className='max-w-6xl w-full px-2 mx-4 sm:mx-6 md:mx-8 lg:mx-10 overflow-hidden pb-6 md:pb-10'>
          <h3 className='mb-3 font-medium text-xl sm:text-2xl sm:mb-5'>
            {title}
          </h3>
          <div className='text-center py-8'>
            No hay vehículos destacados disponibles
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='flex justify-center w-full'>
      <div className='max-w-6xl w-full px-2 mx-4 sm:mx-6 md:mx-8 lg:mx-10 overflow-hidden pb-6 md:pb-10'>
        <h3 className='mb-3 font-medium text-xl sm:text-2xl sm:mb-5'>
          {title}
        </h3>
        <div
          onMouseUp={() => setClicked(false)}
          onMouseDown={() => setClicked(true)}
          ref={emblaRef}
          className={` ${clicked ? 'cursor-grabbing' : 'cursor-grab'}`}
        >
          <div className='flex gap-3 sm:gap-5'>
            {favoritos.map((auto) => (
              <Link
                href={`/catalogo/${auto.id}`}
                className='group w-full h-full overflow-hidden flex-[0_0_70%] min-[500px]:flex-[0_0_55%] sm:flex-[0_0_40%] lg:flex-[0_0_28%] rounded-xl bg-white border-2 border-gray-300 hover:border-color-primary transition-all duration-300 relative block'
                key={auto.id}
              >
                {/* Badge de marca */}
                <div className='absolute top-3 left-3 z-10'>
                  <span className='bg-color-primary/90 text-color-title-light text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm'>
                    {auto.brand}
                  </span>
                </div>

                {/* Badge de estado (si no está activo) */}
                {!auto.active && (
                  <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center z-20'>
                    <span className='bg-red-500 text-white text-sm font-medium px-3 py-1.5 rounded'>
                      Pausado
                    </span>
                  </div>
                )}

                {/* Imagen con overlay */}
                <div className='relative overflow-hidden h-44 sm:h-48 md:h-52 xl:h-56'>
                  <Image
                    priority
                    width={451}
                    height={600}
                    className='object-cover w-full h-full overflow-hidden group-hover:scale-110 transition-transform duration-700 ease-in-out'
                    src={
                      auto.Images.sort((a, b) => a.order - b.order)[0]
                        ?.thumbnailUrl || '/assets/placeholder.webp'
                    }
                    alt={`${auto.brand} ${auto.model}`}
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
                    {auto.brand} {auto.model}
                  </h3>

                  {/* Línea separadora */}
                  <div className='w-12 md:w-16 h-0.5 bg-color-primary mb-3'></div>

                  {/* Precio */}
                  <div className='mb-2'>
                    <span className='text-color-primary font-bold text-lg'>
                      $ {parseInt(auto.price).toLocaleString('es-AR')}
                    </span>
                  </div>

                  {/* Especificaciones */}
                  <div className='flex flex-col gap-1.5'>
                    <div className='flex items-center gap-2'>
                      <span className='text-color-primary font-medium'>
                        {auto.year}
                      </span>
                      <span className='text-xs text-color-text'>•</span>
                      <span className='text-color-text text-sm'>
                        {auto.mileage.toLocaleString('es-ES')} km
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='text-color-text text-sm'>
                        {auto.transmission}
                      </span>
                      <span className='text-xs text-color-text'>•</span>
                      <span className='text-color-text text-sm'>
                        {auto.fuel}
                      </span>
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
