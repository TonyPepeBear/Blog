module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        "1/2vh": "50vh",
        "2/5vh": "40vh",
        "1/3vh": "33.3333vh",
        "1/4vh": "25vh",
      },
      fontFamily: {
        serif: [
          "JetBrains Mono",
          "Noto Serif TC",
          "ui-serif",
          "Georgia, Cambria",
          "Times New Roman",
          "Times, serif",
        ],
      },
    },
  },
  plugins: [],
};
