'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon';

const API_BASE_URL = 'https://api.fratelliautomotores.com.ar/api';

interface ApiCar {
  id: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  price: string;
  description: string;
  categoryId: string;
  mileage: number;
  transmission: string;
  fuel: string;
  doors: number;
  position: number;
  featured: boolean;
  favorite: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  Category: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  Images: {
    thumbnailUrl: string;
  }[];
}

export default function AutoDetailPage() {
  const { id } = useParams();
  const [car, setCar] = useState<ApiCar | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/cars/${id}`);
        if (!response.ok) {
          throw new Error('Error al cargar el vehículo');
        }
        const data = await response.json();
        setCar(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'Error al cargar el vehículo'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-color-primary'></div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <p className='text-red-500 mb-4'>{error || 'Vehículo no encontrado'}</p>
        <Link
          href='/catalogo'
          className='text-color-primary hover:text-color-primary-dark'
        >
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <Link
        href='/catalogo'
        className='inline-flex items-center text-color-primary hover:text-color-primary-dark mb-8'
      >
        <ArrowLeftIcon className='w-5 h-5 mr-2' />
        Volver al catálogo
      </Link>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Galería de imágenes */}
        <div className='space-y-4'>
          {car.Images.map((image, index) => (
            <div
              key={index}
              className='relative aspect-video rounded-lg overflow-hidden'
            >
              <Image
                src={image.thumbnailUrl}
                alt={`${car.brand} ${car.model} - Imagen ${index + 1}`}
                fill
                className='object-cover'
              />
            </div>
          ))}
        </div>

        {/* Información del vehículo */}
        <div className='space-y-6'>
          <div>
            <h1 className='text-3xl font-bold text-color-title'>
              {car.brand} {car.model}
            </h1>
            <p className='text-2xl font-semibold text-color-primary mt-2'>
              ${parseFloat(car.price).toLocaleString('es-AR')}
            </p>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <p className='text-sm text-gray-500'>Año</p>
              <p className='font-medium'>{car.year}</p>
            </div>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <p className='text-sm text-gray-500'>Kilometraje</p>
              <p className='font-medium'>
                {car.mileage.toLocaleString('es-AR')} km
              </p>
            </div>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <p className='text-sm text-gray-500'>Transmisión</p>
              <p className='font-medium'>{car.transmission}</p>
            </div>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <p className='text-sm text-gray-500'>Combustible</p>
              <p className='font-medium'>{car.fuel}</p>
            </div>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <p className='text-sm text-gray-500'>Puertas</p>
              <p className='font-medium'>{car.doors}</p>
            </div>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <p className='text-sm text-gray-500'>Categoría</p>
              <p className='font-medium'>{car.Category.name}</p>
            </div>
          </div>

          <div>
            <h2 className='text-xl font-semibold mb-2'>Descripción</h2>
            <p className='text-gray-600'>{car.description}</p>
          </div>

          <div className='pt-6'>
            <button className='w-full bg-color-primary text-white py-3 px-6 rounded-lg hover:bg-color-primary-dark transition-colors'>
              Consultar por este vehículo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
