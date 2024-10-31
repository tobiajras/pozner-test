import { metadataCompany } from './constants/constants';

import { Poppins } from 'next/font/google';
import './globals.css';

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
        className={`${poppins.variable} font-poppins bg-color-bg-primary text-color-text antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
