export const envHelper = Object.freeze({
    isDevMode: import.meta.env.DEV,
    apiLink : import.meta.env.VITE_API_LINK as string
});