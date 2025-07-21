import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import { metadataCompany } from './constants/constants';
import { ScrollToTopProvider } from '../components/ScrollToTopProvider';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });

export const metadata: Metadata = {
  metadataBase: new URL(metadataCompany.metadataBase),
  title: metadataCompany.title,
  description: metadataCompany.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='es'>
      <body
        className={`${manrope.variable} font-manrope font bg-color-bg-primary text-color-text antialiased`}
      >
        <ScrollToTopProvider />
        {children}
      </body>
    </html>
  );
}
