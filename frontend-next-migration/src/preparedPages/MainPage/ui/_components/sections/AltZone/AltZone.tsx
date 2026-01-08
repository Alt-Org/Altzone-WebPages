'use client';
import { useInView } from 'react-intersection-observer';
import { Container } from '@/shared/ui/Container';
import { classNames } from '@/shared/lib/classNames/classNames';
import Image, { StaticImageData } from 'next/image';
import cls from './AltZone.module.scss';
import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';
import instaIcon from '@/shared/assets/images/Insta2.svg';
import discordIcon from '@/shared/assets/images/Discord2.svg';
import facebookIcon from '@/shared/assets/images/Facebook2.svg';
import youtubeIcon from '@/shared/assets/images/Youtube2.svg';
import useSizes from '@/shared/lib/hooks/useSizes';

export type Props = {
    title: string;
    infoText: string;
    socialsText: string;
    followUsText: string;
    seeMoreLink: {
        text: string;
        href: string;
    };
    socialMediaLinks: string[];
    videoLink: string;
    gameImg?: StaticImageData;
};

const AltZone = (props: Props) => {
    const { title, infoText, seeMoreLink, gameImg, followUsText } = props;
    const { isMobileSize } = useSizes();

    const { ref, inView } = useInView({
        rootMargin: '-150px 0px',
        triggerOnce: true,
    });

    const mods = {
        [cls.inView]: inView,
    };

    return (
        <section
            ref={ref}
            className={classNames(cls.SectionAltZone, mods)}
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
                    <p className={cls.socialMediaLinks}>{followUsText}</p>
                    <div className={cls.socialMediaHolder}>
                        <a
                            href={AppExternalLinks.discord}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Image
                                src={discordIcon.src}
                                alt="Discord"
                                className={cls.socialMediaIcon}
                                width={32}
                                height={32}
                            />
                        </a>
                        <a
                            href={AppExternalLinks.instagram}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Image
                                src={instaIcon.src}
                                alt="Instagram"
                                className={cls.socialMediaIcon}
                                width={32}
                                height={32}
                            />
                        </a>
                        <a
                            href={AppExternalLinks.facebook}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Image
                                src={facebookIcon.src}
                                alt="Facebook"
                                className={cls.socialMediaIcon}
                                width={32}
                                height={32}
                            />
                        </a>
                        <a
                            href={AppExternalLinks.youtube}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Image
                                src={youtubeIcon.src}
                                alt="YouTube"
                                className={cls.socialMediaIcon}
                                width={32}
                                height={32}
                            />
                        </a>
                    </div>
                </div>

                <div className={cls.imgWrapper}>
                    {gameImg ? (
                        isMobileSize ? (
                            <Image
                                src={gameImg}
                                alt=""
                                width={328}
                                height={477}
                            />
                        ) : (
                            <Image
                                src={gameImg}
                                alt=""
                                className={cls.MinSizes}
                                width={677}
                                height={978}
                            />
                        )
                    ) : null}
                </div>
            </Container>
        </section>
    );
};

export default AltZone;
