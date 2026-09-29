import {
    PhotoVersionTranslations,
    CategoryTranslations,
    PhotoObjectTranslations,
} from '../types/gallery';

export const getLanguageCode = (language: string): string => {
    return language === 'en' ? 'en-US' : language === 'fi' ? 'fi-FI' : 'default';
};

const getTranslation = <T extends { languages_code: string }>(
    translations: T[],
    languageCode: string,
    key: keyof T,
    defaultValue: string = '',
): string => {
    const translation = translations.find((t) => t.languages_code === languageCode);
    return translation && key in translation ? (translation[key] as string) : defaultValue;
};

export const getCategoryTranslation = (
    translations: CategoryTranslations[],
    languageCode: string,
) => {
    return getTranslation(translations, languageCode, 'name', '');
};

const galleryNavigationLabels: Record<string, Record<string, string>> = {
    'fi-FI': {
        hahmot: 'Pelihahmot',
        sielunkoti: 'Sielunlinna',
    },
    'en-US': {
        heroes: 'Game characters',
        sielunkoti: 'Soul Castle',
    },
};

/** Applies the navigation names from the updated information architecture. */
export const getGalleryNavigationLabel = (categoryName: string, languageCode: string) =>
    galleryNavigationLabels[languageCode]?.[categoryName.toLowerCase()] ?? categoryName;

export const getPhotoVersionTranslation = (
    translations: PhotoVersionTranslations[],
    languageCode: string,
) => {
    return getTranslation(translations, languageCode, 'altText', '');
};

export const getPhotoObjectTexts = (
    translations: PhotoObjectTranslations[] = [],
    languageCode: string,
) => {
    if (!translations || translations.length === 0) {
        return { title: '', author: '', description: '' };
    }

    const tr = translations.find((t) => t.languages_code === languageCode) ?? translations[0];

    return {
        title: tr.title ?? '',
        author: tr.author ?? '',
        description: tr.description ?? '',
    };
};
