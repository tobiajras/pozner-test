'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
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
  crop: PixelCrop,
  rotation: number = 0
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

  // Configurar el tamaño del canvas
  canvas.width = cropWidth;
  canvas.height = cropHeight;

  // Limpiar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Aplicar rotación si es necesario
  if (rotation > 0) {
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
  }

  // Dibujar la imagen recortada
  ctx.drawImage(
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

  if (rotation > 0) {
    ctx.restore();
  }
}

export function ImageCropModal({
  isOpen,
  onClose,
  imageUrl,
  onCropComplete,
}: ImageCropModalProps) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [aspect] = useState<number>(4 / 3);
  const [rotation, setRotation] = useState<number>(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>(imageUrl);

  // Limpiar el estado cuando se cierra el modal
  useEffect(() => {
    if (!isOpen) {
      setCrop(undefined);
      setCompletedCrop(undefined);
      setIsImageLoaded(false);
      setRotation(0);
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
    const initialCrop = centerAspectCrop(width, height, aspect);
    setCrop(initialCrop);
    setCompletedCrop(undefined);
    setIsImageLoaded(true);
    setImgSrc(e.currentTarget.src);
  };

  // Rotar la imagen
  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  // Actualizar el canvas de vista previa
  useEffect(() => {
    if (isImageLoaded && imgRef.current && previewCanvasRef.current) {
      // Si no hay un crop completado, usar el crop actual
      const cropToUse = completedCrop || crop;
      if (cropToUse && cropToUse.width && cropToUse.height) {
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          cropToUse as PixelCrop,
          rotation
        );
      }
    }
  }, [completedCrop, crop, isImageLoaded, rotation]);

  const handleClose = () => {
    setCrop(undefined);
    setCompletedCrop(undefined);
    setIsImageLoaded(false);
    setRotation(0);
    onClose();
  };

  const handleCropApply = useCallback(() => {
    if (
      completedCrop?.width &&
      completedCrop?.height &&
      imgRef.current &&
      previewCanvasRef.current
    ) {
      // Crear un canvas temporal para el resultado final con rotación
      const tempCanvas = document.createElement('canvas');
      canvasPreview(imgRef.current, tempCanvas, completedCrop, rotation);

      // Detectar el tipo MIME de la imagen original
      let mimeType = 'image/jpeg'; // Valor predeterminado
      if (imgSrc.includes('image/png')) {
        mimeType = 'image/png';
      } else if (imgSrc.includes('image/webp')) {
        mimeType = 'image/webp';
      } else if (imgSrc.includes('image/gif')) {
        mimeType = 'image/gif';
      }

      // Obtener el blob con la imagen final
      tempCanvas.toBlob(
        (blob) => {
          if (!blob) {
            console.error('No se pudo crear el blob');
            return;
          }

          // Crear un nombre de archivo preservando la extensión original
          const fileExtension = mimeType.split('/')[1];
          const fileName = `cropped-image-${new Date().getTime()}.${fileExtension}`;

          // Crear un nuevo File a partir del blob
          const croppedFile = new File([blob], fileName, { type: mimeType });

          // Llamar al callback con el archivo recortado
          onCropComplete(croppedFile);
          onClose();
        },
        mimeType,
        1.0
      );
    }
  }, [completedCrop, onCropComplete, onClose, imgSrc, rotation]);

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

        <div className='hidden mb-4'>
          <button
            onClick={handleRotate}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          >
            Rotar 90°
          </button>
        </div>

        <div className='flex flex-col md:flex-row gap-6'>
          <div className='flex-1'>
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
              className='bg-gray-100'
            >
              <img
                ref={imgRef}
                src={imageUrl}
                alt='Imagen a recortar'
                onLoad={onImageLoad}
                style={{
                  transform: `rotate(${rotation}deg)`,
                  maxWidth: '100%',
                  transformOrigin: 'center center',
                }}
                className='max-h-[60vh]'
              />
            </ReactCrop>
          </div>

          <div className='w-full md:w-64'>
            <p className='text-sm font-medium text-gray-700 mb-2'>
              Vista previa
            </p>
            <div
              className='border border-gray-300 bg-gray-100 rounded-md overflow-hidden'
              style={{
                width: '100%',
                height: 0,
                paddingBottom: '75%', // Proporción 4:3
                position: 'relative',
              }}
            >
              <canvas
                ref={previewCanvasRef}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
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
            disabled={!completedCrop}
          >
            Aplicar recorte
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageCropModal;
