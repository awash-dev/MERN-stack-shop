/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  backgroundImage: {
    explosion: 'url("/banner.png")',
    circles: 'url("/bg-circles.png")',
    circleStar: 'url("/circle-star.svg")',
    site: 'url("/site-bg.svg")',
  },
  plugins: [],
}