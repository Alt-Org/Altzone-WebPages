/**
 * Helper object for managing environment variables.
 * This object provides easy access to essential environment variables,
 * such as the API link, application domain, Strapi host, and others.
 * It also includes a flag to check if the application is running in development mode.
 *
 * @type {Object}
 * @property {boolean} isDevMode - Indicates whether the application is in development mode (`true` if in dev, `false` otherwise).
 * @property {string} apiLink - The public API link for the application. Defaults to an empty string if not provided.
 * @property {string} appDomain - The public domain for the application. Defaults to an empty string if not provided.
 * @property {string} companyName - The name of the company/organization, defaults to "Psyche's Royale Gaming ry".
 * @property {string} strapiHost - The URL for the Strapi backend. Defaults to an empty string if not provided.
 * @property {string} directusHost - The URL for the Directus backend. Defaults to an empty string if not provided.
 */
export const envHelper = {
    isDevMode: process.env.NODE_ENV === 'development',
    apiLink: process.env.NEXT_PUBLIC_API_LINK || '',
    appDomain: process.env.NEXT_PUBLIC_APP_DOMAIN || 'https://altzone.fi',
    companyName: process.env.COMPANY_NAME || "Psyche's Royale Gaming ry",
    strapiHost: process.env.NEXT_PUBLIC_STRAPI_HOST || '',
    directusHost: process.env.NEXT_PUBLIC_DIRECTUS_HOST || '',
} as const;
