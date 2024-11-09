'use client';
import { useInView } from 'react-intersection-observer';
import { SectionGalleryV2, SectionGalleryV1 } from '@/widgets/SectionGallery';
import { Container } from '@/shared/ui/Container';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Gallery.module.scss';

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
};

const Gallery = (props: Props) => {
    const { title, infoText, socialsText, seeMoreLink, socialMediaLinks, videoLink } = props;

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
            className={classNames(cls.SectionGallery, mods)}
        >
            <h2 className={classNames(cls.title, mods)}>{title}</h2>

            <p className={cls.InfoText}>{infoText}</p>
            <p className={cls.SocialsText}>{socialsText}</p>

            <Container className={cls.Container}>
                <SectionGalleryV1
                    socialMediaLinks={socialMediaLinks}
                    videoLink={videoLink}
                />

                <SectionGalleryV2
                    version={'preview'}
                    socialMediaLinks={socialMediaLinks}
                    seeMoreLink={seeMoreLink}
                />
            </Container>
        </section>
    );
};

export default Gallery;
