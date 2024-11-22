'use client';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Container } from '@/shared/ui/Container';
import cls from './FurnitureSearchPage.module.scss';
import { FurnitureManager, SetCard, FurnitureFilters } from '@/entities/Furniture';
import { useClientTranslation } from '@/shared/i18n';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { getRouteAllFurnitureSetsPage } from '@/shared/appLinks/RoutePaths';

const FurnitureSearchPage = () => {
    const { t } = useClientTranslation('furniture');

    const manager = new FurnitureManager();

    return (
        <div className={classNames(cls.Page)}>
            <Container className={cls.Container}>
                <div className={cls.Back}>
                    <AppLink to={getRouteAllFurnitureSetsPage()}>&lt;- {t('text-back')}</AppLink>
                </div>
            </Container>
        </div>
    );
};

export default FurnitureSearchPage;
