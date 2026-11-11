import { mapDirectusToComicReaders } from './mappers';
import type { Comics } from '../types/types';

jest.mock('@/shared/const/envHelper', () => ({
    envHelper: { directusHost: 'https://strapi.altzone.fi' },
}));

const comic: Comics = {
    id: 1,
    status: 'published',
    sort: 1,
    date_created: '2026-10-21T00:00:00Z',
    date_updated: null,
    title: 'Original title',
    author: null,
    cover_image: 'cover-id',
    translations: { fi: { title: 'Suomenkielinen nimi' }, en: { title: 'English title' } },
    pages: [
        { id: 2, Comics_id: 1, directus_files_id: '9-first-page', order: 10 },
        { id: 3, Comics_id: 1, directus_files_id: '3-middle-page', order: 20 },
        { id: 1, Comics_id: 1, directus_files_id: '1-last-page', order: 30 },
    ],
};

describe('mapDirectusToComicReaders', () => {
    it('only includes published comics', () => {
        const statuses: Comics['status'][] = ['draft', 'published', 'archived', null];
        expect(
            mapDirectusToComicReaders(statuses.map((status) => ({ ...comic, status }))),
        ).toHaveLength(1);
    });

    it('maps assets without changing the input', () => {
        const pagesBefore = [...comic.pages];
        expect(mapDirectusToComicReaders([comic], 'fi')).toEqual([
            {
                title: 'Suomenkielinen nimi',
                sources: [
                    'https://strapi.altzone.fi/assets/9-first-page',
                    'https://strapi.altzone.fi/assets/3-middle-page',
                    'https://strapi.altzone.fi/assets/1-last-page',
                ],
                cover: {
                    url: 'https://strapi.altzone.fi/assets/cover-id',
                    name: 'Suomenkielinen nimi',
                },
                followLastImage: false,
            },
        ]);
        expect(comic.pages).toEqual(pagesBefore);
    });

    it('uses the first ordered page when there is no cover', () => {
        const [reader] = mapDirectusToComicReaders([{ ...comic, cover_image: null }]);
        expect(reader.cover.url).toBe(reader.sources[0]);
        expect(reader.cover.url).toBe('https://strapi.altzone.fi/assets/9-first-page');
    });

    it('falls back to the original title', () => {
        const originalFallback = {
            ...comic,
            translations: { fi: { title: '' }, en: { title: '' } },
        };
        expect(mapDirectusToComicReaders([originalFallback], 'fi')[0].title).toBe('Original title');
    });

    it('skips comics without any images and supports cover-only comics', () => {
        expect(mapDirectusToComicReaders([{ ...comic, pages: [], cover_image: null }])).toEqual([]);
        expect(mapDirectusToComicReaders([{ ...comic, pages: [] }])[0].sources).toEqual([]);
        expect(mapDirectusToComicReaders([])).toEqual([]);
    });
});
