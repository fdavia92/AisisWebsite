import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#003098',
          'blue-900': '#001f6b',
          teal: '#30a090',
          'teal-50': '#d9ebe6',
        },
        surface: {
          paper: '#faf7f0',
          cream: '#f0ebe0',
          sand: '#e5e5e0',
          graphite: '#1a1a1f',
        },
        ink: {
          DEFAULT: '#1a1a1f',
          soft: '#56564f',
          mute: '#91918c',
        },
        status: {
          success: '#30a090',
          warning: '#b87a2e',
          danger: '#8a2a2a',
        },
        focus: '#003098',
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        hero: ['clamp(2.25rem, 6vw + 1rem, 4.375rem)', { lineHeight: '1.02', letterSpacing: '-0.02em', fontWeight: '600' }],
        section: ['clamp(1.5rem, 2.4vw + 0.75rem, 1.75rem)', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '700' }],
        body: ['1rem', { lineHeight: '1.5', fontWeight: '400' }],
        caption: ['0.875rem', { lineHeight: '1.35', fontWeight: '700' }],
        small: ['0.75rem', { lineHeight: '1.35', fontWeight: '500', letterSpacing: '0.04em' }],
      },
      spacing: {
        '0.5': '4px',
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '32': '128px',
      },
      borderRadius: {
        sm: '12px',
        card: '16px',
        lg: '20px',
        xl: '28px',
        pill: '40px',
      },
      maxWidth: {
        prose: '62ch',
        content: '1200px',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translate3d(0, 12px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 600ms cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
} satisfies Config;
