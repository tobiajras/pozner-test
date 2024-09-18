'use client';

import products from '@/data/products.json';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const colorMap: { [key: string]: string } = {
  Negro: '#000000',
  Blanco: '#FFFFFF',
  Rojo: '#FF0000',
  Azul: '#1f263f',
  Verde: '#008000',
  Amarillo: '#FFFF00',
  Morado: '#800080',
  Naranja: '#FFA500',
  Gris: '#808080',
};

const ProductId = ({ params }) => {
  const [productById, setProductById] = useState(null);

  useEffect(() => {
    const product = products.find((product) => product.id == params.productId);
    setProductById(product);
  }, [params.productId]);

  return (
    <section className='flex justify-center mx-10 my-20'>
      {productById && (
        <div className='flex gap-10'>
          <article className='px-20 py-40 bg-[#f6f6f6]'>
            <div className='h-60 w-60'>
              <Image
                className='w-full h-full object-contain object-bottom'
                src={`/assets/products/${
                  productById.image_url || productById.color?.[0]?.image_url
                }`}
                alt={productById.name}
                width={150}
                height={150}
              />
            </div>
          </article>
          <article>
            <div className=''>
              <h4 className='text-color-primary font-semibold text-3xl h-16 line-clamp-2 mb-1 max-w-96'>
                {productById.name}
              </h4>
              <div className='mt-2'>
                <span className='font-semibold text-2xl text-color-title'>
                  ${parseInt(productById.price).toLocaleString('es-ES')}
                </span>
              </div>
              <div className='flex flex-col gap-5 mt-5'>
                <div>
                  <h6 className=''>Colores</h6>
                  <div className='flex gap-5 mt-3 ml-1'>
                    {productById?.color.map((color, idx) => (
                      <div
                        className={`w-8 h-8 rounded-full ring-1 ring-offset-4 ring-color-title bg-[${
                          colorMap[color.color]
                        }] hover:ring-color-primary hover:ring-2 transition-all cursor-pointer`}
                        key={idx}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className='mt-10'>
                <button className='bg-color-primary hover:bg-color-primary-dark transition-colors text-white px-10 py-3 rounded'>
                  Añandir al carrito
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
