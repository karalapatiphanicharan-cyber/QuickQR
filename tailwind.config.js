/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0c1324",
        foreground: "#dce1fb",
        primary: {
          DEFAULT: "#adc6ff",
          container: "#4d8eff",
          on: "#002e6a",
        },
        secondary: {
          DEFAULT: "#d0bcff",
          container: "#571bc1",
        },
        tertiary: {
          DEFAULT: "#4edea3",
          container: "#00a572",
        },
        surface: {
          DEFAULT: "#0c1324",
          variant: "#2e3447",
          container: "#191f31",
          bright: "#33394c",
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Geist', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
