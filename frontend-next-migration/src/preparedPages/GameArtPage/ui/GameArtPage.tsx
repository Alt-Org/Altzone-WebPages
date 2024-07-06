'use client';
import { Navbar } from '@/widgets/Navbar';
import { Footer } from '@/widgets/Footer';
import { HorizontalLines } from '@/shared/ui/HorizontalLines';
import { FeedbackSideButton } from '@/features/FeedbackByExternalSource';
import cls from './GameArtPage.module.scss';
import bgPicture from '@/shared/assets/images/backgrounds/background.webp';
import Image from 'next/image';
import { withBackgroundImage } from '@/shared/lib/hocs/withBackgroundImage';
import NavbarSide from '@/widgets/NavbarSide/ui/NavbarSide';
import pageLogo from '@/shared/assets/images/teachingPackage/pageLogo.png';
import useSizes from '@/shared/lib/hooks/useSizes';
import { Mods } from '@/shared/lib/classNames/classNames';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ScrollTop } from '@/features/ScrollTop';

interface Section {
  id: string;
  label: string;
  description: string;
  image: string;
  imageAlt: string;
}

export type Props = {
  sections: Section[];
};

const GameArtPackagePage = (props: Props) => {
  const { sections = [] } = props;
  const { isMobileSize, isTabletSize, isDesktopSize, isWidescreenSize } =
    useSizes();
  console.log(sections);

  const combinedModCss: Mods = {
    [cls.isMobile]: isMobileSize,
    [cls.isTablet]: isTabletSize,
    [cls.isDesktop]: isDesktopSize,
    [cls.isWidescreen]: isWidescreenSize,
  };

  return (
    <div className={classNames(cls.pageContainer, combinedModCss)}>
      <Navbar overlaid={true} navBarType={'GameArt'} />
      <div className={classNames(cls.mainContent, combinedModCss)}>
        {!isMobileSize && (
          <div className={classNames(cls.navbarSide, combinedModCss)}>
            <div className={cls.pageLogo}>
              <Image
                src={pageLogo}
                className={cls.backgroundImage}
                alt='pageLogo'
                height={600}
                width={600}
              />
            </div>
            <NavbarSide sections={sections} />
          </div>
        )}
        <div className={classNames(cls.content, combinedModCss)} id='content'>
          {sections.length > 0 ? (
            sections.map((section) => (
              <div id={section.id} key={section.id} className={cls.section}>
                <h2>{section.label}</h2>
                <p
                  dangerouslySetInnerHTML={{ __html: section.description }}></p>
                <div className={classNames(cls.contentImage, combinedModCss)}>
                  <Image
                    src={section.image}
                    className={cls.sectionImage}
                    alt={section.imageAlt}
                    height={300}
                    width={600}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No sections available.</p>
          )}
        </div>
      </div>
      <div>
        <FeedbackSideButton />
        <HorizontalLines />
        {isMobileSize && <ScrollTop />} <Footer />
      </div>
    </div>
  );
};

export default withBackgroundImage({
  alt: 'Teaching Package bg image',
  imagePath: bgPicture as unknown as string,

  // @ts-ignore
})(GameArtPackagePage);
