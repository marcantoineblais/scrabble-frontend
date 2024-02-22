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
        'tile-texture': "url('../images/tile-texture.jpg')",
        'tile-blur': "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))"
      },
    },
  },
  plugins: [],
}
export default config
