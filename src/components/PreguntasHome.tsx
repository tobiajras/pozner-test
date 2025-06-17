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
      className='flex justify-center mt-10 mb-16 md:mt-16 md:mb-24 bg-color-bg-primary relative overflow-hidden'
    >
      {/* Patrón decorativo */}
      <div className='absolute inset-0 opacity-5 bg-grid-pattern'></div>

      <div className='max-w-4xl w-full mx-4 sm:mx-6 md:mx-8 lg:mx-10 relative z-10'>
        <div className='text-center mb-12'>
          <h3 className='text-sm text-neutral-500 uppercase tracking-[0.3em] mb-3'>
            Información
          </h3>
          <h2 className='text-3xl md:text-4xl lg:text-5xl text-color-title mb-5'>
            Preguntas Frecuentes
          </h2>
          <div className='flex items-center justify-center w-full max-w-xs md:max-w-sm mx-auto px-4 lg:px-10'>
            <div className='h-0.5 flex-grow bg-gradient-to-r from-transparent via-color-primary to-color-trasparent'></div>
          </div>
        </div>

        <div className='grid gap-6'>
          {preguntas.map((pregunta) => (
            <div
              key={pregunta.id}
              onClick={() => toggleAnswer(pregunta.id)}
              className={`group bg-gradient-to-b from-color-primary-dark to-color-secondary border to-70% border-neutral-600 rounded transition-all duration-500 
                ${activeAnswer === pregunta.id ? '' : 'cursor-pointer'}`}
            >
              <div className='p-5 md:p-6'>
                <div className='flex justify-between items-center'>
                  <h4 className='text-lg md:text-xl max-w-[250px] sm:max-w-none font-medium text-white'>
                    {pregunta.question}
                  </h4>
                  <div
                    className={`group-hover:bg-color-primary h-8 w-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                      activeAnswer === pregunta.id
                        ? 'bg-color-primary-light'
                        : 'bg-color-primary-dark'
                    }`}
                  >
                    <motion.div
                      animate={{
                        rotate: activeAnswer === pregunta.id ? 0 : -90,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <DropDownIcon className='w-4 h-4 text-white' />
                    </motion.div>
                  </div>
                </div>

                <AnimatePresence>
                  {activeAnswer === pregunta.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                      }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className='overflow-hidden'
                    >
                      <div className='mt-4 pt-4 border-t border-white/10'>
                        <p className='text-white/70 leading-relaxed'>
                          {pregunta.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreguntasHome;
