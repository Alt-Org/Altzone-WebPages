export const baseUrl = `https://${process.env.NEXT_PUBLIC_API_DOMAIN}`;

const openGraphImage = '/images/opengraph-image.png';

export const defaultOpenGraph = {
    images: [
        {
            url: `${openGraphImage}`,
            width: 1200,
            height: 630,
        },
    ],
};
