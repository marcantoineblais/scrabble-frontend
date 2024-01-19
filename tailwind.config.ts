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
        base: '1rem',
        xl: '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
    },
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
