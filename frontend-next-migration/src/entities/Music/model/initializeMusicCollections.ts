import { CollectionTitle, CollectionInfo } from '../types/music';

export const initializeMusicCollections = (): Record<CollectionTitle, CollectionInfo> => {
    return {
        [CollectionTitle.JUKEBOX]: {
            id: 'jukebox',
            title: CollectionTitle.JUKEBOX,
            items: [
                {
                    musicTitle: 'Plan',
                    youtubeId: 'jWEmFhBMRqQ?si=1E8gn-C9XxjqKq-m',
                    artistName: 'Otso Puhakka',
                },
                {
                    musicTitle: 'In Awe',
                    youtubeId: 'Ht_7EcsDiSk?si=AnI7ZG6222RHL4iP',
                    artistName: 'Sebastian Backman',
                },
                {
                    musicTitle: 'Rush Hour',
                    youtubeId: '3MTxg3wtcos?si=H2_O11N6D8klHkII',
                    artistName: 'Sebastian Backman',
                },
                {
                    musicTitle: 'Long Road',
                    youtubeId: 'nHSbhwW5T40?si=7a7HowfclcawLNsi',
                    artistName: 'Sebastian Backman',
                },
                {
                    musicTitle: 'Whos Done It',
                    youtubeId: 'lkyuLMj1YSs?si=-lLZKqMN65woeoBJ',
                    artistName: 'Sebastian Backman',
                },
                {
                    musicTitle: 'Diamonds',
                    youtubeId: 'Pzj8fUR4ZjY?si=QEsLEuiq4ldHQzof',
                    artistName: 'Sebastian Backman',
                },
                {
                    musicTitle: 'What Are You Waiting For',
                    youtubeId: 'jSunoB5cKyA?si=GityDlG13_Pop01O',
                    artistName: 'Otso Puhakka',
                },
            ],
        },
        [CollectionTitle.BATTLE]: {
            id: 'battle',
            title: CollectionTitle.BATTLE,
        },
    };
};
