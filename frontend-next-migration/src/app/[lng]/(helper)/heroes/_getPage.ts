import { createPage } from '@/app/_helpers';
import { useServerTranslation } from '@/shared/i18n';
// import { HeroManager } from '@/entities/Hero/model/heroesv2';
// import { HeroGroup } from '@/entities/Hero/types/hero';

export async function _getPage(lng: string) {
    const { t } = await useServerTranslation(lng, 'heroes');
    return createPage({
        buildPage: () => ({}),
        buildSeo: () => ({
            title: t('head-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
        }),
    });
}

// const HeroPage = async ({ params }: Props) => {
//
//
//     const { t } = await useServerTranslation(params.lng, 'heroes');
//
//
//     const heroManager = new HeroManager(t);
//     const allHeroes = heroManager.getAllHeroes();
//     const allHeroes2 = heroManager.getHeroesBySpecificGroup(HeroGroup.RETROFLECTOR);
//
//     return (
//         <div>
//             {allHeroes.map(hero => (
//                     <div key={hero.id}>
//                         <h3>{hero.title}</h3>
//                         <p>group: {hero.groupName}</p>
//     </div>
// ))}
//     </div>
// );
// };
//
// export default HeroPage;
