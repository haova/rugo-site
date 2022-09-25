const colors = require("tailwindcss/colors");

// delete unsupported colors
delete colors.lightBlue;
delete colors.warmGray;
delete colors.coolGray;
delete colors.blueGray;
delete colors.trueGray;

const primaryColors = {
  '50': '#fef0f4',
  '100': '#fce0e8',
  '200': '#fac1d1',
  '300': '#f7a2ba',
  '400': '#f583a3',
  '500': '#F2648C',
  '600': '#CD416D',
  '700': '#A8184F',
  '800': '#830034',
  '900': '#60001A',
}

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
    colors: {
      primary: primaryColors,
      secondary: colors.stone,
      danger: colors.rose,
      info: colors.indigo,
      warn: colors.amber,
      success: colors.emerald,
      ...colors,
    },
    fontFamily: {
      sans: ["PoppinsVN", "sans-serif"],
      mono: ['"Fira Code"'],
    },
    extend: {},
    fontSize: {
      xs: ".75rem",
      sm: ".825rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
    },
  },
	plugins: [],
}
