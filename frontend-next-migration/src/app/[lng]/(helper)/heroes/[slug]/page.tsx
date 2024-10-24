import { HeroPage as PreparedHeroPage } from '@/preparedPages/HeroesPages';
import { notFound } from 'next/navigation';
import { _getPage } from './_getPage';

interface Props extends DefaultAppRouterProps {
    params: DefaultAppRouterProps['params'] & {
        slug: string;
    };
}

//todo add seo, try with it:
// import {withPageData ,createMetadataGenerator} from "@/app/_helpers";
// import {_getPage} from "./_getPage";

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
