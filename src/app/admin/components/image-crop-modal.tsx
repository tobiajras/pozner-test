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
  onCropComplete: (croppedImage: File) => void;
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

  // Obtener las dimensiones reales de la imagen
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  // Calcular las dimensiones del área de recorte en píxeles reales
  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;
  const cropWidth = crop.width * scaleX;
  const cropHeight = crop.height * scaleY;

  // Configurar el tamaño del canvas de vista previa para que coincida con el área visible
  canvas.width = crop.width;
  canvas.height = crop.height;

  // Asegurarse de que el contexto esté limpio
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Crear un canvas temporal para mantener la calidad
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = cropWidth;
  tempCanvas.height = cropHeight;
  const tempCtx = tempCanvas.getContext('2d');

  if (!tempCtx) {
    throw new Error('No 2d context');
  }

  // Dibujar la porción recortada en el canvas temporal
  tempCtx.drawImage(
    image,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    0,
    0,
    cropWidth,
    cropHeight
  );

  // Dibujar desde el canvas temporal al canvas de vista previa
  ctx.drawImage(
    tempCanvas,
    0,
    0,
    cropWidth,
    cropHeight,
    0,
    0,
    canvas.width,
    canvas.height
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
  const [aspect] = useState<number>(4 / 3); // Cambiar relación de aspecto a 4:3
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Limpiar el estado cuando se cierra el modal o cambia la imagen
  useEffect(() => {
    if (!isOpen) {
      setCrop(undefined);
      setCompletedCrop(undefined);
      setIsImageLoaded(false);
      // Limpiar el canvas
      if (previewCanvasRef.current) {
        const ctx = previewCanvasRef.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(
            0,
            0,
            previewCanvasRef.current.width,
            previewCanvasRef.current.height
          );
        }
      }
    }
  }, [isOpen, imageUrl]);

  // Cuando la imagen se carga, establecer un recorte inicial
  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const initialCrop = centerAspectCrop(width, height, aspect || 1);
    setCrop(initialCrop);
    setCompletedCrop(undefined); // Limpiar el crop completado anterior
    setIsImageLoaded(true);
  };

  // Actualizar el canvas de vista previa cuando cambia el recorte o se carga la imagen
  useEffect(() => {
    if (isImageLoaded && imgRef.current && previewCanvasRef.current) {
      // Si no hay un crop completado, usar el crop actual
      const cropToUse = completedCrop || crop;
      if (cropToUse && cropToUse.width && cropToUse.height) {
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          cropToUse as PixelCrop
        );
      }
    }
  }, [completedCrop, crop, isImageLoaded]);

  const handleClose = () => {
    setCrop(undefined);
    setCompletedCrop(undefined);
    setIsImageLoaded(false);
    onClose();
  };

  // Función para aplicar el recorte y cerrar el modal
  const handleCropApply = () => {
    if (imgRef.current && previewCanvasRef.current && (completedCrop || crop)) {
      const cropToUse = completedCrop || crop;
      if (cropToUse && cropToUse.width && cropToUse.height) {
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          cropToUse as PixelCrop
        );
        previewCanvasRef.current.toBlob(
          (blob) => {
            if (blob) {
              // Mantener el formato original de la imagen
              const file = new File([blob], 'cropped-image', {
                type: blob.type,
              });
              onCropComplete(file);
              handleClose();
            }
          },
          undefined, // No forzar formato
          undefined // No forzar calidad
        );
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-auto'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold'>Recortar imagen</h2>
          <button
            onClick={handleClose}
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
            <div className='w-[250px] h-[200px] border border-gray-300 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center'>
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
            onClick={handleClose}
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

// Añadir exportación por defecto para garantizar compatibilidad
export default ImageCropModal;
