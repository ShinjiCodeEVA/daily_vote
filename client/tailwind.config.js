/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'slate-green-400': "#22c55e",
        'pink-500': "#f86f6d",
        'gray-300': "#282423"
      },
      
      backgroundColor: {
        'black-400': "#09090b",
        'gray-600': "#27272a",
        'yellow-400': "#facc15",
      },

      fontFamily: {
        'space-grotesk': ["Space Grotesk", "sans-serif"]
      },
    },
  },
  plugins: [],
}