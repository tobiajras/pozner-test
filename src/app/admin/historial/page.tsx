'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { RefreshCw } from 'lucide-react';

// URL base del API
const API_BASE_URL = 'https://api.fratelliautomotores.com.ar';

interface AutoVendido {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: string;
  thumbnailUrl: string;
  sellDate: string;
  createdAt: string;
  updatedAt: string;
}

export default function HistorialPage() {
  const [autosVendidos, setAutosVendidos] = useState<AutoVendido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAutosVendidos = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = Cookies.get('admin-auth');
      const response = await fetch(`${API_BASE_URL}/api/sells`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(
          `Error ${response.status}: No se pudieron cargar los autos vendidos`
        );
      }

      const data: AutoVendido[] = await response.json();
      setAutosVendidos(data);
    } catch (error) {
      console.error('Error al cargar los autos vendidos:', error);
      setError(
        error instanceof Error
          ? error.message
          : 'Error al cargar los autos vendidos'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAutosVendidos();
  }, []);

  if (loading && autosVendidos.length === 0) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-color-primary'></div>
      </div>
    );
  }

  console.log(autosVendidos);

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-semibold text-color-text'>
          Historial de Ventas{' '}
          {loading && (
            <RefreshCw className='inline ml-2 h-5 w-5 animate-spin' />
          )}
        </h1>
      </div>

      {error && (
        <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6'>
          {error}
        </div>
      )}

      {autosVendidos.length === 0 && !loading && !error ? (
        <div className='text-center py-10 bg-gray-50 rounded-lg'>
          <p className='text-gray-500'>No hay autos vendidos para mostrar</p>
          <button
            onClick={() => fetchAutosVendidos()}
            className='mt-4 px-4 py-2 bg-color-primary text-white rounded-lg hover:bg-color-primary/90 transition-colors'
          >
            Cargar historial
          </button>
        </div>
      ) : (
        <div className='space-y-6'>
          {autosVendidos.map((auto, idx) => (
            <motion.div
              key={auto.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6'
            >
              <div className='flex flex-col md:flex-row gap-6'>
                <div className='relative w-full md:w-44 h-32 flex-shrink-0'>
                  {auto.thumbnailUrl ? (
                    <Image
                      priority={idx < 4 ? true : false}
                      src={auto.thumbnailUrl}
                      alt={`${auto.brand} ${auto.model}`}
                      fill
                      className='object-cover rounded-lg'
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center bg-gray-100 rounded-lg'>
                      <span className='text-gray-400'>Sin imagen</span>
                    </div>
                  )}
                  <div className='absolute top-3 right-3 bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-medium'>
                    Vendido
                  </div>
                </div>
                <div className='flex-grow'>
                  <div className='space-y-4'>
                    <div>
                      <h3 className='text-xl font-semibold text-color-text'>
                        {auto.brand} {auto.model}
                      </h3>
                      <p className='text-gray-600 mt-1'>{auto.year}</p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div>
                        <p className='text-sm text-gray-500'>Precio de venta</p>
                        <p className='text-2xl font-bold text-color-primary mt-1'>
                          ${parseFloat(auto.price).toLocaleString('es-AR')}
                        </p>
                      </div>
                      <div>
                        <p className='text-sm text-gray-500'>Fecha de venta</p>
                        <p className='text-lg font-medium text-gray-700 mt-1'>
                          {new Date(auto.sellDate).toLocaleDateString('es-AR')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
