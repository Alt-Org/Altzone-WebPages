'use client';
import { HeroContainer } from '@/entities/Hero';
import { heroes } from '@/entities/Hero';
import { useParams } from 'next/navigation';
import { useClientTranslation } from '@/shared/i18n';
import { RoutePaths } from '@/shared/appLinks/RoutePaths';
import { Navbar } from '@/widgets/Navbar';
import { Footer } from '@/widgets/Footer';

type Props = {
  selectedHero: string | number;
};

export default function HeroPage(props: Props) {
  const { selectedHero } = props;

  const { lng } = useParams();
  const { t } = useClientTranslation(lng as string, 'heroes');

  function findSelectedHero() {
    const selectedHeroData = heroes.find((hero) => hero.title === selectedHero);
    return selectedHeroData
      ? {
          id: selectedHeroData.id,
          img: selectedHeroData.srcImg,
          title: t(`${selectedHeroData.title}`),
          alt: t(`${selectedHeroData.alt}`),
          heroColor: selectedHeroData.color,
          // alt: selectedHeroData.alt,
          description: t(`${selectedHeroData.description}`),
          // description: selectedHeroData.description,
          borderColor: selectedHeroData.borderColor,
          imgGif: selectedHeroData?.srcGif || undefined,
          group: selectedHeroData?.group || undefined,
        }
      : null;
  }

  function calculateNextIndex(currentIndex: number): string {
    const nextIndex = currentIndex === heroes.length - 1 ? 0 : currentIndex + 1;
    return heroes[nextIndex].title;
  }

  function calculatePreviousIndex(currentIndex: number): string {
    const previousIndex =
      currentIndex === 0 ? heroes.length - 1 : currentIndex - 1;
    return heroes[previousIndex].title;
  }

  const selectedHeroInfo = findSelectedHero();
  const previousIndex = calculatePreviousIndex(selectedHeroInfo?.id || 0);
  const nextIndex = calculateNextIndex(selectedHeroInfo?.id || 0);

  const leftArrowLink = `/${lng}/${RoutePaths.HEROES_ONE.replace(
    ':id',
    previousIndex.toString(),
  )}`;
  const rightArrowLink = `/${lng}/${RoutePaths.HEROES_ONE.replace(
    ':id',
    nextIndex.toString(),
  )}`;

  return (
    <>
      <Navbar />
      {selectedHeroInfo && (
        <HeroContainer
          heroColor={selectedHeroInfo.heroColor}
          // id={selectedHeroInfo.id}
          // group={selectedHeroInfo.group}
          heroImg={selectedHeroInfo.img as unknown as string}
          // heroImgAlt={selectedHeroInfo.alt}

          heroName={selectedHeroInfo.title}
          heroDescription={selectedHeroInfo.description}
          leftArrowLink={leftArrowLink}
          rightArrowLink={rightArrowLink}
          // borderColor={selectedHeroInfo.borderColor}
          heroGif={selectedHeroInfo.imgGif as unknown as string}
          xLink={RoutePaths.HEROES}
        />
      )}
      <Footer />
    </>
  );
}
