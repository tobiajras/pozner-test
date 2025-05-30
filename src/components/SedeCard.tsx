'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import LocationIcon from './icons/LocationIcon';
import ClockIcon from './icons/ClockIcon';
import ImageCarousel from './ImageCarousel';

interface SedeCardProps {
  sede: {
    id: number;
    title: string;
    adress: string;
    schedule: string[];
    appointment: string;
    images: string[];
  };
}

const SedeCard = ({ sede }: SedeCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
      }}
      viewport={{ once: true, margin: '0px 0px -100px 0px' }}
      className='max-w-md md:max-w-lg rounded-xl group overflow-hidden shadow-[0_5px_30px_-15px_rgba(0,0,0,0.5)] hover:shadow-[0_5px_30px_-15px_rgba(0,0,0,2)] transition-shadow'
    >
      <Link
        href={`${sede.appointment}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        <ImageCarousel
          images={sede.images}
          basePath='/assets/sedes/'
          altText={sede.title}
          priority
        />
        <div className='p-5 md:p-7 bg-gradient-to-b from-black to-neutral-900'>
          <h3 className='text-color-title-light text-xl md:text-2xl font-semibold text-center'>
            {sede.title}
          </h3>
          <div className='flex flex-col items-center gap-1 mt-2'>
            <div className='flex items-center gap-2'>
              <LocationIcon className='w-[22px] h-[22px] text-color-primary-light' />
              <p className='text-color-text-light'>{sede.adress}</p>
            </div>
            <div className='flex items-start gap-2'>
              <ClockIcon className='w-5 h-5 text-color-primary-light' />
              <p className='text-color-text-light flex flex-col items-center'>
                {sede.schedule.map((schedule) => (
                  <span key={schedule}>{schedule}</span>
                ))}
              </p>
            </div>
            <div className='flex justify-center mt-2'>
              <span className='bg-color-primary hover:bg-color-primary-dark transition-colors text-white px-5 py-3 rounded-md'>
                Ver en Google Maps
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default SedeCard;
