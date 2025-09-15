import einstein from '@/shared/assets/images/heros/einstein/einstein.png';
import professorGif from '@/shared/assets/images/heros/einstein/Professor.gif';
import overeater from '@/shared/assets/images/heros/hannu-hodari/hannu-hodari.png';
import overeaterGif from '@/shared/assets/images/heros/hannu-hodari/Overeater.gif';
import alcoholic from '@/shared/assets/images/heros/alcoholic/Alkoholisti.png';
import provocateur from '@/shared/assets/images/heros/graffitti-gaya/graffitti-gaya.png';
import mirror from '@/shared/assets/images/heros/mirror/Mirror.webp';
import bullying from '@/shared/assets/images/heros/bullying/bullying.png';
import mirrorGif from '@/shared/assets/images/heros/mirror/Mirror.gif';
import purpleGirls from '@/shared/assets/images/heros/purple-girls/purple-girls.webp';
import sleepySleeper from '@/shared/assets/images/heros/sleeper/Sleeper_new.webp';
import sleeperGif from '@/shared/assets/images/heros/sleeper/Sleeper.gif';
import conman from '@/shared/assets/images/heros/conman/conman.png';
import conmanGif from '@/shared/assets/images/heros/conman/Conman_new.gif';
import jokester from '@/shared/assets/images/heros/jokester/Jokester.webp';
import believer from '@/shared/assets/images/heros/fate-priest/Believer.webp';
import believerGif from '@/shared/assets/images/heros/fate-priest/Believer.gif';
import hateSpeech from '@/shared/assets/images/heros/hate-speech/Vihapuhe.png';
import hateSpeechGif from '@/shared/assets/images/heros/hate-speech/Vihapuhe.gif';
import scapegoater from '@/shared/assets/images/heros/scapegoater/scapegoater.png';
import meatwall from '@/shared/assets/images/heros/meatwall/Meatwall.png';
import lovers from '@/shared/assets/images/heros/lovers/lovers.png';
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
import retroflector from '@/shared/assets/images/descriptionCard/retroflector.png';
import wiseacre from '@/shared/assets/images/heros/wiseagre/wiseagre.png';
import capitalist from '@/shared/assets/images/heros/capitalist/capitalist.png';
import ocd from '@/shared/assets/images/heros/ocd/ocd.png';
import pranking from '@/shared/assets/images/heros/pranking/pranking.png';
import seducer from '@/shared/assets/images/heros/seducer/seducer.png';
import people_pleaser from '@/shared/assets/images/heros/people-pleaser/people-pleaser.png';
import { statData, statData2, statData3 } from '@/entities/Hero';
import { GroupInfo, HeroGroup, HeroSlug } from '../types/hero';

export const initializeHeroGroups = (t: (key: string) => string): Record<HeroGroup, GroupInfo> => {
    return {
        [HeroGroup.RETROFLECTOR]: {
            name: t('RETROFLECTOR.name'),
            description: t('RETROFLECTOR.description'),
            srcImg: retroflector,
            bgColour: '#FF0000',
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
            srcImg: retroflector,
            bgColour: '#8E008E',
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
                {
                    id: 34124,
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
            srcImg: retroflector,
            bgColour: '#FF8E00',
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
                {
                    id: 312316,
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
            srcImg: retroflector,
            bgColour: '#400098',
            label: darkBlue,
            heroes: [
                {
                    id: 52231233123,
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
            srcImg: retroflector,
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
                {
                    id: 522315,
                    srcImg: pranking,
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

        [HeroGroup.OBEDIENT]: {
            name: t('OBEDIENT.name'),
            description: t('OBEDIENT.description'),
            srcImg: retroflector,
            bgColour: '#FFFF00',
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
                {
                    id: 524235,
                    srcImg: people_pleaser,
                    srcGif: comingSoon,
                    alt: t('OBEDIENT.heroes.PeoplePleaser.alt'),
                    altGif: t('OBEDIENT.heroes.PeoplePleaser.altGif'),
                    slug: HeroSlug.PEOPLE_PLEASER,
                    title: t('OBEDIENT.heroes.PeoplePleaser.title'),
                    description: t('OBEDIENT.heroes.PeoplePleaser.description'),
                    stats: statData3.PEOPLE_PLEASER,
                },
            ],
        },

        [HeroGroup.DESENSITIZER]: {
            name: t('DESENSITIZER.name'),
            description: t('DESENSITIZER.description'),
            srcImg: retroflector,
            bgColour: '#00C0C0',
            label: lightBlue,
            heroes: [
                {
                    id: 848349,
                    srcImg: hateSpeech,
                    srcGif: hateSpeechGif,
                    alt: t('DESENSITIZER.heroes.HateSpeech.alt'),
                    altGif: t('DESENSITIZER.heroes.HateSpeech.altGif'),
                    slug: HeroSlug.HATE_SPEECH,
                    title: t('DESENSITIZER.heroes.HateSpeech.title'),
                    description: t('DESENSITIZER.heroes.HateSpeech.description'),
                    stats: statData.HATE_SPEECH,
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
                    stats: statData.MEATWALL,
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
                {
                    id: 848343,
                    srcImg: bullying,
                    srcGif: comingSoon,
                    alt: t('DESENSITIZER.heroes.Bullying.alt'),
                    altGif: t('DESENSITIZER.heroes.Bullying.altGif'),
                    slug: HeroSlug.BULLYING,
                    title: t('DESENSITIZER.heroes.Bullying.title'),
                    description: t('DESENSITIZER.heroes.Bullying.description'),
                    stats: statData3.BULLYING,
                },
            ],
        },
    };
};
