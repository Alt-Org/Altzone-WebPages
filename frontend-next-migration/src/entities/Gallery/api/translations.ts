import { PhotoVersionTranslations, CategoryTranslations } from '../types/gallery';

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

export const getPhotoVersionTranslation = (
    translations: PhotoVersionTranslations[],
    languageCode: string,
) => {
    return getTranslation(translations, languageCode, 'altText', '');
};
