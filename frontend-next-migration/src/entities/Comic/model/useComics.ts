'use client';
import { useMemo } from 'react';
import { useGetComicsQuery } from '../api/comicApi';
import { mapDirectusToComicReaders } from '../api/mappers';

export const useComics = (lng: 'fi' | 'en' = 'en') => {
    const { data, isError, isLoading } = useGetComicsQuery();

    const comics = useMemo(() => mapDirectusToComicReaders(data ?? [], lng), [data, lng]);

    return { comics, isError, isLoading };
};
