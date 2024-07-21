import React from 'react';
import { HeroContainer } from '@/entities/Hero';
import { RoutePaths } from '@/shared/appLinks/RoutePaths';
import { HorizontalLines } from '@/shared/ui/HorizontalLines';

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

export default HeroPage;
