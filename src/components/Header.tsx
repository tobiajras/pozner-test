import { navigation, company } from '@/app/constants/constants';

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const Header = () => {
  return (
    <header className='sticky top-0 left-0 z-30 flex justify-center h-24 bg-color-background-dark'>
      <section className='flex items-center gap-20 py-5 max-w-6xl w-full'>
        <Link href='/' className='flex items-center gap-2'>
          <div>
            <Image
              className='w-16 h-16'
              src='/assets/company/favicon.webp'
              alt={`${company.name} favicon`}
              width={100}
              height={100}
            />
          </div>
          <div>
            <Image
              src='/assets/company/logo.webp'
              alt={`${company.name} logo`}
              width={100}
              height={100}
            />
          </div>
        </Link>
        <nav>
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
        <article>
          <Link
            className='text-color-text-light hover:text-color-title-light transition-all duration-300'
            href='/carrito'
          >
            Cart
          </Link>
        </article>
      </section>
    </header>
  );
};

export default Header;
