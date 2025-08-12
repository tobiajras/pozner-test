'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ArrowIcon from '@/components/icons/ArrowIcon';
import WhatsappIcon from '@/components/icons/WhatsappIcon';
import { API_BASE_URL, company, TENANT } from '@/app/constants/constants';
import ImageGalleryModal from '@/components/ImageGalleryModal';
import useEmblaCarousel from 'embla-carousel-react';
import DropDownIcon from '@/components/icons/DropDownIcon';
import CarrouselRelated from '@/components/CarrouselRelated';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ShareMenu from '@/components/ShareMenu';

interface Imagen {
  thumbnailUrl: string;
  imageUrl: string;
}

interface Categoria {
  id: string;
  name: string;
}

interface ApiCar {
  id: string;
  brand: string;
  model: string;
  mlTitle: string;
  year: number;
  color: string;
  price: {
    valor: number;
    moneda: string;
  };
  description: string;
  categoryId: string;
  mileage: number;
  motor: string;
  transmission: string;
  fuel: string;
  doors: number;
  position: number;
  featured: boolean;
  favorite: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  Category: Categoria;
  Images: Imagen[];
}

export default function AutoDetailPage() {
  const { id } = useParams();
  const [car, setCar] = useState<ApiCar | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mainViewportRef, embla] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalStartIndex, setModalStartIndex] = useState(0);
  const [orderedImages, setOrderedImages] = useState<Imagen[]>([]);

  const scrollPrev = useCallback(() => {
    if (embla) {
      embla.scrollPrev();
    }
  }, [embla]);

  const scrollNext = useCallback(() => {
    if (embla) {
      embla.scrollNext();
    }
  }, [embla]);

  // Manejar las teclas de flecha
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showModal) return; // No manejar las teclas si el modal está abierto

      if (e.key === 'ArrowLeft') {
        scrollPrev();
      } else if (e.key === 'ArrowRight') {
        scrollNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrollPrev, scrollNext, showModal]);

  useEffect(() => {
    if (embla) {
      embla.on('select', () => {
        setSelectedIndex(embla.selectedScrollSnap());
      });
    }
  }, [embla]);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/cars/${id}?tenant=${TENANT}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Vehículo no encontrado');
          }
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const carData = await response.json();

        // Transformar los datos al formato esperado por el diseño original
        const auto = {
          id: carData.id,
          brand: carData.brand,
          model: carData.mlTitle,
          mlTitle: carData.mlTitle,
          year: carData.year,
          color: carData.color,
          price: {
            valor: carData.price,
            moneda: carData.currency,
          },
          description: carData.description,
          categoryId: carData.categoryId,
          mileage: carData.mileage,
          motor: carData.mlEngine || 'No especificado',
          transmission: carData.transmission,
          fuel: carData.fuel,
          doors: carData.doors,
          position: carData.position,
          featured: carData.featured,
          favorite: carData.favorite,
          active: carData.active,
          createdAt: carData.createdAt,
          updatedAt: carData.updatedAt,
          Category: {
            id: carData.Category.id,
            name:
              carData.Category.name.charAt(0).toUpperCase() +
              carData.Category.name.slice(1).toLowerCase(),
            createdAt: carData.createdAt,
            updatedAt: carData.updatedAt,
          },
          Images: carData.images.map((img: Imagen, index: number) => ({
            thumbnailUrl: img.thumbnailUrl,
            imageUrl: img.imageUrl,
            order: index,
          })),
        };

        // Ordenar las imágenes por el campo order
        const sortedImages = [...auto.Images].sort((a, b) => a.order - b.order);
        setOrderedImages(sortedImages);
        setCar({ ...auto, Images: sortedImages });
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'Error al cargar el vehículo'
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCar();
    }
  }, [id]);

  const renderContent = () => {
    if (loading) {
      return (
        <section className='flex flex-col items-center mx-auto pt-8 md:pt-10 pb-16 md:pb-20'>
          {/* Botón volver */}
          <div className='w-full flex justify-center'>
            <div className='w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-7xl mb-6 mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
              <div className='flex gap-2 font-medium items-center'>
                <div className='h-5 w-20 bg-neutral-800/50 rounded animate-pulse'></div>
                <div className='h-5 w-5 bg-neutral-800/50 rounded animate-pulse'></div>
                <div className='h-5 w-24 bg-neutral-800/50 rounded animate-pulse'></div>
              </div>
            </div>
          </div>

          <div className='flex flex-col lg:flex-row gap-1 md:gap-6 lg:gap-8 w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-0'>
            {/* Galería de imágenes - Skeleton */}
            <div className='space-y-6 w-full lg:w-2/3'>
              <div className=''>
                {/* Imagen principal skeleton */}
                <div className='aspect-[4/3] bg-neutral-800/40 rounded-xl animate-pulse mb-6'></div>

                {/* Miniaturas skeleton */}
                <div className='hidden md:grid grid-cols-3 gap-3'>
                  <div className='aspect-[4/3] bg-neutral-800/40 rounded-lg animate-pulse'></div>
                  <div className='aspect-[4/3] bg-neutral-800/40 rounded-lg animate-pulse'></div>
                  <div className='aspect-[4/3] bg-neutral-800/40 rounded-lg animate-pulse'></div>
                </div>
              </div>
            </div>

            {/* Detalles del auto - Skeleton */}
            <div className='w-full lg:w-1/3'>
              <div className='bg-color-bg-secondary border border-neutral-500 rounded-lg shadow-lg p-6'>
                <div className='h-6 w-32 bg-neutral-800/30 rounded animate-pulse mb-4'></div>
                <div className='h-8 w-48 bg-neutral-800/30 rounded animate-pulse mb-6'></div>
                <div className='grid grid-cols-2 gap-4 mb-6'>
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className='space-y-2'>
                      <div className='h-4 w-20 bg-neutral-800/30 rounded animate-pulse'></div>
                      <div className='h-6 w-24 bg-neutral-800/30 rounded animate-pulse'></div>
                    </div>
                  ))}
                </div>
                <div className='h-12 w-full bg-neutral-800/30 rounded animate-pulse'></div>
              </div>
            </div>
          </div>
        </section>
      );
    }

    if (error || !car) {
      return (
        <section className='flex flex-col items-center mx-auto pt-8 md:pt-10 pb-16 md:pb-20'>
          <div className='flex flex-col items-center justify-center min-h-[60vh]'>
            <div className='bg-gradient-to-b from-black to-neutral-900 border border-neutral-800 rounded-lg shadow-[0_8px_30px_-15px_rgba(0,0,0,0.7)] p-8 text-center'>
              <p className='text-red-500 mb-4'>
                {error || 'Vehículo no encontrado'}
              </p>
              <Link
                href='/catalogo'
                className='text-color-primary hover:text-color-primary-dark'
              >
                Volver al catálogo
              </Link>
            </div>
          </div>
        </section>
      );
    }

    return (
      <section className='flex flex-col items-center mx-auto pt-8 md:pt-10 pb-16 md:pb-20'>
        {/* Navegación */}
        <div className='w-full flex justify-center'>
          <div className='w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-7xl mb-4 sm:mb-5 mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
            <div className='flex gap-2 font-medium items-center'>
              <Link href={`/catalogo`}>
                <p className='text-color-text-light hover:text-color-primary transition-colors'>
                  Catálogo
                </p>
              </Link>
              <DropDownIcon className='w-2.5 h-2.5 -rotate-90 text-color-text-light' />
              <Link
                href={`/catalogo?categoria=${car.Category.name.toLowerCase()}`}
              >
                <p className='text-color-text-light hover:text-color-primary transition-colors'>
                  {car.Category.name}
                </p>
              </Link>
            </div>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row gap-1 md:gap-6 lg:gap-8 w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-0'>
          {/* Columna izquierda - Galería de imágenes y descripción */}
          <div className='w-full lg:w-3/5 space-y-8'>
            {/* Galería de imágenes */}
            <div className=''>
              {/* Imagen principal */}
              <div className='relative mb-3'>
                {/* Botones de navegación para la imagen principal */}
                {car.Images.length > 1 && (
                  <>
                    <button
                      onClick={scrollPrev}
                      className='hidden md:block absolute left-4 top-1/2 -translate-y-1/2 bg-color-bg-secondary hover:bg-color-bg-secondary text-color-title-light hover:text-color-primary p-3 rounded-full transition-all shadow-lg z-10 opacity-100 cursor-pointer'
                      aria-label='Anterior'
                    >
                      <ArrowIcon className='w-5 h-5 rotate-180' />
                    </button>
                    <button
                      onClick={scrollNext}
                      className='hidden md:block absolute right-4 top-1/2 -translate-y-1/2 bg-color-bg-secondary hover:bg-color-bg-secondary text-color-title-light hover:text-color-primary p-3 rounded-full transition-all shadow-lg z-10 opacity-100 cursor-pointer'
                      aria-label='Siguiente'
                    >
                      <ArrowIcon className='w-5 h-5' />
                    </button>
                  </>
                )}

                {/* Indicador de posición */}
                {car.Images.length > 1 && (
                  <div className='absolute bottom-4 right-4 bg-color-bg-secondary text-color-title-light px-3 py-2 rounded-full text-sm font-medium shadow-lg z-10'>
                    {selectedIndex + 1}/{car.Images.length}
                  </div>
                )}

                {/* Carrusel de imágenes principal */}
                <div
                  className='overflow-hidden rounded-xl'
                  ref={mainViewportRef}
                >
                  <div className='flex'>
                    {orderedImages.map((image, index) => (
                      <div
                        key={index}
                        className='relative min-w-full aspect-[4/3]'
                      >
                        <button
                          onClick={() => {
                            setModalStartIndex(index);
                            setShowModal(true);
                          }}
                          className='relative w-full h-full overflow-hidden group bg-color-bg-secondary cursor-zoom-in border border-neutral-600'
                        >
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className='w-full h-full flex items-center justify-center'
                          >
                            <Image
                              src={image.imageUrl}
                              alt={`${car.model} - Imagen ${index + 1}`}
                              fill
                              className='object-cover'
                              style={{
                                objectPosition: `center ${company.objectCover}`,
                              }}
                              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                              priority
                            />
                          </motion.div>

                          {/* Overlay de sombra al hacer hover */}
                          <div className='absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

                          {!car.active && (
                            <div className='absolute inset-0 bg-black/70 flex items-center justify-center'>
                              <span className='bg-red-500 text-white text-xl md:text-2xl font-medium px-6 py-4 md:px-10 md:py-5 rounded-full'>
                                Pausado
                              </span>
                            </div>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Miniaturas - grid de 3 columnas, ocultas en mobile */}
              {car.Images.length > 1 && (
                <div className='hidden md:grid grid-cols-3 gap-3'>
                  {orderedImages.slice(1, 4).map((image, index) => {
                    const actualIndex = index + 1; // Índice real en el array (1, 2, 3)
                    const isLastThumbnail = index === 2;
                    const hasMoreImages = car.Images.length > 4;
                    const shouldShowBlur = isLastThumbnail && hasMoreImages;

                    return (
                      <button
                        key={actualIndex}
                        onClick={() => {
                          if (shouldShowBlur) {
                            // Si es la última miniatura con blur, abrir modal desde la imagen 4
                            setModalStartIndex(3);
                            setShowModal(true);
                          } else {
                            // Para las miniaturas 1, 2 y 3, abrir modal desde esa imagen
                            setModalStartIndex(actualIndex);
                            setShowModal(true);
                          }
                        }}
                        className={`relative aspect-[4/3] rounded-lg overflow-hidden outline-none transition-all bg-color-bg-secondary cursor-zoom-in group border border-neutral-600 ${
                          selectedIndex === actualIndex ? '' : ''
                        }`}
                      >
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                          className='w-full h-full flex items-center justify-center'
                        >
                          <Image
                            priority
                            src={image.thumbnailUrl}
                            alt={`${car.model} - Miniatura ${actualIndex + 1}`}
                            fill
                            sizes='(max-width: 768px) 33vw, 200px'
                            className={`object-cover ${
                              shouldShowBlur ? 'blur-sm' : ''
                            }`}
                            style={{
                              objectPosition: `center ${company.objectCover}`,
                            }}
                          />
                        </motion.div>

                        {/* Overlay de sombra al hacer hover */}
                        <div className='absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

                        {/* Overlay con contador en la última miniatura si hay más imágenes */}
                        {shouldShowBlur && (
                          <div className='absolute inset-0 bg-black/40 flex items-center justify-center'>
                            <div className='text-center text-white'>
                              <div className='text-3xl font-bold'>
                                +{car.Images.length - 4}
                              </div>
                            </div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Descripción del vehículo - Solo visible en desktop */}
            {car.description && (
              <div className='hidden lg:block'>
                <h2 className='text-xl font-medium mb-4 text-color-title-light'>
                  Descripción
                </h2>
                <p className='text-color-text-light whitespace-pre-line leading-relaxed font-medium'>
                  {car.description}
                </p>
              </div>
            )}
          </div>

          {/* Columna derecha - Características principales (sticky) */}
          <div className='w-full lg:w-2/5'>
            <div className='lg:sticky lg:top-28'>
              <div className='relative group'>
                {/* Gradiente base */}
                <div className='absolute inset-0 bg-color-primary/10 rounded-lg'></div>
                {/* Gradiente hover */}
                <div className='absolute inset-0 bg-color-primary/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out'></div>
                {/* Contenido */}
                <div className='relative z-10 p-6 bg-color-bg-secondary border border-neutral-600 rounded-lg shadow-[0_8px_30px_-15px_rgba(0,0,0,0.7)]'>
                  <div className=' mb-3 md:mb-4 lg:mb-6'>
                    <h1 className='text-xl md:text-2xl font-semibold text-color-title-light line-clamp-3'>
                      {car.model}
                    </h1>
                    <div className='flex flex-wrap items-center gap-2 text-sm text-color-text-light mt-2'>
                      <span className='font-medium text-color-text-light'>
                        {car.brand}
                      </span>
                      <span className='text-color-primary'>•</span>
                      <span className='font-medium text-color-text-light'>
                        {car.year}
                      </span>
                      <span className='text-color-primary'>•</span>
                      <span className='font-medium text-color-text-light'>
                        {car.Category.name}
                      </span>
                    </div>
                  </div>

                  {/* Precio */}
                  {car.price && car.price.valor > 0 ? (
                    <div
                      className={`${
                        company.price ? '' : 'hidden'
                      } text-2xl font-bold text-color-primary mb-2 md:mb-4`}
                    >
                      {car.price.moneda === 'ARS' ? '$' : 'US$'}
                      {car.price.valor.toLocaleString('es-ES')}
                    </div>
                  ) : (
                    ''
                  )}

                  <div className='grid grid-cols-2 md:grid-cols-3 gap-4 text-color-text-light mb-6'>
                    <div>
                      <p className='text-color-text-light text-sm font-medium'>
                        Kilometraje
                      </p>
                      <p
                        className={`font-medium ${
                          car.mileage === 0
                            ? 'text-color-primary font-semibold'
                            : 'text-color-title-light'
                        }`}
                      >
                        {car.mileage.toLocaleString('es-AR')} km
                      </p>
                    </div>
                    {car.motor && (
                      <div className='flex flex-col gap-1'>
                        <p className='text-color-text-light text-sm font-medium'>
                          Motor
                        </p>
                        <p className='text-color-title-light font-medium'>
                          {car.motor}
                        </p>
                      </div>
                    )}
                    <div className='flex flex-col gap-1'>
                      <p className='text-color-text-light text-sm font-medium'>
                        Año
                      </p>
                      <p className='text-color-title-light font-medium'>
                        {car.year}
                      </p>
                    </div>
                    {car.transmission && (
                      <div>
                        <p className='text-color-text-light text-sm font-medium'>
                          Transmisión
                        </p>
                        <p className='text-color-title-light font-medium'>
                          {car.transmission}
                        </p>
                      </div>
                    )}
                    <div>
                      <p className='text-color-text-light text-sm font-medium'>
                        Combustible
                      </p>
                      <p className='text-color-title-light font-medium'>
                        {car.fuel}
                      </p>
                    </div>
                    {car.doors ? (
                      <div>
                        <p className='text-color-text-light text-sm font-medium'>
                          Puertas
                        </p>
                        <p className='text-color-title-light font-medium'>
                          {car.doors}
                        </p>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>

                  {/* Botones de acción */}
                  {car.active && (
                    <div className='flex flex-col gap-3 mt-3 '>
                      <Link
                        href={`https://api.whatsapp.com/send?phone=549${company.whatsapp[0]}&text=Hola! Quería consultar por ${car.model}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='w-full h-12 bg-neutral-700 hover:bg-neutral-600 text-color-title-light flex gap-2 font-medium rounded text-center transition-all duration-300 ease-in-out justify-center items-center relative overflow-hidden group'
                      >
                        <span className='relative z-10 flex gap-2 items-center'>
                          <WhatsappIcon className='w-6 h-6' />
                          <span>Consultar</span>
                        </span>
                      </Link>
                      <div className='w-full h-12 backdrop-blur bg-black/90 text-white font-medium ring-[1.5px] ring-color-primary-dark hover:bg-white/20 rounded-lg transition-all duration-300 ease-in-out'>
                        <ShareMenu
                          url={
                            typeof window !== 'undefined'
                              ? window.location.href
                              : ''
                          }
                          title={`${car.model} ${car.year}`}
                        />
                      </div>
                    </div>
                  )}

                  {/* Descripción del vehículo - Solo visible en mobile */}
                  {car.description && (
                    <div className='lg:hidden mt-8'>
                      <h2 className='text-xl font-medium mb-2 sm:mb-3 text-color-title-light'>
                        Descripción
                      </h2>
                      <p className='text-color-text-light whitespace-pre-line leading-relaxed'>
                        {car.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal de galería */}
        {showModal && (
          <ImageGalleryModal
            images={orderedImages.map((img) => img.imageUrl)}
            currentIndex={modalStartIndex}
            productId={car.id}
            marcaId={car.brand.toLowerCase()}
            onClose={() => setShowModal(false)}
          />
        )}

        <section className='mt-10 md:mt-16 w-full'>
          {/* Carrusel de vehículos relacionados */}
          <CarrouselRelated
            title='Recomendados'
            currentCarId={car.id}
            categoryId={car.categoryId}
          />
        </section>
      </section>
    );
  };

  return (
    <>
      <Header />
      <div className='relative '>{renderContent()}</div>
      <Footer />
    </>
  );
}
