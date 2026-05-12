import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#ff6a00',
        dark: '#0a0a0a',
        muted: '#1a1a1a',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      animation: {
        'fade-blur': 'fadeBlur 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'slide-up': 'slideUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
      },
      keyframes: {
        fadeBlur: {
          '0%': { opacity: '0', filter: 'blur(10px)' },
          '100%': { opacity: '1', filter: 'blur(0px)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
