/**
 * Helper object for managing environment variables.
 *
 * @type {Object}
 * @property {boolean} isDevMode - Indicates whether the application is in development mode.
 * @property {string} apiLink - The public API link for the application. Defaults to an empty string if not provided.
 * @property {string} appDomain - The public domain for the application. Defaults to an empty string if not provided.
 */
export const envHelper = {
    isDevMode: process.env.NODE_ENV === 'development',
    apiLink : process.env.NEXT_PUBLIC_API_LINK || '',
    appDomain : process.env.NEXT_PUBLIC_APP_DOMAIN || '',
    companyName: process.env.COMPANY_NAME || "Psyche's Royale Gaming ry",
    strapiHost: process.env.NEXT_PUBLIC_STRAPI_HOST || '',
} as const;
// todo update jsdocs