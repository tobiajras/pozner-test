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
        poppins: ['var(--font-poppins)'],
      },
      colors: {
        'color-primary': '#8F7979',
        'color-primary-dark': '#7B6767',
        'color-primary-light': '#D6B9B9',
        'color-secondary': '#7B6767',
        'color-secondary-dark': '#8F7979',
        'color-secondary-light': '#D6B9B9',
        'color-tertiary': '#FCD369',
        'color-tertiary-dark': '#FBBB17',
        'color-tertiary-light': '#FFE39C',
        'color-bg-primary': '#ffff',
        'color-bg-secondary': '#03070A',
        'color-title': '#141517',
        'color-title-light': '#ffff',
        'color-text': '#667781',
        'color-text-light': '#d4d4d4',
      },
    },
  },
  plugins: [],
};
export default config;
