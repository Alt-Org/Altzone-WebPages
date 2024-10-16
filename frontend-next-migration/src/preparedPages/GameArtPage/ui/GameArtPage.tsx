'use client'
import { Footer } from "@/widgets/Footer";
import { FeedbackSideButton } from "@/features/FeedbackByExternalSource";
import { ScrollTop } from "@/features/ScrollTop";
import { HorizontalLines } from "@/shared/ui/HorizontalLines";
import bgPicture from "@/shared/assets/images/backgrounds/background.webp";
import { withBackgroundImage } from "@/shared/lib/hocs/withBackgroundImage";
import useSizes from "@/shared/lib/hooks/useSizes";
import { Mods, classNames } from "@/shared/lib/classNames/classNames";
import { WikiContentWithSidebar } from "@/shared/ui/WikiContentWithSidebar";
import cls from "./GameArtPage.module.scss";

interface Section {
  id: string;
  label: string;
  description: string;
  image: string;
  imageAlt: string;
  sidebarLogo: string;
  sidebarLogoAlt: string;
}

export type Props = {
  sections: Section[];
};

const GameArtPackagePage = (props: Props) => {
  const { sections = [] } = props;
  const { isMobileSize, isTabletSize, isDesktopSize, isWidescreenSize } =
    useSizes();

  const combinedModCss: Mods = {
    [cls.isMobile]: isMobileSize,
    [cls.isTablet]: isTabletSize,
    [cls.isDesktop]: isDesktopSize,
    [cls.isWidescreen]: isWidescreenSize,
  };

  return (
    <div className={classNames(cls.pageContainer, combinedModCss)}>
      {/*//todo mow to layout*/}
      <WikiContentWithSidebar sections={sections} />
      <div>
        <FeedbackSideButton />
        <HorizontalLines />
        {isMobileSize && <ScrollTop />}
        <Footer />
      </div>
    </div>
  );
};

export default withBackgroundImage<Props>({
  alt: 'Tile bg image',
  imagePath: bgPicture as unknown as string,
})(GameArtPackagePage);
