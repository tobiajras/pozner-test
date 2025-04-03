'use client';

import { useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Element, Link } from 'react-scroll';
import Image from 'next/image';

import menu from '@/data/menu.json';

import { company, metadataCompany } from '../constants/constants';
import GrvityLogo from '@/components/icons/GrvityLogo';

const MenuPage = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'trimSnaps',
  });
  const [activeCategory, setActiveCategory] = useState<string>('');

  const scrollTo = useCallback(
    (category: string) => {
      if (!emblaApi) return;

      // Encuentra el índice de la categoría actual
      const index = menu.findIndex((item) => item.category === category);
      if (index !== -1) {
        emblaApi.scrollTo(index);
      }
    },
    [emblaApi]
  );

  const handleSetActive = (category: string) => {
    setActiveCategory(category);
    scrollTo(category);
  };

  return (
    <section className='flex flex-col items-center relative'>
      <div className='background-menu w-full h-full absolute -z-20 opacity-[0.075]'></div>
      <header className='sticky top-0 left-0 right-0 bottom-0 w-full flex flex-col items-center bg-color-bg-secondary z-50'>
        <div className='flex justify-center items-center gap-2 md:gap-3 h-20 p-4 max-w-xl'>
          <Image
            priority
            className='w-14 h-14 lg:w-16 lg:h-16'
            // className='w-14 h-14 lg:w-16 lg:h-16 ring-2 ring-white rounded-full'
            src='/assets/company/favicon.webp'
            alt='favicon'
            width={64}
            height={64}
          />
          <div className='h-9 md:h-10 w-24 sm:w-28 md:w-32'>
            <Image
              priority
              className='h-full w-full object-contain object-left'
              src='/assets/company/logo.webp'
              alt='logo'
              width={116}
              height={56}
            />
          </div>
        </div>
        <nav
          ref={emblaRef}
          className='bg-color-bg-primary h-20 shadow flex justify-center items-center overflow-hidden w-full'
        >
          <div className='embla__container flex gap-2 max-w-sm md:max-w-md lg:max-w-lg px-4 w-full'>
            {menu.map((menuCategory) => (
              <Link
                key={menuCategory.id}
                className={`hover:border-color-primary transition-colors cursor-pointer border whitespace-nowrap flex text-nowrap px-2 py-2.5 text-sm rounded ${
                  activeCategory === menuCategory.category
                    ? 'bg-color-primary text-color-title-light'
                    : ''
                }`}
                to={menuCategory.category}
                spy={true}
                smooth={true}
                offset={-180}
                duration={500}
                onSetActive={() => handleSetActive(menuCategory.category)}
              >
                {menuCategory.category}
              </Link>
            ))}
          </div>
        </nav>
      </header>
      <main className='flex flex-col items-center max-w-sm md:max-w-md lg:max-w-lg px-4 w-full mb-10'>
        {menu.map((menuCategory) => (
          <Element
            name={menuCategory.category}
            className='py-5 w-full'
            key={menuCategory.id}
          >
            <div className='flex items-center gap-3'>
              <h4 className='text-color-primary text-lg md:text-xl font-semibold text-nowrap'>
                {menuCategory.category}
              </h4>
              <div className='bg-color-primary h-0.5 w-full'></div>
            </div>
            <ul className='flex flex-col w-full'>
              {menuCategory.products.map((menuItem, idx) => (
                <li
                  className='flex justify-between py-5 border-b'
                  key={menuItem.id}
                >
                  <div className='max-w-52 sm:max-w-56 md:max-w-64 lg:max-w-80'>
                    <h5 className='text-color-title font-medium line-clamp-2 md:text-lg'>
                      {menuItem.title}
                    </h5>
                    {menuItem.description && (
                      <p className='text-sm md:text-base line-clamp-3'>
                        {menuItem.description}
                      </p>
                    )}
                    <span className='text-color-title font-medium'>
                      ${menuItem.price.toLocaleString('es-ES')}
                    </span>
                  </div>
                  <div className='w-24 h-24 sm:w-28 sm:h-28 overflow-hidden rounded shadow-[0_0_10px_rgba(0,0,0,0.3)] shadow-gray-400'>
                    <Image
                      priority={idx < 5 && true}
                      className='w-full h-full object-contain'
                      src={`/assets/menu/${menuItem.image}`}
                      width={200}
                      height={200}
                      alt={`${menuItem.title} image`}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Element>
        ))}
      </main>
      <footer className='flex justify-center w-full pb-16 pt-8 border-t border-color-primary bg-color-bg-secondary'>
        <article className='flex flex-col justify-between items-center text-sm sm:text-base gap-5 sm:gap-5 w-full max-w-6xl mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
          <div className='flex flex-col items-center gap-2 sm:gap-2 text-color-text-light'>
            <a
              href={metadataCompany.metadataBase}
              target='_blank'
              rel='noopener noreferrer'
            >
              Visitá nuestra página
            </a>
            <a
              className='bg-color-primary-light hover:bg-color-primary-light/85 transition-colors px-5 py-2 text-color-title rounded-sm'
              href={metadataCompany.metadataBase}
              target='_blank'
              rel='noopener noreferrer'
            >
              {company.name} Web
            </a>
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
      </footer>
    </section>
  );
};

export default MenuPage;
