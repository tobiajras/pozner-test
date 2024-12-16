'use client';

import { navigation, company } from '@/app/constants/constants';
import { useNavbarStore } from '@/store/navbarStore';

import Link from 'next/link';
import Image from 'next/image';

import HamburguerIcon from './icons/HamburguerIcon';
import CloseIcon from './icons/CloseIcon';

const Header = () => {
  const { isMenuOpen, setIsMenuOpen } = useNavbarStore();

  return (
    <header className='sticky top-0 left-0 z-30 flex justify-center h-24 bg-color-bg-secondary'>
      <section className='flex justify-between items-center gap-3 md:gap-8 lg:gap-20 py-5 max-w-6xl w-full mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
        <article className='flex w-full'>
          <Link
            className='flex items-center gap-2 md:gap-3'
            href='/'
            onClick={() => setIsMenuOpen(false)}
          >
            <Image
              priority
              className='w-[65px] h-[65px] sm:w-[70px] sm:h-[70px] lg:w-[75px] lg:h-[75px]'
              // className='w-[65px] h-[65px] sm:w-[70px] sm:h-[70px] lg:w-[75px] lg:h-[75px] ring-2 ring-white rounded-full'
              src='/assets/company/favicon.webp'
              alt={`${company.name} favicon`}
              width={64}
              height={64}
            />
            <div className='h-10 w-24 sm:w-28 md:w-40'>
              <Image
                priority
                className='h-full w-full object-contain object-left'
                src='/assets/company/logo.webp'
                alt={`${company.name} logo`}
                width={116}
                height={56}
              />
            </div>
          </Link>
        </article>
        <nav className='hidden md:block'>
          <ul className='flex items-center gap-5'>
            {navigation.map((nav) => (
              <li key={nav.id}>
                <Link
                  className='text-color-text-light hover:text-color-title-light transition-all duration-300'
                  href={nav.url}
                >
                  {nav.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <article className='md:hidden flex justify-end items-center gap-2 sm:gap-3 lg:gap-5'>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className=' text-color-text-light hover:text-color-title-light transition-all'
          >
            {isMenuOpen ? (
              <CloseIcon className='w-7 h-7' />
            ) : (
              <HamburguerIcon className='w-7 h-7' />
            )}
          </button>
        </article>
        <div className='md:hidden overflow-hidden absolute top-24 right-0 h-svh w-full pointer-events-none'>
          <nav
            className={`${
              isMenuOpen ? 'right-0' : '-right-full'
            } absolute top-0 h-full w-1/2 bg-color-bg-secondary transition-all duration-300 pointer-events-auto`}
          >
            <ul className='flex flex-col gap-2 p-5'>
              {navigation.map((nav) => (
                <li key={nav.id}>
                  <Link
                    className='text-color-text-light hover:text-color-title-light text-lg transition-colors'
                    href={nav.url}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {nav.title}
                  </Link>
                </li>
              ))}
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
