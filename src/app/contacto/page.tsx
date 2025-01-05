'use client';

import { company } from '@/app/constants/constants';
import ClockIcon from '@/components/icons/ClockIcon';
import FacebookIcon from '@/components/icons/FacebookIcon';
import InstagramIcon from '@/components/icons/InstagramIcon';
import LocationIcon from '@/components/icons/LocationIcon';
import SocialIcons from '@/components/icons/SocialIcons';
import WhatsappIcon from '@/components/icons/WhatsappIcon';

import { motion } from 'framer-motion';
import Image from 'next/image';

const ContactoPage = () => {
  return (
    <>
      <section className='flex flex-col items-center'>
        <section className='w-full max-w-[1920px] h-[140px] sm:h-[160px] md:h-[220px] lg:h-[300px] relative'>
          <div className='w-full h-full'>
            <Image
              priority
              className='w-full h-full object-cover'
              src='/assets/contacto/contacto-banner.webp'
              alt='products'
              width={1500}
              height={400}
            />
          </div>
          <div className='absolute bottom-0 left-0 w-full h-full flex justify-center items-center z-10'>
            <div className='max-w-6xl w-full flex justify-center mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
              <div className='flex flex-col items-center text-center'>
                <h3 className='text-2xl sm:text-4xl lg:text-5xl font-bold text-color-primary-light'>
                  ESPERAMOS TU CONSULTA
                </h3>
                <p className='flex flex-col text-sm sm:text-lg md:text-2xl mt-1 text-color-text-light max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[550px]'>
                  Resolvemos todas tus dudas y te acompañamos en cada paso del
                  proceso
                </p>
              </div>
            </div>
          </div>
          <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-color-bg-secondary/80 to-color-bg-secondary/70'></div>
        </section>
        <section id='ubicacionSection' className='my-6 md:my-12 lg:my-16'>
          <motion.div
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
            className='flex flex-col md:flex-row justify-center items-center gap-8 sm:gap-12 md:gap-10 lg:gap-16 mx-4 sm:mx-6 md:mx-8 lg:mx-10'
          >
            <article className='flex flex-col gap-5'>
              <div>
                <div className='flex items-center gap-2 mb-2'>
                  <span className=''>
                    <ClockIcon className='w-7 h-7 lg:w-8 lg:h-8 fill-color-primary' />
                  </span>
                  <h5 className='text-xl md:text-2xl text-color-primary font-bold'>
                    Horarios
                  </h5>
                </div>
                <ul className='flex flex-col gap-2'>
                  {company.openDays.map((openDay, idx) => (
                    <li
                      key={idx}
                      className='flex gap-2 sm:text-lg lg:text-xl font-rubik-font font-medium text-center'
                    >
                      <span className='text-color-title font-semibold'>
                        {openDay.day}
                      </span>
                      <div className='flex gap-3'>
                        {openDay.hours.map((openHour, hourIdx) => (
                          <span key={hourIdx}>{openHour}</span>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {company.adress && company.city && (
                <div>
                  <div className='flex items-center gap-1 mb-2'>
                    <span className=''>
                      <LocationIcon className='w-6 h-6 lg:w-7 lg:h-7 fill-color-primary' />
                    </span>
                    <h5 className='text-xl md:text-2xl text-color-primary font-bold'>
                      Ubicación
                    </h5>
                  </div>
                  <span className='text-color-title sm:text-lg lg:text-xl font-semibold'>
                    {company.adress}, {company.city}
                  </span>
                </div>
              )}
              <div>
                <div className='flex items-center gap-2 mb-2'>
                  <span className=''>
                    <SocialIcons className='w-6 h-6 lg:w-7 lg:h-7 fill-color-primary' />
                  </span>
                  <h5 className='text-xl md:text-2xl text-color-primary font-bold'>
                    Redes
                  </h5>
                </div>
                <div className='flex gap-4 mt-3'>
                  {company.instagram && (
                    <a
                      href={`https://www.instagram.com/${company.instagram}/`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <InstagramIcon className='w-8 h-8 text-color-title hover:text-color-text transition-colors' />
                    </a>
                  )}
                  {company.facebook && (
                    <a
                      href={`https://www.facebook.com/${company.facebook}/`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <FacebookIcon className='w-8 h-8 text-color-title hover:text-color-text transition-colors' />
                    </a>
                  )}
                  {company.whatsapp && (
                    <a
                      href={`https://api.whatsapp.com/send?phone=549${company.whatsapp}&text=Hola! Quería hacer una consulta`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <WhatsappIcon className='w-8 h-8 text-color-title hover:text-color-text transition-colors' />
                    </a>
                  )}
                </div>
              </div>
            </article>
            <div className='p-3 md:p-5 [box-shadow:0_0_10px_rgba(0,0,0,0.1)] rounded-md'>
              <a
                href={company.googlemapsLink}
                target='_blank'
                rel='noopener noreferrer'
              >
                <div className='w-72 h-56 sm:w-[450px] sm:h-[350px] md:w-[350px] lg:h-[400px] lg:w-[500px] xl:w-[550px] rounded-md overflow-hidden'>
                  <Image
                    priority
                    className='w-full h-full object-cover rounded-md transition-all duration-300 hover:scale-105'
                    src='/assets/contacto/contacto-local.webp'
                    alt='local'
                    width={608}
                    height={480}
                  />
                </div>
              </a>
              <div className='flex justify-center items-center mt-4'>
                <a
                  href={company.googlemapsLink}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={`${
                    company.dark
                      ? 'text-color-title-light bg-color-primary hover:bg-color-primary-dark'
                      : 'text-color-title bg-color-primary hover:bg-color-primary-dark'
                  } font-medium w-full text-center py-2 md:py-3 rounded-md transition-colors`}
                >
                  Ver en Google Maps
                </a>
              </div>
            </div>
          </motion.div>
        </section>
        <article className='w-full'>
          <iframe
            className='w-full h-[300px] md:h-[350px] lg:h-[400px] rounded-md'
            src={company.googlemaps}
            width='1920'
            height='400'
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          ></iframe>
        </article>
      </section>
    </>
  );
};

export default ContactoPage;
