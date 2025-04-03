'use client';

import { Trash, Plus } from 'lucide-react';
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
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(-1);
  const [tempImageUrl, setTempImageUrl] = useState<string>('');
  const [tempFile, setTempFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const filesToProcess = Array.from(files).slice(
      0,
      maxFiles - selectedFiles.length
    );
    if (filesToProcess.length === 0) return;

    const file = filesToProcess[0];
    setTempFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setTempImageUrl(e.target.result as string);
        setCropModalOpen(true);
      }
    };
    reader.readAsDataURL(file);

    if (e.target) {
      e.target.value = '';
    }
  };

  const handleCropComplete = (croppedBlob: Blob) => {
    if (!tempFile) return;

    const croppedFile = new File([croppedBlob], tempFile.name, {
      type: tempFile.type,
      lastModified: tempFile.lastModified,
    });

    const newFiles = [croppedFile];
    setSelectedFiles(newFiles);
    onImagesSelected(newFiles);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPreviewImages([e.target.result as string]);
      }
    };
    reader.readAsDataURL(croppedBlob);

    setTempFile(null);
    setTempImageUrl('');
  };

  const removeImage = () => {
    setPreviewImages([]);
    setSelectedFiles([]);
    onImagesSelected([]);
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

          {/* Vista previa de la nueva imagen */}
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

              {/* Botones de acciones */}
              <div className='absolute top-2 right-2 flex gap-1'>
                <button
                  className='bg-white rounded-full p-1.5 shadow-sm text-red-500 hover:text-red-700 z-10'
                  onClick={removeImage}
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
        />
      </div>

      {/* Modal de recorte de imágenes */}
      <ImageCropModal
        isOpen={cropModalOpen}
        onClose={() => {
          setCropModalOpen(false);
          setCurrentImageIndex(-1);
          setTempImageUrl('');
          setTempFile(null);
        }}
        imageUrl={tempImageUrl}
        onCropComplete={handleCropComplete}
      />
    </div>
  );
}
