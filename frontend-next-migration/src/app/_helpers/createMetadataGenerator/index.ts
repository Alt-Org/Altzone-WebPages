import { Metadata } from 'next';

function isValidSEO(data: any): data is DefaultSeo {
    return (
        typeof data === 'object' &&
        typeof data.title === 'string' &&
        typeof data.description === 'string'
    );
}

async function extractSEO(
    lng: string,
    getPage: (lng: string) => Promise<{ seo: any }>,
): Promise<DefaultSeo> {
    const { seo } = await getPage(lng);
    if (isValidSEO(seo)) {
        return seo;
    }
    throw new Error('Invalid SEO data');
}

//todo add documentation
export function createMetadataGenerator(getPage: (lng: string) => Promise<{ seo: DefaultSeo }>) {
    return async function generateMetadata({ params }: DefaultAppRouterProps): Promise<Metadata> {
        return await extractSEO(params.lng, getPage);
    };
}

//works better than createMetadataGenerator see FurnitureOneSetPage
export function withMetadataGenerator(
    getPage: (lng: string, ...args: any[]) => Promise<{ seo: DefaultSeo }>,
): (props: DefaultAppRouterProps) => Promise<Metadata> {
    return async function MetadataWithHOC(props: DefaultAppRouterProps): Promise<Metadata> {
        const { params } = props;

        const { lng, ...restParams } = params;

        const data = await getPage(lng, ...Object.values(restParams));

        return extractSEO(lng, () => Promise.resolve(data));
    };
}
