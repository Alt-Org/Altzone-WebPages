import { StaticImageData } from 'next/image';
import einstein from '@/shared/assets/images/heros/einstein/einstein.png';
import einsteinGif from '@/shared/assets/images/heros/einstein/einstein-dab_dance.gif';
import pirate from '@/shared/assets/images/heros/pirate/pirate.png';
import pirateGif from '@/shared/assets/images/heros/pirate/pirate-catwalk.gif';
import purpleGirls from '@/shared/assets/images/heros/purple-girls/purple-girls.png';
import purpleGirlsGif from '@/shared/assets/images/heros/purple-girls/purple-girls-boxing.gif';
import hannuHodari from '@/shared/assets/images/heros/hannu-hodari/hannu-hodari.png';
import hannuHodariGiF from '@/shared/assets/images/heros/hannu-hodari/hannu-hodari.gif';
import graffittiGaya from '@/shared/assets/images/heros/graffitti-gaya/graffitti-gaya.png';
import graffittiGayaGif from '@/shared/assets/images/heros/graffitti-gaya/grafitti-gaya.gif';
import darkblueBg from '@/shared/assets/images/heros/textBgColors/dark-blue.webp';
import purpleBg from '@/shared/assets/images/heros/textBgColors/purple.webp';
import redBg from '@/shared/assets/images/heros/textBgColors/red.webp';
import yellowBg from '@/shared/assets/images/heros/textBgColors/yellow.webp';
import { GroupInfo, HeroGroup } from '../types/hero';

// import { HeroGroup, GroupInfo, Hero } from '../types/hero';
export const initializeHeroGroups = (t: (key: string) => string): Record<HeroGroup, GroupInfo> => {
    return {
        [HeroGroup.RETROFLECTOR]: {
            name: t('RETROFLECTOR.name'),
            description: t('RETROFLECTOR.description'),
            bgColour: 'FF0000',
            heroes: [
                {
                    id: 1,
                    srcImg: hannuHodari,
                    srcGif: hannuHodariGiF,
                    alt: t('RETROFLECTOR.heroes.hannuHodari.alt'),
                    title: t('RETROFLECTOR.heroes.hannuHodari.title'),
                    slug: 'hannu-hodari',
                    description: t('RETROFLECTOR.heroes.hannuHodari.description'),
                },
            ],
        },

        [HeroGroup.PROJECTOR]: {
            name: t('PROJECTOR.name'),
            description: t('PROJECTOR.description'),
            bgColour: 'rgba(254, 237, 1, 0.5)',
            heroes: [
                {
                    id: 4,
                    srcImg: graffittiGaya,
                    srcGif: graffittiGayaGif,
                    alt: 'PROJECTOR.heroes.GraffitiArtist.alt',
                    slug: 'graffiti-artist',
                    title: t('PROJECTOR.heroes.GraffitiArtist.title'),
                    description: 'PROJECTOR.heroes.GraffitiArtist.description',
                },
            ],
        },
    };
};
