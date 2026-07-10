import { envHelper } from '@/shared/const/envHelper';
import { DirectusPhotoObjectV2, PhotoObjectV2 } from '../types/gallery';
import { getTranslation } from './translations';

// for mapping DirectusPhotoObjectV2 to PhotoObjectV2
export const mapDirectusToPhotoObjectV2 = (
    directusPhotoObject: DirectusPhotoObjectV2[],
    lng: string,
): PhotoObjectV2[] => {
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

        const mappedTranslations = translations
            ? translations.map((t) => ({
                  id: t.id,
                  languages_code: t.languages_code,
                  photo_object_id: t.photo_object_id,
                  title: t.title || undefined,
                  description: t.description || undefined,
              }))
            : [];
        const title = getTranslation(mappedTranslations, lng, 'title', '');
        const description = getTranslation(mappedTranslations, lng, 'description', '');

        const mappedLinks = {
            website: website || undefined,
            github: github || undefined,
            linkedin: linkedin || undefined,
            instagram: instagram || undefined,
            facebook: facebook || undefined,
        };

        const mappedFrames = mapFrames(image, image_2, image_3, animation);

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
            date_created,
        };
    });
};

const mapFrames = (
    image: string | null,
    image_2: string | null,
    image_3: string | null,
    animation: string | null,
): string[][] => {
    const frames: string[][] = [];
    const directusBaseUrl = envHelper.directusHost;

    // for managing file sizes/quality to lower bandwidth usage/load times
    const imageWidth = 800;
    const imageQuality = 80;

    // insert image url, image id, and type (image/animation) into frames
    if (image) {
        frames.push([
            `${directusBaseUrl}/assets/${image}?format=auto&width=${imageWidth}&quality=${imageQuality}`,
            image,
            'image',
        ]);
    }
    if (image_2) {
        frames.push([
            `${directusBaseUrl}/assets/${image_2}?format=auto&width=${imageWidth}&quality=${imageQuality}`,
            image_2,
            'image',
        ]);
    }
    if (image_3) {
        frames.push([
            `${directusBaseUrl}/assets/${image_3}?format=auto&width=${imageWidth}&quality=${imageQuality}`,
            image_3,
            'image',
        ]);
    }
    if (animation) {
        frames.push([
            `${directusBaseUrl}/assets/${animation}?format=auto&width=${imageWidth}&quality=${imageQuality}`,
            animation,
            'animation',
        ]);
    }

    return frames;
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
