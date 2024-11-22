'use client';
import cls from './SearchWidgets.module.scss';
import { useClientTranslation } from '@/shared/i18n';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import {
    getRouteFurnitureCategoryPage,
    getRouteFurnitureSearchPage,
} from '@/shared/appLinks/RoutePaths';

type Props = {};

// TODO: Add search widgets

export const FurnitureFilters = (props: Props) => {
    const { t } = useClientTranslation('widgets');

    return (
        <div className={cls.Container}>
            <AppLink
                to={getRouteFurnitureSearchPage()}
                className={cls.Button}
            >
                {t('search')}
            </AppLink>
            <AppLink
                to={getRouteFurnitureCategoryPage()}
                className={cls.Button}
            >
                {t('categories')}
            </AppLink>
        </div>
    );
};
