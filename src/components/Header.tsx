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

  return (
    <header
      className={`sticky top-0 left-0 z-30 flex justify-center h-24 ${
        company.darkmode
          ? 'bg-color-bg-secondary-dark'
          : company.dark
          ? 'bg-color-bg-primary'
          : 'bg-color-bg-secondary-dark'
      }  shadow-md`}
    >
      <section className='flex justify-between items-center gap-3 md:gap-8 lg:gap-20 py-5 max-w-6xl w-full mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
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
                  // className={`w-[65px] h-[65px] sm:w-[70px] sm:h-[70px] lg:w-[75px] lg:h-[75px] ring-[1.5px] ${
                  //   company.darkmode
                  //     ? 'ring-color-bg-primary'
                  //     : company.dark
                  //     ? 'ring-color-bg-secondary'
                  //     : 'ring-color-bg-primary'
                  // }  rounded-full`}
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
              <div className='h-12 md:h-14 w-72 sm:w-80 md:w-96'>
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
        <nav className='hidden md:block'>
          <ul className='flex items-center gap-8'>
            {navigation.map((nav) => {
              const isActive = pathname === nav.url;
              return (
                <li key={nav.id} className='relative'>
                  <Link
                    className={` ${
                      nav.button
                        ? `${
                            company.dark
                              ? 'text-color-title-light hover:bg-color-primary-dark'
                              : 'text-color-title-light hover:bg-color-primary-dark'
                          }  bg-color-primary p-3 rounded-md`
                        : company.darkmode
                        ? `text-color-text-light hover:text-color-title-light ${
                            !nav.button && isActive && 'text-color-title-light'
                          }`
                        : `text-color-text hover:text-color-title ${
                            !nav.button && isActive && 'text-color-title-light'
                          }`
                    } font-medium transition-all duration-300`}
                    href={nav.url}
                  >
                    {nav.title}
                  </Link>
                  {!nav.button && isActive && (
                    <span className='absolute -bottom-2 left-0 w-full scale-x-110 h-0.5 bg-color-primary transition-all duration-300'></span>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
        <article className='md:hidden flex justify-end items-center gap-2 sm:gap-3 lg:gap-5'>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`${
              company.darkmode
                ? 'text-color-text-light hover:text-color-title-light'
                : 'text-color-text hover:text-color-title'
            } transition-all`}
          >
            {isMenuOpen ? (
              <CloseIcon className='w-8 h-8' />
            ) : (
              <HamburguerIcon className='w-8 h-8' />
            )}
          </button>
        </article>
        <div className='md:hidden overflow-hidden absolute top-24 right-0 h-svh w-full pointer-events-none'>
          <nav
            className={`${
              isMenuOpen ? 'right-0' : '-right-full'
            } absolute top-0 h-full w-1/2 ${
              company.darkmode
                ? 'bg-color-bg-secondary-dark'
                : 'bg-color-bg-primary'
            }  transition-all duration-300 pointer-events-auto`}
          >
            <ul className='flex flex-col gap-2 p-5'>
              {navigation.map((nav) => {
                const isActive = pathname === nav.url;
                return (
                  <li key={nav.id} className='relative'>
                    <Link
                      className={`${
                        company.darkmode
                          ? 'text-color-text-light hover:text-color-title-light'
                          : 'text-color-text font-medium hover:text-color-title'
                      } text-lg transition-colors block py-2`}
                      href={nav.url}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {nav.title}
                      {isActive && (
                        <span className='absolute left-0 -bottom-1 w-8 h-0.5 bg-color-primary'></span>
                      )}
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
