// 'use client';
// import { HeroContainer } from '@/entities/Hero';
// import { heroes } from '@/entities/Hero';
// import { useParams } from 'next/navigation';
// import { useClientTranslation } from '@/shared/i18n';
// import { RoutePaths } from '@/shared/appLinks/RoutePaths';
// import { Navbar } from '@/widgets/Navbar';
// import { Footer } from '@/widgets/Footer';
// import { HorizontalLines } from '@/shared/ui/HorizontalLines';
//
// type Props = {
//   selectedHero: string;
// };
//
// export default function HeroPage(props: Props) {
//   const { selectedHero } = props;
//
//   const { lng } = useParams();
//   const { t } = useClientTranslation(lng as string, 'heroes');
//
//   function findSelectedHero() {
//     const selectedHeroData = heroes.find((hero) => hero.title === selectedHero);
//     return selectedHeroData
//       ? {
//           id: selectedHeroData.id,
//           img: selectedHeroData.srcImg,
//           title: t(`${selectedHeroData.title}`),
//           alt: t(`${selectedHeroData.alt}`),
//           heroColor: selectedHeroData.color,
//           description: t(`${selectedHeroData.description}`),
//           borderColor: selectedHeroData.borderColor,
//           imgGif: selectedHeroData?.srcGif || undefined,
//           group: selectedHeroData?.group || undefined,
//         }
//       : null;
//   }
//
//   function calculateNextIndex(currentIndex: number): string {
//     const nextIndex = currentIndex === heroes.length - 1 ? 0 : currentIndex + 1;
//     return heroes[nextIndex].title;
//   }
//
//   function calculatePreviousIndex(currentIndex: number): string {
//     const previousIndex =
//       currentIndex === 0 ? heroes.length - 1 : currentIndex - 1;
//     return heroes[previousIndex].title;
//   }
//
//   const selectedHeroInfo = findSelectedHero();
//   const previousIndex = calculatePreviousIndex(selectedHeroInfo?.id || 0);
//   const nextIndex = calculateNextIndex(selectedHeroInfo?.id || 0);
//
//   const leftArrowLink = `${RoutePaths.HEROES_ONE.replace(
//     ':id',
//     previousIndex.toString(),
//   )}`;
//   const rightArrowLink = `${RoutePaths.HEROES_ONE.replace(
//     ':id',
//     nextIndex.toString(),
//   )}`;
//
//   return (
//     <>
//       <Navbar overlaid={true}/>
//       {selectedHeroInfo && (
//         <HeroContainer
//           heroColor={selectedHeroInfo.heroColor}
//           // id={selectedHeroInfo.id}
//           // group={selectedHeroInfo.group}
//           heroImg={selectedHeroInfo.img as unknown as string}
//           // heroImgAlt={selectedHeroInfo.alt}
//
//           heroName={selectedHeroInfo.title}
//           heroDescription={selectedHeroInfo.description}
//           leftArrowLink={leftArrowLink}
//           rightArrowLink={rightArrowLink}
//           // borderColor={selectedHeroInfo.borderColor}
//           heroGif={selectedHeroInfo.imgGif as unknown as string}
//           xLink={RoutePaths.HEROES}
//         />
//       )}
//       <HorizontalLines></HorizontalLines>
//       <Footer />
//     </>
//   );
// }

// const leftArrowLink = `${RoutePaths.HEROES_ONE.replace(':id', prevHero.title)}`;
// const rightArrowLink = `${RoutePaths.HEROES_ONE.replace(':id', nextHero.title)}`;

import { HeroContainer } from '@/entities/Hero';
import { RoutePaths } from '@/shared/appLinks/RoutePaths';
import { Navbar } from '@/widgets/Navbar';
import { Footer } from '@/widgets/Footer';
import { HorizontalLines } from '@/shared/ui/HorizontalLines';

type HeroData = {
    id: number;
    img: string;
    title: string;
    alt: string;
    heroColor: string;
    description: string;
    borderColor: string;
    imgGif?: string;
    group?: string;
};

interface Props  {
    selectedHero: HeroData;
    prevHeroLink: string;
    nextHeroLink: string;
};

export default function HeroPage(props: Props) {

    const {
        selectedHero,
        prevHeroLink,
        nextHeroLink
         } = props;

    return (
        <>
            <Navbar overlaid={true} />
            <HeroContainer
                heroColor={selectedHero.heroColor}
                heroImg={selectedHero.img}
                heroName={selectedHero.title}
                heroDescription={selectedHero.description}
                leftArrowLink={prevHeroLink}
                rightArrowLink={nextHeroLink}
                heroGif={selectedHero.imgGif as unknown as string}
                xLink={RoutePaths.HEROES}
            />
            <HorizontalLines />
            <Footer />
        </>
    );
}
