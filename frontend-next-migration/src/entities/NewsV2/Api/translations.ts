import { NewsTranslation, CategoryTranslation } from '../model/types/types';

/**
 * Helper function to get the language code.
 * It maps simple language codes ('en', 'fi') to their respective language codes.
 * Defaults to 'default' if no match is found.
 */
export const getLanguageCode = (language: string): string => {
    return language === 'en' ? 'en-US' : language === 'fi' ? 'fi-FI' : 'default';
};

/**
 * Generic translation function to retrieve a specific key from the translations array.
 * If no translation is found for the language code, returns the provided default value.
 * @param translations The array of translations (either NewsTranslation or CategoryTranslation).
 * @param languageCode The language code for fetching the appropriate translation.
 * @param key The key within the translation object (e.g., 'title', 'name').
 * @param defaultValue The default value to return if no translation is found (default is an empty string).
 * @returns The translation value or the default value.
 */
const getTranslation = <T extends { languages_code: string }>(
    translations: T[],
    languageCode: string,
    key: keyof T,
    defaultValue: string = '',
): string => {
    const translation = translations.find((t) => t.languages_code === languageCode);
    return translation && key in translation ? (translation[key] as string) : defaultValue;
};

/**
 * Function to retrieve the title translation from the NewsTranslation array.
 * @param translations The translations array from a news item.
 * @param languageCode The language code for fetching the title translation.
 * @returns The translated title or an empty string if not found.
 */
export const getNewsTranslation = (
    translations: NewsTranslation[],
    languageCode: string,
): string => {
    return getTranslation(translations, languageCode, 'title', '');
};

/**
 * Function to retrieve the category name translation from the CategoryTranslation array.
 * @param translations The translations array from a category.
 * @param languageCode The language code for fetching the category name translation.
 * @returns The translated category name or an empty string if not found.
 */
export const getCategoryTranslation = (
    translations: CategoryTranslation[],
    languageCode: string,
): string => {
    return getTranslation(translations, languageCode, 'category', '');
};
