import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Scrabble Cheetah',
        short_name: 'Scrabble Cheetah',
        description: 'La meilleure place pour tricher au Scrabble!',
        start_url: '/',
        display: 'standalone',
        background_color: '#FFF7ED',
        theme_color: '#064E3B',
        icons: [],
    }
}