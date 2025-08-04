'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { company } from '@/app/constants/constants';

const galleryImages = [
  {
    src: '/assets/gallery/gallery-1000-1.webp',
    alt: 'Imagen 1 Galería',
  },
  {
    src: '/assets/gallery/gallery-1000-2.webp',
    alt: 'Imagen 2 Galería',
  },
  {
    src: '/assets/gallery/gallery-1000-3.webp',
    alt: 'Imagen 3 Galería',
  },
];

const Gallery = () => {
  const autoplayOptions = {
    delay: 3500,
    stopOnInteraction: false,
    stopOnMouseEnter: false,
  };
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay(autoplayOptions),
  ]);
  const [clicked, setClicked] = useState(false);

  return (
    <section className='mt-10 mb-16 md:mt-16 md:mb-24 relative overflow-hidden'>
      {/* Patrón de fondo sutil */}
      <div className='absolute inset-0 bg-grid-pattern opacity-5'></div>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 relative z-10'>
        {/* Título y subtítulo */}
        <div className='text-center mb-5 md:mb-8 lg:mb-10'>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            className='text-2xl md:text-3xl lg:text-4xl font-extrabold text-color-title-light mb-2 max-w-xl mx-auto'
          >
            Somos <span className='text-color-primary'>{company.name}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            className='text-color-text-light max-w-2xl mx-auto md:text-lg font-medium'
          >
            Cada vehículo seleccionado con el cuidado y la calidad que nos
            caracteriza.
          </motion.p>
        </div>
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: '0px 0px -100px 0px' }}
          onMouseUp={() => setClicked(false)}
          onMouseDown={() => setClicked(true)}
          className={`overflow-hidden relative ${
            clicked ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          ref={emblaRef}
        >
          <div className='flex'>
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className='flex-[0_0_75%] sm:flex-[0_0_65%] md:flex-[0_0_60%] lg:flex-[0_0_65%] mr-3 sm:mr-5 md:mr-8 lg:mr-10'
              >
                <div className='relative w-full rounded-lg md:rounded-xl overflow-hidden'>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={1000}
                    height={800}
                    className='object-cover w-full h-full'
                    priority
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10'></div>
                </div>
              </div>
            ))}
          </div>
          <div className='absolute w-3 sm:w-5 md:w-10 h-full top-0 left-0 bg-gradient-to-r from-color-bg-primary'></div>
          <div className='absolute w-3 sm:w-5 md:w-10 h-full top-0 right-0 bg-gradient-to-l from-color-bg-primary'></div>
        </motion.article>
      </div>
    </section>
  );
};

export default Gallery;
