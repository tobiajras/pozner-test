'use client';

import { motion } from 'framer-motion';

import { company, sedes } from '@/app/constants/constants';

import Image from 'next/image';
import LocationIcon from '@/components/icons/LocationIcon';
import WhatsappIcon from '@/components/icons/WhatsappIcon';

import Footer from '@/components/Footer';
import HeaderWithSuspense from '@/components/Header';

const ContactoSection = () => {
  return (
    <>
      <HeaderWithSuspense />
      <section className='flex flex-col'>
        <section className='w-full max-w-[1920px] h-[180px] sm:h-[260px] md:h-[320px] lg:h-[400px] relative'>
          <div className='w-full h-full'>
            <Image
              priority
              className='w-full h-full object-cover'
              src='/assets/nosotros/nosotros-2.webp'
              alt='products'
              width={1500}
              height={400}
            />
          </div>
          <div className='absolute bottom-0 left-0 w-full h-full flex justify-center items-center z-10'>
            <div className='max-w-5xl w-full flex justify-center'>
              <div className='md:w-full mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
                <h3 className='text-2xl sm:text-4xl lg:text-5xl font-semibold text-color-primary-light'>
                  CONOCÉ {company.name.toUpperCase()}
                </h3>
                <p className='flex flex-col text-sm sm:text-lg md:text-2xl mt-1 text-color-text-light'>
                  <span>Te invitamos a visitar nuestro local</span>
                </p>
              </div>
            </div>
          </div>
          <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-color-bg-secondary/85 to-color-bg-secondary/85'></div>
        </section>
        <section
          id='sedesSection'
          className='flex flex-col items-center my-8 md:my-14 lg:my-20 mx-4 sm:mx-6 md:mx-8 lg:mx-10'
        >
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-5 md:gap-x-16 gap-y-10 md:gap-y-20'>
            {sedes.map((sede) => (
              <motion.article
                initial={{ opacity: 0, y: 10 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.3,
                    ease: 'easeOut',
                  },
                }}
                viewport={{ margin: '0px 0px -300px 0px', once: true }}
                key={sede.id}
              >
                <div className='w-[280px] md:w-[320px] lg:w-[405px] overflow-hidden rounded sm:rounded-lg'>
                  <a
                    href={sede.appointment ? sede.appointment : undefined} // Cambiado para no enviar a ningún link si es null
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Image
                      className='hover:scale-105 transition-transform duration-700'
                      src={`/assets/sedes/${sede.image}`}
                      width={608}
                      height={480}
                      alt={`${sede.title} imagen`}
                    />
                  </a>
                </div>
                <div>
                  {sede.title && (
                    <h4 className='text-color-primary font-medium text-2xl mt-3'>
                      {sede.title}
                    </h4>
                  )}
                  {sede.adress && (
                    <h6 className='text-color-text text-sm sm:text-base lg:text-lg'>
                      {sede.adress}
                    </h6>
                  )}
                  {sede.tel && (
                    <span className='text-sm sm:text-base lg:text-lg text-color-primary'>
                      {sede.tel}
                    </span>
                  )}
                  <p className='text-color-text text-sm sm:text-base lg:text-lg max-w-[280px] md:max-w-[320px] lg:max-w-[405px]'>
                    {sede.schedule}
                  </p>
                  <div className='flex gap-3 mt-3'>
                    {sede.appointment && (
                      <div className='flex w-full'>
                        <a
                          href={sede.appointment}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex justify-center items-center gap-1 bg-color-primary hover:bg-color-primary-dark transition-colors text-color-title-light text-sm sm:text-base md:text-lg  py-2 px-4 rounded w-full text-center'
                        >
                          <LocationIcon />
                          <span>Ubicación</span>
                        </a>
                      </div>
                    )}
                    {sede.whatsapp && (
                      <div className='flex w-full'>
                        <a
                          href={`https://api.whatsapp.com/send?phone=549${sede.whatsapp}&text=Hola! Quería hacer una consulta`}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex justify-center items-center gap-1 bg-[#25D366] hover:bg-[#05B146] transition-colors text-color-title-light text-sm sm:text-base md:text-lg  py-2 px-4 rounded w-full text-center'
                        >
                          <WhatsappIcon />
                          <span>Whatsapp</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </section>
      <Footer />
    </>
  );
};

export default ContactoSection;
