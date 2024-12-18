'use client';

import products from '@/data/catalogo.json';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import useEmblaCarousel from 'embla-carousel-react';
import { useState, useCallback, useEffect } from 'react';
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';

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
    <section className='flex justify-center mx-auto px-4 py-8 md:py-12'>
      <div className='grid md:grid-cols-2 gap-8 max-w-6xl'>
        {/* Galería de imágenes */}
        <div className='space-y-4'>
          <div className='overflow-hidden relative group' ref={mainViewportRef}>
            <div className='flex'>
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className='relative aspect-square flex-[0_0_100%]'
                >
                  <Image
                    src={`/assets/catalogo/${product.marcaId?.toLowerCase()}/${
                      product.id
                    }/${image}`}
                    alt={`${product.name} - Imagen ${index + 1}`}
                    fill
                    className='object-cover rounded-lg'
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
                className={`relative w-20 aspect-square flex-shrink-0 rounded-lg overflow-hidden outline-none ${
                  selectedIndex === index ? 'ring-[3px] ring-color-primary' : ''
                }`}
              >
                <Image
                  src={`/assets/catalogo/${product.marcaId?.toLowerCase()}/${
                    product.id
                  }/${image}`}
                  alt={`${product.name} - Miniatura ${index + 1}`}
                  fill
                  className='object-cover'
                />
              </button>
            ))}
          </div>
        </div>

        {/* Detalles del producto */}
        <div className='flex flex-col gap-4'>
          <h1 className='text-3xl font-bold text-color-title'>
            {product.name}
          </h1>

          <div className='grid grid-cols-2 gap-4 text-color-text'>
            <div>
              <p className='font-semibold'>Año</p>
              <p>{product.ano}</p>
            </div>
            <div>
              <p className='font-semibold'>Kilometraje</p>
              <p>{(product.kilometraje ?? 0).toLocaleString('es-ES')} km</p>
            </div>
            <div>
              <p className='font-semibold'>Transmisión</p>
              <p>{product.transmision}</p>
            </div>
            <div>
              <p className='font-semibold'>Combustible</p>
              <p>{product.combustible}</p>
            </div>
            <div>
              <p className='font-semibold'>Dirección</p>
              <p>{product.direccion}</p>
            </div>
            <div>
              <p className='font-semibold'>Puertas</p>
              <p>{product.puertas}</p>
            </div>
          </div>

          {/* Botón de WhatsApp */}
          <Link
            href={`https://wa.me/TUNUMERO?text=Hola, estoy interesado en el ${product.name}`}
            target='_blank'
            className='mt-6 bg-color-primary hover:bg-color-primary-dark text-color-title-light py-3 px-6 rounded text-center transition-colors'
          >
            Consultar por WhatsApp
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
