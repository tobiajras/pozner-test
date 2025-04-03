'use client';

import { useState, useRef, useEffect } from 'react';
import ReactCrop, {
  Crop,
  PixelCrop,
  centerCrop,
  makeAspectCrop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageCropModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  onCropComplete: (croppedImage: Blob) => void;
}

// Función para crear un crop centrado con relación de aspecto
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

// Función para generar una imagen recortada a partir del canvas
function canvasPreview(
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('No 2d context');
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  // Configurar el tamaño del canvas para el recorte
  canvas.width = crop.width;
  canvas.height = crop.height;

  // Dibujar la imagen recortada en el canvas
  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );
}

export function ImageCropModal({
  isOpen,
  onClose,
  imageUrl,
  onCropComplete,
}: ImageCropModalProps) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [aspect] = useState<number>(1); // Forzar relación 1:1
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  // Cuando la imagen se carga, establecer un recorte inicial
  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, aspect || 1));
  };

  // Actualizar el canvas de vista previa cuando cambia el recorte
  useEffect(() => {
    if (
      completedCrop?.width &&
      completedCrop?.height &&
      imgRef.current &&
      previewCanvasRef.current
    ) {
      canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
    }
  }, [completedCrop]);

  // Función para aplicar el recorte y cerrar el modal
  const handleCropApply = () => {
    if (
      completedCrop?.width &&
      completedCrop?.height &&
      previewCanvasRef.current
    ) {
      previewCanvasRef.current.toBlob(
        (blob) => {
          if (blob) {
            onCropComplete(blob);
            onClose();
          }
        },
        'image/jpeg',
        0.95
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-auto'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold'>Recortar imagen</h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        <div className='flex flex-col md:flex-row gap-4'>
          <div className='flex-1 overflow-hidden'>
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
              className='max-h-[60vh] mx-auto'
            >
              <img
                ref={imgRef}
                src={imageUrl}
                alt='Imagen a recortar'
                onLoad={onImageLoad}
                className='max-w-full max-h-[60vh] object-contain'
              />
            </ReactCrop>
          </div>

          <div className='w-full md:w-64 flex flex-col'>
            <p className='text-sm font-medium text-gray-700 mb-2'>
              Vista previa
            </p>
            <div className='aspect-square border border-gray-300 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center'>
              <canvas
                ref={previewCanvasRef}
                className='w-full h-full object-contain'
              />
            </div>
          </div>
        </div>

        <div className='mt-6 flex justify-end space-x-2'>
          <button
            type='button'
            onClick={onClose}
            className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50'
          >
            Cancelar
          </button>
          <button
            type='button'
            onClick={handleCropApply}
            className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600'
          >
            Aplicar recorte
          </button>
        </div>
      </div>
    </div>
  );
}
