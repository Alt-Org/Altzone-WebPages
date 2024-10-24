import einstein from '@/shared/assets/images/heros/einstein/einstein.png';
import einsteinGif from '@/shared/assets/images/heros/einstein/einstein-dab_dance.gif';
import hannuHodari from '@/shared/assets/images/heros/hannu-hodari/hannu-hodari.png';
import hannuHodariGiF from '@/shared/assets/images/heros/hannu-hodari/hannu-hodari.gif';
import graffittiGaya from '@/shared/assets/images/heros/graffitti-gaya/graffitti-gaya.png';
import graffittiGayaGif from '@/shared/assets/images/heros/graffitti-gaya/grafitti-gaya.gif';
import red from '@/shared/assets/images/heros/textBgColors/red_cropped.webp';
import yellow from '@/shared/assets/images/heros/textBgColors/yellow.webp';
import darkBlue from '@/shared/assets/images/heros/textBgColors/dark-blue_cropped.webp';
import { GroupInfo, HeroGroup, HeroSlug } from '../types/hero';

// import { HeroGroup, GroupInfo, Hero } from '../types/hero';
export const initializeHeroGroups = (t: (key: string) => string): Record<HeroGroup, GroupInfo> => {
    return {
        [HeroGroup.RETROFLECTOR]: {
            name: t('RETROFLECTOR.name'),
            description: t('RETROFLECTOR.description'),
            bgColour: 'rgba(226, 5, 5, 0.5)',
            label: red,
            heroes: [
                {
                    id: 1,
                    srcImg: hannuHodari,
                    srcGif: hannuHodariGiF,
                    alt: t('RETROFLECTOR.heroes.hannuHodari.alt'),
                    title: t('RETROFLECTOR.heroes.hannuHodari.title'),
                    slug: HeroSlug.HANNU_HODARI,
                    description: t('RETROFLECTOR.heroes.hannuHodari.description'),
                },
            ],
        },

        [HeroGroup.PROJECTOR]: {
            name: t('PROJECTOR.name'),
            description: t('PROJECTOR.description'),
            bgColour: 'rgba(254, 237, 1, 0.5)',
            label: yellow,
            heroes: [
                {
                    id: 4,
                    srcImg: graffittiGaya,
                    srcGif: graffittiGayaGif,
                    alt: 'PROJECTOR.heroes.GraffitiArtist.alt',
                    slug: HeroSlug.GRAFFITI_ARTIST,
                    title: t('PROJECTOR.heroes.GraffitiArtist.title'),
                    description: t('PROJECTOR.heroes.GraffitiArtist.description'),
                },
            ],
        },

        [HeroGroup.INTELLECTUALIZER]: {
            name: t('INTELLECTUALIZER.name'),
            description: t('INTELLECTUALIZER.description'),
            bgColour: 'rgba(254, 237, 1, 0.5)',
            label: darkBlue,
            heroes: [
                {
                    id: 5,
                    srcImg: einstein,
                    srcGif: einsteinGif,
                    alt: 'INTELLECTUALIZER.heroes.Researcher.alt',
                    slug: HeroSlug.RESEARCHER,
                    title: t('INTELLECTUALIZER.heroes.Researcher.title'),
                    description: t('INTELLECTUALIZER.heroes.Researcher.description'),
                },
            ],
        },
    };
};
