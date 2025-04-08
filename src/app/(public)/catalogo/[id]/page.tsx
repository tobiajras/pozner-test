'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';
import CheckIcon from '@/components/icons/CheckIcon';
import WhatsappIcon from '@/components/icons/WhatsappIcon';
import { company } from '@/app/constants/constants';
import ImageGalleryModal from '@/components/ImageGalleryModal';
import useEmblaCarousel from 'embla-carousel-react';

const API_BASE_URL = 'https://api.fratelliautomotores.com.ar/api';

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
    imageUrl: string;
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
        const response = await fetch(`${API_BASE_URL}/cars/${id}`);
        if (!response.ok) {
          throw new Error('Error al cargar el vehículo');
        }
        const data = await response.json();
        setCar(data);
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

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-color-primary'></div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <p className='text-red-500 mb-4'>{error || 'Vehículo no encontrado'}</p>
        <Link
          href='/catalogo'
          className='text-color-primary hover:text-color-primary-dark'
        >
          Volver al catálogo
        </Link>
      </div>
    );
  }

  console.log(car);

  return (
    <section className='flex flex-col items-center mx-auto mt-10 md:mt-16'>
      {/* Botón volver */}
      <div className='w-full flex justify-center'>
        <div className='w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-6xl mb-6 mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
          <Link
            href='/catalogo'
            className={`${
              company.dark
                ? 'bg-color-primary text-color-title-light hover:bg-color-primary-dark'
                : 'bg-color-primary-light text-color-title hover:bg-color-primary-dark'
            } inline-flex items-center gap-2 px-4 py-2 rounded transition-colors`}
          >
            <ArrowLeftIcon className='w-4 h-4' />
            <span>Volver al catálogo</span>
          </Link>
        </div>
      </div>
      <div className='flex flex-col lg:flex-row gap-8 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-6xl mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
        {/* Galería de imágenes */}
        <div className='space-y-4 w-full lg:w-1/2'>
          <div className='overflow-hidden relative group' ref={mainViewportRef}>
            <div className='flex'>
              {car.Images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setShowModal(true)}
                  className='relative w-full aspect-[4/3] flex-[0_0_100%] rounded-lg overflow-hidden cursor-zoom-in'
                >
                  <Image
                    src={image.imageUrl}
                    alt={`${car.brand} ${car.model} - Imagen ${index + 1}`}
                    fill
                    className='object-cover'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    priority={index === 0}
                  />
                </button>
              ))}
            </div>
            {/* Botones de navegación */}
            <button
              onClick={scrollPrev}
              className={`absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all ${
                selectedIndex === 0 ? 'opacity-0' : 'opacity-100 cursor-pointer'
              }`}
              disabled={selectedIndex === 0}
              aria-label='Anterior'
            >
              <ArrowLeftIcon className='w-4 h-4' />
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
              <ArrowRightIcon className='w-4 h-4' />
            </button>

            {/* Indicador de posición */}
            <div className='absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-sm'>
              {selectedIndex + 1}/{car.Images.length}
            </div>
          </div>

          {/* Miniaturas - ocultas en móvil */}
          <div className='hidden md:flex flex-wrap gap-2'>
            {car.Images.map((image, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`relative w-20 aspect-[4/3] flex-shrink-0 rounded overflow-hidden outline-none ${
                  selectedIndex === index ? 'ring-2 ring-color-primary' : ''
                }`}
              >
                <Image
                  src={image.thumbnailUrl}
                  alt={`${car.brand} ${car.model} - Miniatura ${index + 1}`}
                  fill
                  sizes='96px'
                  className='object-cover'
                />
              </button>
            ))}
          </div>
        </div>

        {/* Detalles del auto */}
        <div className='flex flex-col gap-4 w-full lg:w-1/2'>
          <h1 className='text-3xl font-bold text-color-primary'>
            {car.brand} {car.model}
          </h1>
          <p className='text-2xl font-semibold text-color-primary'>
            ${parseFloat(car.price).toLocaleString('es-AR')}
          </p>

          <div className='flex flex-col gap-3 text-color-text'>
            <div className='flex flex-col gap-1'>
              <p className='text-color-title font-semibold'>Año</p>
              <p>{car.year}</p>
            </div>
            <div>
              <p className='text-color-title font-semibold'>Kilometraje</p>
              <p>{car.mileage.toLocaleString('es-AR')} km</p>
            </div>
            <div>
              <p className='text-color-title font-semibold'>Transmisión</p>
              <p>{car.transmission}</p>
            </div>
            <div>
              <p className='text-color-title font-semibold'>Combustible</p>
              <p>{car.fuel}</p>
            </div>
            <div>
              <p className='text-color-title font-semibold'>Puertas</p>
              <p>{car.doors}</p>
            </div>
            <div>
              <p className='text-color-title font-semibold'>Categoría</p>
              <p>{car.Category.name}</p>
            </div>
          </div>

          <div className='mt-4'>
            <h2 className='text-xl font-semibold mb-2'>Descripción</h2>
            <p className='text-gray-600'>{car.description}</p>
          </div>

          {/* Botón de WhatsApp */}
          <div className='flex mt-3'>
            <Link
              href={`https://api.whatsapp.com/send?phone=549${company.whatsapp[0]}&text=Hola! Quería consultar por ${car.brand} ${car.model}`}
              target='_blank'
              rel='noopener noreferrer'
              className={`${
                company.dark
                  ? 'bg-color-primary text-color-title-light hover:bg-color-primary-dark'
                  : 'bg-color-primary-light text-color-title hover:bg-color-primary-dark'
              } flex gap-2 font-medium hover:bg-color-primary-dark py-3 px-8 rounded text-center transition-colors [box-shadow:0px_0px_10px_2px_rgba(0,0,0,0.1)] md:[box-shadow:0px_0px_10px_2px_rgba(0,0,0,0.2)]`}
            >
              <WhatsappIcon className='w-6 h-6' />
              <span>Consultar</span>
            </Link>
          </div>
          <hr className='mt-8 mb-5' />
          <div className='flex flex-col gap-3'>
            <div className='text-color-text flex items-center'>
              <CheckIcon className='w-6 h-6 p-1 mr-2 bg-green-600 text-color-title-light rounded-full' />
              <span>Excelente estado, como se ve en las fotos.</span>
            </div>
            <div className='text-color-text flex items-center'>
              <CheckIcon className='w-6 h-6 p-1 mr-2 bg-green-600 text-color-title-light rounded-full' />
              <span>Papeles al día, sin deudas, listo para transferir.</span>
            </div>
            <div className='text-color-text flex items-center'>
              <CheckIcon className='w-6 h-6 p-1 mr-2 bg-green-600 text-color-title-light rounded-full' />
              <span>Recibimos tu usado.</span>
            </div>
            <div className='text-color-text flex items-center'>
              <CheckIcon className='w-6 h-6 p-1 mr-2 bg-green-600 text-color-title-light rounded-full' />
              <span>Financiación con cuotas fijas y en pesos.</span>
            </div>
            <div className='text-color-text flex items-center'>
              <CheckIcon className='w-6 h-6 p-1 mr-2 bg-green-600 text-color-title-light rounded-full' />
              <span>Gestión rápida y sencilla.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de galería */}
      {showModal && (
        <ImageGalleryModal
          images={car.Images.map((img) => img.imageUrl)}
          currentIndex={selectedIndex}
          productId={car.id}
          marcaId={car.brand.toLowerCase()}
          onClose={() => setShowModal(false)}
        />
      )}
    </section>
  );
}
