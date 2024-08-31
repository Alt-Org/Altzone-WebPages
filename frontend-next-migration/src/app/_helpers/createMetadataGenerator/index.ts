import {Metadata} from "next";

function isValidSEO(data: any): data is DefaultSeo {
    return typeof data === 'object' &&
        typeof data.title === 'string' &&
        typeof data.description === 'string';
}

async function extractSEO(lng: string, getPage: (lng: string) => Promise<{ seo: any }>): Promise<DefaultSeo> {
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