export const envHelper = {
    isDevMode: import.meta.env.DEV,
    apiLink : import.meta.env.VITE_API_LINK as string,
    appDomain : import.meta.env.VITE_APP_DOMAIN as string
} as const;