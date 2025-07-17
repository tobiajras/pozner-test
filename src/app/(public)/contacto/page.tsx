'use client';

import { company } from '@/app/constants/constants';
import ClockIcon from '@/components/icons/ClockIcon';
import LocationIcon from '@/components/icons/LocationIcon';
import InstagramIcon from '@/components/icons/InstagramIcon';
import WhatsappFillIcon from '@/components/icons/WhatsappFillIcon';

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ContactoPage = () => {
  return (
    <>
      <Header />
      <div className='py-8 md:py-14 lg:py-16'>
        {/* Hero Section */}
        <section className='flex flex-col items-center w-full'>
          <div className='text-center mb-3 sm:mb-4 md:mb-5 lg:mb-10'>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className='text-2xl md:text-3xl lg:text-4xl font-extrabold text-color-primary mb-2'
            >
              Contactanos
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='text-color-text max-w-sm sm:max-w-lg lg:max-w-2xl mx-auto md:text-lg font-medium px-4'
            >
              En {company.name} nos dedicamos a ofrecer la mejor experiencia de
              compra de autos usados, con la mejor calidad y el mejor servicio.
            </motion.p>
          </div>
        </section>

        {/* Información de contacto principal */}
        <section>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start'>
              {/* Columna izquierda - Información de contacto */}
              <div className='space-y-8'>
                {/* Tarjetas de contacto */}
                <div className='space-y-6'>
                  {/* WhatsApp */}
                  <motion.a
                    href={`https://api.whatsapp.com/send?phone=549${company.whatsapp[0]}&text=Hola! Quería hacer una consulta sobre un vehículo`}
                    target='_blank'
                    rel='noopener noreferrer'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className='group flex items-center p-4 md:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-colors duration-300 border border-gray-100 hover:border-color-primary/30'
                  >
                    <div className='flex-shrink-0 w-14 h-14 bg-color-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                      <WhatsappFillIcon className='w-7 h-7 text-white' />
                    </div>
                    <div className='ml-6 flex-1'>
                      <h3 className='text-lg font-semibold text-color-title group-hover:text-color-primary transition-colors'>
                        WhatsApp
                      </h3>
                      <p className='text-color-text'>{company.whatsapp[0]}</p>
                      <p className='text-sm text-color-primary font-medium mt-1'>
                        Mensaje directo →
                      </p>
                    </div>
                  </motion.a>

                  {/* Instagram */}
                  <motion.a
                    href={`https://www.instagram.com/${company.instagram}/`}
                    target='_blank'
                    rel='noopener noreferrer'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className='group flex items-center p-4 md:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-colors duration-300 border border-gray-100 hover:border-color-primary/30'
                  >
                    <div className='flex-shrink-0 w-14 h-14 bg-color-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                      <InstagramIcon className='w-7 h-7 text-white' />
                    </div>
                    <div className='ml-6 flex-1'>
                      <h3 className='text-lg font-semibold text-color-title group-hover:text-color-primary transition-colors'>
                        Instagram
                      </h3>
                      <p className='text-color-text'>@{company.instagram}</p>
                      <p className='text-sm text-color-primary font-medium mt-1'>
                        Seguinos →
                      </p>
                    </div>
                  </motion.a>

                  {/* Ubicación */}
                  <motion.a
                    href={company.googlemapsLink || ''}
                    target='_blank'
                    rel='noopener noreferrer'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                    className='group flex items-center p-4 md:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-colors duration-300 border border-gray-100 hover:border-color-primary/30'
                  >
                    <div className='flex-shrink-0 w-14 h-14 bg-color-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                      <LocationIcon className='w-7 h-7 text-white' />
                    </div>
                    <div className='ml-6 flex-1'>
                      <h3 className='text-lg font-semibold text-color-title group-hover:text-color-primary transition-colors'>
                        Ubicación
                      </h3>
                      <p className='text-color-text'>
                        {company.adress}, {company.city}
                      </p>
                      <p className='text-sm text-color-primary font-medium mt-1'>
                        Ver en Google Maps →
                      </p>
                    </div>
                  </motion.a>
                </div>
              </div>

              {/* Columna derecha - Horarios y mapa */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true, margin: '0px 100px -100px 0px' }}
                className='space-y-8'
              >
                {/* Horarios */}
                <div className='bg-white rounded-2xl shadow-lg p-8 border border-gray-100'>
                  <div className='flex items-center mb-6'>
                    <div className='w-12 h-12 bg-color-primary rounded-xl flex items-center justify-center'>
                      <ClockIcon className='w-6 h-6 text-white' />
                    </div>
                    <h3 className='text-2xl font-bold text-color-title ml-4'>
                      Horarios de atención
                    </h3>
                  </div>

                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    {company.openDays.map((openDay, idx) => (
                      <div
                        key={idx}
                        className='bg-color-primary/5 rounded-xl p-4 border border-gray-200'
                      >
                        <p className='font-semibold text-color-title mb-2'>
                          {openDay.day}
                        </p>
                        <div className='text-color-text space-y-1'>
                          {openDay.hours.map((openHour, hourIdx) => (
                            <p key={hourIdx} className='text-sm'>
                              {openHour}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
              <div className='bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 lg:col-span-2'>
                <div className='relative'>
                  <iframe
                    className='w-full h-64 md:h-80 lg:h-96'
                    src={`${company.googlemaps}`}
                    width='100%'
                    height='256'
                    loading='lazy'
                    referrerPolicy='no-referrer-when-downgrade'
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default ContactoPage;
