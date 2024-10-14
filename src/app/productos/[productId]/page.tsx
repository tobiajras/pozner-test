'use client';

import { useState, useEffect } from 'react';
import productsDetails from '@/data/productsDetails.json';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import toast, { Toaster } from 'react-hot-toast';
import ReturnIcon from '@/components/icons/ReturnIcon';
import Link from 'next/link';
import CarrouselFeatured from '@/components/CarrouselFeatured';

interface ProductType {
  id: number;
  name: string;
  price: number;
  image_url?: string;
  colors?: { [key: string]: string[] };
  description: string;
}

const colorMap: { [key: string]: string } = {
  Negro: 'bg-[#000000]',
  Blanco: 'bg-[#FFFFFF]',
  Rojo: 'bg-[#FF0000]',
  Azul: 'bg-[#0C2A50]',
  Marron: 'bg-[#352622]',
  Verde: 'bg-[#008000]',
  Amarillo: 'bg-[#FFFF00]',
  Morado: 'bg-[#800080]',
  Naranja: 'bg-[#FF5120]',
  Gris: 'bg-[#808080]',
};

const ProductId = ({ params }: { params: { productId: string } }) => {
  const [productById, setProductById] = useState<ProductType | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    undefined
  );

  const { addToCart, cart } = useCartStore();

  useEffect(() => {
    const productDetails = productsDetails.find(
      (product) => product.id === parseInt(params.productId)
    );
    setProductById(productDetails || null);
    if (productDetails && productDetails.colors) {
      const firstColor = Object.keys(productDetails.colors)[0];
      setSelectedColor(firstColor);
    }
  }, [params.productId]);

  const handleAddToCart = () => {
    if (productById) {
      const isInCart = cart.some(
        (item) =>
          String(item.id) === String(productById.id) &&
          item.color === selectedColor
      );

      toast.dismiss(); // Descarta todas las notificaciones existentes

      if (isInCart) {
        toast.error('Este producto ya está en tu carrito', {
          id: 'error-carrito', // ID único para este tipo de error
          duration: 3000, // Duración en milisegundos
        });
      } else {
        addToCart(
          { ...productById, id: productById.id.toString() },
          1,
          selectedColor
        );
        toast.success('Producto añadido al carrito', {
          id: 'exito-carrito', // ID único para este tipo de éxito
          duration: 3000, // Duración en milisegundos
        });
      }
    }
  };

  return (
    <section className='flex justify-center mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
      <div className='flex flex-col items-center w-full'>
        <Toaster
          position='top-center'
          reverseOrder={false}
          toastOptions={{
            // Previene que el usuario cierre la notificación manualmente
            duration: 3000,
            style: {
              marginTop: '100px',
            },
          }}
        />
        {productById && (
          <div className='flex flex-col md:flex-row gap-10 relative my-16 md:my-20'>
            <Link
              href='/productos'
              className='absolute -top-14 md:-top-16 left-0 hover:text-color-title transition-colors'
            >
              <ReturnIcon className='w-12 h-12' />
            </Link>
            <article className='flex justify-center px-10 py-20 sm:px-16 sm:py-24 md:px-20 md:py-40 bg-[#f6f6f6]'>
              <div className='h-40 w-40 sm:h-64 sm:w-64 md:h-60 md:w-60 lg:h-80 lg:w-80'>
                <Image
                  className='w-full h-full object-contain object-bottom'
                  src={`/assets/products/${
                    productById.colors && selectedColor
                      ? productById.colors[selectedColor][0]
                      : productById.image_url
                  }`}
                  alt={productById.name}
                  width={150}
                  height={150}
                />
              </div>
            </article>
            <article>
              <div className=''>
                <h4 className='text-color-title font-semibold text-2xl md:text-3xl line-clamp-2 mb-1 max-w-72 sm:max-w-96 break-words'>
                  {productById.name}
                </h4>
                <div className='mt-2'>
                  <span className='font-semibold text-2xl text-color-title'>
                    ${productById.price.toLocaleString('es-ES')}
                  </span>
                </div>
                <div className='flex flex-col gap-5 mt-5'>
                  {productById.colors && (
                    <div>
                      <h6 className=''>Colores</h6>
                      <div className='flex gap-5 mt-3 ml-1'>
                        {Object.keys(productById.colors).map((color, idx) => {
                          return (
                            <div
                              key={idx}
                              onClick={() => setSelectedColor(color)}
                              className={`${
                                colorMap[color]
                              } w-7 h-7 md:w-8 md:h-8 rounded-full ring-1 ring-offset-4 hover:ring-color-primary hover:ring-2 transition-all cursor-pointer ${
                                selectedColor === color
                                  ? 'ring-2 ring-color-primary'
                                  : 'ring-color-text'
                              }`}
                            ></div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  <div className='max-w-72 sm:max-w-96 break-words'>
                    {productById.description}
                  </div>
                </div>
                <div className='mt-5 md:mt-10'>
                  <button
                    onClick={handleAddToCart}
                    className='bg-color-primary hover:bg-color-primary-dark transition-colors text-white px-10 py-3 rounded'
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </article>
          </div>
        )}
        <section className='mb-10 w-full'>
          <CarrouselFeatured title='Sugeridos' startIndex={10} lastIndex={20} />
        </section>
      </div>
    </section>
  );
};

export default ProductId;
