import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'tile-texture': " linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url('../images/tile-texture.jpg')",
        'board-texture': "radial-gradient(rgb(254, 243, 199) 75%, rgb(69, 26, 3))",
      },
    },
  },
  plugins: [],
}
export default config
