import einstein from '@/shared/assets/images/heros/einstein/einstein.png';
import einsteinGif from '@/shared/assets/images/heros/einstein/einstein-dab_dance.gif';
import hannuHodari from '@/shared/assets/images/heros/hannu-hodari/hannu-hodari.png';
import hannuHodariGiF from '@/shared/assets/images/heros/hannu-hodari/hannu-hodari.gif';
import pirate from '@/shared/assets/images/heros/pirate/pirate.png';
import pirateGif from '@/shared/assets/images/heros/pirate/pirate-catwalk.gif';
import graffittiGaya from '@/shared/assets/images/heros/graffitti-gaya/graffitti-gaya.png';
import graffittiGayaGif from '@/shared/assets/images/heros/graffitti-gaya/grafitti-gaya.gif';
import purpleGirls from '@/shared/assets/images/heros/purple-girls/purple-girls.png';
import purpleGirlsGif from '@/shared/assets/images/heros/purple-girls/purple-girls-boxing.gif';
import red from '@/shared/assets/images/heros/textBgColors/red_cropped.webp';
import yellow from '@/shared/assets/images/heros/textBgColors/yellow.webp';
import orange from '@/shared/assets/images/heros/textBgColors/orange.webp';
import darkBlue from '@/shared/assets/images/heros/textBgColors/dark-blue_cropped.webp';
import purpleBg from '@/shared/assets/images/heros/textBgColors/purple.webp';
import { GroupInfo, HeroGroup, HeroSlug } from '../types/hero';

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
                    altGif: t('RETROFLECTOR.heroes.hannuHodari.altGif'),
                    title: t('RETROFLECTOR.heroes.hannuHodari.title'),
                    slug: HeroSlug.HANNU_HODARI,
                    description: t('RETROFLECTOR.heroes.hannuHodari.description'),
                },

                {
                    id: 12,
                    srcImg: pirate,
                    srcGif: pirateGif,
                    alt: t('RETROFLECTOR.heroes.pirate.alt'),
                    altGif: t('RETROFLECTOR.heroes.pirate.altGif'),
                    title: t('RETROFLECTOR.heroes.pirate.title'),
                    slug: HeroSlug.PIRATE,
                    description: t('RETROFLECTOR.heroes.pirate.description'),
                },

                {
                    id: 122,
                    srcImg: pirate,
                    srcGif: pirateGif,
                    alt: t('RETROFLECTOR.heroes.pirate.alt'),
                    altGif: t('RETROFLECTOR.heroes.pirate.altGif'),
                    title: t('RETROFLECTOR.heroes.pirate.title'),
                    slug: HeroSlug.PIRATE,
                    description: t('RETROFLECTOR.heroes.pirate.description'),
                },

                {
                    id: 1222,
                    srcImg: pirate,
                    srcGif: pirateGif,
                    alt: t('RETROFLECTOR.heroes.pirate.alt'),
                    altGif: t('RETROFLECTOR.heroes.pirate.altGif'),
                    title: t('RETROFLECTOR.heroes.pirate.title'),
                    slug: HeroSlug.PIRATE,
                    description: t('RETROFLECTOR.heroes.pirate.description'),
                },

                {
                    id: 12222,
                    srcImg: pirate,
                    srcGif: pirateGif,
                    alt: t('RETROFLECTOR.heroes.pirate.alt'),
                    altGif: t('RETROFLECTOR.heroes.pirate.altGif'),
                    title: t('RETROFLECTOR.heroes.pirate.title'),
                    slug: HeroSlug.PIRATE,
                    description: t('RETROFLECTOR.heroes.pirate.description'),
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
                    alt: t('PROJECTOR.heroes.GraffitiArtist.alt'),
                    altGif: t('PROJECTOR.heroes.GraffitiArtist.altGif'),
                    slug: HeroSlug.GRAFFITI_ARTIST,
                    title: t('PROJECTOR.heroes.GraffitiArtist.title'),
                    description: t('PROJECTOR.heroes.GraffitiArtist.description'),
                },

                {
                    id: 4222,
                    srcImg: graffittiGaya,
                    srcGif: graffittiGayaGif,
                    alt: t('PROJECTOR.heroes.GraffitiArtist.alt'),
                    altGif: t('PROJECTOR.heroes.GraffitiArtist.altGif'),
                    slug: HeroSlug.GRAFFITI_ARTIST,
                    title: t('PROJECTOR.heroes.GraffitiArtist.title'),
                    description: t('PROJECTOR.heroes.GraffitiArtist.description'),
                },

                {
                    id: 42222,
                    srcImg: graffittiGaya,
                    srcGif: graffittiGayaGif,
                    alt: t('PROJECTOR.heroes.GraffitiArtist.alt'),
                    altGif: t('PROJECTOR.heroes.GraffitiArtist.altGif'),
                    slug: HeroSlug.GRAFFITI_ARTIST,
                    title: t('PROJECTOR.heroes.GraffitiArtist.title'),
                    description: t('PROJECTOR.heroes.GraffitiArtist.description'),
                },
            ],
        },

        [HeroGroup.INTELLECTUALIZER]: {
            name: t('INTELLECTUALIZER.name'),
            description: t('INTELLECTUALIZER.description'),
            bgColour: 'rgba(51, 3, 147, 0.5)',
            label: darkBlue,
            heroes: [
                {
                    id: 5223123,
                    srcImg: einstein,
                    srcGif: einsteinGif,
                    alt: t('INTELLECTUALIZER.heroes.Researcher.alt'),
                    altGif: t('INTELLECTUALIZER.heroes.Researcher.altGif'),
                    slug: HeroSlug.RESEARCHER,
                    title: t('INTELLECTUALIZER.heroes.Researcher.title'),
                    description: t('INTELLECTUALIZER.heroes.Researcher.description'),
                },
            ],
        },

        [HeroGroup.CONFLUENT]: {
            name: t('CONFLUENT.name'),
            description: t('CONFLUENT.description'),
            bgColour: 'rgba(145, 4, 148, 0.5)',
            label: purpleBg,
            heroes: [
                {
                    id: 52231232,
                    srcImg: purpleGirls,
                    srcGif: purpleGirlsGif,
                    alt: t('CONFLUENT.heroes.SoulSisters.alt'),
                    altGif: t('CONFLUENT.heroes.SoulSisters.altGif'),
                    slug: HeroSlug.SOUL_SISTERS,
                    title: t('CONFLUENT.heroes.SoulSisters.title'),
                    description: t('CONFLUENT.heroes.SoulSisters.description'),
                },
            ],
        },
    };
};
