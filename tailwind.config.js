module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
            gliker: ['Gliker', 'sans-serif'], // Agrega Gliker como una familia de fuente
        },
    },
},
plugins: [],
safelist: ['font-gliker'],
}
