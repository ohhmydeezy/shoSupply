/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        "sho-supply-home": "url('/assets/images/shoHomeBackground.png')",
        "contact-background": "url('/assets/images/contact-background.png')",
      },
    },
  },
  plugins: [],
};

