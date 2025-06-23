'use client';

import { navigation } from '@/app/constants/constants';
import { company } from '@/app/constants/constants';

import Image from 'next/image';
import InstagramIcon from './icons/InstagramIcon';
import FacebookIcon from './icons/FacebookIcon';
import WhatsappIcon from './icons/WhatsappIcon';

import Link from 'next/link';
// import GravityLogo from './icons/GravityLogo';
import SpeedmotorsLogo from './icons/SpeedmotorsLogo';

const Footer = () => {
  return (
    <div className='relative'>
      <footer
        id='contactoSection'
        className={`flex justify-center shadow-top-lg relative ${
          company.darkmode
            ? 'bg-color-bg-secondary-dark'
            : 'bg-color-bg-secondary'
        } `}
        style={{ boxShadow: '0 -4px 6px rgba(0, 0, 0, 0.1)' }}
      >
        <div className='flex flex-col items-center w-full relative z-10'>
          <section className='flex md:justify-center text-color-text-light w-full pb-3 md:pb-5'>
            <div className='flex flex-col md:flex-row gap-8 lg:gap-32 w-full justify-between max-w-6xl mx-6 sm:mx-8 md:mx-10 py-10'>
              <article className='flex w-full flex-col'>
                {company.favicon ? (
                  <div className='w-48 sm:w-52 md:w-52 lg:w-56 h-12 sm:h-14'>
                    <Image
                      className='w-full h-full object-contain object-left'
                      src='/assets/company/logo.webp'
                      alt={`${company.name} logo`}
                      width={288}
                      height={72}
                    />
                  </div>
                ) : (
                  <div className='w-60 sm:w-60 md:w-64 lg:w-80 h-14 md:h-16'>
                    <SpeedmotorsLogo className='w-full h-full text-color-title-light' />
                  </div>
                )}

                <p className='text-color-text-light mt-1 md:mt-3 max-w-96'>
                  {company.footer}
                </p>
                <div className='flex gap-4 mt-4'>
                  {company.instagram && (
                    <a
                      href={`https://www.instagram.com/${company.instagram}/`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <InstagramIcon className='w-8 h-8 text-color-text-light hover:text-color-title-light transition-colors' />
                    </a>
                  )}
                  {company.facebook && (
                    <a
                      href={`${company.facebook}`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <FacebookIcon className='w-8 h-8 text-color-text-light hover:text-color-title-light transition-colors' />
                    </a>
                  )}
                  {company.whatsapp && (
                    <a
                      href={`https://api.whatsapp.com/send?phone=549${company.whatsapp[0]}&text=Hola! Quería hacer una consulta`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <WhatsappIcon className='w-8 h-8 text-color-text-light hover:text-color-title-light transition-colors' />
                    </a>
                  )}
                </div>
              </article>
              <article className='flex md:justify-center'>
                <div>
                  <ul className='flex flex-col'>
                    {navigation.map((link) => (
                      <li key={link.id}>
                        <Link
                          href={`${link.url}`}
                          className='text-color-text-light hover:text-color-title-light transition-colors cursor-pointer'
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
              <article className='w-full'>
                {company.adress || company.city ? (
                  <div>
                    <h4 className='text-color-title-light'>Dirección</h4>
                    <div className='flex flex-col items-start text-center text-balance'>
                      <div className='flex items-center gap-0.5'>
                        <span>{company.adress && `${company.adress}, `}</span>
                        <span>{company.city && `${company.city}`}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}

                <div>
                  <h4 className='text-color-title-light'>Contacto</h4>
                  <div className='flex flex-col'>
                    {company.whatsapp &&
                      company.whatsapp.map((whatsappNumber, idx) => (
                        <a
                          key={idx}
                          href={`https://api.whatsapp.com/send?phone=549${whatsappNumber}&text=Hola! Quería hacer una consulta`}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-color-text-light hover:text-color-title-light transition-colors'
                        >
                          {whatsappNumber}
                        </a>
                      ))}
                  </div>
                </div>
                {company.email && (
                  <div>
                    <h4 className='text-color-title-light'>Email</h4>
                    <a
                      href={`mailto:${company.email}`}
                      className='text-color-text-light hover:text-color-title-light transition-colors'
                    >
                      {company.email}
                    </a>
                  </div>
                )}
              </article>
            </div>
          </section>
          {/* <section
            className={`${
              company.dark
                ? 'border-color-primary-light'
                : 'border-color-primary'
            } flex justify-center w-full pt-4 pb-6 md:pt-6 md:pb-8 border-t`}
          >
            <article className='text-sm flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-5 w-full max-w-6xl mx-6 sm:mx-8 md:mx-10'>
              <div className='flex items-center gap-1 sm:gap-2 text-color-text-light'>
                <span>© Copyright {new Date().getFullYear()}</span>
                <span>-</span>
                <span>{company.name}</span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-color-text-light'>Desarrollado por:</span>
                <a
                  href='https://www.agenciagravity.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <GravityLogo className='w-20 md:w-[85px] text-white hover:text-[#D1FA2D] transition-colors' />
                </a>
              </div>
            </article>
          </section> */}
        </div>
      </footer>
    </div>
  );
};

export default Footer;
