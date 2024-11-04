'use client';

import { company } from '@/app/constants/constants';
import ClockIcon from '@/components/icons/ClockIcon';
import FacebookIcon from '@/components/icons/FacebookIcon';
import InstagramIcon from '@/components/icons/InstagramIcon';
import LocationIcon from '@/components/icons/LocationIcon';
import SocialIcons from '@/components/icons/SocialIcons';
import WhatsappIcon from '@/components/icons/WhatsappIcon';

import Footer from '@/components/Footer';
import HeaderWithSuspense from '@/components/Header';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface Company {
  id: string;
  name: string;
  adress?: string;
  city?: string;
  telephone?: string | null;
  email?: string | null;
  instagram?: string;
  facebook?: string | null;
  whatsapp?: string | null;
  googlemaps?: string | null;
  menu?: string | null;
  openDays?: Array<{ day: string; hours: string[] }> | null;
  footer: string;
}

const ContactoPage = () => {
  return (
    <>
      <HeaderWithSuspense />
      <section className='flex flex-col items-center'>
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
          <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-color-bg-secondary/70 md:from-color-bg-secondary/80 to-color-bg-secondary/70 md:to-color-bg-secondary/85'></div>
        </section>
        {/* <section
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
                <div className='w-[280px] md:w-[320px] lg:w-[405px] overflow-hidden rounded sm:rounded-lg md:[box-shadow:0px_0px_19px_3px_rgba(0,0,0,0.2)]'>
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
        </section> */}
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
                  {(company.whatsapp as Company['whatsapp']) && (
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
            <article>
              <iframe
                className='w-72 h-56 sm:w-[450px] sm:h-[350px] md:w-[350px] lg:h-[400px] lg:w-[500px] xl:w-[550px] rounded-md'
                src={company.googlemaps}
                width='500'
                height='350'
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
              ></iframe>
            </article>
          </motion.div>
        </section>
      </section>
      <Footer />
    </>
  );
};

export default ContactoPage;
