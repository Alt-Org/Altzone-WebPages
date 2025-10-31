/**
 * Extracts YouTube video ID from a URL.
 *
 * Changes:
 * - Added support for YouTube Shorts URLs (e.g., /shorts/ID) to include them in results.
 * - Enhanced null/undefined handling to prevent crashes.
 * - Updated regex to cover more YouTube URL formats.
 *
 * Purpose: Utility for parsing YouTube links from Directus data, ensuring only valid videos (including Shorts) are displayed.
 * Returns null for invalid or unsupported URLs.
 */

export const extractYouTubeId = (url: string | null | undefined): string | null => {
    if (!url || typeof url !== 'string') return null; // Handle null/undefined/empty inputs to avoid errors
    const regex =
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/; // Regex supports watch, embed, shorts, and youtu.be formats
    const match = url.match(regex);
    return match ? match[1] : null; // Return ID if match, else null
};
