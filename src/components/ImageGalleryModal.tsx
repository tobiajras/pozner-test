'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
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
  onClose,
}: ImageGalleryModalProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
    startIndex: currentIndex, // Establecer la posición inicial directamente
  });

  const [selectedIndex, setSelectedIndex] = useState(currentIndex);
  const [isDragging, setIsDragging] = useState(false);
  const [mousePressedInContent, setMousePressedInContent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Animación de entrada
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // Función para cerrar con animación
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 200); // Duración de la animación de salida
  }, [onClose]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );

  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const handleMouseDown = useCallback(() => {
    setIsDragging(false);
    setMousePressedInContent(true);
  }, []);

  const handleMouseMove = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(
    (e: React.MouseEvent) => {
      // Solo prevenir la propagación si realmente hubo drag
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
        // Resetear el estado después de un pequeño delay para permitir clicks normales
        setTimeout(() => {
          setIsDragging(false);
          setMousePressedInContent(false);
        }, 100);
        return;
      }
      setIsDragging(false);
      setMousePressedInContent(false);
    },
    [isDragging]
  );

  // Resetear el estado después de un tiempo como medida de seguridad
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMousePressedInContent(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [mousePressedInContent]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      // Solo cerrar si el click fue directamente en el backdrop y no se presionó el mouse en el contenido
      if (e.target === e.currentTarget && !mousePressedInContent) {
        handleClose();
      }
    },
    [mousePressedInContent, handleClose]
  );

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Resetear el estado cuando cambie la imagen seleccionada (por swipe o navegación)
  useEffect(() => {
    setMousePressedInContent(false);
  }, [selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') scrollPrev();
      if (e.key === 'ArrowRight') scrollNext();
    };

    window.addEventListener('keydown', handleKeyDown);

    // Prevenir el scroll cuando el modal está abierto
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [handleClose, scrollPrev, scrollNext]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 transition-all duration-200 ease-out ${
        isVisible && !isClosing
          ? 'bg-black/60 opacity-100'
          : 'bg-black/0 opacity-0'
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`relative rounded-lg overflow-hidden max-w-4xl w-full aspect-[3/4] max-h-[75vh] transition-all duration-200 ease-out transform ${
          isVisible && !isClosing
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={handleClose}
          className='absolute top-2 right-2 text-white transition-colors z-50 bg-color-primary hover:bg-color-primary-dark p-1.5 rounded-full'
        >
          <CloseIcon className='w-6 h-6 lg:w-8 lg:h-8' />
        </button>

        {/* Contenedor del carrusel */}
        <div
          className='overflow-hidden h-full cursor-grab active:cursor-grabbing'
          ref={emblaRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <div className='flex h-full'>
            {images.map((image, index) => (
              <div
                key={index}
                className='relative min-w-full h-full cursor-grab active:cursor-grabbing'
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
              >
                <Image
                  priority
                  src={image}
                  alt={`Imagen ${index + 1}`}
                  fill
                  className='object-contain cursor-grab active:cursor-grabbing'
                  style={{
                    objectPosition: 'center',
                  }}
                  draggable={false}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Botones de navegación */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                scrollPrev();
              }}
              className='absolute left-2 top-1/2 -translate-y-1/2 text-white transition-colors bg-color-primary hover:bg-color-primary-dark p-2 rounded-full opacity-100 cursor-pointer'
            >
              <ArrowIcon className='w-6 h-6 rotate-180' />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                scrollNext();
              }}
              className='absolute right-2 top-1/2 -translate-y-1/2 text-white transition-colors bg-color-primary hover:bg-color-primary-dark p-2 rounded-full opacity-100 cursor-pointer'
            >
              <ArrowIcon className='w-6 h-6' />
            </button>
          </>
        )}

        {/* Contador de imágenes */}
        {images.length > 1 && (
          <div className='absolute bottom-2 left-1/2 -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full text-sm'>
            {selectedIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGalleryModal;
