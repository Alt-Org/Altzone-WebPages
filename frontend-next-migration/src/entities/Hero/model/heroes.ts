import greenHaired from '@/shared/assets/images/heros/green-haired/green-haired.png';
import greenHairedGiF from '@/shared/assets/images/heros/green-haired/green-haired-walk.gif';
// import greenHairedGiF from "@/shared/assets/images/heros/green-haired/green-haired-walk-2.gif";

import einstein from '@/shared/assets/images/heros/einstein/einstein.png';
import einsteinGif from '@/shared/assets/images/heros/einstein/einstein-dab_dance.gif';

import pirate from '@/shared/assets/images/heros/pirate/pirate.png';
// import pirate from "@/shared/assets/images/heros/pirate/pirate-catwalk.gif";
import pirateGif from '@/shared/assets/images/heros/pirate/pirate-catwalk.gif';

import purpleGirls from '@/shared/assets/images/heros/purple-girls/purple-girls.png';
import purpleGirlsGif from '@/shared/assets/images/heros/purple-girls/purple-girls-boxing.gif';

import hannuHodari from '@/shared/assets/images/heros/hannu-hodari/hannu-hodari.png';
import hannuHodariGiF from '@/shared/assets/images/heros/hannu-hodari/hannu-hodari.gif';

import graffittiGaya from '@/shared/assets/images/heros/graffitti-gaya/graffitti-gaya.png';
import graffittiGayaGif from '@/shared/assets/images/heros/graffitti-gaya/grafitti-gaya.gif';

import darkblueBg from '@/shared/assets/images/heros/textBgColors/dark-blue.webp';
import greenBg from '@/shared/assets/images/heros/textBgColors/green.webp';
import lightblueBg from '@/shared/assets/images/heros/textBgColors/light-blue.webp';
import orangeBg from '@/shared/assets/images/heros/textBgColors/orange.webp';
import pinkBg from '@/shared/assets/images/heros/textBgColors/pink.webp';
import purpleBg from '@/shared/assets/images/heros/textBgColors/purple.webp';
import redBg from '@/shared/assets/images/heros/textBgColors/red.webp';
import yellowBg from '@/shared/assets/images/heros/textBgColors/yellow.webp';

const Heroes = [
  {
    id: 0,
    srcImg: greenHaired,
    srcGif: greenHairedGiF,
    alt: 'greenHairedImgAlt',
    title: 'green-haired',
    borderColor: '#41F50C',
    description: 'greenHairedDescription',
    group: 'TORJUJAT',
    groupTextBg: redBg,
    color: '#e20505',
  },
  {
    id: 1,
    srcImg: hannuHodari,
    srcGif: hannuHodariGiF,
    alt: 'hannuHodariImgAlt',
    title: 'hannu-hodari',
    borderColor: '#41F50C',
    description: 'hannuHodariDescription',
    group: 'TORJUJAT',
    groupTextBg: redBg,
    color: '#e20505',
  },
  {
    id: 2,
    srcImg: purpleGirls,
    srcGif: purpleGirlsGif,
    alt: 'purpleGirlsImgAlt',
    title: 'purple-girls',
    borderColor: '#41F50C',
    description: 'purpleGirlsDescription',
    group: 'SULAUTUJAT',
    groupTextBg: purpleBg,
    color: '#910494',
  },
  {
    id: 3,
    srcImg: einstein,
    srcGif: einsteinGif,
    alt: 'einsteinImgAlt',
    title: 'einstein',
    borderColor: '#41F50C',
    description: 'einsteinDescription',
    group: 'ÄLYLLISTÄJÄT',
    groupTextBg: darkblueBg,

    color: '#330393',
  },
  {
    id: 4,
    srcImg: graffittiGaya,
    srcGif: graffittiGayaGif,
    alt: 'graffitiGayaAlt',
    title: 'graffitiGaya',
    borderColor: '#41F50C',
    description: 'graffitiGayaDescription',
    group: 'PEILAAJAT',
    groupTextBg: yellowBg,
    color: '#feed01',
  },
  {
    id: 5,
    srcImg: pirate,
    srcGif: pirateGif,
    alt: 'pirateAlt',
    title: 'pirate',
    borderColor: '#41F50C',
    description: 'pirateDescription',
    group: 'TORJUJAT',
    groupTextBg: redBg,
    color: '#e20505',
  },
] as const;

export default Heroes;
