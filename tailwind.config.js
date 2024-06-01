/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: { // Add this section
        'typing': 'typing 5s steps(12) infinite',
      },
      keyframes: { // Add this section
        typing: {
          '0%': { width: '0ch' },
          '50%': { width: '12ch' },
          '100%': { width: '0ch' },
        },
      },
    },
  },
  plugins: [],
};
