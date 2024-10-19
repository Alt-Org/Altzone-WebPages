export const fallbackLng = 'en';

declare global {
    type AppLanguage = 'en' | 'ru' | 'fi';
}
export const languages: AppLanguage[] = [fallbackLng, 'ru', 'fi'];
export const defaultNS = 'translation';
export const cookieName = 'i18next';

export function getOptions(lng = fallbackLng, ns = defaultNS) {
    return {
        // debug: true,
        supportedLngs: languages,
        // preload: languages,
        fallbackLng,
        lng,
        fallbackNS: defaultNS,
        defaultNS,
        ns,
        // backend: {
        //   projectId: '01b2e5e8-6243-47d1-b36f-963dbb8bcae3'
        // }
    };
}
