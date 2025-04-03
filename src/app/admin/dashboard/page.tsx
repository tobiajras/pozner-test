'use client';

import { useState, useEffect } from 'react';
import catalogo from '@/data/catalogo.json';
import AutoModal from '../components/AutoModal';
import { motion } from 'framer-motion';
import { Edit, Trash, Plus } from 'lucide-react';
import Image from 'next/image';

interface Auto {
  id: string;
  marca: string;
  marcaId: string;
  modelo: string;
  año: number;
  precio: number;
  estado: 'activo' | 'pausado' | 'vendido';
  imagenes: string[];
  descripcion: string;
  kilometraje: number;
  combustible: string;
  transmision: string;
  puertas: number;
  categoria: string;
}

export default function DashboardPage() {
  const [autos, setAutos] = useState<Auto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAuto, setSelectedAuto] = useState<Auto | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAutos = async () => {
      try {
        // Transformar los datos del catálogo al formato requerido
        const autosFormateados = catalogo.map((auto) => ({
          ...auto,
          año: auto.ano,
          precio: 0, // Por defecto, se puede actualizar después
          estado: 'activo' as const,
          descripcion: auto.name,
          imagenes: auto.images,
        }));
        setAutos(autosFormateados);
      } catch (error) {
        console.error('Error al cargar los autos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAutos();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este auto?')) return;

    try {
      setAutos((prev) => prev.filter((auto) => auto.id !== id));
    } catch (error) {
      console.error('Error al eliminar el auto:', error);
    }
  };

  const handleToggleEstado = async (id: string) => {
    try {
      setAutos((prev) =>
        prev.map((auto) =>
          auto.id === id
            ? {
                ...auto,
                estado: auto.estado === 'activo' ? 'pausado' : 'activo',
              }
            : auto
        )
      );
    } catch (error) {
      console.error('Error al cambiar el estado del auto:', error);
    }
  };

  const handleSubmit = async (data: Omit<Auto, 'id'>) => {
    try {
      if (selectedAuto) {
        // Actualizar auto existente
        setAutos((prev) =>
          prev.map((auto) =>
            auto.id === selectedAuto.id ? { ...auto, ...data } : auto
          )
        );
      } else {
        // Agregar nuevo auto
        const newAuto = {
          ...data,
          id: Date.now().toString(),
          estado: 'activo' as const,
        };
        setAutos((prev) => [...prev, newAuto]);
      }
      setIsModalOpen(false);
      setSelectedAuto(undefined);
    } catch (error) {
      console.error('Error al guardar el auto:', error);
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-color-primary'></div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-semibold text-color-text'>
          Autos Activos
        </h1>
        <button
          onClick={() => {
            setSelectedAuto(undefined);
            setIsModalOpen(true);
          }}
          className='px-4 py-2 bg-color-primary text-white rounded-lg hover:bg-color-primary/90 transition-colors flex items-center gap-2'
        >
          <Plus size={20} />
          Agregar Auto
        </button>
      </div>

      <div className='space-y-4'>
        {autos.map((auto, idx) => (
          <motion.div
            key={auto.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex items-center gap-4'
          >
            <div className='relative w-44 h-32 flex-shrink-0'>
              <Image
                priority={idx < 4 ? true : false}
                src={`/assets/catalogo/${auto.marca}/${auto.id}/${auto.imagenes[0]}`}
                alt={`/assets/catalogo/${auto.marca}/${auto.id}/${auto.imagenes[0]}`}
                fill
                className='object-cover rounded-lg'
              />
              {auto.estado === 'pausado' && (
                <div className='absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg'>
                  <span className='text-white font-semibold'>Pausado</span>
                </div>
              )}
            </div>
            <div className='flex-grow'>
              <div className='flex justify-between items-start'>
                <div>
                  <h3 className='text-lg font-semibold text-color-text'>
                    {auto.marca} {auto.modelo}
                  </h3>
                  <p className='text-gray-600'>{auto.año}</p>
                  <p className='text-xl font-bold text-color-primary mt-1'>
                    ${auto.precio.toLocaleString('es-AR')}
                  </p>
                  <p className='text-sm text-gray-500 mt-2'>
                    {auto.kilometraje.toLocaleString('es-AR')} km •{' '}
                    {auto.combustible}
                  </p>
                </div>
                <div className='flex gap-2'>
                  <button
                    onClick={() => handleToggleEstado(auto.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      auto.estado === 'activo'
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                    }`}
                  >
                    {auto.estado === 'activo' ? 'Activo' : 'Pausado'}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedAuto(auto);
                      setIsModalOpen(true);
                    }}
                    className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                  >
                    <Edit size={20} className='text-color-primary' />
                  </button>
                  <button
                    onClick={() => handleDelete(auto.id)}
                    className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                  >
                    <Trash size={20} className='text-red-500' />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AutoModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAuto(undefined);
        }}
        onSubmit={handleSubmit}
        initialData={selectedAuto}
      />
    </div>
  );
}
