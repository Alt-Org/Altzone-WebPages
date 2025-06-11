import { useMemo } from 'react';
import HannuHodari from '@/shared/assets/images/heros/hannu-hodari/hannu-hodari.png';

const getImagePaths = () => {
    if (process.env.NODE_ENV === 'test') {
        return [HannuHodari];
    }

    try {
        const context = require.context('@/shared/assets/images/heros', true, /\.png$/);
        return context
            .keys()
            .filter((key) => !key.includes('hero-container') && !key.includes('hero-border'))
            .map((key) => context(key).default);
    } catch {
        // Fallback if require.context is not available.
        return [HannuHodari];
    }
};

const imagePaths = getImagePaths();

export const useRandomCharacter = () => {
    const characterPath = useMemo(() => {
        const randomIndex = Math.floor(Math.random() * imagePaths.length);
        return imagePaths[randomIndex];
    }, []);

    return { characterPath };
};
