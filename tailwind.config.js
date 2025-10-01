/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-blue': '#007AFF',
        'ios-light-background': '#F2F2F7',
        'ios-dark-background': '#000000',
        'ios-light-secondary-background': '#FFFFFF',
        'ios-dark-secondary-background': '#1C1C1E',
        'ios-light-label': '#000000',
        'ios-dark-label': '#FFFFFF',
        'ios-light-secondary-label': 'rgba(60, 60, 67, 0.6)',
        'ios-dark-secondary-label': 'rgba(235, 235, 245, 0.6)',
        'ios-light-tertiary-label': 'rgba(60, 60, 67, 0.3)',
        'ios-dark-tertiary-label': 'rgba(235, 235, 245, 0.3)',
        'ios-light-separator': 'rgba(60, 60, 67, 0.29)',
        'ios-dark-separator': 'rgba(84, 84, 88, 0.65)',
      },
      fontFamily: {
        'sf-pro-display': ['SF Pro Display', 'sans-serif'],
        'sf-pro-text': ['SF Pro Text', 'sans-serif'],
      },
      borderRadius: {
        xl: '10px',
        '2xl': '20px',
      },
      backgroundColor: {
        'glass-dark': 'rgba(28, 28, 30, 0.75)',
        'glass-light': 'rgba(242, 242, 247, 0.8)',
      },
      backdropBlur: {
        xl: '20px',
      },
    },
  },
  plugins: [],
}
