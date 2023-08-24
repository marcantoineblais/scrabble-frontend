import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
        xs: '0.6rem',
    },
    extend: {
      backgroundImage: {
        'tile-texture': "url('../images/tile-texture.jpg')",
        'board-texture': "radial-gradient(rgb(241, 245, 249) 75%, rgb(69, 26, 3))",
      },
    },
  },
  plugins: [],
}
export default config
