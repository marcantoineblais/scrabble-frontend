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
        'cheetah': "url('../images/cheetah.jpg')"
      },
    },
  },
  plugins: [],
}
export default config
