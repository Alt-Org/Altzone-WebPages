import overeater from '@/shared/assets/images/heros/hannu-hodari/hannu-hodari.png';
import overeaterGif from '@/shared/assets/images/heros/hannu-hodari/Overeater.gif';
import alcoholic from '@/shared/assets/images/heros/alcoholic/Alkoholisti.png';
import purpleGirls from '@/shared/assets/images/heros/purple-girls/purple-girls.webp';
import sleepySleeper from '@/shared/assets/images/heros/sleeper/Sleeper_new.webp';
import sleeperGif from '@/shared/assets/images/heros/sleeper/Sleeper.gif';
import lovers from '@/shared/assets/images/heros/lovers/lovers.png';
import provocateur from '@/shared/assets/images/heros/graffitti-gaya/graffitti-gaya.png';
import mirror from '@/shared/assets/images/heros/mirror/Mirror.webp';
import mirrorGif from '@/shared/assets/images/heros/mirror/Mirror.gif';
import scapegoater from '@/shared/assets/images/heros/scapegoater/scapegoater.png';
import wiseacre from '@/shared/assets/images/heros/wiseagre/wiseagre.png';
import capitalist from '@/shared/assets/images/heros/capitalist/capitalist.png';
import ocd from '@/shared/assets/images/heros/ocd/ocd.png';
import conman from '@/shared/assets/images/heros/conman/conman.png';
import conmanGif from '@/shared/assets/images/heros/conman/Conman_new.gif';
import jokester from '@/shared/assets/images/heros/jokester/Jokester.webp';
import pranking from '@/shared/assets/images/heros/pranking/pranking.png';
import seducer from '@/shared/assets/images/heros/seducer/seducer.png';
import retroflector from '@/shared/assets/images/descriptionCard/retroflector.png';
import confluent from '@/shared/assets/images/descriptionCard/confluent.png';
import projector from '@/shared/assets/images/descriptionCard/projector.png';
import intellectualizer from '@/shared/assets/images/descriptionCard/intellectualizer.png';
import trickster from '@/shared/assets/images/descriptionCard/trickster.png';
import red from '@/shared/assets/images/heros/textBgColors/red_cropped.webp';
import yellow from '@/shared/assets/images/heros/textBgColors/yellow.webp';
import darkBlue from '@/shared/assets/images/heros/textBgColors/dark-blue_cropped.webp';
import greenBg from '@/shared/assets/images/heros/textBgColors/green2.webp';
import purpleBg from '@/shared/assets/images/heros/textBgColors/purple.webp';
import comingSoon from '@/shared/assets/images/heros/ComingSoon.webp';
import { statData } from '../model/stats/statsDataV2';
import { statData2 } from '../model/stats/statsDataV3';
import { statData3 } from '../model/stats/statsDataV4';
import { GroupInfo, HeroGroup, HeroSlug } from '../types/hero';

export const buildHeroGroupsPart1 = (
    t: (key: string) => string,
): Partial<Record<HeroGroup, GroupInfo>> => ({
    [HeroGroup.RETROFLECTOR]: {
        name: t('RETROFLECTOR.name'),
        description: t('RETROFLECTOR.description'),
        srcImg: retroflector,
        bgColour: '#FF0000',
        label: red,
        heroes: [
            {
                id: 4341,
                rarityClass: t('common'),
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
                rarityClass: t('common'),
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
        srcImg: confluent,
        bgColour: '#8E008E',
        label: purpleBg,
        heroes: [
            {
                id: 313213,
                rarityClass: t('epic'),
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
                rarityClass: t('common'),
                srcImg: sleepySleeper,
                srcGif: sleeperGif,
                alt: t('CONFLUENT.heroes.SleepySleeper.alt'),
                altGif: t('CONFLUENT.heroes.SleepySleeper.altGif'),
                slug: HeroSlug.SLEEPY_SLEEPER,
                title: t('CONFLUENT.heroes.SleepySleeper.title'),
                description: t('CONFLUENT.heroes.SleepySleeper.description'),
                stats: statData.SLEEPY_SLEEPER,
            },
            {
                id: 34124,
                rarityClass: t('common'),
                srcImg: lovers,
                srcGif: comingSoon,
                alt: t('CONFLUENT.heroes.Lovers.alt'),
                altGif: t('CONFLUENT.heroes.Lovers.altGif'),
                slug: HeroSlug.LOVERS,
                title: t('CONFLUENT.heroes.Lovers.title'),
                description: t('CONFLUENT.heroes.Lovers.description'),
                stats: statData2.LOVERS,
            },
        ],
    },

    [HeroGroup.PROJECTOR]: {
        name: t('PROJECTOR.name'),
        description: t('PROJECTOR.description'),
        srcImg: projector,
        bgColour: '#FF8E00',
        label: yellow,
        heroes: [
            {
                id: 312314,
                rarityClass: t('epic'),
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
                rarityClass: t('epic'),
                srcImg: mirror,
                srcGif: mirrorGif,
                alt: t('PROJECTOR.heroes.Mirror.alt'),
                altGif: t('PROJECTOR.heroes.Mirror.altGif'),
                slug: HeroSlug.MIRROR,
                title: t('PROJECTOR.heroes.Mirror.title'),
                description: t('PROJECTOR.heroes.Mirror.description'),
                stats: statData.MIRROR,
            },
            {
                id: 312316,
                rarityClass: t('rare'),
                srcImg: scapegoater,
                srcGif: comingSoon,
                alt: t('PROJECTOR.heroes.Scapegoater.alt'),
                altGif: t('PROJECTOR.heroes.Scapegoater.altGif'),
                slug: HeroSlug.SCAPEGOATER,
                title: t('PROJECTOR.heroes.Scapegoater.title'),
                description: t('PROJECTOR.heroes.Scapegoater.description'),
                stats: statData2.SCAPEGOATER,
            },
        ],
    },

    [HeroGroup.INTELLECTUALIZER]: {
        name: t('INTELLECTUALIZER.name'),
        description: t('INTELLECTUALIZER.description'),
        srcImg: intellectualizer,
        bgColour: '#400098',
        label: darkBlue,
        heroes: [
            {
                id: 52231233123,
                rarityClass: t('rare'),
                srcImg: wiseacre,
                srcGif: comingSoon,
                alt: t('INTELLECTUALIZER.heroes.Wiseacre.alt'),
                altGif: t('INTELLECTUALIZER.heroes.Wiseacre.altGif'),
                slug: HeroSlug.WISEACRE,
                title: t('INTELLECTUALIZER.heroes.Wiseacre.title'),
                description: t('INTELLECTUALIZER.heroes.Wiseacre.description'),
                stats: statData2.WISEACRE,
            },
            {
                id: 52231233124,
                rarityClass: t('common'),
                srcImg: capitalist,
                srcGif: comingSoon,
                alt: t('INTELLECTUALIZER.heroes.Capitalist.alt'),
                altGif: t('INTELLECTUALIZER.heroes.Capitalist.altGif'),
                slug: HeroSlug.CAPITALIST,
                title: t('INTELLECTUALIZER.heroes.Capitalist.title'),
                description: t('INTELLECTUALIZER.heroes.Capitalist.description'),
                stats: statData2.CAPITALIST,
            },
            {
                id: 52231233125,
                srcImg: ocd,
                rarityClass: t('epic'),
                srcGif: comingSoon,
                alt: t('INTELLECTUALIZER.heroes.Ocd.alt'),
                altGif: t('INTELLECTUALIZER.heroes.Ocd.altGif'),
                slug: HeroSlug.OCD,
                title: t('INTELLECTUALIZER.heroes.Ocd.title'),
                description: t('INTELLECTUALIZER.heroes.Ocd.description'),
                stats: statData2.OCD,
            },
        ],
    },

    [HeroGroup.TRICKSTER]: {
        name: t('TRICKSTER.name'),
        description: t('TRICKSTER.description'),
        srcImg: trickster,
        bgColour: 'rgba(47,153,51,0.5)',
        label: greenBg,
        heroes: [
            {
                id: 522313,
                srcImg: conman,
                rarityClass: t('rare'),
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
                rarityClass: t('common'),
                srcImg: jokester,
                srcGif: comingSoon,
                alt: t('TRICKSTER.heroes.Jokester.alt'),
                altGif: t('TRICKSTER.heroes.Jokester.altGif'),
                slug: HeroSlug.JOKESTER,
                title: t('TRICKSTER.heroes.Jokester.title'),
                description: t('TRICKSTER.heroes.Jokester.description'),
                stats: statData.JOKESTER,
            },
            {
                id: 522315,
                srcImg: pranking,
                rarityClass: t('epic'),
                srcGif: comingSoon,
                alt: t('TRICKSTER.heroes.Pranking.alt'),
                altGif: t('TRICKSTER.heroes.Pranking.altGif'),
                slug: HeroSlug.PRANKING,
                title: t('TRICKSTER.heroes.Pranking.title'),
                description: t('TRICKSTER.heroes.Pranking.description'),
                stats: statData2.PRANKING,
            },
            {
                id: 522316,
                srcImg: seducer,
                rarityClass: t('epic'),
                srcGif: comingSoon,
                alt: t('TRICKSTER.heroes.Seducer.alt'),
                altGif: t('TRICKSTER.heroes.Seducer.altGif'),
                slug: HeroSlug.SEDUCER,
                title: t('TRICKSTER.heroes.Seducer.title'),
                description: t('TRICKSTER.heroes.Seducer.description'),
                stats: statData3.SEDUCER,
            },
        ],
    },
});
