import {
    Translation,
    DepartmentTranslation,
    TeamTranslation,
    RoleTranslation,
} from '../model/types/types';

/**
 * Returns the language code in a standardized format.
 *
 * @param {string} language - The input language code in short format.
 * @returns {string} - The standardized language code ('en-US' or 'fi-FI'), or 'default' if not recognized.
 */
export const getLanguageCode = (language: string): string => {
    return language === 'en' ? 'en-US' : language === 'fi' ? 'fi-FI' : 'default';
};

/**
 * Retrieves the translation value of a specified key for a given language code.
 *
 * @template T
 * @param {T[]} translations - An array of translation objects each containing a language code.
 * @param {string} languageCode - The language code to match translations against.
 * @param {keyof T} key - The specific key to retrieve from the translation.
 * @param {string} [defaultValue=''] - The default value returned if the key or language code doesn't match.
 * @returns {string} - The translated value or the default value.
 */

const getTranslation = <T extends { languages_code: string }>(
    translations: T[],
    languageCode: string,
    key: keyof T,
    defaultValue: string = '',
): string => {
    if (!translations || translations.length === 0) {
        return defaultValue;
    }

    // Try exact match first
    let translation = translations.find((t) => t.languages_code === languageCode);

    // If no exact match, try fallback to 'en-US' or first available
    if (!translation) {
        translation =
            translations.find((t) => t.languages_code === 'en-US') ||
            translations.find((t) => t.languages_code === 'fi-FI') ||
            translations[0];
    }

    if (translation) {
        // Debug: log what keys are available
        if (!(key in translation)) {
            console.warn('[getTranslation] Key not found in translation:', {
                key,
                availableKeys: Object.keys(translation),
                translation,
                languageCode,
            });
        }

        if (key in translation) {
            const value = translation[key] as string;
            return value || defaultValue;
        }
    }

    return defaultValue;
};

export const getTaskTranslation = (translations: Translation[], languageCode: string): string => {
    return getTranslation(translations, languageCode, 'task', '');
};

export const getRoleTaskTranslation = (
    translations: RoleTranslation[],
    languageCode: string,
): string => {
    return getTranslation(translations, languageCode, 'task', '');
};

export const getDepartmentTranslation = (
    translations: DepartmentTranslation[],
    languageCode: string,
): string => {
    return getTranslation(translations, languageCode, 'name', '');
};

export const getTeamTranslation = (
    translations: TeamTranslation[],
    languageCode: string,
): string => {
    return getTranslation(translations, languageCode, 'name', '');
};
