'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { RefreshCw, Trash2 } from 'lucide-react';
import { ConfirmModal } from '../components/ConfirmModal';
import { Notification } from '../components/Notification';

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
  const [eliminando, setEliminando] = useState<string | null>(null);
  const [ventaAEliminar, setVentaAEliminar] = useState<AutoVendido | null>(
    null
  );
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [notification, setNotification] = useState({
    isOpen: false,
    message: '',
    type: 'success' as 'success' | 'error',
  });

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

  const confirmarEliminarVenta = (auto: AutoVendido) => {
    setVentaAEliminar(auto);
    setDeleteModalOpen(true);
  };

  const eliminarVenta = async () => {
    if (!ventaAEliminar) return;

    const id = ventaAEliminar.id;
    setEliminando(id);
    try {
      const token = Cookies.get('admin-auth');
      const response = await fetch(`${API_BASE_URL}/api/sells/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(
          `Error ${response.status}: No se pudo eliminar la venta`
        );
      }

      // Actualizar la lista después de eliminar
      setAutosVendidos(autosVendidos.filter((auto) => auto.id !== id));
      setNotification({
        isOpen: true,
        message: `La venta del ${ventaAEliminar.model} ha sido eliminada correctamente.`,
        type: 'success',
      });
    } catch (error) {
      console.error('Error al eliminar la venta:', error);
      setNotification({
        isOpen: true,
        message:
          error instanceof Error ? error.message : 'Error al eliminar la venta',
        type: 'error',
      });
    } finally {
      setEliminando(null);
      setVentaAEliminar(null);
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
        </div>
      ) : (
        <div className='space-y-6'>
          {autosVendidos.map((auto, idx) => (
            <motion.div
              key={auto.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='bg-white rounded-lg [box-shadow:0_0_10px_rgba(0,0,0,0.07)] p-6'
            >
              <div className='flex flex-col md:flex-row gap-6'>
                <div className='relative w-[145px] h-[116px] md:w-[170px] md:h-[136px] flex-shrink-0'>
                  {auto.thumbnailUrl ? (
                    <Image
                      priority={idx < 4 ? true : false}
                      src={auto.thumbnailUrl}
                      alt={`${auto.model}`}
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
                    <div className='flex justify-between items-start'>
                      <div>
                        <h3 className='text-xl font-semibold text-color-text'>
                          {auto.model}
                        </h3>
                        <p className='text-gray-600 mt-1'>{auto.year}</p>
                      </div>
                      <button
                        onClick={() => confirmarEliminarVenta(auto)}
                        disabled={eliminando === auto.id}
                        className='text-red-500 hover:text-red-700 p-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-red-200'
                        title='Eliminar venta'
                      >
                        {eliminando === auto.id ? (
                          <div className='h-5 w-5 border-t-2 border-red-500 border-solid rounded-full animate-spin'></div>
                        ) : (
                          <Trash2 size={20} />
                        )}
                      </button>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      {auto.price && parseFloat(auto.price) > 0 ? (
                        <div>
                          <p className='text-sm text-gray-500'>
                            Precio de venta
                          </p>
                          <p className='text-2xl font-bold text-color-primary mt-1'>
                            ${parseFloat(auto.price).toLocaleString('es-AR')}
                          </p>
                        </div>
                      ) : (
                        ''
                      )}

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

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setVentaAEliminar(null);
        }}
        onConfirm={eliminarVenta}
        title='Eliminar Venta'
        message={`¿Estás seguro de que deseas eliminar la venta del ${ventaAEliminar?.model} ${ventaAEliminar?.year}? Esta acción no se puede deshacer.`}
        confirmText='Eliminar'
      />

      <Notification
        isOpen={notification.isOpen}
        onClose={() => setNotification((prev) => ({ ...prev, isOpen: false }))}
        type={notification.type}
        message={notification.message}
      />
    </div>
  );
}
