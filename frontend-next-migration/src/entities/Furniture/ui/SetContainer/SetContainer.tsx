'use client';
import Image from 'next/image';
import { getRouteOneFurnitureSetPage } from '@/shared/appLinks/RoutePaths';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SetContainer.module.scss';
import { SetInfo } from '../../types/furniture';

type Props = {
    set: SetInfo;
};

export const SetCard = (props: Props) => {
    const { id, disabled, cover } = props.set;

    if (disabled) {
        return;
    }
    if (!cover) {
        return;
    }

    return (
        <div className={cls.Card}>
            <AppLink to={getRouteOneFurnitureSetPage(id)}>
                <Image
                    src={cover}
                    alt={'cover'}
                    className={cls.Cover}
                />
            </AppLink>
        </div>
    );
};
