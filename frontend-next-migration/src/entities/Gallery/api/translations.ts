import { PhotoObjectV2Translations } from '../types/gallery';

export const getLanguageCode = (language: string): string => {
    return language === 'en' ? 'en-US' : language === 'fi' ? 'fi-FI' : 'default';
};

export const getTranslation = <T extends { languages_code: string }>(
    translations: T[],
    languageCode: string,
    key: keyof T,
    defaultValue: string = '',
): string => {
    const translation = translations.find((t) => t.languages_code === languageCode);
    return translation && key in translation ? (translation[key] as string) : defaultValue;
};

export const getPhotoObjectTexts = (
    translations: PhotoObjectV2Translations[] = [],
    languageCode: string,
) => {
    if (!translations || translations.length === 0) {
        return { title: '', description: '' };
    }

    const tr = translations.find((t) => t.languages_code === languageCode) ?? translations[0];

    return {
        title: tr.title ?? '',
        description: tr.description ?? '',
    };
};
