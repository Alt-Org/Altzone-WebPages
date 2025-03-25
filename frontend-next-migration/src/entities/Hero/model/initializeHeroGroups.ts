import einstein from '@/shared/assets/images/heros/einstein/einstein.png';
import professorGif from '@/shared/assets/images/heros/einstein/Professor.gif';
import overeater from '@/shared/assets/images/heros/hannu-hodari/hannu-hodari.png';
import overeaterGif from '@/shared/assets/images/heros/hannu-hodari/Overeater.gif';
import alcoholic from '@/shared/assets/images/heros/alcoholic/Alkoholisti.png';
import provocateur from '@/shared/assets/images/heros/graffitti-gaya/graffitti-gaya.png';
import mirror from '@/shared/assets/images/heros/mirror/Mirror.webp';
import mirrorGif from '@/shared/assets/images/heros/mirror/Mirror.gif';
import purpleGirls from '@/shared/assets/images/heros/purple-girls/purple-girls.webp';
import sleepySleeper from '@/shared/assets/images/heros/sleeper/Sleeper_new.webp';
import sleeperGif from '@/shared/assets/images/heros/sleeper/Sleeper.gif';
import conman from '@/shared/assets/images/heros/conman/conman.webp';
import conmanGif from '@/shared/assets/images/heros/conman/Conman_new.gif';
import jokester from '@/shared/assets/images/heros/jokester/Jokester.webp';
import believer from '@/shared/assets/images/heros/fate-priest/Believer.webp';
import believerGif from '@/shared/assets/images/heros/fate-priest/Believer.gif';
import racist from '@/shared/assets/images/heros/racist/Rasisti.png';
import racistGif from '@/shared/assets/images/heros/racist/Rasisti.gif';
import meatwall from '@/shared/assets/images/heros/meatwall/Meatwall.png';
import veteran from '@/shared/assets/images/heros/veteran/Veteran.webp';
import veteranGif from '@/shared/assets/images/heros/veteran/Veteran.gif';
import comingSoon from '@/shared/assets/images/heros/ComingSoon.webp';
import red from '@/shared/assets/images/heros/textBgColors/red_cropped.webp';
import yellow from '@/shared/assets/images/heros/textBgColors/yellow.webp';
import orange from '@/shared/assets/images/heros/textBgColors/orange.webp';
import greenBg from '@/shared/assets/images/heros/textBgColors/green2.webp';
import darkBlue from '@/shared/assets/images/heros/textBgColors/dark-blue_cropped.webp';
import lightBlue from '@/shared/assets/images/heros/textBgColors/light-blue.webp';
import purpleBg from '@/shared/assets/images/heros/textBgColors/purple.webp';
import { statData } from '../model/stats/statsDataV2';
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
                    id: 4341,
                    srcImg: overeater,
                    srcGif: overeaterGif,
                    alt: t('RETROFLECTOR.heroes.Overeater.alt'),
                    altGif: t('RETROFLECTOR.heroes.Overeater.altGif'),
                    title: t('RETROFLECTOR.heroes.Overeater.title'),
                    slug: HeroSlug.OVEREATER,
                    description: t('RETROFLECTOR.heroes.Overeater.description'),
                    stats: statData.OVEREATER,
                },

                {
                    id: 14342,
                    srcImg: alcoholic,
                    srcGif: comingSoon,
                    alt: t('RETROFLECTOR.heroes.alcoholic.alt'),
                    altGif: t('RETROFLECTOR.heroes.alcoholic.altGif'),
                    title: t('RETROFLECTOR.heroes.alcoholic.title'),
                    slug: HeroSlug.ALCOHOLIC,
                    description: t('RETROFLECTOR.heroes.alcoholic.description'),
                    stats: statData.ALCOHOLIC,
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
                    id: 313213,
                    srcImg: purpleGirls,
                    srcGif: comingSoon,
                    alt: t('CONFLUENT.heroes.SoulSisters.alt'),
                    altGif: t('CONFLUENT.heroes.SoulSisters.altGif'),
                    slug: HeroSlug.SOUL_SISTERS,
                    title: t('CONFLUENT.heroes.SoulSisters.title'),
                    description: t('CONFLUENT.heroes.SoulSisters.description'),
                    stats: statData.SOUL_SISTERS,
                },

                {
                    id: 34123,
                    srcImg: sleepySleeper,
                    srcGif: sleeperGif,
                    alt: t('CONFLUENT.heroes.SleepySleeper.alt'),
                    altGif: t('CONFLUENT.heroes.SleepySleeper.altGif'),
                    slug: HeroSlug.SLEEPY_SLEEPER,
                    title: t('CONFLUENT.heroes.SleepySleeper.title'),
                    description: t('CONFLUENT.heroes.SleepySleeper.description'),
                    stats: statData.SLEEPER,
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
                    id: 312314,
                    srcImg: provocateur,
                    srcGif: comingSoon,
                    alt: t('PROJECTOR.heroes.Provocateur.alt'),
                    altGif: t('PROJECTOR.heroes.Provocateur.altGif'),
                    slug: HeroSlug.PROVOCATEUR,
                    title: t('PROJECTOR.heroes.Provocateur.title'),
                    description: t('PROJECTOR.heroes.Provocateur.description'),
                    stats: statData.PROVOCATEUR,
                },
                {
                    id: 312315,
                    srcImg: mirror,
                    srcGif: mirrorGif,
                    alt: t('PROJECTOR.heroes.Mirror.alt'),
                    altGif: t('PROJECTOR.heroes.Mirror.altGif'),
                    slug: HeroSlug.MIRROR,
                    title: t('PROJECTOR.heroes.Mirror.title'),
                    description: t('PROJECTOR.heroes.Mirror.description'),
                    stats: statData.MIRROR,
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
                    id: 52231233123,
                    srcImg: einstein,
                    srcGif: professorGif,
                    alt: t('INTELLECTUALIZER.heroes.Researcher.alt'),
                    altGif: t('INTELLECTUALIZER.heroes.Researcher.altGif'),
                    slug: HeroSlug.RESEARCHER,
                    title: t('INTELLECTUALIZER.heroes.Researcher.title'),
                    description: t('INTELLECTUALIZER.heroes.Researcher.description'),
                    stats: statData.RESEARCHER,
                },
            ],
        },

        [HeroGroup.TRICKSTER]: {
            name: t('TRICKSTER.name'),
            description: t('TRICKSTER.description'),
            bgColour: 'rgba(47,153,51,0.5)',
            label: greenBg,
            heroes: [
                {
                    id: 522313,
                    srcImg: conman,
                    srcGif: conmanGif,
                    alt: t('TRICKSTER.heroes.Conman.alt'),
                    altGif: t('TRICKSTER.heroes.Conman.altGif'),
                    slug: HeroSlug.CONMAN,
                    title: t('TRICKSTER.heroes.Conman.title'),
                    description: t('TRICKSTER.heroes.Conman.description'),
                    stats: statData.CONMAN,
                },
                {
                    id: 522314,
                    srcImg: jokester,
                    srcGif: comingSoon,
                    alt: t('TRICKSTER.heroes.Jokester.alt'),
                    altGif: t('TRICKSTER.heroes.Jokester.altGif'),
                    slug: HeroSlug.JOKESTER,
                    title: t('TRICKSTER.heroes.Jokester.title'),
                    description: t('TRICKSTER.heroes.Jokester.description'),
                    stats: statData.JOKESTER,
                },
            ],
        },

        [HeroGroup.OBEDIENT]: {
            name: t('OBEDIENT.name'),
            description: t('OBEDIENT.description'),
            bgColour: 'rgba(240,153,0,0.7)',
            label: orange,
            heroes: [
                {
                    id: 524234,
                    srcImg: believer,
                    srcGif: believerGif,
                    alt: t('OBEDIENT.heroes.Believer.alt'),
                    altGif: t('OBEDIENT.heroes.Believer.altGif'),
                    slug: HeroSlug.BELIEVER,
                    title: t('OBEDIENT.heroes.Believer.title'),
                    description: t('OBEDIENT.heroes.Believer.description'),
                    stats: statData.BELIEVER,
                },
            ],
        },

        [HeroGroup.DESENSITIZER]: {
            name: t('DESENSITIZER.name'),
            description: t('DESENSITIZER.description'),
            bgColour: 'rgba(0,192,192,0.7)',
            label: lightBlue,
            heroes: [
                {
                    id: 848349,
                    srcImg: racist,
                    srcGif: racistGif,
                    alt: t('DESENSITIZER.heroes.Racist.alt'),
                    altGif: t('DESENSITIZER.heroes.Racist.altGif'),
                    slug: HeroSlug.RACIST,
                    title: t('DESENSITIZER.heroes.Racist.title'),
                    description: t('DESENSITIZER.heroes.Racist.description'),
                    stats: statData.RACIST,
                },
                {
                    id: 848341,
                    srcImg: meatwall,
                    srcGif: comingSoon,
                    alt: t('DESENSITIZER.heroes.Meatwall.alt'),
                    altGif: t('DESENSITIZER.heroes.Meatwall.altGif'),
                    slug: HeroSlug.MEATWALL,
                    title: t('DESENSITIZER.heroes.Meatwall.title'),
                    description: t('DESENSITIZER.heroes.Meatwall.description'),
                    stats: statData.RACIST,
                },
                {
                    id: 848342,
                    srcImg: veteran,
                    srcGif: veteranGif,
                    alt: t('DESENSITIZER.heroes.Veteran.alt'),
                    altGif: t('DESENSITIZER.heroes.Veteran.altGif'),
                    slug: HeroSlug.VETERAN,
                    title: t('DESENSITIZER.heroes.Veteran.title'),
                    description: t('DESENSITIZER.heroes.Veteran.description'),
                    stats: statData.VETERAN,
                },
            ],
        },
    };
};
