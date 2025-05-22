'use client';

import { company } from '@/app/constants/constants';
import ClockIcon from '@/components/icons/ClockIcon';
import LocationIcon from '@/components/icons/LocationIcon';
import InstagramIcon from '@/components/icons/InstagramIcon';
import WhatsappFillIcon from '@/components/icons/WhatsappFillIcon';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const ContactoPage = () => {
  return (
    <div className='relative'>
      <Header />
      {/* Fondo absoluto que crece con el contenido */}
      <div
        className='absolute inset-0 w-full h-full -z-10 pointer-events-none'
        style={{
          backgroundColor: '#000',
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 0 0',
        }}
      />
      <div
        className='absolute inset-0 w-full h-full -z-10 pointer-events-none'
        style={{
          background: `
            linear-gradient(90deg,
              #000 0%,
              rgba(0,0,0,0.85) 10%,
              rgba(0,0,0,0.2) 30%,
              rgba(0,0,0,0) 45%,
              rgba(0,0,0,0) 55%,
              rgba(0,0,0,0.2) 70%,
              rgba(0,0,0,0.85) 90%,
              #000 100%
            )`,
        }}
      />
      <section className='flex flex-col items-center'>
        <section className='w-full py-8 md:py-14 lg:py-16 flex justify-center items-center'>
          <div className='max-w-6xl w-full flex justify-center mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
            <div className='text-center'>
              <h3 className='text-sm sm:text-base text-color-primary uppercase tracking-wider mb-1 md:mb-2'>
                Vení a visitarnos
              </h3>
              <h2 className='text-3xl sm:text-4xl lg:text-5xl font-semibold text-color-title-light mb-2 md:mb-4'>
                CONTACTO
              </h2>
              <div className='flex items-center justify-center gap-2 w-full max-w-sm md:max-w-md mx-auto px-4'>
                <div className='h-0.5 flex-grow bg-gradient-to-r from-transparent to-color-primary'></div>
                <div className='w-2.5 h-2.5 bg-color-primary rotate-45'></div>
                <div className='h-0.5 flex-grow bg-gradient-to-l from-transparent to-color-primary'></div>
              </div>
            </div>
          </div>
        </section>
        {/* Tarjetas de información de contacto */}
        <section className='w-full max-w-6xl mx-auto mb-16'>
          <div className='grid grid-cols-1 md:grid-cols-3 place-items-center gap-6 mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
            {/* Tarjeta de Instagram */}
            <motion.a
              href={`https://www.instagram.com/${company.instagram}/`}
              target='_blank'
              rel='noopener noreferrer'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 },
              }}
              viewport={{ once: true, margin: '0px 0px -100px 0px' }}
              className='max-w-md md:max-w-lg w-full bg-gradient-to-b from-black to-neutral-900 rounded-lg overflow-hidden group hover:shadow-[0_8px_30px_-15px_rgba(233,0,2,0.5)] hover:border-color-primary transition-colors duration-500 text-center p-8 border border-neutral-800 cursor-pointer'
            >
              <div className='w-20 h-20 rounded-full bg-color-primary flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300'>
                <InstagramIcon className='w-10 h-10 text-color-title-light' />
              </div>
              <h3
                className={`${
                  company.dark
                    ? 'group-hover:text-color-primary-light'
                    : 'group-hover:text-color-primary'
                } text-xl font-bold text-white mb-4  transition-colors duration-300`}
              >
                Instagram
              </h3>
              <p className='text-white/70'>@{company.instagram}</p>
              <div className='mt-6'>
                <span
                  className={`${
                    company.dark
                      ? 'text-color-primary-light '
                      : 'text-color-primary group-hover:text-color-primary-light'
                  } inline-flex items-center  transition-colors text-sm font-medium`}
                >
                  Seguinos
                  <span className='inline-block transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300 ml-1'>
                    →
                  </span>
                </span>
              </div>
            </motion.a>

            {/* Tarjeta de WhatsApp */}
            <motion.a
              href={`https://api.whatsapp.com/send?phone=549${company.whatsapp[0]}&text=Hola! Quería hacer una consulta sobre un vehículo`}
              target='_blank'
              rel='noopener noreferrer'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 },
              }}
              viewport={{ once: true, margin: '0px 0px -100px 0px' }}
              className='max-w-md md:max-w-lg w-full bg-gradient-to-b from-black to-neutral-900 rounded-lg overflow-hidden group hover:shadow-[0_8px_30px_-15px_rgba(233,0,2,0.5)] hover:border-color-primary transition-colors duration-500 text-center p-8 border border-neutral-800 cursor-pointer'
            >
              <div className='w-20 h-20 rounded-full bg-color-primary flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300'>
                <WhatsappFillIcon className='w-10 h-10 text-color-title-light' />
              </div>
              <h3
                className={`${
                  company.dark
                    ? 'group-hover:text-color-primary-light'
                    : 'group-hover:text-color-primary'
                } text-xl font-bold text-white mb-4  transition-colors duration-300`}
              >
                Whatsapp
              </h3>
              <p className='text-white/70'>{company.whatsapp[0]}</p>
              <div className='mt-6'>
                <span
                  className={`${
                    company.dark
                      ? 'text-color-primary-light '
                      : 'text-color-primary group-hover:text-color-primary-light'
                  } inline-flex items-center  transition-colors text-sm font-medium`}
                >
                  Mensaje directo
                  <span className='inline-block transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300 ml-1'>
                    →
                  </span>
                </span>
              </div>
            </motion.a>

            {/* Tarjeta de Ubicación */}
            <motion.a
              href={company.googlemapsLink || ''}
              target='_blank'
              rel='noopener noreferrer'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 },
              }}
              viewport={{ once: true, margin: '0px 0px -100px 0px' }}
              className='max-w-md md:max-w-lg w-full bg-gradient-to-b from-black to-neutral-900 rounded-lg overflow-hidden group hover:shadow-[0_8px_30px_-15px_rgba(233,0,2,0.5)] hover:border-color-primary transition-colors duration-500 text-center p-8 border border-neutral-800 cursor-pointer'
            >
              <div className='w-20 h-20 rounded-full bg-color-primary flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300'>
                <LocationIcon className='w-10 h-10 text-color-title-light' />
              </div>
              <h3
                className={`${
                  company.dark
                    ? 'group-hover:text-color-primary-light'
                    : 'group-hover:text-color-primary'
                } text-xl font-bold text-white mb-4  transition-colors duration-300`}
              >
                Ubicación
              </h3>
              <p className='text-white/70'>
                {company.adress}, {company.city}
              </p>
              <div className='mt-6'>
                <span
                  className={`${
                    company.dark
                      ? 'text-color-primary-light '
                      : 'text-color-primary group-hover:text-color-primary-light'
                  } inline-flex items-center  transition-colors text-sm font-medium`}
                >
                  Ver en Google Maps
                  <span className='inline-block transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300 ml-1'>
                    →
                  </span>
                </span>
              </div>
            </motion.a>
          </div>
        </section>

        {/* Sección de horarios */}
        <section className='w-full max-w-6xl mx-auto mb-16'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5 },
            }}
            viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            className='bg-gradient-to-b from-neutral-900 to-black rounded-lg border border-neutral-800 overflow-hidden shadow-[0_8px_30px_-15px_rgba(0,0,0,0.7)] mx-4 sm:mx-6 md:mx-8 lg:mx-10'
          >
            <div className='py-16 px-8 bg-grid-pattern'>
              <div className='text-center mb-8'>
                <div className='w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center mx-auto mb-4'>
                  <ClockIcon
                    className={`${
                      company.dark
                        ? 'text-color-primary-light'
                        : 'text-color-primary'
                    } w-8 h-8 `}
                  />
                </div>
                <h3 className='text-2xl font-bold text-white mb-2'>
                  Horarios de atención
                </h3>
                <div className='w-12 h-1 bg-color-primary mx-auto'></div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto'>
                {company.openDays.map((openDay, idx) => (
                  <div
                    key={idx}
                    className=' p-4 rounded-lg bg-black border border-neutral-800 text-center'
                  >
                    <p className='text-white font-medium mb-1'>{openDay.day}</p>
                    <div className='text-white/70 flex flex-col'>
                      {openDay.hours.map((openHour, hourIdx) => (
                        <span key={hourIdx}>{openHour}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Mapa de Google */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          viewport={{ once: true, margin: '0px 0px -100px 0px' }}
          className='w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 mb-16'
        >
          <div className='relative rounded-xl overflow-hidden shadow-[0_8px_30px_-15px_rgba(0,0,0,1)] border border-neutral-300'>
            {/* Línea decorativa superior */}
            <div className='absolute top-0 left-0 h-1 w-full bg-color-primary z-20'></div>
            <div className='absolute top-0 left-0 h-full w-full bg-color-primary/5 z-20 pointer-events-none'></div>

            <iframe
              className='w-full h-[400px] md:h-[500px]'
              src={`${company.googlemaps}`}
              width='1200'
              height='500'
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
            {/* Botón para abrir en Google Maps */}
            <a
              href={company.googlemapsLink || ''}
              target='_blank'
              rel='noopener noreferrer'
              className='absolute text-nowrap bottom-12 right-1/2 translate-x-1/2 md:translate-x-0 md:bottom-10 md:right-20 z-10 bg-color-primary hover:bg-color-primary-dark text-white px-5 py-3 rounded-lg transition-colors duration-300 flex items-center text-xs md:text-sm font-medium'
            >
              Ver en Google Maps
              <span className='ml-2'>→</span>
            </a>
          </div>
        </motion.article>
      </section>
      <Footer />
    </div>
  );
};

export default ContactoPage;
