/**
 * Represents a song item from Directus.
 *
 * Changes:
 * - Added to support Directus schema integration.
 * - Includes relational category field.
 *
 * Purpose: Type for raw song data fetched from Directus.
 */

export interface Song {
    id: number;
    song_name: string;
    composers: string; // Assuming string; change to string[] if array
    category: SongCategory; // Relational field from Directus
    video_link: string;
}

/**
 * Represents a song category from Directus.
 *
 * Changes:
 * - Added for category fetching and relations.
 *
 * Purpose: Type for category data used in navigation and filtering.
 */

export interface SongCategory {
    id: number;
    category_name: string;
}

// Derived types for UI (from fetched data)
/**
 * Represents a processed music item for UI display.
 *
 * Changes:
 * - Derived from Song data, with extracted YouTube ID.
 * - Added for component compatibility.
 *
 * Purpose: Clean type for rendering in components like YoutubeVideoCard.
 */

export interface MusicItem {
    id: number; // Added for uniqueness in lists
    musicTitle: string;
    artistName: string;
    youtubeId: string; // Extracted from video_link
    category: string; // category_name
}

/**
 * Represents a collection of music items.
 *
 * Changes:
 * - Updated to use dynamic data instead of hardcoded items.
 *
 * Purpose: For grouping songs by category in UI logic.
 */

export interface CollectionInfo {
    name: string; // category_name
    slug: string; // Slugified category_name (e.g., 'jukebox')
    items: MusicItem[]; // Songs in this category
}

// Enums (updated to match Directus; can derive from fetched data if needed)
/**
 * Enum for collection names.
 *
 * Changes:
 * - Retained for compatibility, but now categories are fetched dynamically.
 *
 * Purpose: Legacy enum for potential static references.
 */

export enum CollectionName {
    JUKEBOX = 'Jukebox',
    BATTLE = 'Battle',
}

/**
 * Enum for collection slugs.
 *
 * Changes:
 * - Retained for routing, but slugs are now generated from fetched data.
 *
 * Purpose: For URL slugs in navigation.
 */

export enum CollectionSlug {
    JUKEBOX = 'jukebox',
    BATTLE = 'battle',
}
