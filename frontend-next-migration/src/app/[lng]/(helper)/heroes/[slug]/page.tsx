import { HeroPage as PreparedHeroPage } from '@/preparedPages/HeroesPages';
import { useServerTranslation } from '@/shared/i18n';
import { heroes, HeroManager, HeroSlug, HeroWithGroup } from '@/entities/Hero';
import { RoutePaths } from '@/shared/appLinks/RoutePaths';
import { notFound } from 'next/navigation';
// import {withPageData ,createMetadataGenerator} from "@/app/_helpers";
// import {_getPage} from "./_getPage";

interface Props extends DefaultAppRouterProps {
    params: DefaultAppRouterProps['params'] & {
        slug: string;
    };
}

export default async function HeroPage({ params }: Props) {
    const { slug, lng } = params;
    const { t } = await useServerTranslation(lng, 'heroes');
    const heroManager = new HeroManager(t);
    const currentHero = heroManager.getHeroBySlug(slug as HeroSlug);
    if (!currentHero) {
        return notFound();
    }
    const heroes = heroManager.getAllHeroes();
    const prevHero =
        heroManager.getHeroBeforeSpecificHero(currentHero.id) || (heroes.at(-1) as HeroWithGroup);
    const nextHero =
        heroManager.getHeroAfterSpecificHero(currentHero.id) || (heroes.at(0) as HeroWithGroup);
    const prevHeroLink = generateHeroLink(prevHero.slug);
    const nextHeroLink = generateHeroLink(nextHero.slug);

    return (
        <div>
            <PreparedHeroPage
                newSelectedHero={currentHero}
                prevHeroLink={prevHeroLink}
                nextHeroLink={nextHeroLink}
            />
        </div>
    );
}

function generateHeroLink(heroSlug: string): string {
    return RoutePaths.HEROES_ONE.replace(':slug', heroSlug);
}
