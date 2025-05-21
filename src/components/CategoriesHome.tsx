'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const CategoriesHome = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://api.fratelliautomotores.com.ar/api/categories'
        );
        if (!response.ok) {
          throw new Error('Error al cargar las categorías');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error al cargar las categorías:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className='flex justify-center w-full'>
        <div className='max-w-6xl w-full px-2 mx-4 sm:mx-6 md:mx-8 lg:mx-10 overflow-hidden pb-6 md:pb-10'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className='aspect-[4/3] bg-neutral-800/50 rounded-lg animate-pulse'
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='flex justify-center w-full'>
      <div className='max-w-6xl w-full px-2 mx-4 sm:mx-6 md:mx-8 lg:mx-10 overflow-hidden pb-6 md:pb-10'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/catalogo?categoria=${category.name.toLowerCase()}`}
              className='group relative aspect-[4/3] rounded-lg overflow-hidden'
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className='w-full h-full'
              >
                <Image
                  src={`/assets/categories/${category.name.toLowerCase()}.webp`}
                  alt={category.name}
                  fill
                  className='object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out'
                />
                {/* Overlay con degradado */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                {/* Nombre de la categoría */}
                <div className='absolute inset-0 flex items-center justify-center'>
                  <h3 className='text-2xl font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    {category.name}
                  </h3>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesHome;
