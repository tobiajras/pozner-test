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
        'color-primary': '#5D8F02',
        'color-primary-dark': '#4C7107',
        'color-primary-light': '#B6EC55',
        'color-secondary': '#48261A',
        'color-secondary-dark': '#2D0F04',
        'color-secondary-light': '#C5785D',
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
