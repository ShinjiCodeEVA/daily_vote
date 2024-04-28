/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black-400': "#09090b",
        'gray-600': "#27272a",
        'yellow-400': "#facc15",
        
        'green-400': "#0a733c",
        'pink-500': "#f86f6d" 
      }
    },
  },
  plugins: [],
}