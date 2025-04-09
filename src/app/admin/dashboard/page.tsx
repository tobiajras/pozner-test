'use client';

import { useState, useEffect } from 'react';
import AutoModal from '../components/AutoModal';
import { motion } from 'framer-motion';
import { Edit, Trash, Plus, RefreshCw, Star, Zap } from 'lucide-react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { ConfirmModal } from '../components/ConfirmModal';
import SellConfirmModal from '../components/SellConfirmModal';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { Notification } from '../components/Notification';

// URL base del API
const API_BASE_URL = 'https://api.fratelliautomotores.com.ar';

interface Imagen {
  thumbnailUrl: string;
}

interface Categoria {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface Auto {
  id: string;
  marca: string;
  marcaId: string;
  modelo: string;
  año: number;
  precio: number;
  active: boolean;
  imagenes: string[];
  descripcion: string;
  kilometraje: number;
  combustible: string;
  transmision: string;
  puertas: number;
  categoria: string;
  categoriaId: string;
  destacado: boolean;
  favorito: boolean;
}

// Interfaz para la respuesta de la API
interface ApiCar {
  id: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  price: string;
  description: string;
  position: number;
  featured: boolean;
  favorite: boolean;
  active: boolean;
  categoryId: string;
  mileage: number;
  transmission: string;
  fuel: string;
  doors: number;
  createdAt: string;
  updatedAt: string;
  Category: Categoria;
  Images: Imagen[];
}

interface ApiResponse {
  total: number;
  totalPages: number;
  currentPage: number;
  cars: ApiCar[];
}

interface FormData {
  id?: string;
  marca: string;
  marcaId: string;
  modelo: string;
  año: number;
  kilometraje: number;
  transmision: string;
  combustible: string;
  puertas: number;
  precio: number;
  descripcion: string;
  imagenes: string[];
  categoria: string;
}

export default function DashboardPage() {
  const [autos, setAutos] = useState<Auto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAuto, setSelectedAuto] = useState<Auto | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalAutos, setTotalAutos] = useState(0);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [autoToDelete, setAutoToDelete] = useState<Auto | null>(null);
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [autoToSell, setAutoToSell] = useState<Auto | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [notification, setNotification] = useState<{
    isOpen: boolean;
    type: 'success' | 'error';
    message: string;
  }>({
    isOpen: false,
    type: 'success',
    message: '',
  });

  const fetchAutos = async (page = 1, append = false) => {
    if (page === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    setError(null);
    try {
      const token = Cookies.get('admin-auth');
      const response = await fetch(
        `${API_BASE_URL}/api/cars?page=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Error ${response.status}: No se pudieron cargar los autos`
        );
      }

      const data: ApiResponse = await response.json();

      const autosFormateados: Auto[] = data.cars.map((car) => ({
        id: car.id,
        marca: car.brand,
        marcaId: car.brand.toLowerCase(),
        modelo: car.model,
        año: car.year,
        precio: parseFloat(car.price),
        active: car.active,
        imagenes: car.Images.map((img) => img.thumbnailUrl),
        descripcion: car.description,
        kilometraje: car.mileage,
        combustible: car.fuel,
        transmision: car.transmission,
        puertas: car.doors,
        categoria: car.Category?.name || 'Sin categoría',
        categoriaId: car.categoryId,
        destacado: car.featured,
        favorito: car.favorite,
      }));

      setAutos((prev) =>
        append ? [...prev, ...autosFormateados] : autosFormateados
      );
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
      setTotalAutos(data.total);
    } catch (error) {
      console.error('Error al cargar los autos:', error);
      setError(
        error instanceof Error ? error.message : 'Error al cargar los autos'
      );
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (currentPage < totalPages && !loadingMore) {
      fetchAutos(currentPage + 1, true);
    }
  };

  const observer = useInfiniteScroll({
    onLoadMore: loadMore,
    hasMore: currentPage < totalPages,
    loading: loadingMore,
  });

  useEffect(() => {
    fetchAutos();
  }, []);

  const handleDeleteClick = (auto: Auto) => {
    setAutoToDelete(auto);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!autoToDelete) return;

    try {
      const token = Cookies.get('admin-auth');
      const response = await fetch(
        `${API_BASE_URL}/api/cars/${autoToDelete.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Error al eliminar el auto');
      }

      // Actualizar la lista local eliminando el auto y ajustando el total
      setAutos((prevAutos) =>
        prevAutos.filter((auto) => auto.id !== autoToDelete.id)
      );
      setTotalAutos((prev) => prev - 1);

      // Si la página actual queda vacía y no es la primera página, cargar la página anterior
      if (autos.length === 1 && currentPage > 1) {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        fetchAutos(prevPage, false);
      }

      // Mostrar notificación de éxito
      setNotification({
        isOpen: true,
        type: 'success',
        message: 'Auto eliminado con éxito',
      });
    } catch (error) {
      console.error('Error al eliminar el auto:', error);
      setNotification({
        isOpen: true,
        type: 'error',
        message: 'Error al eliminar el auto',
      });
    }
  };

  const handleToggleEstado = async (id: string, active: boolean) => {
    try {
      const token = Cookies.get('admin-auth');
      const response = await fetch(
        `${API_BASE_URL}/api/cars/${id}/toggle-active`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ active: !active }),
        }
      );

      if (!response.ok) {
        throw new Error('Error al cambiar el estado del auto');
      }

      // Obtener el auto actualizado de la respuesta
      const autoActualizado: ApiCar = await response.json();

      // Actualizar el auto en la lista local para evitar tener que recargar toda la lista
      setAutos((prevAutos) =>
        prevAutos.map((auto) =>
          auto.id === id
            ? {
                ...auto,
                active: autoActualizado.active,
              }
            : auto
        )
      );
    } catch (error) {
      console.error('Error al cambiar el estado del auto:', error);
      alert('Error al cambiar el estado del auto');
    }
  };

  const handleToggleDestacado = async (id: string) => {
    try {
      console.log('Toggling destacado para auto:', id);
      const token = Cookies.get('admin-auth');

      const response = await fetch(
        `${API_BASE_URL}/api/cars/${id}/toggle-featured`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(
          `Error al cambiar el estado de destacado del auto: ${response.status}`
        );
      }

      const autoActualizado = await response.json();
      console.log('Auto actualizado:', autoActualizado);

      setAutos((prevAutos) =>
        prevAutos.map((auto) =>
          auto.id === id
            ? {
                ...auto,
                destacado: autoActualizado.featured,
              }
            : auto
        )
      );
    } catch (error) {
      console.error('Error al cambiar el estado de destacado del auto:', error);
      alert('Error al cambiar el estado de destacado del auto');
    }
  };

  const handleToggleFavorito = async (id: string) => {
    try {
      console.log('Toggling favorito para auto:', id);
      const token = Cookies.get('admin-auth');

      const response = await fetch(
        `${API_BASE_URL}/api/cars/${id}/toggle-favorite`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(
          `Error al cambiar el estado de favorito del auto: ${response.status}`
        );
      }

      const autoActualizado = await response.json();
      console.log('Auto actualizado:', autoActualizado);

      setAutos((prevAutos) =>
        prevAutos.map((auto) =>
          auto.id === id
            ? {
                ...auto,
                favorito: autoActualizado.favorite,
              }
            : auto
        )
      );
    } catch (error) {
      console.error('Error al cambiar el estado de favorito del auto:', error);
      alert('Error al cambiar el estado de favorito del auto');
    }
  };

  const handleCreateAuto = async (
    data: Omit<FormData, 'id'> & { images?: File[] }
  ) => {
    try {
      console.log('Creando auto con datos:', data);
      const token = Cookies.get('admin-auth');

      // Crear un FormData para enviar los datos y las imágenes
      const formData = new FormData();

      // Agregar los campos de texto
      formData.append('brand', data.marca);
      formData.append('model', data.modelo);
      formData.append('year', data.año.toString());
      formData.append('price', data.precio.toString());
      formData.append('description', data.descripcion);
      formData.append('category', data.categoria);
      formData.append('mileage', data.kilometraje.toString());
      formData.append('transmission', data.transmision);
      formData.append('fuel', data.combustible);
      formData.append('doors', data.puertas.toString());
      formData.append('color', 'sin color');

      // Agregar las imágenes si existen
      if (data.images && data.images.length > 0) {
        data.images.forEach((imagen) => {
          formData.append('images', imagen);
        });
      }

      const response = await fetch(`${API_BASE_URL}/api/cars`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error en la respuesta del servidor:', errorData);
        throw new Error(errorData.message || 'Error al crear el auto');
      }

      // Cerrar el modal y actualizar la lista
      setIsModalOpen(false);
      setSelectedAuto(undefined);
      fetchAutos(currentPage);
    } catch (error) {
      console.error('Error al crear el auto:', error);
      alert(
        'Error al crear el auto: ' +
          (error instanceof Error ? error.message : 'Error desconocido')
      );
    }
  };

  const handleEditAuto = async (data: Omit<FormData, 'id'>) => {
    try {
      if (!selectedAuto) {
        throw new Error('No se ha seleccionado ningún auto para editar');
      }

      const token = Cookies.get('admin-auth');

      // Crear un FormData para enviar los datos y las imágenes
      const formData = new FormData();

      // Agregar los campos de texto
      formData.append('brand', data.marca);
      formData.append('model', data.modelo);
      formData.append('year', data.año.toString());
      formData.append('price', data.precio.toString());
      formData.append('description', data.descripcion);
      formData.append('category', data.categoria);
      formData.append('mileage', data.kilometraje.toString());
      formData.append('transmission', data.transmision);
      formData.append('fuel', data.combustible);
      formData.append('doors', data.puertas.toString());
      formData.append('color', 'sin color');

      const response = await fetch(
        `${API_BASE_URL}/api/cars/${selectedAuto.id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error en la respuesta del servidor:', errorData);
        throw new Error(errorData.message || 'Error al actualizar el auto');
      }

      // Cerrar el modal y actualizar la lista
      setIsModalOpen(false);
      setSelectedAuto(undefined);
      fetchAutos(currentPage);
    } catch (error) {
      console.error('Error al actualizar el auto:', error);
      alert(
        'Error al actualizar el auto: ' +
          (error instanceof Error ? error.message : 'Error desconocido')
      );
    }
  };

  const handleSellClick = (auto: Auto) => {
    setAutoToSell(auto);
    setSellModalOpen(true);
  };

  const handleSellConfirm = async () => {
    if (!autoToSell) return;

    try {
      const token = Cookies.get('admin-auth');
      const response = await fetch(
        `${API_BASE_URL}/api/sells/${autoToSell.id}/sell`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sellDate: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || 'Error al marcar el auto como vendido'
        );
      }

      // Actualizar la lista después de marcar como vendido
      fetchAutos(currentPage);
      setSellModalOpen(false);
      setAutoToSell(null);
    } catch (error) {
      console.error('Error al marcar el auto como vendido:', error);
      alert(
        error instanceof Error
          ? error.message
          : 'Error al marcar el auto como vendido'
      );
    }
  };

  console.log(autos);

  if (loading && autos.length === 0) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-color-primary'></div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-2xl font-semibold text-color-text'>
            Autos{' '}
            {loading && (
              <RefreshCw className='inline ml-2 h-5 w-5 animate-spin' />
            )}
          </h1>
        </div>
        <div className='flex gap-2'>
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
      </div>

      {error && (
        <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6'>
          {error}
        </div>
      )}

      {autos.length === 0 && !loading && !error ? (
        <div className='text-center py-10 bg-gray-50 rounded-lg'>
          <p className='text-gray-500'>No hay autos para mostrar</p>
          <button
            onClick={() => fetchAutos(1)}
            className='mt-4 px-4 py-2 bg-color-primary text-white rounded-lg hover:bg-color-primary/90 transition-colors'
          >
            Cargar autos
          </button>
        </div>
      ) : (
        <div className='space-y-4'>
          {autos.map((auto, idx) => (
            <motion.div
              key={auto.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col'
            >
              <div className='flex items-center gap-4'>
                <div className='relative w-44 h-32 flex-shrink-0'>
                  {auto.imagenes && auto.imagenes.length > 0 ? (
                    <Image
                      priority={idx < 4 ? true : false}
                      src={auto.imagenes[0]}
                      alt={`${auto.marca} ${auto.modelo}`}
                      fill
                      className='object-cover rounded-lg'
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center bg-gray-100 rounded-lg'>
                      <span className='text-gray-400'>Sin imagen</span>
                    </div>
                  )}
                  {!auto.active && (
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
                        onClick={() => handleToggleEstado(auto.id, auto.active)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          auto.active
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        }`}
                      >
                        {auto.active ? 'Activo' : 'Pausado'}
                      </button>
                      <button
                        onClick={() => handleToggleDestacado(auto.id)}
                        className={`p-2 rounded-full transition-colors ${
                          auto.destacado
                            ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                        title={
                          auto.destacado
                            ? 'Quitar de destacados'
                            : 'Marcar como destacado'
                        }
                      >
                        <Zap size={20} />
                      </button>
                      <button
                        onClick={() => handleToggleFavorito(auto.id)}
                        className={`p-2 rounded-full transition-colors ${
                          auto.favorito
                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                        title={
                          auto.favorito
                            ? 'Quitar de favoritos'
                            : 'Marcar como favorito'
                        }
                      >
                        <Star size={20} />
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
                        onClick={() => handleDeleteClick(auto)}
                        className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                      >
                        <Trash size={20} className='text-red-500' />
                      </button>
                    </div>
                  </div>
                  <div className='flex justify-end'>
                    <button
                      onClick={() => handleSellClick(auto)}
                      className='bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors'
                    >
                      Vender
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {loadingMore && (
            <div className='flex justify-center py-4'>
              <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-color-primary'></div>
            </div>
          )}

          {currentPage < totalPages && !loadingMore && (
            <div
              ref={(node) => {
                if (node && observer.current) {
                  observer.current.observe(node);
                }
              }}
              className='h-10'
            />
          )}
        </div>
      )}

      <p className='mx-auto text-center text-gray-500 mt-5'>
        Total: {totalAutos} autos
      </p>

      <AutoModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAuto(undefined);
        }}
        onSubmit={selectedAuto ? handleEditAuto : handleCreateAuto}
        initialData={selectedAuto}
      />

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setAutoToDelete(null);
        }}
        onConfirm={handleDelete}
        title='Eliminar Auto'
        message={`¿Estás seguro de que deseas eliminar el ${autoToDelete?.marca} ${autoToDelete?.modelo}? Esta acción no se puede deshacer.`}
      />

      <SellConfirmModal
        isOpen={sellModalOpen}
        onClose={() => {
          setSellModalOpen(false);
          setAutoToSell(null);
        }}
        onConfirm={handleSellConfirm}
        autoName={`${autoToSell?.marca} ${autoToSell?.modelo}`}
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
