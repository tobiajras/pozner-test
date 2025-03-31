'use client';

import Image from 'next/image';
import { preguntas } from '@/app/constants/constants';
import { useState } from 'react';
import DropDownIcon from './icons/DropDownIcon';
import { motion } from 'framer-motion';
const PreguntasHome = () => {
  const [activeAnswer, setActiveAnswer] = useState<string | null>('preg-1');

  const handleClick = (id: string) => {
    setActiveAnswer(activeAnswer === id ? null : id);
  };

  return (
    <section
      id='preguntasSection'
      className='flex justify-center my-10 md:my-16 lg:my-20'
    >
      <div className='flex flex-col md:flex-row gap-5 md:gap-8 max-w-6xl mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
        <motion.article
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className='flex justify-center'>
            <Image
              className='w-72 sm:w-80 md:w-[400px] rounded md:rounded-md [box-shadow:0px_0px_19px_3px_rgba(0,0,0,0.2)]'
              src='/assets/preguntas/preguntas-image.webp'
              width={500}
              height={500}
              alt='preguntas imagen'
            />
          </div>
        </motion.article>
        <motion.article
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h4 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-color-primary'>
            Preguntas Frecuentes
          </h4>
          <article className=''>
            <ul className='flex flex-col'>
              {preguntas.map((pregunta) => (
                <li
                  onClick={() => handleClick(pregunta.id)}
                  key={pregunta.id}
                  className='border-b border-gray-200 last:border-b-0'
                >
                  <div className='min-h-8 md:min-h-10 max-w-md sm:max-w-lg pt-5 pb-3 cursor-pointer group'>
                    <div className='flex justify-between gap-4 items-center px-2'>
                      <h6 className='sm:text-lg text-color-secondary group-hover:text-color-secondary-dark transition-colors font-semibold'>
                        {pregunta.question}
                      </h6>
                      <div className='bg-color-primary group-hover:bg-color-primary-dark transition-colors flex justify-center items-center w-8 h-8 rounded-full shrink-0'>
                        <DropDownIcon className='text-color-title-light w-3.5 h-3.5' />
                      </div>
                    </div>
                    <motion.div
                      initial={false}
                      animate={{
                        height: activeAnswer === pregunta.id ? 'auto' : 0,
                        opacity: activeAnswer === pregunta.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className='overflow-hidden'
                    >
                      <p className='text-color-text mt-4 px-2 text-sm sm:text-base'>
                        {pregunta.answer}
                      </p>
                    </motion.div>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </motion.article>
      </div>
    </section>
  );
};

export default PreguntasHome;
