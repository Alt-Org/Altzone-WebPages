import { NewsTranslation, CategoryTranslation } from '../model/types/types';

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

export const getNewsTranslation = (
    translations: NewsTranslation[],
    languageCode: string,
): string => {
    return getTranslation(translations, languageCode, 'title', '');
};

export const getCategoryTranslation = (
    translations: CategoryTranslation[],
    languageCode: string,
): string => {
    return getTranslation(translations, languageCode, 'name', '');
};
