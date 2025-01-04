'use client';

import products from '@/data/catalogo.json';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import useEmblaCarousel from 'embla-carousel-react';
import { useState, useCallback, useEffect } from 'react';
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';
import CheckIcon from '@/components/icons/CheckIcon';
import CarrouselFeatured from '@/components/CarrouselFeatured';
import WhatsappIcon from '@/components/icons/WhatsappIcon';

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage = ({ params }: ProductPageProps) => {
  const product = products.find((p) => p.id === params.productId);
  const [mainViewportRef, embla] = useEmblaCarousel();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => {
      if (embla) {
        embla.scrollTo(index);
        setSelectedIndex(index);
      }
    },
    [embla]
  );

  console.log('selectedIndex', selectedIndex);

  const scrollPrev = useCallback(() => {
    if (embla && selectedIndex > 0) {
      scrollTo(selectedIndex - 1);
    }
  }, [embla, selectedIndex, scrollTo]);

  const scrollNext = useCallback(() => {
    if (embla && selectedIndex < (product?.images?.length || 0) - 1) {
      scrollTo(selectedIndex + 1);
    }
  }, [embla, selectedIndex, product?.images?.length, scrollTo]);

  // Manejar las teclas de flecha
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        scrollPrev();
      } else if (e.key === 'ArrowRight') {
        scrollNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrollPrev, scrollNext]);

  useEffect(() => {
    if (embla) {
      embla.on('select', () => {
        setSelectedIndex(embla.selectedScrollSnap());
      });
    }
  }, [embla]);

  if (!product || !product.images) {
    notFound();
  }

  return (
    <section className='flex flex-col items-center mx-auto px-4 py-8 md:py-12'>
      <div className='flex flex-col md:flex-row gap-8 max-w-6xl'>
        {/* Galería de imágenes */}
        <div className='space-y-4 w-full'>
          <div className='overflow-hidden relative group' ref={mainViewportRef}>
            <div className='flex'>
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className='relative h-60 md:h-96 w-full flex-[0_0_100%] rounded-md overflow-hidden md:[box-shadow:0px_0px_19px_3px_rgba(0,0,0,0.2)]'
                >
                  <Image
                    src={`/assets/catalogo/${product.marcaId?.toLowerCase()}/${
                      product.id
                    }/${image}`}
                    alt={`${product.name} - Imagen ${index + 1}`}
                    fill
                    className='object-cover'
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
            {/* Botones de navegación */}
            <button
              onClick={scrollPrev}
              className={`absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all ${
                selectedIndex === 0
                  ? 'opacity-0'
                  : 'opacity-0 group-hover:opacity-100 cursor-pointer'
              }`}
              disabled={selectedIndex === 0}
              aria-label='Anterior'
            >
              <ArrowLeftIcon className='w-4 h-4' />
            </button>
            <button
              onClick={scrollNext}
              className={`absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all ${
                selectedIndex === product.images.length - 1
                  ? 'opacity-0'
                  : 'opacity-0 group-hover:opacity-100 cursor-pointer'
              }`}
              disabled={selectedIndex === product.images.length - 1}
              aria-label='Siguiente'
            >
              <ArrowRightIcon className='w-4 h-4' />
            </button>
          </div>

          {/* Miniaturas */}
          <div className='flex flex-wrap gap-2'>
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`relative w-24 aspect-square flex-shrink-0 rounded overflow-hidden outline-none ${
                  selectedIndex === index ? 'ring-[3px] ring-color-primary' : ''
                }`}
              >
                <Image
                  src={`/assets/catalogo/${product.marcaId?.toLowerCase()}/${
                    product.id
                  }/${image}`}
                  alt={`${product.name} - Miniatura ${index + 1}`}
                  fill
                  priority
                  className='object-cover'
                />
              </button>
            ))}
          </div>
        </div>

        {/* Detalles del producto */}
        <div className='flex flex-col gap-4 w-full'>
          <h1 className='text-3xl font-bold text-color-title'>
            {product.name}
          </h1>

          <div className='flex flex-col gap-3 text-color-text'>
            <div className='flex flex-col gap-1'>
              <p className='text-color-title font-semibold'>Año</p>
              <p>{product.ano}</p>
            </div>
            <div>
              <p className='text-color-title font-semibold'>Kilometraje</p>
              <p>{(product.kilometraje ?? 0).toLocaleString('es-ES')} km</p>
            </div>
            <div>
              <p className='text-color-title font-semibold'>Transmisión</p>
              <p>{product.transmision}</p>
            </div>
            <div>
              <p className='text-color-title font-semibold'>Combustible</p>
              <p>{product.combustible}</p>
            </div>
            <div>
              <p className='text-color-title font-semibold'>Dirección</p>
              <p>{product.direccion}</p>
            </div>
            <div>
              <p className='text-color-title font-semibold'>Puertas</p>
              <p>{product.puertas}</p>
            </div>
          </div>

          {/* Botón de WhatsApp */}
          <div className='flex mt-3'>
            <Link
              href={`https://wa.me/TUNUMERO?text=Hola, estoy interesado en el ${product.name}`}
              target='_blank'
              className='flex gap-2 bg-color-primary text-color-title font-medium hover:bg-color-primary-dark py-3 px-8 rounded text-center transition-colors [box-shadow:0px_0px_10px_2px_rgba(0,0,0,0.2)]'
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
      <div className='mt-16'>
        <CarrouselFeatured
          title='Recomendados'
          startIndex={16}
          lastIndex={24}
        />
      </div>
    </section>
  );
};

export default ProductPage;
