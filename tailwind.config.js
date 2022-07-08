module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxHeight: {
        "1/2vh": "50vh",
        "2/5vh": "40vh",
        "3/5vh": "60vh",
        "4/5vh": "80vh",
        "1/3vh": "33.3333vh",
        "1/4vh": "25vh",
      },
      height: {
        "1/2vh": "50vh",
        "2/5vh": "40vh",
        "3/5vh": "60vh",
        "1/3vh": "33.3333vh",
        "1/4vh": "25vh",
      },
      width: {
        "1/2vw": "50vw",
        "2/5vw": "40vw",
        "3/5vw": "60vw",
        "4/5vw": "80vw",
        "1/3vw": "33.3333vw",
        "1/4vw": "25vw",
        cardlg: "32rem",
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
