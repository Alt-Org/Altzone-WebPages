'use client';
import Image from 'next/image';
import { getRouteOneFurnitureSetPage } from '@/shared/appLinks/RoutePaths';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import cls from './SetContainer.module.scss';
import type { SetInfo } from '../../types/furniture';

type Props = {
    set: SetInfo;
};

export const SetCard = ({ set }: Props) => {
    const { id, disabled, cover } = set;

    if (disabled || !cover) return null;

    return (
        <div className={cls.Card}>
            <AppLink to={getRouteOneFurnitureSetPage(id)}>
                <Image
                    src={cover}
                    alt="cover"
                    className={cls.Cover}
                />
            </AppLink>
        </div>
    );
};
