'use client';
import { FurnitureManager, SetCard } from '@/entities/Furniture';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Container } from '@/shared/ui/Container';
import { useClientTranslation } from '@/shared/i18n';
import { FurnitureFilters } from './_components/FurnitureFilters/FurnitureFilters';
import cls from './FurnitureSetsPage.module.scss';

const FurnitureSetsPage = () => {
    const { t } = useClientTranslation('furniture');
    const manager = new FurnitureManager();
    return (
        <>
            <FurnitureFilters
                searchText={t('search')}
                categoriesText={t('categories')}
            />
            <h1>{t('furnituresets-title')}</h1>
            <div className={cls.CardsContainer}>
                {manager.getAllFurnitureSets().map((set) => {
                    return (
                        <SetCard
                            set={set}
                            key={set.id}
                        />
                    );
                })}
            </div>
            <h3>{t('furnituresets-morecomingsoon')}</h3>
        </>
    );
};

export default FurnitureSetsPage;
