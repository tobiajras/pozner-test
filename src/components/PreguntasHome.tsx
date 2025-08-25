'use client';

import { preguntas } from '@/app/constants/constants';
import { useState } from 'react';
import DropDownIcon from './icons/DropDownIcon';
import { motion, AnimatePresence } from 'framer-motion';

const PreguntasHome = () => {
  const [activeAnswer, setActiveAnswer] = useState<string | null>('preg-1');

  const toggleAnswer = (id: string) => {
    if (activeAnswer !== id) {
      setActiveAnswer(id);
    }
  };

  return (
    <section
      id='preguntasSection'
      className='mt-10 mb-16 md:mt-16 md:mb-24 relative overflow-hidden'
    >
      {/* Patrón de fondo decorativo */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.03)_1px,transparent_0)] bg-[length:20px_20px]'></div>

      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Título y subtítulo */}
        <div className='text-center mb-3 md:mb-5 lg:mb-10'>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            className='text-2xl md:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent pb-2'
          >
            Preguntas Frecuentes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            className='text-color-text-light max-w-2xl mx-auto md:text-lg font-medium'
          >
            Resolvemos todas tus dudas sobre nuestros servicios y procesos
          </motion.p>
        </div>

        {/* Grid de preguntas */}
        <div className='grid gap-6'>
          {preguntas.map((pregunta, index) => (
            <motion.div
              key={pregunta.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -100px 0px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='group'
            >
              <div
                onClick={() => toggleAnswer(pregunta.id)}
                className={`relative bg-color-bg-secondary rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-colors duration-300 cursor-pointer overflow-hidden
                  ${
                    activeAnswer === pregunta.id
                      ? 'ring-2 ring-color-primary/20 shadow-lg'
                      : 'hover:border-gray-300'
                  }`}
              >
                {/* Línea decorativa superior */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-color-primary to-color-primary/60 transition-colors duration-300
                  ${
                    activeAnswer === pregunta.id ? 'opacity-100' : 'opacity-0'
                  }`}
                ></div>

                <div className='p-6 md:p-8'>
                  <div className='flex items-start justify-between gap-4'>
                    <div className='flex-1'>
                      <h4 className='text-lg md:text-xl font-semibold text-color-title-light mb-2 transition-colors duration-300'>
                        {pregunta.question}
                      </h4>
                    </div>

                    {/* Botón de toggle */}
                    <div className='flex-shrink-0'>
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out relative overflow-hidden
                          ${
                            activeAnswer === pregunta.id
                              ? 'bg-gradient-to-l from-color-primary to-color-primary/60 text-white shadow-lg'
                              : 'bg-gradient-to-l from-neutral-800 to-neutral-700 text-white'
                          }`}
                      >
                        <span className='relative z-10'>
                          <motion.div
                            animate={{
                              rotate: activeAnswer === pregunta.id ? 180 : 0,
                            }}
                            transition={{
                              duration: 0.3,
                              ease: 'easeInOut',
                            }}
                          >
                            <DropDownIcon className='w-5 h-5' />
                          </motion.div>
                        </span>
                        {activeAnswer !== pregunta.id && (
                          <div className='absolute inset-0 bg-gradient-to-l from-color-primary to-color-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-full'></div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Contenido expandible */}
                  <AnimatePresence>
                    {activeAnswer === pregunta.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.4,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className='overflow-hidden'
                      >
                        <div className='mt-6 pt-6 border-t border-gray-100'>
                          <p className='text-color-text-light leading-relaxed text-base md:text-lg'>
                            {pregunta.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreguntasHome;
