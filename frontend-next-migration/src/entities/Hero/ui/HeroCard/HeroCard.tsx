'use client';
import Image from 'next/image';
import { useCallback, useRef } from 'react';
import { getHeroPageRoute } from '@/shared/appLinks/RoutePaths';
import { ClickableBorder } from '@/shared/ui/ClickableBorder';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { classNames } from '@/shared/lib/classNames/classNames';
import useResizeObserver, { ResizeCallback } from '@/shared/lib/hooks/useResizeObserver';
import cls from './HeroCard.module.scss';

type Props = {
    id: string;
    imageSrc: any;
    imageAlt: string;
    title: string;
    slug: string;
    className?: string;
    backgroundColor?: string;
};

export const HeroCard = (props: Props) => {
    const { id, title, imageSrc, imageAlt, className = '', backgroundColor, slug } = props;

    const elementRef = useRef(null);

    const handleCardSizeUpdate: ResizeCallback<HTMLDivElement> = useCallback((refCurrent) => {
        const width = refCurrent.clientWidth;
        refCurrent.style.setProperty('--cardWidthLocal', `${width}px`);
    }, []);

    useResizeObserver({ elementRef, callback: handleCardSizeUpdate });

    return (
        <div className={classNames(cls.Wrapper, {}, [className])}>
            <ClickableBorder
                ref={elementRef}
                borderImageSource={'/images/hero-border3.png'}
                className={classNames(cls.ClickableBorder, {}, [])}
            >
                <div
                    className={cls.HeroDiv}
                    style={{ backgroundColor }}
                >
                    <AppLink to={getHeroPageRoute(slug)}>
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            className={cls.HeroImg}
                            priority={true}
                        />
                    </AppLink>
                </div>
            </ClickableBorder>

            <h3 className={cls.heroName}>{title}</h3>
        </div>
    );
};

HeroCard.displayName = 'HeroCard';
