import { directusApi } from '@/shared/api'; // Base Directus API setup for RTK Query integration
import { envHelper } from '@/shared/const/envHelper';
import { createDirectus, rest, readItems } from '@directus/sdk';
import { Song, SongCategory } from '../types/music'; // Updated types to match Directus schema

const directusBaseUrl = envHelper.directusHost;
const client = createDirectus(directusBaseUrl).with(rest()); // Directus client for SDK-based queries

/**
 * API service for interacting with Directus to fetch music data.
 *
 * Changes:
 * - Migrated from hardcoded data in `initializeMusicCollections.ts` to dynamic fetching from Directus.
 * - Uses Directus SDK for relational queries (e.g., songs with categories).
 * - Integrated with RTK Query for caching, error handling, and hooks.
 * - Added endpoints for songs and categories to support UI components.
 * - Handles errors gracefully with try-catch and returns structured error objects.
 *
 * Purpose: Provides hooks (`useGetSongsQuery`, `useGetSongCategoriesQuery`) for client-side data fetching in components.
 */

export const musicApi = directusApi.injectEndpoints({
    endpoints: (builder) => ({
        /**
         * Fetches all songs with their category data.
         *
         * Changes:
         * - Replaced hardcoded song data with Directus query.
         * - Includes relational category data via `deep` option for efficient fetching.
         * - Filters out invalid data (handled in components).
         *
         * Purpose: Supplies song data for the music page, including YouTube links and categories.
         */

        getSongs: builder.query<Song[], void>({
            queryFn: async () => {
                try {
                    const songs = await client.request<Song[]>(
                        readItems('songs', {
                            fields: ['*', 'category.*'], // Fetch all song fields + category relation
                            deep: { category: true }, // Include nested category data
                        }),
                    );
                    return { data: songs };
                } catch (error) {
                    // Log error for debugging; return structured error for UI
                    console.error('Error fetching songs:', error);
                    return { error: { status: 500, data: 'Failed to fetch songs' } };
                }
            },
        }),

        /**
         * Fetches all song categories.
         *
         * Changes:
         * - New endpoint to dynamically fetch categories instead of using hardcoded enums.
         * - Supports navigation menu population.
         *
         * Purpose: Provides category data for dropdown navigation and filtering.
         */

        getSongCategories: builder.query<SongCategory[], void>({
            queryFn: async () => {
                try {
                    const categories = await client.request<SongCategory[]>(
                        readItems('song_category', {
                            fields: ['*'], // Fetch all category fields
                        }),
                    );
                    return { data: categories };
                } catch (error) {
                    // Log error for debugging; return structured error for UI
                    console.error('Error fetching categories:', error);
                    return { error: { status: 500, data: 'Failed to fetch categories' } };
                }
            },
        }),
    }),
});

// Exported hooks for use in components
export const { useGetSongsQuery, useGetSongCategoriesQuery } = musicApi;
