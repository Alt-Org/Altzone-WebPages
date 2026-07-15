'use client';
import cls from './SectionGallery2.module.scss';
import Image from 'next/image';
import { SocialMediaIcons } from '@/shared/ui/SocialMediaIcons';
import { PhotoObject } from '@/entities/Gallery';
import miellyttaja from '@/shared/assets/images/heros/people-pleaser/miellyttaja.png';
import { useClientTranslation } from '@/shared/i18n';

interface AnimationGalleryProps {
    animations: PhotoObject[];
    backgroundColor?: string;
}

export const AnimationGallerySection = ({ animations, backgroundColor }: AnimationGalleryProps) => {
    const { t } = useClientTranslation('picture-galleries');
    if (!animations || animations.length === 0) {
        return (
            <section
                className={cls.AnimationGallerySection}
                style={{ backgroundColor }}
            >
                <div className={cls.noAnimationsFoundContainer}>
                    <div className={cls.noAnimationImageContainer}>
                        <Image
                            src={miellyttaja}
                            alt={t('no-animations-title')}
                            fill
                            className={cls.noAnimationsImage}
                        />
                    </div>
                    <h2 className={cls.noAnimationsTitle}>{t('no-animations-title')}</h2>
                    <p className={cls.noAnimationsText}>{t('no-animations-text')}</p>
                </div>
            </section>
        );
    }
    return (
        <section
            className={cls.AnimationGallerySection}
            style={{ backgroundColor }}
        >
            {animations.map((set, index) => (
                <div
                    key={index}
                    className={cls.block}
                    id={set.anchorId}
                >
                    <div className={cls.textBlock}>
                        <h1 className={cls.title}>{set.title}</h1>
                        <p className={cls.author}>{set.author}</p>
                    </div>
                    {set.links && (
                        <div className={cls.socialsContainer}>
                            <SocialMediaIcons links={set.links} />
                        </div>
                    )}
                    <div className={cls.descriptionContainer}>
                        <p className={cls.description}>{set.description}</p>
                    </div>
                    <div className={cls.framesContainer}>
                        <div className={cls.frameRow}>
                            {set.frames?.map((row, rowIndex) => (
                                <div
                                    key={rowIndex}
                                    className={cls.imageWrapper}
                                >
                                    <Image
                                        src={row[0]}
                                        alt={`Frame ${rowIndex}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className={cls.frameImage}
                                    />
                                </div>
                            ))}
                        </div>
                        {set.animation && (
                            <div className={cls.animationContainer}>
                                <Image
                                    src={set.animation ? set.animation[0] : ''}
                                    alt="Animation"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className={cls.animationImage}
                                />
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </section>
    );
};
