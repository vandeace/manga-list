const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      blue: {
        primary: "#3252df",
        dark: "#152C5B",
      },
      gray: {
        light: "#B0B0B0",
        input: colors.gray[100],
      },
      light: {
        blue: colors.lightBlue[500],
      },
      yellow: "#fceea7",
      white: "#fff",
      pink: "#FF498B",
      red: "#E74C3C",
      teal: "#1ABC9C",
      janda: "rgb(136, 84, 208, 0.1)",
      transparent: {
        start: "rgba(0, 0, 0, 0)",
        end: "rgba(0, 0, 0, .60)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
