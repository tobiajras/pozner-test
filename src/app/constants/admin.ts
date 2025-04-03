import catalogo from '@/data/catalogo.json';

export const ADMIN_CREDENTIALS = {
  email: 'admin@fratelli.com',
  password: 'admin123',
};

// Transformar el catálogo para el panel de administración
export const MOCK_AUTOS = catalogo.map((auto, index) => ({
  id: auto.id,
  marca: auto.marca,
  modelo: auto.modelo,
  año: auto.ano,
  precio: 0, // Se agregará cuando se implemente el backend
  estado: index < 12 ? 'activo' : 'vendido',
  imagenes: auto.images,
  descripcion: auto.name,
  kilometraje: auto.kilometraje,
  combustible: auto.combustible,
  transmision: auto.transmision,
  color: 'No especificado', // Se agregará cuando se implemente el backend
}));

export const MOCK_STATS = {
  totalAutos: MOCK_AUTOS.length,
  autosActivos: MOCK_AUTOS.filter((auto) => auto.estado === 'activo').length,
  autosVendidos: MOCK_AUTOS.filter((auto) => auto.estado === 'vendido').length,
};
