'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import ArrowIcon from './icons/ArrowIcon';
import CloseIcon from './icons/CloseIcon';

interface ImageGalleryModalProps {
  images: string[];
  currentIndex: number;
  productId: string;
  marcaId: string;
  onClose: () => void;
}

const ImageGalleryModal = ({
  images,
  currentIndex,
  productId,
  marcaId,
  onClose,
}: ImageGalleryModalProps) => {
  const [index, setIndex] = useState(currentIndex);

  const handlePrevious = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevenir el scroll cuando el modal está abierto
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 md:p-8'
      onClick={onClose}
    >
      <div
        className='relative bg-color-bg-secondary rounded-lg overflow-hidden max-w-5xl w-full max-h-[85vh] shadow-2xl'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className='absolute top-2 right-2 text-color-title-light transition-colors z-50 bg-black/40 hover:bg-black/80 p-1.5 rounded-full'
        >
          <CloseIcon className='w-6 h-6 lg:w-8 lg:h-8' />
        </button>

        {/* Imagen actual */}
        <div className='relative w-full aspect-[4/3] flex items-center justify-center'>
          <Image
            src={`${images[index]}`}
            alt={`Imagen ${index + 1}`}
            fill
            className='object-cover'
            sizes='(max-width: 1024px) 90vw, 1024px'
            priority
          />
        </div>

        {/* Botones de navegación */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrevious();
          }}
          className='absolute left-2 top-1/2 -translate-y-1/2 text-white transition-colors bg-black/40 hover:bg-black/80 p-2 rounded-full'
        >
          <ArrowIcon className='w-6 h-6 rotate-180' />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className='absolute right-2 top-1/2 -translate-y-1/2 text-white transition-colors bg-black/40 hover:bg-black/80 p-2 rounded-full'
        >
          <ArrowIcon className='w-6 h-6' />
        </button>

        {/* Contador de imágenes */}
        <div className='absolute bottom-2 left-1/2 -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full text-sm'>
          {index + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default ImageGalleryModal;
