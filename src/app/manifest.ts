import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Scrabble Cheetah',
        short_name: 'Scrabble Cheetah',
        description: 'La meilleure place pour tricher au Scrabble!',
        start_url: '/',
        display: 'standalone',
        background_color: '#F3F4F6',
        theme_color: '#006699',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}