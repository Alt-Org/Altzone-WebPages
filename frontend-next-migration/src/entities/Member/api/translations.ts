import { Translation, DepartmentTranslation, TeamTranslation } from '../model/types/types';

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
    const translation = translations.find((t) => t.languages_code === languageCode);
    return translation && key in translation ? (translation[key] as string) : defaultValue;
};

export const getTaskTranslation = (translations: Translation[], languageCode: string): string => {
    return getTranslation(translations, languageCode, 'task', '');
};

export const getDepartmentTranslation = (
    translations: DepartmentTranslation[],
    languageCode: string,
): string => {
    return getTranslation(translations, languageCode, 'department', '');
};

export const getTeamTranslation = (
    translations: TeamTranslation[],
    languageCode: string,
): string => {
    return getTranslation(translations, languageCode, 'team', '');
};
