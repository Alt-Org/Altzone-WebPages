import { envHelper } from '@/shared/const/envHelper';
import { DirectusPhotoObjectV2, PhotoObject, PhotoObjectLink } from '../types/gallery';
import { getPhotoObjectTexts, getTranslation } from './translations';

// for mapping DirectusPhotoObjectV2 to PhotoObjectV2
export const mapDirectusToPhotoObjectV2 = (
    directusPhotoObject: DirectusPhotoObjectV2[],
    lng: string,
): PhotoObject[] => {
    return directusPhotoObject.map((item) => {
        const {
            id,
            category,
            translations,
            author,
            website,
            date_created,
            github,
            linkedin,
            instagram,
            facebook,
            image,
            image_2,
            image_3,
            animation,
        } = item;

        const mappedCategory = {
            id: category?.id || '',
            name: getTranslation(category?.translations || [], lng, 'name', ''),
        };

        const { title, description } = getPhotoObjectTexts(translations ? translations : [], lng);
        const mappedLinks = [
            { name: 'website', url: sanitizeLink(website) },
            { name: 'github', url: sanitizeLink(github) },
            { name: 'linkedin', url: sanitizeLink(linkedin) },
            { name: 'instagram', url: sanitizeLink(instagram) },
            { name: 'facebook', url: sanitizeLink(facebook) },
        ].filter((link) => link.url !== undefined) as PhotoObjectLink[];

        const mappedFrames = mapFrames(image, image_2, image_3);
        const mappedAnimation = mapAnimation(animation);

        // url-safe anchor id from author's name
        const anchorId = mapAnchorId(author);

        return {
            id,
            category: mappedCategory,
            title,
            description,
            anchorId,
            author: author || undefined,
            links: mappedLinks,
            frames: mappedFrames,
            animation: mappedAnimation,
            date_created,
        };
    });
};

const mapFrames = (
    image: string | null,
    image_2: string | null,
    image_3: string | null,
): string[][] => {
    const frames: string[][] = [];
    const directusBaseUrl = envHelper.directusHost;

    // for managing file sizes/quality to lower bandwidth usage/load times
    const imageWidth = 800;
    const imageQuality = 80;

    // insert image url and image id into frames
    if (image) {
        frames.push([
            `${directusBaseUrl}/assets/${image}?format=auto&width=${imageWidth}&quality=${imageQuality}`,
            image,
        ]);
    }
    if (image_2) {
        frames.push([
            `${directusBaseUrl}/assets/${image_2}?format=auto&width=${imageWidth}&quality=${imageQuality}`,
            image_2,
        ]);
    }
    if (image_3) {
        frames.push([
            `${directusBaseUrl}/assets/${image_3}?format=auto&width=${imageWidth}&quality=${imageQuality}`,
            image_3,
        ]);
    }

    return frames;
};

const mapAnimation = (animation: string | null): string[] | undefined => {
    if (!animation) return undefined;

    const directusBaseUrl = envHelper.directusHost;
    const imageWidth = 800;
    const imageQuality = 80;

    return [
        `${directusBaseUrl}/assets/${animation}?format=auto&width=${imageWidth}&quality=${imageQuality}`,
        animation,
    ];
};

const mapAnchorId = (author: string | null): string => {
    const anchorId = `${author || ''}`
        .toLowerCase()
        .normalize('NFD') // åäöé etc -> aaoe + diacritics separately
        .replace(/[\u0300-\u036f]/g, '') // remove ¨´~ etc after normalization
        .replace(/[^a-z0-9]+/g, '-') // replace non-alphanumeric characters with hyphens
        .replace(/^-+|-+$/g, ''); // remove leading/trailing hyphens
    return anchorId;
};

const sanitizeLink = (link: string | null): string | undefined => {
    if (!link) return undefined;
    // trim whitespace, check http/https prefix, and validate URL
    const rawLink = link.trim();
    if (!rawLink) return undefined;
    const normalizedLink = /^https?:\/\//i.test(rawLink) ? rawLink : `https://${rawLink}`;
    try {
        const url = new URL(normalizedLink);
        return url.href;
    } catch (error) {
        console.warn(`Invalid URL: ${link}, error: ${error}`);
        return undefined;
    }
};
