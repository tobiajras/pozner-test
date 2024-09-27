'use client';

import { useState, useEffect } from 'react';
import productsDetails from '@/data/productsDetails.json';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';

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
  Azul: 'bg-[#1f263f]',
  Verde: 'bg-[#008000]',
  Amarillo: 'bg-[#FFFF00]',
  Morado: 'bg-[#800080]',
  Naranja: 'bg-[#FFA500]',
  Gris: 'bg-[#808080]',
};

const ProductId = ({ params }: { params: { productId: string } }) => {
  const [productById, setProductById] = useState<ProductType | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    undefined
  );
  const [message, setMessage] = useState<string>('');

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

      if (isInCart) {
        setMessage('Este producto ya está en tu carrito');
        setTimeout(() => setMessage(''), 3000); // Limpiar el mensaje después de 3 segundos
      } else {
        addToCart(
          { ...productById, id: productById.id.toString() },
          1,
          selectedColor
        );
        setMessage('Producto añadido al carrito');
        setTimeout(() => setMessage(''), 3000);
      }
    }
  };

  return (
    <section className='flex justify-center mx-10 my-20'>
      {productById && (
        <div className='flex gap-10'>
          <article className='px-20 py-40 bg-[#f6f6f6]'>
            <div className='h-60 w-60'>
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
              <h4 className='text-color-primary font-semibold text-3xl h-20 line-clamp-2 mb-1 max-w-96'>
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
                            } w-8 h-8 rounded-full ring-1 ring-offset-4 hover:ring-color-primary hover:ring-2 transition-all cursor-pointer ${
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
                <div className='max-w-96'>{productById.description}</div>
              </div>
              <div className='mt-10'>
                {message && <p className='text-red-500 mb-2'>{message}</p>}
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
    </section>
  );
};

export default ProductId;
