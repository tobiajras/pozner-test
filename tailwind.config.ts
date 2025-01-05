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
        'color-primary': '#131148',
        'color-primary-dark': '#030120',
        'color-primary-light': '#8E89FF',
        'color-secondary': '#1E1E1E',
        'color-secondary-dark': '#222222',
        'color-secondary-light': '#E4E4E4',
        'color-tertiary': '#FCD369',
        'color-tertiary-dark': '#FBBB17',
        'color-tertiary-light': '#FFE39C',
        'color-bg-primary': '#ffff',
        'color-bg-secondary': '#0A0A0A',
        'color-bg-secondary-light': '#1E1E1E',
        'color-title': '#141517',
        'color-title-light': '#ffff',
        'color-text': '#454545',
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
