'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface ImageCropModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  onCropComplete: (croppedImage: File) => void;
}

export function ImageCropModal({
  isOpen,
  onClose,
  imageUrl,
  onCropComplete,
}: ImageCropModalProps) {
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(
    null
  );
  const [rotation, setRotation] = useState(0);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [cropArea, setCropArea] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    dragging: false,
    resizing: false,
    resizeHandle: '',
    startX: 0,
    startY: 0,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  // Cargar la imagen cuando se abre el modal
  useEffect(() => {
    if (isOpen && imageUrl) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        setOriginalImage(img);

        // Calcular dimensiones de contenedor
        if (containerRef.current) {
          // Ajustar tamaño para el área de recorte - reducido para mejor ajuste
          const containerWidth = Math.min(500, window.innerWidth * 0.5);
          const containerHeight = Math.min(350, window.innerHeight * 0.4);

          // Calcular escala para ajustar la imagen al contenedor
          const scale = Math.min(
            containerWidth / img.width,
            containerHeight / img.height
          );

          const scaledWidth = img.width * scale;
          const scaledHeight = img.height * scale;

          setContainerSize({
            width: scaledWidth,
            height: scaledHeight,
          });

          // Calcular dimensiones para evitar espacios en blanco
          // Determinar el tamaño máximo disponible para el área de recorte
          let maxCropWidth = scaledWidth * 0.85;
          let maxCropHeight = maxCropWidth * (3 / 4); // Aspecto 4:3

          // Si la altura calculada excede la altura de la imagen, recalcular basado en altura
          if (maxCropHeight > scaledHeight * 0.85) {
            maxCropHeight = scaledHeight * 0.85;
            maxCropWidth = maxCropHeight * (4 / 3); // Aspecto 4:3
          }

          // Centrar el área de recorte
          const cropX = (scaledWidth - maxCropWidth) / 2;
          const cropY = (scaledHeight - maxCropHeight) / 2;

          setCropArea({
            x: cropX,
            y: cropY,
            width: maxCropWidth,
            height: maxCropHeight,
            dragging: false,
            resizing: false,
            resizeHandle: '',
            startX: 0,
            startY: 0,
          });
        }
      };

      img.src = imageUrl;
    } else {
      // Reset al cerrar
      setRotation(0);
      setOriginalImage(null);
    }
  }, [isOpen, imageUrl]);

  // Actualizar canvas de vista previa
  const updatePreview = useCallback(() => {
    if (!originalImage || !canvasRef.current || !previewCanvasRef.current)
      return;

    const previewCanvas = previewCanvasRef.current;
    const ctx = previewCanvas.getContext('2d');
    if (!ctx) return;

    // Establecer tamaño de la vista previa (mantener aspecto 4:3)
    const previewWidth = 220;
    const previewHeight = previewWidth * (3 / 4);
    previewCanvas.width = previewWidth;
    previewCanvas.height = previewHeight;

    // Crear un canvas temporal para la rotación
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = containerSize.width;
    tempCanvas.height = containerSize.height;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;

    // Dibujar con rotación en el canvas temporal
    tempCtx.save();
    tempCtx.translate(tempCanvas.width / 2, tempCanvas.height / 2);
    tempCtx.rotate((rotation * Math.PI) / 180);
    tempCtx.drawImage(
      originalImage,
      -containerSize.width / 2,
      -containerSize.height / 2,
      containerSize.width,
      containerSize.height
    );
    tempCtx.restore();

    // Extraer área recortada y dibujarla en la vista previa
    ctx.drawImage(
      tempCanvas,
      cropArea.x,
      cropArea.y,
      cropArea.width,
      cropArea.height,
      0,
      0,
      previewWidth,
      previewHeight
    );
  }, [originalImage, containerSize, cropArea, rotation]);

  // Dibujar la imagen y el área de recorte
  useEffect(() => {
    if (!originalImage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar canvas con el tamaño del contenedor
    canvas.width = containerSize.width;
    canvas.height = containerSize.height;

    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar con rotación
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);

    // Centrar imagen
    const drawWidth = containerSize.width;
    const drawHeight = containerSize.height;
    ctx.drawImage(
      originalImage,
      -drawWidth / 2,
      -drawHeight / 2,
      drawWidth,
      drawHeight
    );

    ctx.restore();

    // Crear un rectángulo semi-transparente alrededor del área de recorte
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';

    // Dibujamos cuatro rectángulos para crear el efecto de "máscara"
    // 1. Área superior
    ctx.fillRect(0, 0, canvas.width, cropArea.y);

    // 2. Área izquierda
    ctx.fillRect(0, cropArea.y, cropArea.x, cropArea.height);

    // 3. Área derecha
    ctx.fillRect(
      cropArea.x + cropArea.width,
      cropArea.y,
      canvas.width - (cropArea.x + cropArea.width),
      cropArea.height
    );

    // 4. Área inferior
    ctx.fillRect(
      0,
      cropArea.y + cropArea.height,
      canvas.width,
      canvas.height - (cropArea.y + cropArea.height)
    );

    // Dibujar borde del área de recorte con líneas punteadas
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 3]); // Patrón de línea punteada: 5px visible, 3px invisible
    ctx.strokeRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height);

    // Restablecer línea a sólida para los handles
    ctx.setLineDash([]);

    // Dibujar handles de redimensionamiento (solo esquinas)
    const handleSize = 12;
    const halfHandle = handleSize / 2;
    const handles = [
      { x: cropArea.x - halfHandle, y: cropArea.y - halfHandle }, // top-left
      {
        x: cropArea.x + cropArea.width - halfHandle,
        y: cropArea.y - halfHandle,
      }, // top-right
      {
        x: cropArea.x + cropArea.width - halfHandle,
        y: cropArea.y + cropArea.height - halfHandle,
      }, // bottom-right
      {
        x: cropArea.x - halfHandle,
        y: cropArea.y + cropArea.height - halfHandle,
      }, // bottom-left
    ];

    // Dibujar solo el borde de los handles (sin relleno)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 1.5;
    handles.forEach((handle) => {
      ctx.strokeRect(handle.x, handle.y, handleSize, handleSize);
    });

    // Actualizar vista previa
    updatePreview();

    // Manejar cambio de cursor en función de la posición del ratón
    const updateCursor = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Verificar si el ratón está sobre un handle de redimensionamiento
      for (let i = 0; i < handles.length; i++) {
        const handle = handles[i];
        if (
          x >= handle.x &&
          x <= handle.x + handleSize &&
          y >= handle.y &&
          y <= handle.y + handleSize
        ) {
          // Asignar cursor según la posición del handle
          switch (i) {
            case 0: // top-left
              canvas.style.cursor = 'nwse-resize';
              return;
            case 1: // top-right
              canvas.style.cursor = 'nesw-resize';
              return;
            case 2: // bottom-right
              canvas.style.cursor = 'nwse-resize';
              return;
            case 3: // bottom-left
              canvas.style.cursor = 'nesw-resize';
              return;
          }
        }
      }

      // Verificar si el ratón está dentro del área de recorte
      if (
        x >= cropArea.x &&
        x <= cropArea.x + cropArea.width &&
        y >= cropArea.y &&
        y <= cropArea.y + cropArea.height
      ) {
        canvas.style.cursor = 'move';
      } else {
        canvas.style.cursor = 'default';
      }
    };

    // Asignar eventos para el cambio de cursor
    canvas.addEventListener('mousemove', updateCursor);

    // Limpiar eventos
    return () => {
      canvas.removeEventListener('mousemove', updateCursor);
    };
  }, [originalImage, containerSize, cropArea, rotation, updatePreview]);

  // Manejar inicio de arrastre
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!canvasRef.current) return;

      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Verificar si se está haciendo clic en un handle de redimensionamiento
      const handleSize = 12;
      const halfHandle = handleSize / 2;
      const handles = [
        { pos: 'tl', x: cropArea.x - halfHandle, y: cropArea.y - halfHandle },
        {
          pos: 'tr',
          x: cropArea.x + cropArea.width - halfHandle,
          y: cropArea.y - halfHandle,
        },
        {
          pos: 'br',
          x: cropArea.x + cropArea.width - halfHandle,
          y: cropArea.y + cropArea.height - halfHandle,
        },
        {
          pos: 'bl',
          x: cropArea.x - halfHandle,
          y: cropArea.y + cropArea.height - halfHandle,
        },
      ];

      for (const handle of handles) {
        if (
          x >= handle.x &&
          x <= handle.x + handleSize &&
          y >= handle.y &&
          y <= handle.y + handleSize
        ) {
          setCropArea((prev) => ({
            ...prev,
            resizing: true,
            resizeHandle: handle.pos,
            startX: x,
            startY: y,
          }));
          return;
        }
      }

      // Verificar si se está haciendo clic dentro del área de recorte
      if (
        x >= cropArea.x &&
        x <= cropArea.x + cropArea.width &&
        y >= cropArea.y &&
        y <= cropArea.y + cropArea.height
      ) {
        setCropArea((prev) => ({
          ...prev,
          dragging: true,
          startX: x,
          startY: y,
        }));
      }
    },
    [cropArea]
  );

  // Manejar movimiento de ratón
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!canvasRef.current || (!cropArea.dragging && !cropArea.resizing))
        return;

      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const deltaX = x - cropArea.startX;
      const deltaY = y - cropArea.startY;

      if (cropArea.dragging) {
        setCropArea((prev) => {
          // Calcular nueva posición
          let newX = prev.x + deltaX;
          let newY = prev.y + deltaY;

          // Limitar dentro del canvas
          newX = Math.max(0, Math.min(newX, containerSize.width - prev.width));
          newY = Math.max(
            0,
            Math.min(newY, containerSize.height - prev.height)
          );

          return {
            ...prev,
            x: newX,
            y: newY,
            startX: x,
            startY: y,
          };
        });
      } else if (cropArea.resizing) {
        // Redimensionar desde la esquina o borde correspondiente
        setCropArea((prev) => {
          let newX = prev.x;
          let newY = prev.y;
          let newWidth = prev.width;
          let newHeight = prev.height;

          // Mantener proporción 4:3
          const aspectRatio = 4 / 3;

          // Calcular cambios basados en qué esquina se está arrastrando
          switch (prev.resizeHandle) {
            case 'tl': // top-left
              // Determinar qué dimensión cambia más para mantener aspect ratio
              const tlDeltaXRatio = Math.abs(deltaX) / prev.width;
              const tlDeltaYRatio = Math.abs(deltaY) / prev.height;

              if (tlDeltaXRatio > tlDeltaYRatio) {
                // Si el cambio horizontal es mayor
                newX = Math.min(prev.x + deltaX, prev.x + prev.width - 30);
                newWidth = prev.width - (newX - prev.x);
                newHeight = newWidth / aspectRatio;
                newY = prev.y + prev.height - newHeight;
              } else {
                // Si el cambio vertical es mayor
                newY = Math.min(prev.y + deltaY, prev.y + prev.height - 30);
                newHeight = prev.height - (newY - prev.y);
                newWidth = newHeight * aspectRatio;
                newX = prev.x + prev.width - newWidth;
              }
              break;
            case 'tr': // top-right
              // Si se mueve horizontalmente
              if (Math.abs(deltaX) > Math.abs(deltaY)) {
                newWidth = Math.max(30, prev.width + deltaX);
                newHeight = newWidth / aspectRatio;
                newY = prev.y + prev.height - newHeight;
              } else {
                // Si se mueve verticalmente
                newY = Math.min(prev.y + deltaY, prev.y + prev.height - 30);
                newHeight = prev.height - (newY - prev.y);
                newWidth = newHeight * aspectRatio;
              }
              break;
            case 'br': // bottom-right
              // Si se mueve horizontalmente
              if (Math.abs(deltaX) > Math.abs(deltaY)) {
                newWidth = Math.max(30, prev.width + deltaX);
                newHeight = newWidth / aspectRatio;
              } else {
                // Si se mueve verticalmente
                newHeight = Math.max(30, prev.height + deltaY);
                newWidth = newHeight * aspectRatio;
              }
              break;
            case 'bl': // bottom-left
              // Si se mueve horizontalmente
              if (Math.abs(deltaX) > Math.abs(deltaY)) {
                newX = Math.min(prev.x + deltaX, prev.x + prev.width - 30);
                newWidth = prev.width - (newX - prev.x);
                newHeight = newWidth / aspectRatio;
              } else {
                // Si se mueve verticalmente
                newHeight = Math.max(30, prev.height + deltaY);
                newWidth = newHeight * aspectRatio;
                newX = prev.x + prev.width - newWidth;
              }
              break;
          }

          // Verificar límites
          if (newX < 0) {
            newWidth += newX;
            newX = 0;
            newHeight = newWidth / aspectRatio;
          }

          if (newY < 0) {
            newHeight += newY;
            newY = 0;
            newWidth = newHeight * aspectRatio;
          }

          if (newX + newWidth > containerSize.width) {
            newWidth = containerSize.width - newX;
            newHeight = newWidth / aspectRatio;
          }

          if (newY + newHeight > containerSize.height) {
            newHeight = containerSize.height - newY;
            newWidth = newHeight * aspectRatio;
          }

          return {
            ...prev,
            x: newX,
            y: newY,
            width: newWidth,
            height: newHeight,
            startX: x,
            startY: y,
          };
        });
      }
    },
    [cropArea, containerSize.width, containerSize.height]
  );

  // Manejar fin de arrastre
  const handleMouseUp = useCallback(() => {
    setCropArea((prev) => ({
      ...prev,
      dragging: false,
      resizing: false,
    }));
  }, []);

  // Rotar imagen en 90 grados
  const handleRotate = useCallback(() => {
    setRotation((prev) => (prev + 90) % 360);
  }, []);

  // Aplicar recorte final
  const handleCropApply = useCallback(() => {
    if (!originalImage || !canvasRef.current) return;

    try {
      // Crear un canvas para la imagen final recortada
      const finalCanvas = document.createElement('canvas');

      // Calcular escala para aplicar al tamaño real de la imagen
      const scaleX = originalImage.width / containerSize.width;
      const scaleY = originalImage.height / containerSize.height;

      // Configurar tamaño del canvas final
      finalCanvas.width = cropArea.width * scaleX;
      finalCanvas.height = cropArea.height * scaleY;

      const finalCtx = finalCanvas.getContext('2d');
      if (!finalCtx) return;

      // Si hay rotación, necesitamos un enfoque diferente
      if (rotation !== 0) {
        // Crear canvas temporal para toda la imagen rotada
        const tempCanvas = document.createElement('canvas');
        const tempSize =
          Math.max(originalImage.width, originalImage.height) * 1.5;
        tempCanvas.width = tempSize;
        tempCanvas.height = tempSize;

        const tempCtx = tempCanvas.getContext('2d');
        if (!tempCtx) return;

        // Centrar y rotar la imagen original
        tempCtx.save();
        tempCtx.translate(tempSize / 2, tempSize / 2);
        tempCtx.rotate((rotation * Math.PI) / 180);
        tempCtx.drawImage(
          originalImage,
          -originalImage.width / 2,
          -originalImage.height / 2
        );
        tempCtx.restore();

        // Calcular posición equivalente en la imagen original rotada
        const centerCanvasX = containerSize.width / 2;
        const centerCanvasY = containerSize.height / 2;

        // Calcular el offset desde el centro de la imagen canvas
        const offsetX = cropArea.x + cropArea.width / 2 - centerCanvasX;
        const offsetY = cropArea.y + cropArea.height / 2 - centerCanvasY;

        // Escalar este offset al tamaño real
        const scaledOffsetX = offsetX * scaleX;
        const scaledOffsetY = offsetY * scaleY;

        // Posición para extraer en la imagen temporal rotada
        const cropX = tempSize / 2 + scaledOffsetX - finalCanvas.width / 2;
        const cropY = tempSize / 2 + scaledOffsetY - finalCanvas.height / 2;

        // Copiar área recortada al canvas final
        finalCtx.drawImage(
          tempCanvas,
          cropX,
          cropY,
          finalCanvas.width,
          finalCanvas.height,
          0,
          0,
          finalCanvas.width,
          finalCanvas.height
        );
      } else {
        // Si no hay rotación, es más sencillo
        finalCtx.drawImage(
          originalImage,
          cropArea.x * scaleX,
          cropArea.y * scaleY,
          cropArea.width * scaleX,
          cropArea.height * scaleY,
          0,
          0,
          finalCanvas.width,
          finalCanvas.height
        );
      }

      // Convertir canvas a blob
      finalCanvas.toBlob(
        (blob) => {
          if (!blob) {
            console.error('No se pudo crear el blob');
            return;
          }

          // Determinar tipo MIME
          let mimeType = 'image/jpeg';
          if (imageUrl.includes('.png') || imageUrl.includes('image/png')) {
            mimeType = 'image/png';
          } else if (
            imageUrl.includes('.webp') ||
            imageUrl.includes('image/webp')
          ) {
            mimeType = 'image/webp';
          } else if (
            imageUrl.includes('.gif') ||
            imageUrl.includes('image/gif')
          ) {
            mimeType = 'image/gif';
          }

          // Crear nombre de archivo
          const fileExtension = mimeType.split('/')[1];
          const fileName = `cropped-image-${new Date().getTime()}.${fileExtension}`;

          // Crear archivo final
          const croppedFile = new File([blob], fileName, { type: mimeType });

          // Enviar resultado
          onCropComplete(croppedFile);
          onClose();
        },
        'image/jpeg',
        0.95
      );
    } catch (error) {
      console.error('Error al aplicar el recorte:', error);
    }
  }, [
    originalImage,
    containerSize,
    cropArea,
    rotation,
    imageUrl,
    onCropComplete,
    onClose,
  ]);

  // Habilitar movimiento en dispositivos móviles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length !== 1) return;

      // Simular evento de ratón
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent('mousedown', {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      canvas.dispatchEvent(mouseEvent);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length !== 1) return;

      // Simular evento de ratón
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      canvas.dispatchEvent(mouseEvent);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      const mouseEvent = new MouseEvent('mouseup');
      canvas.dispatchEvent(mouseEvent);
    };

    // Agregar listeners
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });

    // Limpiar
    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg shadow-md max-w-3xl mx-auto'>
        <div className='flex justify-between items-center px-4 py-2 border-b'>
          <h2 className='text-lg font-medium'>Recortar imagen</h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
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

        <div className='flex flex-row'>
          {/* Área de recorte - Izquierda */}
          <div className='p-3 flex items-center justify-center'>
            <div ref={containerRef}>
              <canvas
                ref={canvasRef}
                width={containerSize.width}
                height={containerSize.height}
                className='border border-gray-200'
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              />
            </div>
          </div>

          {/* Vista previa y controles - Derecha */}
          <div
            className='p-3 flex flex-col items-center justify-start border-l'
            style={{ width: '230px' }}
          >
            <button
              onClick={handleRotate}
              className='mb-3 px-4 py-2.5 bg-indigo-800 text-white text-sm rounded-lg hover:bg-indigo-700 w-full transition-colors duration-200 flex items-center justify-center gap-2 font-medium shadow-sm'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8' />
                <path d='M3 3v5h5' />
              </svg>
              Rotar 90°
            </button>

            <div className='mb-3'>
              <p className='text-sm font-medium text-gray-700 mb-1 text-center'>
                Vista previa
              </p>
              <canvas
                ref={previewCanvasRef}
                className='border border-gray-300 rounded-md'
                width={220}
                height={165}
              />
            </div>

            <div className='flex justify-center gap-2 mt-auto'>
              <button
                type='button'
                onClick={onClose}
                className='px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50'
              >
                Cancelar
              </button>
              <button
                type='button'
                onClick={handleCropApply}
                className='px-5 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600'
                disabled={!originalImage}
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageCropModal;
