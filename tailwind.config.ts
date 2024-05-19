import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '1': '1px',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      },
      fontFamily: {
        "anticDidone": ["AnticDidone","sans-serif"]
      },
      screens: {
        xs: { max: "320px" },
        sm: { min: "640px" },
        md: { min: "768px" },
        lg: { min: "1024px" },
        xl: { min: "1228px" },
        xxl: { min: "1440px" },
        xxxl: { min: "1800px" },
        xxxxl: { min: "2560px" },
    },
    container: {
        center: true,
        padding: "2rem",
        screens: {
            "2xl": "1400px",
        },
    },
    keyframes: {
      blinkViolet: {
        '0%': { backgroundColor: '#7f5fff' },
        '50%': { backgroundColor: 'white' },
        '100%': { backgroundColor: '#7f5fff' }
      },
      blinkGreen: {
        '0%': { backgroundColor: '#26ff26' },
        '50%': { backgroundColor: 'white' },
        '100%': { backgroundColor: '#26ff26' }
      },
      blinkRed : {
        '0%': { backgroundColor: '#ff4122' },
        '50%': { backgroundColor: 'white' },
        '100%': { backgroundColor: '#ff4122' }
      }
    },
    animation: {
      'blink-fade-violet': 'blinkViolet 1s ease-in-out 1 forwards',
      'blink-fade-green': 'blinkGreen 1s ease-in-out 1 forwards',
      'blink-fade-red': 'blinkRed 1s ease-in-out 1 forwards'
    }
    },
  },
  plugins: [],
};
export default config;
