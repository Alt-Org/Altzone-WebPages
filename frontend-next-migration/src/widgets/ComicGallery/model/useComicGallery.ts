'use client';
import { useParams } from 'next/navigation';
import { useComics } from '@/entities/Comic';

const useComicGallery = () => {
    const { lng } = useParams();
    const { comics, isError, isLoading } = useComics(lng === 'fi' ? 'fi' : 'en');

    return { comics, isError, isLoading };
};

export default useComicGallery;
