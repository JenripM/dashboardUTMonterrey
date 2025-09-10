/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0066FF',
          dark: '#0052CC',
        },
        secondary: {
          DEFAULT: '#6B7280',
          light: '#9CA3AF',
        },
        success: {
          DEFAULT: '#10B981',
          light: '#D1FAE5',
        },
        pending: {
          DEFAULT: '#8B5CF6',
          light: '#EDE9FE',
        },
      },
    },
  },
  plugins: [],
} 