'use client';
import { Button, ButtonTheme } from '@/shared/ui/v2/Button';
import sideImg from '@/shared/assets/images/mainpage/HandGraphic.png';
import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';
import Image from 'next/image';
import googlePlayIcon from '@/shared/assets/images/google-play-badge.png';
import cls from './PlayWithUs.module.scss';

export type Props = {
    title: string;
    webGl: {
        title: string;
        link: string;
    };
    googlePLayLink?: string;
    projectDescriptionText?: string;
    projectSubDescriptionText?: string;
};

const PlayWithUs = (props: Props) => {
    const {
        title,
        webGl,
        googlePLayLink = AppExternalLinks.downloadAndroid,
        projectDescriptionText,
        projectSubDescriptionText,
    } = props;

    return (
        <section className={cls.playWithUs}>
            <div className={cls.content}>
                <div className={cls.textBlock}>
                    <h2 className={cls.title}>{title}</h2>
                    {projectDescriptionText && (
                        <p className={cls.description}>{projectDescriptionText}</p>
                    )}
                    {projectSubDescriptionText && (
                        <p className={cls.extraText}>{projectSubDescriptionText}</p>
                    )}
                    <div className={cls.actions}>
                        <a
                            href={googlePLayLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image
                                src={googlePlayIcon}
                                alt="Get it on Google Play"
                                className={cls.googlePlayImage}
                            />
                        </a>
                        <Button
                            path={webGl.link}
                            isExternal
                            theme={ButtonTheme.PRIMARY}
                        >
                            {webGl.title}
                        </Button>
                    </div>
                </div>
                <div className={cls.imageBlock}>
                    <Image
                        src={sideImg}
                        alt="Hand graphic"
                        className={cls.image}
                    />
                </div>
            </div>
        </section>
    );
};

export default PlayWithUs;
