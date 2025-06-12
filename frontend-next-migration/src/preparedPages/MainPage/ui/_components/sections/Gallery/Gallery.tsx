'use client';
import { useInView } from 'react-intersection-observer';
import { Container } from '@/shared/ui/Container';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Gallery.module.scss';
import { useParams } from 'next/navigation';
import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';
import { getLanguageCode, useGetDirectusGalleryImages } from '@/entities/Gallery';
import instaIcon from '@/shared/assets/images/Insta2.svg';
import discordIcon from '@/shared/assets/images/Discord2.svg';
import facebookIcon from '@/shared/assets/images/Facebook2.svg';
import youtubeIcon from '@/shared/assets/images/Youtube2.svg';

export type Props = {
    title: string;
    infoText: string;
    socialsText: string;
    seeMoreLink: {
        text: string;
        href: string;
    };
    socialMediaLinks: string[];
    videoLink: string;
    gameImg?: string;
};

const Gallery = (props: Props) => {
    const { title, infoText, seeMoreLink, gameImg } = props;
    const params = useParams();
    const lng = params.lng as string;
    const language = getLanguageCode(lng);
    const { photoObjects, isLoading } = useGetDirectusGalleryImages(language);

    const { ref, inView } = useInView({
        rootMargin: '-150px 0px',
        triggerOnce: true,
    });

    const mods = {
        [cls.inView]: inView,
    };

    if (isLoading) <p>Loading...</p>;

    return (
        <section
            ref={ref}
            className={classNames(cls.SectionGallery, mods)}
        >
            <Container className={cls.Container}>
                <div className={cls.titleWrapper}>
                    <h2 className={classNames(cls.title, mods)}>{title}</h2>
                    <p className={cls.InfoText}>{infoText}</p>
                    <a
                        className={cls.aboutLink}
                        href={seeMoreLink.href}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {seeMoreLink.text}
                    </a>
                    <p className={cls.socialMediaLinks}>Seuraa Alt Zonea somessa</p>
                    <div className={cls.socialMediaHolder}>
                        <a
                            href={AppExternalLinks.discord}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                src={discordIcon.src}
                                alt="Discord"
                                className={cls.socialMediaIcon}
                            />
                        </a>
                        <a
                            href={AppExternalLinks.instagram}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                src={instaIcon.src}
                                alt="Instagram"
                                className={cls.socialMediaIcon}
                            />
                        </a>
                        <a
                            href={AppExternalLinks.facebook}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                src={facebookIcon.src}
                                alt="Facebook"
                                className={cls.socialMediaIcon}
                            />
                        </a>
                        <a
                            href={AppExternalLinks.youtube}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                src={youtubeIcon.src}
                                alt="YouTube"
                                className={cls.socialMediaIcon}
                            />
                        </a>
                    </div>
                </div>

                <div className={cls.imgWrapper}>
                    <img
                        src={gameImg}
                        alt=""
                    />
                </div>
            </Container>
        </section>
    );
};

export default Gallery;
