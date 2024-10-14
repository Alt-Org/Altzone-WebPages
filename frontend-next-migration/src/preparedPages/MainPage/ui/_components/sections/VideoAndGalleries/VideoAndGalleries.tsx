'use client';
import VideoContentYoutube from '@/shared/ui/VideoContent/ui/VideoContentYoutube';
import cls from './VideoAndGalleries.module.scss';
import Image from 'next/image';
import bgPicture from '@/shared/assets/images/backgrounds/background.webp';
import {
  GalleryCategoriesWithModalSlider,
  useGalleryCategories,
} from '@/entities/Gallery';
import { Container } from '@/shared/ui/Container';
import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';
import useSizes from '@/shared/lib/hooks/useSizes';
import { useInView } from 'react-intersection-observer';
import { classNames } from '@/shared/lib/classNames/classNames';

export type Props = {
  backgroundImageSrc?: string;
  title: string;
  videoLink?: string;
};

//todo handle IsError , isLoading cases
const VideoAndGalleries = (props: Props) => {
  const {
    backgroundImageSrc,
    /*title,*/
    videoLink = AppExternalLinks.previewVideoYoutube,
  } = props;

  const { transformedGalleryCategories, isError, isLoading } =
    useGalleryCategories('artGalleries');

  const { ref, inView } = useInView({
    rootMargin: '-150px 0px',
    triggerOnce: true,
  });

  const mods = {
    [cls.inView]: inView,
  };

  const { isMobileSize, isTabletSize } = useSizes();

  return (
    <section
      ref={ref}
      className={classNames(cls.SectionVideoAndGalleries, mods)}
      style={{
        backgroundImage: backgroundImageSrc
          ? `url(${backgroundImageSrc})`
          : 'none',
      }}>
      <h3 className={cls.title}>{/* {title} */}</h3>

      <Container className={cls.container} fluid={isMobileSize || isTabletSize}>
        <div className={cls.videoWrapper}>
          <VideoContentYoutube
            params={{
              className: cls.VideoContentYoutube,
            }}
            src={videoLink}
          />
        </div>

        {/*//todo Joni add here the desired instas ?*/}

        {/*//todo  may we should have now 2 dif components: with and without galleries*/}
        {/*<div className={cls.galleries}>*/}
        {/*    {*/}
        {/*        transformedGalleryCategories.map((gallery: any) => (*/}
        {/*            <GalleryCategoriesWithModalSlider*/}
        {/*                cover={gallery.cover}*/}
        {/*                followLastImage={gallery.followLastImage}*/}
        {/*                key={gallery.title}*/}
        {/*                sources={gallery.sources}*/}
        {/*                title={gallery.title}*/}
        {/*            />*/}
        {/*        ))*/}
        {/*    }*/}
        {/*</div>*/}
      </Container>
    </section>
  );
};

export default VideoAndGalleries;
