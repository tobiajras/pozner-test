'use client';

import { navigation, company } from '@/app/constants/constants';
import { useNavbarStore } from '@/store/navbarStore';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import HamburguerIcon from './icons/HamburguerIcon';
import CloseIcon from './icons/CloseIcon';

const Header = () => {
  const { isMenuOpen, setIsMenuOpen } = useNavbarStore();
  const pathname = usePathname();

  // Dividir navegación
  const leftNav = navigation.filter(
    (nav) => nav.title === 'Inicio' || nav.title === 'Catálogo'
  );
  const rightNav = navigation.filter(
    (nav) => nav.title === 'Nosotros' || nav.title === 'Contacto'
  );

  return (
    <header
      className={`sticky top-0 left-0 z-30 w-full backdrop-blur bg-black border-b border-color-primary transition-all duration-300`}
    >
      <section className='hidden md:grid grid-cols-3 items-center max-w-6xl w-full mx-auto py-5 px-4 sm:px-6 md:px-8 lg:px-10'>
        {/* Menú izquierdo */}
        <nav className='flex justify-center'>
          <ul className='flex items-center gap-8 lg:gap-12'>
            {leftNav.map((nav) => {
              const isActive = pathname === nav.url;
              return (
                <li key={nav.id} className='relative'>
                  <Link
                    className={`font-medium transition-all duration-300 hover:text-color-primary lg:text-lg ${
                      isActive
                        ? 'text-color-primary-dark'
                        : 'text-color-text-light'
                    }`}
                    href={nav.url}
                  >
                    {nav.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        {/* Logo centrado */}
        <div className='flex justify-center'>
          <Link
            className='flex items-center gap-2 md:gap-3'
            href='/'
            onClick={() => setIsMenuOpen(false)}
          >
            {company.favicon ? (
              <>
                <Image
                  priority
                  className='w-[65px] h-[65px] sm:w-[70px] sm:h-[70px] lg:w-[75px] lg:h-[75px]'
                  src='/assets/company/favicon.webp'
                  alt={`${company.name} favicon`}
                  width={64}
                  height={64}
                />
                <div className='h-12 w-44 sm:w-48 md:w-56'>
                  <Image
                    priority
                    className='h-full w-full object-contain object-left'
                    src='/assets/company/logo.webp'
                    alt={`${company.name} logo`}
                    width={116}
                    height={56}
                  />
                </div>
              </>
            ) : (
              <div className='h-12 md:h-14 w-48 sm:w-56 md:w-64'>
                <Image
                  priority
                  className='h-full w-full object-contain object-left'
                  src='/assets/company/logo.webp'
                  alt={`${company.name} logo`}
                  width={116}
                  height={56}
                />
              </div>
            )}
          </Link>
        </div>
        {/* Menú derecho */}
        <nav className='flex justify-center'>
          <ul className='flex items-center gap-8 lg:gap-12'>
            {rightNav.map((nav) => {
              const isActive = pathname === nav.url;
              return (
                <li key={nav.id} className='relative'>
                  <Link
                    className={`font-medium transition-all duration-300 hover:text-color-primary lg:text-lg ${
                      isActive
                        ? 'text-color-primary-dark'
                        : 'text-color-text-light'
                    }`}
                    href={nav.url}
                  >
                    {nav.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </section>
      {/* Mobile: igual que antes */}
      <section className='flex md:hidden justify-between items-center h-20 gap-3 py-3 lg:py-5 max-w-6xl mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
        <article className='flex w-full'>
          <Link
            className='flex items-center gap-2 md:gap-3'
            href='/'
            onClick={() => setIsMenuOpen(false)}
          >
            {company.favicon ? (
              <>
                <Image
                  priority
                  className='w-[65px] h-[65px] sm:w-[70px] sm:h-[70px] lg:w-[75px] lg:h-[75px]'
                  src='/assets/company/favicon.webp'
                  alt={`${company.name} favicon`}
                  width={64}
                  height={64}
                />
                <div className='h-12 w-44 sm:w-48 md:w-56'>
                  <Image
                    priority
                    className='h-full w-full object-contain object-left'
                    src='/assets/company/logo.webp'
                    alt={`${company.name} logo`}
                    width={116}
                    height={56}
                  />
                </div>
              </>
            ) : (
              <div className='h-12 md:h-14 w-48 sm:w-56 md:w-64'>
                <Image
                  priority
                  className='h-full w-full object-contain object-left'
                  src='/assets/company/logo.webp'
                  alt={`${company.name} logo`}
                  width={116}
                  height={56}
                />
              </div>
            )}
          </Link>
        </article>
        <article className='md:hidden flex justify-end items-center gap-2 sm:gap-3 lg:gap-5'>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='text-color-text-light hover:text-color-primary transition-all'
          >
            {isMenuOpen ? (
              <CloseIcon className='w-8 h-8' />
            ) : (
              <HamburguerIcon className='w-8 h-8' />
            )}
          </button>
        </article>
        <div className='md:hidden overflow-hidden absolute top-20 right-0 h-svh w-full pointer-events-none'>
          <nav
            className={`${
              isMenuOpen ? 'right-0' : '-right-full'
            } absolute top-0 h-full w-1/2 bg-color-bg-secondary-dark transition-all duration-300 pointer-events-auto`}
          >
            <ul className='flex flex-col gap-2 p-5'>
              {navigation.map((nav) => {
                const isActive = pathname === nav.url;
                return (
                  <li key={nav.id} className='relative'>
                    <Link
                      className={`font-medium transition-all duration-300 hover:text-color-primary text-lg ${
                        isActive
                          ? 'text-color-primary-dark'
                          : 'text-color-text-light'
                      }`}
                      href={nav.url}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {nav.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div
            onClick={() => setIsMenuOpen(false)}
            className={`${
              isMenuOpen
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'
            } absolute top-0 left-0 h-full w-full bg-black/50 -z-10 transition-opacity`}
          ></div>
        </div>
      </section>
    </header>
  );
};

export default Header;
