import { directusApi } from '@/shared/api';
import { envHelper } from '@/shared/const/envHelper';
import { createDirectus, rest, readItems } from '@directus/sdk';
import { Song, SongCategory } from '../types/music';

const directusBaseUrl = envHelper.directusHost;
const client = createDirectus(directusBaseUrl).with(rest());

/**
 * API service for interacting with Directus to fetch music data.
 */

export const musicApi = directusApi.injectEndpoints({
    endpoints: (builder) => ({
        // Fetches all songs with their category data.
        getSongs: builder.query<Song[], void>({
            queryFn: async () => {
                try {
                    const songs = await client.request<Song[]>(
                        readItems('songs', {
                            fields: ['*', 'category.*'],
                            deep: { category: true },
                        }),
                    );
                    return { data: songs };
                } catch (error) {
                    console.error('Error fetching songs:', error);
                    return { error: { status: 500, data: 'Failed to fetch songs' } };
                }
            },
        }),

        // Fetches all song categories.
        getSongCategories: builder.query<SongCategory[], void>({
            queryFn: async () => {
                try {
                    const categories = await client.request<SongCategory[]>(
                        readItems('song_category', {
                            fields: ['*'],
                        }),
                    );
                    return { data: categories };
                } catch (error) {
                    console.error('Error fetching categories:', error);
                    return { error: { status: 500, data: 'Failed to fetch categories' } };
                }
            },
        }),
    }),
});

export const { useGetSongsQuery, useGetSongCategoriesQuery } = musicApi;
