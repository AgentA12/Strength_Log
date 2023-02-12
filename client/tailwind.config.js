const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx,css}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: " #BB86FC",
        },
      },
    },

    screens: {
      "3xl": "1600px",
    },
    extend: {
      colors: {
        primary: "#BE4BDB",
        primary_faded: "#c9a0ff",
        primary_variant: "#3700B3",
        secondary: "#03DAC6",
        background: "#121212",
        overlay: "#1A1A1A",
        overlay_two: "#141517",
        error: "#CF6679",
        white: "#FFFFFF",
        white_faded: "#BABABA",
      },
    },
  },
});
