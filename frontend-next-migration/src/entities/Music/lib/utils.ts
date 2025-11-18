/**
 * Extracts YouTube video ID from a URL.
 *
 * Purpose: Utility for parsing YouTube links from Directus data, ensuring only valid videos (including Shorts) are displayed.
 * Returns null for invalid or unsupported URLs.
 */

export const extractYouTubeId = (url: string | null | undefined): string | null => {
    if (!url || typeof url !== 'string') return null;
    const regex =
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/; // Regex supports watch, embed, shorts, and youtu.be formats
    const match = url.match(regex);
    return match ? match[1] : null;
};
