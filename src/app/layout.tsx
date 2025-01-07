import { company, metadataCompany } from './constants/constants';

import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import Image from 'next/image';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

export const metadata = {
  metadataBase: metadataCompany.metadataBase,
  title: metadataCompany.title,
  description: metadataCompany.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${poppins.variable} ${inter.variable} font-poppins font bg-color-bg-primary text-color-text antialiased`}
      >
        {company.whatsapp && (
          <a
            href={`https://api.whatsapp.com/send?phone=549${company.whatsapp[0]}&text=Hola! Quería hacer una consulta`}
            target='_blank'
            rel='noopener noreferrer'
            className='fixed bottom-0 right-0 mx-5 my-10 md:m-10 lg:m-16 xl:m-20 z-50 hover:scale-110 transition-all duration-300 hover:drop-shadow-xl'
          >
            <Image
              priority
              className='drop-shadow-xl w-16 h-16 md:w-20 md:h-20'
              src='/assets/whatsapp-banner/whatsapp-fixed.svg'
              width={80}
              height={80}
              alt='whatsapp logo'
            />
          </a>
        )}
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
