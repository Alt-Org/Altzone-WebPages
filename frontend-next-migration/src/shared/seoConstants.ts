// export const baseUrl = `https://${process.env.NEXT_PUBLIC_API_DOMAIN}`;
export const baseUrl = `${process.env.NEXT_PUBLIC_LOCAL_HOST}`;
export const openGraphImage = '/images/opengraph-image.png';
export const defaultOpenGraph = {
    images: [
        {
            url: `${openGraphImage}`,
            width: 1200,
            height: 630,
        },
    ],
};
