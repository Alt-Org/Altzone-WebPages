import { useMemo } from 'react';
import HannuHodari from '@/shared/assets/images/heros/hannu-hodari/hannu-hodari.png';

const getImagePaths = () => {
    if (process.env.NODE_ENV === 'test') {
        return [HannuHodari];
    }

    try {
        const context = require.context('@/shared/assets/images/heros', true, /\.png$/);
        const paths = context
            .keys()
            .filter((key) => !key.includes('hero-container') && !key.includes('hero-border'))
            .map((key) => context(key).default);

        return paths.length > 0 ? paths : [HannuHodari];
    } catch {
        return [HannuHodari];
    }
};

const imagePaths = getImagePaths();

interface UseRandomCharacterOptions {
    size?: number | string;
}

export const useRandomCharacter = (options: UseRandomCharacterOptions = {}) => {
    const { size = 100 } = options;

    const characterPath = useMemo(() => {
        const randomIndex = Math.floor(Math.random() * imagePaths.length);
        return imagePaths[randomIndex];
    }, []);

    return {
        characterPath,
        size,
    };
};
