'use client';
import cls from './SearchWidgets.module.scss';
import { useClientTranslation } from '@/shared/i18n';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import {
    getRouteFurnitureCategoryPage,
    getRouteFurnitureSearchPage,
} from '@/shared/appLinks/RoutePaths';
import { Button, ButtonTheme } from '@/shared/ui/Button';

type Props = {};

export const FurnitureFilters = (props: Props) => {
    const { t } = useClientTranslation('widgets');

    return (
        <div className={cls.Container}>
            <Button
                className={cls.Button}
                theme={ButtonTheme.Graffiti}
            >
                <AppLink to={getRouteFurnitureSearchPage()}>{t('search')}</AppLink>
            </Button>
            <Button
                className={cls.Button}
                theme={ButtonTheme.Graffiti}
            >
                <AppLink to={getRouteFurnitureCategoryPage()}>{t('categories')}</AppLink>
            </Button>
        </div>
    );
};
