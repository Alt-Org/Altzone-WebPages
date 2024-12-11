'use client';
import { useInView } from 'react-intersection-observer';
import { EmbedSocialMediaPosts } from '@/shared/ui/SocialMediaEmbed';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SectionGallery.module.scss';
import { AppLink } from '@/shared/ui/AppLink/AppLink';

export type SectionGalleryProps = {
    socialMediaLinks: string[];
    videoLink: string;
    seeMoreLink?: {
        text: string;
        href: string;
    };
};

export const SectionGallery = (props: SectionGalleryProps) => {
    const { socialMediaLinks, videoLink, seeMoreLink } = props;

    const { ref, inView } = useInView({
        rootMargin: '-150px 0px',
        triggerOnce: true,
    });

    const mods = {
        [cls.inView]: inView,
    };

    return (
        <div>
            <EmbedSocialMediaPosts posts={socialMediaLinks} />

            <div className={cls.Row}>
                {/*<div className={cls.videoWrapper}>*/}
                {/*    <VideoContentYoutube*/}
                {/*        params={{*/}
                {/*            className: cls.VideoContentYoutube*/}
                {/*        }}*/}
                {/*        src={videoLink}*/}
                {/*    />*/}
                {/*</div>*/}

                {/*<SectionGallerias parentDirectory={SectionGalleriasPaths.comics} />*/}
            </div>

            {seeMoreLink && (
                <div
                    ref={ref}
                    className={cls.buttonContainer}
                >
                    <Button
                        withScalableLink={true}
                        theme={ButtonTheme.Graffiti}
                        className={classNames(cls.SeeMore, mods)}
                        size={ButtonSize.XL}
                        ref={ref}
                    >
                        <AppLink to={seeMoreLink.href}>{seeMoreLink.text}</AppLink>
                    </Button>
                </div>
            )}
        </div>
    );
};
