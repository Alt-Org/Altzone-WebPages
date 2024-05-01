import greenHaired from "@/shared/assets/images/heros/green-haired/green-haired.webp";
import greenHairedGiF from "@/shared/assets/images/heros/green-haired/green-haired-walk.gif";
// import greenHairedGiF from "@/shared/assets/images/heros/green-haired/green-haired-walk-2.gif";

import einstein from "@/shared/assets/images/heros/einstein/einstein.webp";
import einsteinGif from "@/shared/assets/images/heros/einstein/einstein-dab_dance.gif";


import pirate from "@/shared/assets/images/heros/pirate/pirate.webp";
import pirateGif from "@/shared/assets/images/heros/pirate/pirate-catwalk.gif";

import purpleGirls from "@/shared/assets/images/heros/purple-girls/purple-girls.svg";
import purpleGirlsGif from "@/shared/assets/images/heros/purple-girls/purple-girls-boxing.gif";

import hannuHodari from "@/shared/assets/images/heros/hannu-hodari/hannu-hodari.png";
import hannuHodariGiF from "@/shared/assets/images/heros/hannu-hodari/hannu-hodari.gif";

import graffittiGaya from "@/shared/assets/images/heros/graffitti-gaya/graffitti-gaya.png";
import graffittiGayaGif from "@/shared/assets/images/heros/graffitti-gaya/grafitti-gaya.gif";



import defaultGif from "@/shared/assets/images/clanBg/cloud.png";

const Heroes = [
  {
    id: 0,
    srcImg: greenHaired,
    srcGif: greenHairedGiF,
    alt: "Image 1",
    title: "Green_haired",
    borderColor: "#41F50C",
    description:
      "The Huracán Performante has reworked the concept of super sports cars and taken the notion of performance to levels never seen before.",
  },
  {
    id: 1,
    srcImg: hannuHodari,
    srcGif: hannuHodariGiF,
    alt: "Hannu_hodari image",
    title: "Hannu_hodari",
    borderColor: "#41F50C",
    description:
      "This Turbo S variant comes with an engine putting out 641 bhp @ 6750 rpm and 800 Nm @ 2500 rpm of max power and max torque respectively.",
  },
  {
    id: 2,
    srcImg: purpleGirls,
    srcGif: purpleGirlsGif,
    alt: "Image 3",
    title: "Purple_twins",
    borderColor: "#41F50C",
    description:
      "For offroad lovers. Super fast, Super Comfortable.",
  },
  {
    id: 3,
    srcImg: einstein,
    srcGif: einsteinGif,
    alt: "Image 4",
    title: "Einstein",
    borderColor: "#41F50C",
    description:
      "Aventador SV provide thrills unlike anything that has ever been experienced before.",
  },
  {
    id: 4,
    srcImg: graffittiGaya,
    srcGif: graffittiGayaGif,
    alt: "graffittiGaya",
    title: "graffittiGaya",
    borderColor: "#41F50C",
    description:
      "0 to 100 km/h (0 to 62 mph) takes 3.0 seconds and the Spider is capable of a top speed of 400 km/h (249 mph).",
  },
  {
    id: 5,
    srcImg: pirate,
    srcGif: pirateGif,
    alt: "Image 6",
    title: "Pirate2",
    borderColor: "#41F50C",
    description:
      "The Porsche 911 (pronounced Nine Eleven or in German: Neunelfer) is a two-door 2+2 high performance rear-engined sports car.",
  },
  // {
  //   id: 6,
  //   src: "https://images.unsplash.com/photo-1555353540-64580b51c258?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=378&q=80",
  //   alt: "Image 7",
  //   title: "Dodge Challenger",
  //   description:
  //     "The Challenger has a classic muscle-car interior, with a simple design",
  // },
  // {
  //   id: 7,
  //   src: "https://i.pinimg.com/750x/88/33/1b/88331be20045f95b28e91e21fa663ad0.jpg",
  //   alt: "Image 8",
  //   title: "Lamborghini Gallardo",
  //   description:
  //     "The Gallardo is a 2 seater 10 cylinder car and has length of 4345mm, width of 1900mm and a wheelbase of 2560mm.",
  // },
  // {
  //   id: 8,
  //   src: "https://i.pinimg.com/564x/2e/40/02/2e40027b9b156589cfbccbf7b33d3bc7.jpg",
  //   alt: "Image 9",
  //   title: "2021 Mercedes-AMG GLE53 Coupe electrifies",
  //   description:
  //     "Its electric motor can provide up to 184 pound-feet of torque on demand.",
  // },
] as const;

export default Heroes;