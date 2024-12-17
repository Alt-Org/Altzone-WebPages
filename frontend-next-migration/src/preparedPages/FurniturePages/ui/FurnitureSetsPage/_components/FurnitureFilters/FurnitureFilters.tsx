'use client';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import {
    getRouteFurnitureCategoryPage,
    getRouteFurnitureSearchPage,
} from '@/shared/appLinks/RoutePaths';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import cls from './FurnitureFilters.module.scss';

interface Props {
    searchText: string;
    categoriesText?: string;
}

export const FurnitureFilters = (props: Props) => {
    const { searchText, categoriesText } = props;
    return (
        <div className={cls.Container}>
            <Button
                className={cls.Button}
                theme={ButtonTheme.Graffiti}
            >
                <AppLink to={getRouteFurnitureSearchPage()}>{searchText}</AppLink>
            </Button>
            <Button
                className={cls.Button}
                theme={ButtonTheme.Graffiti}
            >
                <AppLink to={getRouteFurnitureCategoryPage()}>{categoriesText}</AppLink>
            </Button>
        </div>
    );
};
