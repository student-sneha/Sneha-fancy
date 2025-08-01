import { defineConfig } from 'tailwindcss';

export default defineConfig({
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // 👈 class-based dark mode
  theme: {
    extend: {},
  },
  plugins: [],
});