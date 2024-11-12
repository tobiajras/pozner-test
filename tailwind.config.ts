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
        'color-primary': '#6D2205',
        'color-primary-dark': '#511802',
        'color-primary-light': '#E4B09B',
        'color-secondary': '#6D2205',
        'color-secondary-dark': '#511802',
        'color-secondary-light': '#E4B09B',
        'color-tertiary': '#FCD369',
        'color-tertiary-dark': '#FBBB17',
        'color-tertiary-light': '#FFE39C',
        'color-bg-primary': '#ffff',
        'color-bg-secondary': '#151515',
        'color-title': '#141517',
        'color-title-light': '#ffff',
        'color-text': '#667781',
        'color-text-light': '#E0E0E0',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
export default config;
