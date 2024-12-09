import { Translation, DepartmentTranslation, TeamTranslation } from '../model/types/types';

export const getLanguageCode = (language: string): string => {
    return language === 'en' ? 'en-US' : language === 'fi' ? 'fi-FI' : 'default';
};

/**
 * Generic function to get a translation string for any key, with a fallback.
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
 * Get task translation.
 */
export const getTaskTranslation = (translations: Translation[], languageCode: string): string => {
    return getTranslation(translations, languageCode, 'task', 'Task unavailable');
};

/**
 * Get department name translation.
 */
export const getDepartmentTranslation = (
    translations: DepartmentTranslation[],
    languageCode: string,
): string => {
    return getTranslation(translations, languageCode, 'department', 'Unnamed Department');
};

/**
 * Get team name translation.
 */
export const getTeamTranslation = (
    translations: TeamTranslation[],
    languageCode: string,
): string => {
    return getTranslation(translations, languageCode, 'team', 'Unnamed Team');
};
