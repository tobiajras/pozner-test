'use client';

import { useState, useEffect } from 'react';
import catalogo from '@/data/catalogo.json';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface AutoVendido {
  id: string;
  marca: string;
  marcaId: string;
  modelo: string;
  año: number;
  precio: number;
  imagenes: string[];
  fechaVenta: string;
  descripcion: string;
  kilometraje: number;
  combustible: string;
  transmision: string;
  puertas: number;
  categoria: string;
}

export default function HistorialPage() {
  const [autosVendidos, setAutosVendidos] = useState<AutoVendido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAutosVendidos = async () => {
      try {
        // Simular que los últimos 5 autos del catálogo están vendidos
        const vendidos = catalogo.slice(-5).map((auto) => ({
          ...auto,
          año: auto.ano,
          precio: Math.floor(Math.random() * (25000000 - 15000000) + 15000000), // Precio aleatorio entre 15M y 25M
          fechaVenta: new Date(
            Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
          ).toISOString(), // Fecha aleatoria en los últimos 30 días
          imagenes: auto.images,
          descripcion: auto.name,
          marcaId: auto.marcaId,
        }));
        setAutosVendidos(vendidos);
      } catch (error) {
        console.error('Error al cargar los autos vendidos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAutosVendidos();
  }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-color-primary'></div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-semibold text-color-text mb-6'>
        Historial de Ventas
      </h1>

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
                <Image
                  priority={idx < 4 ? true : false}
                  src={`/assets/catalogo/${auto.marca}/${auto.id}/${auto.imagenes[0]}`}
                  alt={`${auto.marca} ${auto.modelo}`}
                  fill
                  className='object-cover rounded-lg'
                />
                <div className='absolute top-3 right-3 bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-medium'>
                  Vendido
                </div>
              </div>
              <div className='flex-grow'>
                <div className='space-y-4'>
                  <div>
                    <h3 className='text-xl font-semibold text-color-text'>
                      {auto.marca} {auto.modelo}
                    </h3>
                    <p className='text-gray-600 mt-1'>{auto.año}</p>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <p className='text-sm text-gray-500'>Precio de venta</p>
                      <p className='text-2xl font-bold text-color-primary mt-1'>
                        ${auto.precio.toLocaleString('es-AR')}
                      </p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-500'>Fecha de venta</p>
                      <p className='text-lg font-medium text-gray-700 mt-1'>
                        {new Date(auto.fechaVenta).toLocaleDateString('es-AR')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
