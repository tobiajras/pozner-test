'use client';

import { Edit, Trash, Plus } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { ImageCropModal } from './image-crop-modal';

interface ImageUploadProps {
  onImagesSelected: (files: File[]) => void;
  maxFiles?: number;
  accept?: string;
  defaultImageUrl?: string;
}

export function ImageUpload({
  onImagesSelected,
  maxFiles = 10,
  accept = 'image/*',
  defaultImageUrl,
}: ImageUploadProps) {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files).slice(
      0,
      maxFiles - selectedFiles.length
    );
    if (newFiles.length === 0) return;

    // Procesar todas las imágenes directamente
    const updatedFiles = [...selectedFiles, ...newFiles];
    setSelectedFiles(updatedFiles);
    onImagesSelected(updatedFiles);

    // Crear previsualizaciones para todas las imágenes
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result;
        if (result && typeof result === 'string') {
          setPreviewImages((prev) => [...prev, result]);
        }
      };
      reader.readAsDataURL(file);
    });

    if (e.target) {
      e.target.value = '';
    }
  };

  const removeImage = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviews = previewImages.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    setPreviewImages(newPreviews);
    onImagesSelected(newFiles);
  };

  const triggerFileInput = () => {
    document.getElementById('images')?.click();
  };

  return (
    <div>
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Imágenes ({selectedFiles.length}/{maxFiles})
        </label>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
          {/* Área para subir nueva imagen */}
          {selectedFiles.length < maxFiles && (
            <div
              className='border-2 border-dashed border-gray-300 rounded-md aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-red-400 transition-colors'
              onClick={triggerFileInput}
            >
              <Plus className='h-8 w-8 text-gray-400 mb-2' />
              <span className='text-sm text-gray-500'>Agregar</span>
            </div>
          )}

          {/* Vista previa de las imágenes */}
          {previewImages.map((src, index) => (
            <div
              key={index}
              className='relative border rounded-md overflow-hidden'
            >
              <div className='aspect-square relative'>
                <Image
                  src={src}
                  alt='Nueva imagen'
                  fill
                  className='object-cover'
                />
              </div>

              {/* Botón de eliminar */}
              <div className='absolute top-2 right-2'>
                <button
                  className='bg-white rounded-full p-1.5 shadow-sm text-red-500 hover:text-red-700 z-10'
                  onClick={() => removeImage(index)}
                  type='button'
                  title='Eliminar imagen'
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
          ))}

          {/* Imagen actual */}
          {defaultImageUrl && !previewImages.length && (
            <div className='relative border rounded-md overflow-hidden'>
              <div className='aspect-square relative'>
                <Image
                  src={defaultImageUrl}
                  alt='Imagen actual'
                  fill
                  className='object-cover'
                />
              </div>
            </div>
          )}
        </div>

        <input
          type='file'
          className='hidden'
          id='images'
          accept={accept}
          onChange={handleFileChange}
          multiple
        />
      </div>
    </div>
  );
}
