'use client';

import { navigation } from '@/app/constants/constants';
import { company } from '@/app/constants/constants';

import Image from 'next/image';
import InstagramIcon from './icons/InstagramIcon';
import FacebookIcon from './icons/FacebookIcon';
import WhatsappIcon from './icons/WhatsappIcon';

import GrvityLogo from './icons/GrvityLogo';
import Link from 'next/link';

interface FooterProps {}

interface NavigationLink {
  id: string | number;
  title: string;
  url: string;
  external?: boolean;
}

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

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer
      id='contactoSection'
      className='flex justify-center pt-10 shadow-top-lg bg-color-bg-secondary'
    >
      <div className='flex flex-col items-center w-full'>
        <section className='flex md:justify-center text-color-text w-full '>
          <div className='flex flex-col md:flex-row gap-8 lg:gap-32 w-full justify-between max-w-6xl mx-4 sm:mx-6 md:mx-8 lg:mx-10 py-10'>
            <article className='flex w-full flex-col'>
              <div className='w-36 md:w-44 h-16'>
                <Image
                  className='w-full h-full object-contain object-left'
                  src='/assets/company/logo.webp'
                  alt={`${company.name} logo`}
                  width={288}
                  height={72}
                />
              </div>
              <p className='text-color-text-light text-sm lg:text-base mt-3 max-w-96'>
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
                    href={`https://www.facebook.com/${company.facebook}/`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <FacebookIcon className='w-8 h-8 text-color-text-light hover:text-color-title-light transition-colors' />
                  </a>
                )}
                {company.whatsapp && (
                  <a
                    href={`https://api.whatsapp.com/send?phone=549${company.whatsapp}&text=Hola! Quería hacer una consulta`}
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
                <h4 className='text-color-title-light'>Menú</h4>
                <ul className='flex flex-col'>
                  {navigation.map((link: NavigationLink) => (
                    <li key={link.id}>
                      {link?.external ? (
                        <a
                          href={link.url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-color-text-light hover:text-color-title-light transition-colors cursor-pointer'
                        >
                          {link.title}
                        </a>
                      ) : (
                        <Link
                          href={`${link.url}`}
                          className='text-color-text-light hover:text-color-title-light transition-colors cursor-pointer'
                        >
                          {link.title}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
            <article className='w-full'>
              {company.adress && company.city && (
                <div>
                  <h4 className='text-color-title-light'>Dirección</h4>
                  <p className='text-color-text-light'>
                    {company.adress}, {company.city}
                  </p>
                </div>
              )}
              {company.telephone && (
                <div>
                  <h4 className='text-color-title-light'>Teléfono</h4>
                  <a
                    className='text-color-text-light'
                    href={`tel:${company.telephone}`}
                  >
                    {company.telephone}
                  </a>
                </div>
              )}
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
        <section className='flex justify-center w-full pb-16 pt-8 border-t border-color-primary'>
          <article className='flex flex-col md:flex-row justify-between items-center text-sm sm:text-base gap-3 sm:gap-5 w-full max-w-6xl mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
            <div className='flex items-center gap-1 sm:gap-2 text-color-text-light'>
              <span>© Copyright 2024</span>
              <span>-</span>
              <span>{company.name}</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-color-text-light'>Desarrollado por:</span>
              <a
                href='https://www.agenciagrvity.com/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <GrvityLogo className='w-32 text-white hover:text-[#D1FA2D] transition-colors' />
              </a>
            </div>
          </article>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
