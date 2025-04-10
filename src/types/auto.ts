export interface Image {
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  order: number;
}

export interface Auto {
  id: string;
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
  categoriaId: string;
  destacado: boolean;
  favorito: boolean;
  active: boolean;
}

export interface FormData {
  id?: string;
  marca: string;
  marcaId: string;
  modelo: string;
  año: string;
  kilometraje: number;
  transmision: string;
  combustible: string;
  puertas: number;
  precio: number;
  descripcion: string;
  imagenes: Image[];
  categoria: string;
}

export interface UpdateCarFormData {
  brand?: string;
  model?: string;
  year?: string;
  color?: string;
  price?: string;
  description?: string;
  category?: string;
  mileage?: string;
  transmission?: string;
  fuel?: string;
  doors?: string;
  images?: File[];
  imageOrder?: string;
  imagesToDelete?: string;
}
