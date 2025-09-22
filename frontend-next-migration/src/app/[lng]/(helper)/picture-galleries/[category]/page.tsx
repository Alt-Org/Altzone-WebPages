import { PictureGalleryPage } from '@/preparedPages/PictureGalleryPages';
import { Metadata } from 'next';
import { _getPage } from './_getPage';

type Props = { params: { lng: string; category: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { seo } = await _getPage(params.lng, params.category);
    return {
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords as Metadata['keywords'],
        alternates: seo.alternates as Metadata['alternates'],
        openGraph: seo.openGraph as Metadata['openGraph'],
    };
}

export default async function Page({ params }: Props) {
    const { page } = await _getPage(params.lng, params.category);
    return <PictureGalleryPage {...page} />;
}
