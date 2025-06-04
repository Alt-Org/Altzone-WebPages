import Image from 'next/image';
import { memo, useCallback } from 'react';
import Fancybox from '@/shared/ui/Fancybox/Fancybox';
import { useClientTranslation } from '@/shared/i18n';
import cls from './styles.module.scss';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Button, ButtonTheme } from '@/shared/ui/Button';

export type GalleryCategoriesWithModalSliderProps = {
    title?: string;
    followLastImage?: boolean;
    sources: string[];
    cover: { name: string; url: string };
};

export const GalleryCategoriesWithModalSlider = memo(
    ({
        title,
        sources,
        // followLastImage = false,
        cover,
    }: GalleryCategoriesWithModalSliderProps) => {
        const getSortedSources = useCallback((sources: string[]) => {
            const result = [...sources].sort((a, b) => {
                const numberA = parseInt(a.match(/\d+/)?.[0] || '', 10);
                const numberB = parseInt(b.match(/\d+/)?.[0] || '', 10);
                return numberA - numberB;
            });
            return result;
        }, []);

        const { t } = useClientTranslation('picture-galleries');

        return (
            <div style={{ cursor: 'pointer' }}>
                <Fancybox>
                    <div className={cls.cover}>
                        <AppLink
                            data-fancybox={cover.name}
                            to={cover.url}
                            className={cls.link}
                        >
                            <Image
                                loading={'eager'}
                                src={cover.url}
                                width="250"
                                height="292"
                                className={cls.coverImage}
                                alt={cover.name}
                            />
                            {title && <h3 className={cls.title}>{t(`${title}`)}</h3>}

                            {/* <Button theme={ButtonTheme.OUTLINE}>{t('explore')}</Button> */}
                        </AppLink>

                        {sources.length > 1 && (
                            <AppLink
                                data-fancybox={cover.name}
                                to={sources[1]}
                                className={cls.link}
                            >
                                <div className={cls.cover}>
                                    <Image
                                        loading="lazy"
                                        src={sources[1]}
                                        width="250"
                                        height="292"
                                        className={cls.coverImage}
                                        alt={`${cover.name} - Page 1`}
                                    />
                                </div>
                            </AppLink>
                        )}
                    </div>

                    <div style={{ display: 'none' }}>
                        {getSortedSources(sources).map((source, index) =>
                            index !== 0 ? (
                                <AppLink
                                    key={index}
                                    data-fancybox={cover.name}
                                    to={source}
                                >
                                    ''
                                </AppLink>
                            ) : null,
                        )}
                    </div>
                </Fancybox>
            </div>
        );
    },
);

GalleryCategoriesWithModalSlider.displayName = 'GalleryCategoriesWithModalSlider';
