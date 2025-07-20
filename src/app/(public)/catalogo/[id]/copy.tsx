'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
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
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import catalogo from '@/data/catalogo.json';
import ShareMenu from '@/components/ShareMenu';

interface ApiCar {
  id: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  price: {
    valor: number;
    moneda: string;
  };
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
  const [modalStartIndex, setModalStartIndex] = useState(0);
  const [orderedImages, setOrderedImages] = useState<ApiCar['Images']>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);

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

  // Funciones para el drag
  const handleDragStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      setIsDragging(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      setDragStart(clientX);
      setDragOffset(0);
    },
    []
  );

  const handleDragMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDragging) return;

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const offset = clientX - dragStart;
      setDragOffset(offset);
    },
    [isDragging, dragStart]
  );

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;

    const threshold = 50; // Umbral mínimo para cambiar de imagen

    if (dragOffset > threshold && selectedIndex > 0) {
      scrollTo(selectedIndex - 1);
    } else if (
      dragOffset < -threshold &&
      car &&
      selectedIndex < car.Images.length - 1
    ) {
      scrollTo(selectedIndex + 1);
    }

    setIsDragging(false);
    setDragOffset(0);
  }, [isDragging, dragOffset, selectedIndex, car, scrollTo]);

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
    const fetchCar = () => {
      try {
        const carData = catalogo.find((car) => car.id === id);

        if (!carData) {
          throw new Error('Vehículo no encontrado');
        }

        // Transformar los datos al formato esperado
        const auto = {
          id: carData.id,
          brand: carData.marca,
          model: carData.name,
          year: carData.ano,
          color: '',
          price: {
            valor: carData.precio.valor,
            moneda: carData.precio.moneda,
          },
          description: carData.descripcion,
          categoryId: carData.categoria,
          mileage: carData.kilometraje,
          transmission: carData.transmision,
          fuel: carData.combustible,
          doors: carData.puertas,
          position: 0,
          featured: false,
          favorite: false,
          active: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          Category: {
            id: carData.categoria.toLowerCase(),
            name: carData.categoria,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          Images: carData.images.map((img, index) => ({
            thumbnailUrl: `/assets/catalogo/${img}`,
            imageUrl: `/assets/catalogo/${img}`,
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

          <div className='flex flex-col lg:flex-row gap-8 md:gap-12 w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-0'>
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
              <div className='bg-white border border-gray-200 rounded-lg shadow-lg p-6'>
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
                  Catálogo
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

        <div className='flex flex-col lg:flex-row gap-8 md:gap-12 w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-0'>
          {/* Galería de imágenes */}
          <div className='space-y-6 w-full lg:w-3/5'>
            <div className=''>
              {/* Imagen principal */}
              <div className='relative mb-6'>
                <div
                  ref={imageRef}
                  onMouseDown={handleDragStart}
                  onMouseMove={handleDragMove}
                  onMouseUp={handleDragEnd}
                  onMouseLeave={handleDragEnd}
                  onTouchStart={handleDragStart}
                  onTouchMove={handleDragMove}
                  onTouchEnd={handleDragEnd}
                  className='relative w-full aspect-[4/3] rounded-xl overflow-hidden cursor-grab active:cursor-grabbing group bg-gray-50'
                  style={{
                    transform: isDragging
                      ? `translateX(${dragOffset}px)`
                      : 'translateX(0)',
                    transition: isDragging ? 'none' : 'transform 0.3s ease-out',
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className='w-full h-full flex items-center justify-center'
                  >
                    <Image
                      src={
                        orderedImages[selectedIndex]?.imageUrl ||
                        '/assets/placeholder.webp'
                      }
                      alt={`${car.model} - Imagen ${selectedIndex + 1}`}
                      fill
                      className='object-contain'
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                      priority
                    />
                  </motion.div>

                  {/* Botón invisible para abrir modal */}
                  <button
                    onClick={() => {
                      setModalStartIndex(selectedIndex);
                      setShowModal(true);
                    }}
                    className='absolute inset-0 z-10 cursor-zoom-in'
                    style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
                  />

                  {/* Overlay de zoom al hacer hover */}
                  <div className='absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                    <div className='bg-white/90 rounded-full p-3 shadow-lg'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-6 h-6 text-gray-800'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7'
                        />
                      </svg>
                    </div>
                  </div>

                  {!car.active && (
                    <div className='absolute inset-0 bg-black/70 flex items-center justify-center'>
                      <span className='bg-red-500 text-white text-xl md:text-2xl font-medium px-6 py-4 md:px-10 md:py-5 rounded-full'>
                        Pausado
                      </span>
                    </div>
                  )}
                </div>

                {/* Botones de navegación para la imagen principal */}
                {car.Images.length > 1 && (
                  <>
                    <button
                      onClick={scrollPrev}
                      className={`absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-600 hover:text-gray-800 p-3 rounded-full transition-all shadow-lg ${
                        selectedIndex === 0
                          ? 'opacity-0'
                          : 'opacity-100 cursor-pointer'
                      }`}
                      disabled={selectedIndex === 0}
                      aria-label='Anterior'
                    >
                      <ArrowIcon className='w-5 h-5 rotate-180' />
                    </button>
                    <button
                      onClick={scrollNext}
                      className={`absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-600 hover:text-gray-800 p-3 rounded-full transition-all shadow-lg ${
                        selectedIndex === car.Images.length - 1
                          ? 'opacity-0'
                          : 'opacity-100 cursor-pointer'
                      }`}
                      disabled={selectedIndex === car.Images.length - 1}
                      aria-label='Siguiente'
                    >
                      <ArrowIcon className='w-5 h-5' />
                    </button>
                  </>
                )}

                {/* Indicador de posición */}
                {car.Images.length > 1 && (
                  <div className='absolute bottom-4 right-4 bg-white/90 text-gray-600 px-3 py-2 rounded-full text-sm font-medium shadow-lg'>
                    {selectedIndex + 1}/{car.Images.length}
                  </div>
                )}
              </div>

              {/* Miniaturas - grid de 3 columnas, ocultas en mobile */}
              {car.Images.length > 1 && (
                <div className='hidden md:grid grid-cols-3 gap-3'>
                  {orderedImages.slice(0, 3).map((image, index) => {
                    const isLastThumbnail = index === 2;
                    const hasMoreImages = car.Images.length > 3;
                    const shouldShowBlur = isLastThumbnail && hasMoreImages;

                    return (
                      <button
                        key={index}
                        onClick={() => {
                          if (shouldShowBlur) {
                            // Si es la última miniatura con blur, abrir modal desde la imagen 3
                            setModalStartIndex(2);
                            setShowModal(true);
                          } else {
                            // Para las miniaturas 1 y 2, abrir modal desde esa imagen
                            setModalStartIndex(index);
                            setShowModal(true);
                          }
                        }}
                        className={`relative aspect-[4/3] rounded-lg overflow-hidden outline-none transition-all bg-gray-50 ${
                          selectedIndex === index
                            ? 'ring-2 ring-color-primary scale-105'
                            : 'hover:scale-105 hover:ring-1 hover:ring-gray-300'
                        }`}
                      >
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                          className='w-full h-full flex items-center justify-center'
                        >
                          <Image
                            src={image.thumbnailUrl}
                            alt={`${car.model} - Miniatura ${index + 1}`}
                            fill
                            sizes='(max-width: 768px) 33vw, 200px'
                            className={`object-contain ${
                              shouldShowBlur ? 'blur-sm' : ''
                            }`}
                          />
                        </motion.div>

                        {/* Overlay con contador en la última miniatura si hay más imágenes */}
                        {shouldShowBlur && (
                          <div className='absolute inset-0 bg-black/40 flex items-center justify-center'>
                            <div className='text-center text-white'>
                              <div className='text-lg font-bold'>
                                +{car.Images.length - 3}
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
          </div>

          {/* Detalles del auto */}
          <div className='w-full lg:w-2/5'>
            <div className='bg-white border border-gray-200 rounded-lg shadow-lg p-6 xl:p-8'>
              <div className=' mb-6'>
                <h1 className='text-xl md:text-2xl font-semibold text-color-title line-clamp-3'>
                  {car.model}
                </h1>
                <div className='flex flex-wrap items-center gap-2 text-sm text-color-text mt-2'>
                  <span className='font-medium text-color-text'>
                    {car.brand}
                  </span>
                  <span className='text-color-primary'>•</span>
                  <span className='font-medium text-color-text'>
                    {car.year}
                  </span>
                  <span className='text-color-primary'>•</span>
                  <span className='font-medium text-color-text'>
                    {car.Category.name}
                  </span>
                </div>
              </div>

              {/* Precio */}
              {car.price && car.price.valor > 0 ? (
                <div
                  className={`${
                    company.price ? '' : 'hidden'
                  } text-2xl font-bold text-color-primary mb-4`}
                >
                  {car.price.moneda === 'ARS' ? '$' : 'US$'}
                  {car.price.valor.toLocaleString('es-ES')}
                </div>
              ) : (
                ''
              )}

              <div className='grid grid-cols-2 md:grid-cols-3 gap-4 text-color-text mb-6'>
                <div>
                  <p className='text-color-text text-sm font-medium'>
                    Kilometraje
                  </p>
                  <p className='text-color-title font-medium'>
                    {car.mileage.toLocaleString('es-AR')} km
                  </p>
                </div>
                {car.color && (
                  <div className='flex flex-col gap-1'>
                    <p className='text-color-text text-sm font-medium'>Motor</p>
                    <p className='text-color-title font-medium'>{car.color}</p>
                  </div>
                )}
                <div className='flex flex-col gap-1'>
                  <p className='text-color-text text-sm font-medium'>Año</p>
                  <p className='text-color-title font-medium'>{car.year}</p>
                </div>
                <div>
                  <p className='text-color-text text-sm font-medium'>
                    Transmisión
                  </p>
                  <p className='text-color-title font-medium'>
                    {car.transmission}
                  </p>
                </div>
                <div>
                  <p className='text-color-text text-sm font-medium'>
                    Combustible
                  </p>
                  <p className='text-color-title font-medium'>{car.fuel}</p>
                </div>
                {car.doors && (
                  <div>
                    <p className='text-color-text text-sm font-medium'>
                      Puertas
                    </p>
                    <p className='text-color-title font-medium'>{car.doors}</p>
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

              {/* Botones de acción */}
              {car.active && (
                <div className='flex flex-col gap-3 mt-3 '>
                  <Link
                    href={`https://api.whatsapp.com/send?phone=549${company.whatsapp[0]}&text=Hola! Quería consultar por ${car.model}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-full h-12 bg-color-primary hover:bg-color-primary-dark text-color-title-light flex gap-2 font-medium rounded text-center transition-colors justify-center items-center'
                  >
                    <WhatsappIcon className='w-6 h-6' />
                    <span>Consultar</span>
                  </Link>
                  <div className='w-full h-12 relative'>
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
