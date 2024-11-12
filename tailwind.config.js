// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4ADEDE',
          DEFAULT: '#0EA5E9',
          dark: '#0B77D6',
        },
        secondary: {
          light: '#FDBA74',
          DEFAULT: '#FB923C',
          dark: '#F97316',
        },
        background: {
          light: '#F3F4F6',
          dark: '#1F2937',
        },
        text: {
          light: '#1F2937',
          dark: '#F9FAFB',
        },
        muted: '#9CA3AF',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
}
