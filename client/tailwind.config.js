/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,css}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#BB86FC",
        primary_faded: "#c9a0ff",
        primary_variant: "#3700B3",
        secondary: "#03DAC6",
        background: "#121212",
        overlay: "#292929",
        overlay_two: "#1F1F1F",
        error: "#CF6679",
        white: "#FFFFFF",
        white_faded: "#BABABA",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
