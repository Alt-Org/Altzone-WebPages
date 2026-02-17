'use client';
import { CTASection } from '@/shared/ui/CtaSection';
import { Button, ButtonTheme } from '@/shared/ui/v2/Button';
import sideImg from '@/shared/assets/images/mainpage/HandGraphicWithBattle.png';
import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';
import Image from 'next/image';
import googlePlayIcon from '@/shared/assets/icons/google-play-badge.png';
import cls from './PlayWithUs.module.scss';

type WebGl = {
    title: string;
    link: string;
    titleDownload?: string;
    text?: string;
    downloadText?: string;
};

export type NavItem = {
    title?: string;
    body?: string;
    link: string;
    isExternal?: boolean;
};

export type Props = {
    title: string;
    webGl: WebGl;
    googlePLayLink: string;
    belowNavs: NavItem[];
    webGlNotice: string;
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

    const actions = (
        <>
            <a
                href={googlePLayLink}
                target="_blank"
                rel="noopener noreferrer"
                className={cls.GooglePlayButton}
            >
                <Image
                    src={googlePlayIcon}
                    alt="Get it on Google Play"
                    className={cls.GooglePlayImage}
                />
            </a>
            <Button
                path={webGl.link}
                isExternal={true}
                theme={ButtonTheme.PRIMARY}
            >
                {webGl.title}
            </Button>
        </>
    );

    return (
        <CTASection
            className={cls.SectionPlayWithUs}
            title={title}
            description={projectDescriptionText}
            extraText={projectSubDescriptionText}
            imageSrc={sideImg}
            actions={actions}
            mobileButtonLayout="row"
        />
    );
};

export default PlayWithUs;
