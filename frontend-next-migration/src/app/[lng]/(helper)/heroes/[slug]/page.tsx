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
            {/*{JSON.stringify(currentHero)}*/}
            <PreparedHeroPage
                selectedHero={{
                    id: currentHero.id,
                    img: currentHero.srcImg,
                    imgGif: currentHero.srcGif,
                    group: currentHero.groupEnum,
                    alt: currentHero.alt,
                    heroColor: currentHero.groupBgColour,
                    title: currentHero.title,
                    borderColor: '',
                    description: currentHero.description,
                    groupTextBg: currentHero.groupBgColour,

                    // group:
                }}
                prevHeroLink={prevHeroLink}
                nextHeroLink={nextHeroLink}
            />
        </div>
    );
}

function generateHeroLink(heroSlug: string): string {
    return RoutePaths.HEROES_ONE.replace(':slug', heroSlug);
}

// @ts-ignore todo figure out why it doesnt work properly and refactor after it and add createMetadataGenerator
// export default withPageData(PreparedHeroPage, _getPage);

// const currentIndex = heroes.findIndex((hero) => hero.title === title);
// const prevHeroTitle = findPrevTitle(currentIndex);
// const nextHeroTitle = findNextTitle(currentIndex);
// const selectedHero = getHeroData(title, t);
//
//
//
// const prevHeroLink = generateHeroLink(prevHeroTitle);
// const nextHeroLink = generateHeroLink(nextHeroTitle);

// const notFoundBoolean = !selectedHero || !nextHeroTitle || !prevHeroTitle;
//
// if (notFoundBoolean) {
//     notFound();
// }

// function getHeroData(heroTitle: string, t: (key: string) => string) {
//     const hero = heroes.find((hr) => hr.title === heroTitle);
//     return hero
//         ? {
//               id: hero.id,
//               img: hero.srcImg as unknown as string,
//               title: t(`${hero.title}`),
//               alt: t(`${hero.alt}`),
//               heroColor: hero.color,
//               description: t(`${hero.description}`),
//               borderColor: hero.borderColor,
//               imgGif: hero?.srcGif as unknown as string,
//               group: hero?.group,
//           }
//         : null;
// }
//
// function findNextTitle(currentIndex: number): string {
//     const nextIndex = currentIndex === heroes.length - 1 ? 0 : currentIndex + 1;
//     return heroes[nextIndex]?.title;
// }
//
// function findPrevTitle(currentIndex: number): string {
//     const previousIndex = currentIndex === 0 ? heroes.length - 1 : currentIndex - 1;
//     return heroes[previousIndex]?.title;
// }
