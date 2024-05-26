/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        headingFont: ["Roboto", "sans-serif"],
        paraFont: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
