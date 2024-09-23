import { company } from '@/app/constants/constants';

import Image from 'next/image';
import InstagramIcon from './icons/InstagramIcon';
import WhatsappIcon from './icons/WhatsappIcon';

const WhatsappBanner = () => {
  return (
    <section className='h-[150px] sm:h-[200px] lg:h-[300px] relative my-8 md:my-14 lg:my-20'>
      <div className='w-full h-full'>
        <Image
          className='w-full h-full object-cover'
          src='/assets/whatsapp-banner/whatsapp-banner.webp'
          width={1140}
          height={200}
          alt='imagen banner'
        />
      </div>
      <div className='flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 w-full bg-black/70'>
        {company.whatsapp ? (
          <div className='flex m-5 gap-5 sm:m-20 md:m-28 lg:m-36 w-full max-w-6xl'>
            <article className='w-full text-color-title-light'>
              <div className='text-nowrap text-lg sm:text-4xl lg:text-5xl font-aleo-font font-semibold'>
                <h4>Envianos tu consulta</h4>
                <h4>por Whatsapp</h4>
              </div>
              <div className='flex gap-2 sm:gap-3 text-sm sm:text-xl font-semibold text-[#25D366] sm:mt-3'>
                <span>#Consultas</span>
                <span>#Eventos</span>
              </div>
            </article>
            <article className='w-full flex justify-center items-center'>
              <div>
                <a
                  className='flex gap-1 sm:gap-2 items-center bg-[#25D366] hover:bg-[#05B146] transition-colors py-2 sm:py-3 px-3 sm:px-5 text-white font-semibold rounded-sm sm:rounded'
                  href={`https://api.whatsapp.com/send?phone=549${company.whatsapp}&text=Hola! Quería hacer una consulta`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <WhatsappIcon className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6' />
                  <span className='font-inter-font text-sm sm:text-base md:text-lg'>
                    CONSULTAR
                  </span>
                </a>
              </div>
            </article>
          </div>
        ) : (
          <div className='flex m-5 gap-5 sm:m-20 md:m-28 lg:m-36 w-full max-w-6xl'>
            <article className='w-full text-color-title-light'>
              <div className='text-nowrap text-lg sm:text-4xl lg:text-5xl font-aleo-font font-semibold'>
                <h4>Envianos tu consulta</h4>
                <h4>por Instagram</h4>
              </div>
              <div className='flex gap-2 sm:gap-3 text-sm sm:text-xl font-semibold text-[#FF6A06] sm:mt-3'>
                <span>#Consultas</span>
                <span>#Eventos</span>
              </div>
            </article>
            <article className='w-full flex justify-center items-center'>
              <div>
                <a
                  className='flex gap-1 sm:gap-2 items-center bg-[#FF6A06] hover:bg-[#DF5900] transition-colors py-2 sm:py-3 px-3 sm:px-5 text-white font-semibold rounded-sm sm:rounded'
                  href={`https://www.instagram.com/${company.instagram}/`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <InstagramIcon className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6' />
                  <span className='font-inter-font text-sm sm:text-base md:text-lg'>
                    CONSULTAR
                  </span>
                </a>
              </div>
            </article>
          </div>
        )}
      </div>
    </section>
  );
};

export default WhatsappBanner;
