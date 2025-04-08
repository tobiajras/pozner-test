'use client';

import { ImageIcon, X, Edit, Trash, Plus, GripVertical } from 'lucide-react';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { ImageCropModal } from './image-crop-modal';

interface ImageUploadProps {
  onImagesSelected: (files: File[]) => void;
  maxFiles?: number;
  accept?: string;
  defaultImageUrl?: string;
  showCrop?: boolean;
}

export function ImageUpload({
  onImagesSelected,
  maxFiles = 10,
  accept = 'image/*',
  defaultImageUrl,
  showCrop = false,
}: ImageUploadProps) {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(-1);
  const [tempImageUrl, setTempImageUrl] = useState<string>('');
  const [tempFile, setTempFile] = useState<File | null>(null);
  const [editingIndex, setEditingIndex] = useState<number>(-1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const filesToProcess = Array.from(files).slice(
      0,
      maxFiles - selectedFiles.length
    );
    if (filesToProcess.length === 0) return;

    // Si showCrop es true y se seleccionó una sola imagen, mostrar el modal de recorte
    if (showCrop && filesToProcess.length === 1) {
      const file = filesToProcess[0];
      setTempFile(file);
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result;
        if (result && typeof result === 'string') {
          setTempImageUrl(result);
          setCropModalOpen(true);
        }
      };
      reader.readAsDataURL(file);
    } else {
      // Si showCrop es false o se seleccionaron múltiples imágenes, procesar directamente
      const newFiles = [...selectedFiles, ...filesToProcess];
      setSelectedFiles(newFiles);
      onImagesSelected(newFiles);

      // Crear previsualizaciones para todas las imágenes
      filesToProcess.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const result = e.target?.result;
          if (result && typeof result === 'string') {
            setPreviewImages((prev) => [...prev, result]);
          }
        };
        reader.readAsDataURL(file);
      });
    }

    if (e.target) {
      e.target.value = '';
    }
  };

  const handleEditImage = (index: number) => {
    const file = selectedFiles[index];
    setEditingIndex(index);
    setTempFile(file);
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const result = e.target?.result;
      if (result && typeof result === 'string') {
        setTempImageUrl(result);
        setCropModalOpen(true);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedFile: File) => {
    if (!tempFile) return;

    let newFiles: File[];
    let newPreviews: string[];

    if (editingIndex >= 0) {
      // Si estamos editando una imagen existente
      newFiles = selectedFiles.map((file, i) =>
        i === editingIndex ? croppedFile : file
      );
      newPreviews = [...previewImages];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result;
        if (result && typeof result === 'string') {
          newPreviews[editingIndex] = result;
          setPreviewImages(newPreviews);
        }
      };
      reader.readAsDataURL(croppedFile);
    } else {
      // Si es una nueva imagen
      newFiles = [...selectedFiles, croppedFile];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result;
        if (result && typeof result === 'string') {
          setPreviewImages([...previewImages, result]);
        }
      };
      reader.readAsDataURL(croppedFile);
    }

    setSelectedFiles(newFiles);
    onImagesSelected(newFiles);
    setTempFile(null);
    setTempImageUrl('');
    setEditingIndex(-1);
    setCropModalOpen(false);
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

              {/* Botones de acciones */}
              <div className='absolute top-2 right-2 flex gap-1'>
                <button
                  className='bg-white rounded-full p-1.5 shadow-sm text-blue-500 hover:text-blue-700 z-10'
                  onClick={() => handleEditImage(index)}
                  type='button'
                  title='Editar imagen'
                >
                  <Edit size={16} />
                </button>
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

      {/* Modal de recorte de imágenes */}
      <ImageCropModal
        isOpen={cropModalOpen}
        onClose={() => {
          setCropModalOpen(false);
          setCurrentImageIndex(-1);
          setTempImageUrl('');
          setTempFile(null);
          setEditingIndex(-1);
        }}
        imageUrl={tempImageUrl}
        onCropComplete={handleCropComplete}
      />
    </div>
  );
}
