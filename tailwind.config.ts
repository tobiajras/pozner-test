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
        'color-primary': '#391C12',
        'color-primary-dark': '#1c1c1c',
        'color-primary-light': '#E4E4E4',
        'color-secondary': '#391C12',
        'color-secondary-dark': '#1c1c1c',
        'color-secondary-light': '#E4E4E4',
        'color-tertiary': '#FCD369',
        'color-tertiary-dark': '#FBBB17',
        'color-tertiary-light': '#FFE39C',
        'color-bg-primary': '#ffff',
        'color-bg-secondary': '#181818',
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
