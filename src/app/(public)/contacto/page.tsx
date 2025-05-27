'use client';

import { company, sedes } from '@/app/constants/constants';
import ClockIcon from '@/components/icons/ClockIcon';
import LocationIcon from '@/components/icons/LocationIcon';
import InstagramIcon from '@/components/icons/InstagramIcon';
import WhatsappFillIcon from '@/components/icons/WhatsappFillIcon';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import EmailFillIcon from '@/components/icons/EmailFillIcon';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const ContactoPage = () => {
  return (
    <>
      <Header />
      <section className='flex flex-col items-center'>
        <section className='w-full py-8 md:py-14 lg:py-16 flex justify-center items-center'>
          <div className='max-w-6xl w-full flex justify-center mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
            <div className='text-center'>
              <h3 className='text-sm sm:text-base text-color-primary uppercase tracking-wider mb-1 md:mb-2'>
                Vení a visitarnos
              </h3>
              <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-color-title mb-2 md:mb-4'>
                CONTACTO
              </h2>
              <div className='flex items-center justify-center w-full max-w-sm md:max-w-md mx-auto px-4'>
                <div className='h-0.5 flex-grow bg-gradient-to-r from-transparent via-color-primary to-color-trasparent'></div>
              </div>
            </div>
          </div>
        </section>
        <section className='w-full max-w-6xl mb-16'>
          <div className='flex flex-wrap justify-center gap-x-6 gap-y-6 md:gap-x-10 md:gap-y-16 mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
            {sedes.map((sede) => (
              <motion.div
                key={sede.id}
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
                  <div className='overflow-hidden aspect-video'>
                    <Image
                      priority
                      className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
                      src={`/assets/sedes/${sede.image}`}
                      alt={sede.title}
                      width={600}
                      height={350}
                    />
                  </div>
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
            ))}
          </div>
        </section>
        {/* Tarjetas de información de contacto */}
        <section className='w-full max-w-6xl mx-auto mb-16'>
          <div className='grid grid-cols-1 lg:grid-cols-3 place-items-center gap-6 mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
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
              className='bg-gradient-to-b from-black to-neutral-900 rounded-lg max-w-md md:max-w-lg w-full overflow-hidden group hover:shadow-[0_5px_30px_-15px_rgba(0,0,0,2)] transition-shadow hover:border-color-primary duration-500 text-center p-8 border border-neutral-800 cursor-pointer'
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
              className='bg-gradient-to-b from-black to-neutral-900 rounded-lg max-w-md md:max-w-lg w-full overflow-hidden group  hover:shadow-[0_5px_30px_-15px_rgba(0,0,0,2)] transition-shadow hover:border-color-primary duration-500 text-center p-8 border border-neutral-800 cursor-pointer'
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
              href={`mailto:${company.email}`}
              target='_blank'
              rel='noopener noreferrer'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 },
              }}
              viewport={{ once: true, margin: '0px 0px -100px 0px' }}
              className='bg-gradient-to-b from-black to-neutral-900 rounded-lg max-w-md md:max-w-lg w-full overflow-hidden group hover:shadow-[0_5px_30px_-15px_rgba(0,0,0,2)] transition-shadow hover:border-color-primary duration-500 text-center p-8 border border-neutral-800 cursor-pointer'
            >
              <div className='w-20 h-20 rounded-full bg-color-primary flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300'>
                <EmailFillIcon className='w-10 h-10 text-color-title-light' />
              </div>
              <h3
                className={`${
                  company.dark
                    ? 'group-hover:text-color-primary-light'
                    : 'group-hover:text-color-primary'
                } text-xl font-bold text-white mb-4  transition-colors duration-300`}
              >
                Email
              </h3>
              <p className='text-white/70'>{company.email}</p>
              <div className='mt-6'>
                <span
                  className={`${
                    company.dark
                      ? 'text-color-primary-light '
                      : 'text-color-primary group-hover:text-color-primary-light'
                  } inline-flex items-center  transition-colors text-sm font-medium`}
                >
                  Enviar email
                  <span className='inline-block transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300 ml-1'>
                    →
                  </span>
                </span>
              </div>
            </motion.a>
          </div>
        </section>
      </section>
      <Footer />
    </>
  );
};

export default ContactoPage;
