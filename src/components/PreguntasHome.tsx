'use client';

import Image from 'next/image';
import { preguntas } from '@/app/constants/constants';
import { useState } from 'react';
import DropDownIcon from './icons/DropDownIcon';
const PreguntasHome = () => {
  const [activeAnswer, setActiveAnswer] = useState('preg-1');

  return (
    <section
      id='preguntasSection'
      className='flex justify-center my-10 md:my-16 lg:my-20'
    >
      <div className='flex flex-col md:flex-row gap-5 md:gap-8 max-w-6xl mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
        <article>
          <div className='flex justify-center'>
            <Image
              className='w-72 sm:w-80 md:w-[400px] rounded md:rounded-md [box-shadow:0px_0px_19px_3px_rgba(0,0,0,0.2)]'
              src='/assets/preguntas/preguntas-image.webp'
              width={500}
              height={500}
              alt='preguntas imagen'
            />
          </div>
        </article>
        <article>
          <h4 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-color-primary'>
            Preguntas Frecuentes
          </h4>
          <ul className='flex flex-col mt-2'>
            {preguntas.map((pregunta) => (
              <li
                onClick={() => setActiveAnswer(pregunta.id)}
                key={pregunta.id}
              >
                <div className='min-h-8 md:min-h-10 max-w-md sm:max-w-lg py-3'>
                  <div className='flex justify-between gap-3 items-start group cursor-pointer'>
                    <h6 className='sm:text-lg md:text-xl text-color-secondary group-hover:text-color-secondary-dark transition-colors font-semibold'>
                      {pregunta.question}
                    </h6>
                    <div className='bg-color-secondary group-hover:bg-color-secondary-dark transition-colors flex justify-center items-center w-7 h-7 p-2'>
                      <DropDownIcon className='text-color-title-light' />
                    </div>
                  </div>
                  <p
                    className={`${
                      activeAnswer !== pregunta.id && 'hidden'
                    } text-color-text mt-1 mb-3 text-sm sm:text-base`}
                  >
                    {pregunta.answer}
                  </p>
                </div>
                <hr />
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
};

export default PreguntasHome;
