import { HeroPage as PreparedHeroPage } from '@/preparedPages/HeroesPages';
import { notFound } from 'next/navigation';
import { _getPage } from './_getPage';
import { withMetadataGenerator } from '@/app/_helpers';

interface Props extends DefaultAppRouterProps {
    params: DefaultAppRouterProps['params'] & {
        slug: string;
    };
}

export const generateMetadata = withMetadataGenerator(_getPage);

export default async function HeroPage({ params }: Props) {
    const { slug, lng } = params;
    const pageProps = await _getPage(lng, slug);

    if (!pageProps) {
        return notFound();
    }
    return (
        <div>
            <PreparedHeroPage
                newSelectedHero={pageProps.page.selectedHero}
                prevHeroLink={pageProps.page.prevHeroLink}
                nextHeroLink={pageProps.page.nextHeroLink}
            />
        </div>
    );
}
