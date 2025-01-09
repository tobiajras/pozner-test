import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter-font': ['var(--font-inter)', 'sans-serif'],
        poppins: ['var(--font-poppins)'],
      },
      colors: {
        'color-primary': '#009ED9',
        'color-primary-dark': '#0092C8',
        'color-primary-light': '#8ADFFF',
        'color-secondary': '#1E1E1E',
        'color-secondary-dark': '#222222',
        'color-secondary-light': '#E4E4E4',
        'color-tertiary': '#FCD369',
        'color-tertiary-dark': '#FBBB17',
        'color-tertiary-light': '#FFE39C',
        'color-bg-primary': '#ffff',
        'color-bg-secondary': '#151515',
        'color-bg-secondary-light': '#1E1E1E',
        'color-title': '#000000',
        'color-title-light': '#ffff',
        'color-text': '#78848E',
        'color-text-light': '#d4d4d4',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
export default config;
