'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ArrowIcon from '@/components/icons/ArrowIcon';
import WhatsappIcon from '@/components/icons/WhatsappIcon';
import { company } from '@/app/constants/constants';
import ImageGalleryModal from '@/components/ImageGalleryModal';
import useEmblaCarousel from 'embla-carousel-react';
import DropDownIcon from '@/components/icons/DropDownIcon';
import CarrouselRelated from '@/components/CarrouselRelated';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '@/app/constants/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
  Images: {
    thumbnailUrl: string;
    imageUrl: string;
    order: number;
  }[];
}

export default function AutoDetailPage() {
  const { id } = useParams();
  const [car, setCar] = useState<ApiCar | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mainViewportRef, embla] = useEmblaCarousel();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [orderedImages, setOrderedImages] = useState<ApiCar['Images']>([]);

  const scrollTo = useCallback(
    (index: number) => {
      if (embla) {
        embla.scrollTo(index);
        setSelectedIndex(index);
      }
    },
    [embla]
  );

  const scrollPrev = useCallback(() => {
    if (embla && selectedIndex > 0) {
      scrollTo(selectedIndex - 1);
    }
  }, [embla, selectedIndex, scrollTo]);

  const scrollNext = useCallback(() => {
    if (embla && car && selectedIndex < car.Images.length - 1) {
      scrollTo(selectedIndex + 1);
    }
  }, [embla, selectedIndex, car, scrollTo]);

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
        const response = await fetch(`${API_BASE_URL}/api/cars/${id}`);
        if (!response.ok) {
          throw new Error('Error al cargar el vehículo');
        }
        const data = await response.json();
        // Ordenar las imágenes por el campo order
        const sortedImages = [...data.Images].sort((a, b) => a.order - b.order);
        setOrderedImages(sortedImages);
        setCar({ ...data, Images: sortedImages });
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'Error al cargar el vehículo'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const renderContent = () => {
    if (loading) {
      return (
        <section className='flex flex-col items-center mx-auto pt-10 md:pt-16 pb-16 md:pb-20'>
          {/* Botón volver */}
          <div className='w-full flex justify-center'>
            <div className='w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-6xl mb-6 mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
              <div className='flex gap-2 font-medium items-center'>
                <div className='h-5 w-20 bg-neutral-800/50 rounded animate-pulse'></div>
                <div className='h-5 w-5 bg-neutral-800/50 rounded animate-pulse'></div>
                <div className='h-5 w-24 bg-neutral-800/50 rounded animate-pulse'></div>
              </div>
            </div>
          </div>

          <div className='flex flex-col lg:flex-row gap-8 md:gap-12 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-6xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-0'>
            {/* Galería de imágenes - Skeleton */}
            <div className='space-y-4 w-full lg:w-3/5'>
              <div className=''>
                <div className='aspect-[4/3] bg-neutral-800/40 rounded-lg animate-pulse'></div>
              </div>
            </div>

            {/* Detalles del auto - Skeleton */}
            <div className='w-full lg:w-2/5'>
              <div className='bg-neutral-800/30 rounded-lg shadow-[0_8px_30px_-15px_rgba(0,0,0,0.7)] p-5'>
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
        <section className='flex flex-col items-center mx-auto pt-10 md:pt-16 pb-16 md:pb-20'>
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
      <section className='flex flex-col items-center mx-auto pt-10 md:pt-16 pb-16 md:pb-20'>
        {/* Navegación */}
        <div className='w-full flex justify-center'>
          <div className='w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-6xl mb-6 mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
            <div className='flex gap-2 font-medium items-center'>
              <Link href={`/catalogo`}>
                <p className='text-color-text hover:text-color-primary transition-colors'>
                  catálogo
                </p>
              </Link>
              <DropDownIcon className='w-2.5 h-2.5 -rotate-90 text-color-text' />
              <Link
                href={`/catalogo?categoria=${car.Category.name.toLowerCase()}`}
              >
                <p className='text-color-text hover:text-color-primary transition-colors'>
                  {car.Category.name}
                </p>
              </Link>
            </div>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row gap-8 md:gap-12 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-6xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-0'>
          {/* Galería de imágenes */}
          <div className='space-y-4 w-full lg:w-3/5'>
            <div className=''>
              <div
                className='overflow-hidden relative group'
                ref={mainViewportRef}
              >
                <div className='flex'>
                  {orderedImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setShowModal(true)}
                      className='relative w-full aspect-[4/3] flex-[0_0_100%] rounded-lg overflow-hidden cursor-zoom-in'
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className='w-full h-full'
                      >
                        <Image
                          src={image.imageUrl}
                          alt={`${car.model} - Imagen ${index + 1}`}
                          fill
                          className='object-cover'
                          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                          priority={index === 0}
                        />
                      </motion.div>
                      {!car.active && (
                        <div className='absolute inset-0 bg-black/70 flex items-center justify-center'>
                          <span className='bg-red-500 text-white text-xl md:text-2xl font-medium px-6 py-4 md:px-10 md:py-5 rounded-full'>
                            Pausado
                          </span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                {/* Botones de navegación */}
                <button
                  onClick={scrollPrev}
                  className={`absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all ${
                    selectedIndex === 0
                      ? 'opacity-0'
                      : 'opacity-100 cursor-pointer'
                  }`}
                  disabled={selectedIndex === 0}
                  aria-label='Anterior'
                >
                  <ArrowIcon className='w-4 h-4 rotate-180' />
                </button>
                <button
                  onClick={scrollNext}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all ${
                    selectedIndex === car.Images.length - 1
                      ? 'opacity-0'
                      : 'opacity-100 cursor-pointer'
                  }`}
                  disabled={selectedIndex === car.Images.length - 1}
                  aria-label='Siguiente'
                >
                  <ArrowIcon className='w-4 h-4' />
                </button>

                {/* Indicador de posición */}
                <div className='absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-sm'>
                  {selectedIndex + 1}/{car.Images.length}
                </div>
              </div>

              {/* Miniaturas - ocultas en móvil */}
              <div className='hidden md:flex flex-wrap gap-2 mt-4'>
                {orderedImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`relative w-36 aspect-[4/3] flex-shrink-0 rounded overflow-hidden outline-none ${
                      selectedIndex === index ? 'ring-2 ring-color-primary' : ''
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className='w-full h-full'
                    >
                      <Image
                        src={image.thumbnailUrl}
                        alt={`${car.model} - Miniatura ${index + 1}`}
                        fill
                        sizes='96px'
                        className='object-cover'
                      />
                    </motion.div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Detalles del auto */}
          <div className='w-full lg:w-2/5'>
            <div className='bg-white/70 rounded-lg shadow-[0_8px_30px_-15px_rgba(0,0,0,0.7)] p-5'>
              <div className='border-l-4 border-color-primary pl-4 mb-6'>
                <h1 className='text-2xl md:text-3xl font-semibold text-color-title'>
                  {car.model}
                </h1>
                <div className='flex flex-wrap items-center gap-2 text-sm text-color-text mt-2'>
                  <span className='font-medium text-color-title'>
                    {car.brand}
                  </span>
                  <span className='text-color-secondary'>•</span>
                  <span>{car.year}</span>
                  <span className='text-color-secondary'>•</span>
                  <span>{car.Category.name}</span>
                </div>
              </div>
              {car.price && parseFloat(car.price) > 0 ? (
                <p className='text-2xl font-semibold text-color-primary mb-4'>
                  {car.currency} {parseFloat(car.price).toLocaleString('es-AR')}
                </p>
              ) : (
                ''
              )}

              <div className='grid grid-cols-2 md:grid-cols-3 gap-4 text-color-text mb-6'>
                <div>
                  <p className='text-color-text text-sm'>Kilometraje</p>
                  <p className='text-color-title'>
                    {car.mileage.toLocaleString('es-AR')} km
                  </p>
                </div>
                {car.color && (
                  <div className='flex flex-col gap-1'>
                    <p className='text-color-text text-sm'>Motor</p>
                    <p className='text-color-title'>{car.color}</p>
                  </div>
                )}
                <div className='flex flex-col gap-1'>
                  <p className='text-color-text text-sm'>Año</p>
                  <p className='text-color-title'>{car.year}</p>
                </div>
                <div>
                  <p className='text-color-text text-sm'>Transmisión</p>
                  <p className='text-color-title'>{car.transmission}</p>
                </div>
                <div>
                  <p className='text-color-text text-sm'>Combustible</p>
                  <p className='text-color-title'>{car.fuel}</p>
                </div>
                {car.doors && (
                  <div>
                    <p className='text-color-text text-sm'>Puertas</p>
                    <p className='text-color-title'>{car.doors}</p>
                  </div>
                )}
                {car.mileage == 0 && (
                  <div className='flex justify-start items-center'>
                    <span className='text-sm bg-color-primary hover:bg-color-primary-dark transition-colors border border-white/15 text-neutral-100 rounded-sm py-1 px-3 uppercase tracking-wider'>
                      Nuevo
                    </span>
                  </div>
                )}
              </div>

              {/* Botón de WhatsApp */}
              {car.active && (
                <div className='flex mt-3'>
                  <Link
                    href={`https://api.whatsapp.com/send?phone=549${company.whatsapp[0]}&text=Hola! Quería consultar por ${car.model}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='bg-color-secondary hover:bg-color-secondary-dark text-color-title-light flex gap-2 font-medium py-3 px-8 rounded text-center transition-colors w-full justify-center'
                  >
                    <WhatsappIcon className='w-6 h-6' />
                    <span>Consultar</span>
                  </Link>
                </div>
              )}

              {/* Descripción */}
              {car.description && (
                <div className='mt-6'>
                  <h2 className='text-xl font-medium mb-2 text-color-title'>
                    Descripción
                  </h2>
                  <p className='text-color-text whitespace-pre-line'>
                    {car.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal de galería */}
        {showModal && (
          <ImageGalleryModal
            images={orderedImages.map((img) => img.imageUrl)}
            currentIndex={selectedIndex}
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
