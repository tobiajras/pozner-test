'use client';

import { company } from '@/app/constants/constants';

import { useEffect } from 'react';
import Script from 'next/script';
import SpinnerIcon from './icons/SpinnerIcon';

import { motion } from 'framer-motion';

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process(): void;
      };
    };
  }
}

const InstagramFeed = () => {
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, []);

  return (
    <section className='flex justify-center my-8 md:my-14 lg:my-20 mx-4 sm:mx-6 md:mx-8 lg:mx-10'>
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
        className='w-[326px] h-[420px] sm:w-96 sm:h-[446px] md:w-[500px] md:h-[555px] lg:w-[600px] lg:h-[621px] xl:w-[700px] xl:h-[688px]'
      >
        <blockquote
          className='instagram-media w-[326px] h-[420px] sm:w-96 sm:h-[446px] md:w-[500px] md:h-[555px] lg:w-[600px] lg:h-[621px] xl:w-[700px] xl:h-[688px]'
          data-instgrm-permalink={`https://www.instagram.com/${company.instagram}/`}
          data-instgrm-version='12'
        >
          <div className='flex justify-center items-center h-full'>
            <a
              id='main_link'
              href={`https://www.instagram.com/${company.instagram}/`}
              target='_blank'
            >
              <div className='flex justify-center items-center animate-spin'>
                <SpinnerIcon className='w-10 h-10 text-color-primary-dark' />
              </div>
            </a>
          </div>
        </blockquote>
        <Script
          src='https://www.instagram.com/embed.js'
          strategy='lazyOnload'
          onLoad={() => {
            if (window.instgrm) {
              window.instgrm.Embeds.process();
            }
          }}
        />
      </motion.div>
    </section>
  );
};

export default InstagramFeed;
