import React from 'react';
import { HeroContainer } from '@/entities/Hero';
import { RoutePaths } from '@/shared/appLinks/RoutePaths';
import { HorizontalLines } from '@/shared/ui/HorizontalLines';
import {withBackgroundImage} from "@/shared/lib/hocs/withBackgroundImage";
import bgPicture from "@/shared/assets/images/backgrounds/background.webp";
import cls from "@/preparedPages/MainPage/ui/page.module.scss";

type HeroData = {
  id: number;
  img: string;
  title: string;
  alt: string;
  heroColor: string;
  description: string;
  borderColor: string;
  imgGif: string;
  group: string;
  groupTextBg: string;
};

interface Props {
  selectedHero: HeroData;
  prevHeroLink: string;
  nextHeroLink: string;
}

const HeroPage: React.FC<Props> = ({
  selectedHero,
  prevHeroLink,
  nextHeroLink,
}) => {
  return (
    <>
      <HeroContainer
          // @ts-ignore
        group={selectedHero.group}
        groupTextBg={selectedHero.groupTextBg}
        heroColor={selectedHero.heroColor}
        heroImg={selectedHero.img}
        heroName={selectedHero.title}
        heroDescription={selectedHero.description}
        leftArrowLink={prevHeroLink}
        rightArrowLink={nextHeroLink}
        heroGif={selectedHero.imgGif}
        xLink={RoutePaths.HEROES}
      />
      <HorizontalLines />
    </>
  );
};

export default withBackgroundImage<Props>({
  alt: "Hero underground style background",
  imagePath: bgPicture as unknown as string,
  className: cls.wholePageBG
})(HeroPage);
