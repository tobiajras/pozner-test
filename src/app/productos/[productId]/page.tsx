'use client';

import { useState, useEffect } from 'react';
import products from '@/data/products.json';
import Image from 'next/image';

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

const ProductId = ({ params }) => {
  const [productById, setProductById] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    const product = products.find((product) => product.id == params.productId);
    setProductById(product);
    // Establecer el primer color como color por defecto si existe
    if (product && product.color && product.color.length > 0) {
      setSelectedColor(product.color[0].color);
    }
  }, [params.productId]);

  // Función para obtener el objeto de color seleccionado
  const getSelectedColorObject = () => {
    if (!productById || !productById.color) return null;
    return productById.color.find((c) => c.color === selectedColor);
  };

  // Ejemplo de cómo usar el color seleccionado
  const selectedColorObject = getSelectedColorObject();

  console.log(selectedColor);

  return (
    <section className='flex justify-center mx-10 my-20'>
      {productById && (
        <div className='flex gap-10'>
          <article className='px-20 py-40 bg-[#f6f6f6]'>
            <div className='h-60 w-60'>
              <Image
                className='w-full h-full object-contain object-bottom'
                src={`/assets/products/${
                  selectedColorObject?.image_url || productById.image_url
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
                  ${parseInt(productById.price).toLocaleString('es-ES')}
                </span>
              </div>
              <div className='flex flex-col gap-5 mt-5'>
                {productById.color && (
                  <div>
                    <h6 className=''>Colores</h6>
                    <div className='flex gap-5 mt-3 ml-1'>
                      {productById.color.map((color, idx) => (
                        <div
                          key={idx}
                          onMouseEnter={() => setSelectedColor(color.color)}
                          className={`${
                            colorMap[color.color]
                          } w-8 h-8 rounded-full ring-1 ring-offset-4  hover:ring-color-primary hover:ring-2 transition-all cursor-pointer ${
                            selectedColor === color.color
                              ? 'ring-2 ring-color-primary'
                              : 'ring-color-text'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                )}
                <div className='max-w-96'>{productById.description}</div>
              </div>
              <div className='mt-10'>
                <button className='bg-color-primary hover:bg-color-primary-dark transition-colors text-white px-10 py-3 rounded'>
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
