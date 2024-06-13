export const envHelper = {
    isDevMode: process.env.NODE_ENV === 'development',
    apiLink : process.env.NEXT_PUBLIC_API_LINK || '',
    appDomain : process.env.NEXT_PUBLIC_APP_DOMAIN || ''
} as const;