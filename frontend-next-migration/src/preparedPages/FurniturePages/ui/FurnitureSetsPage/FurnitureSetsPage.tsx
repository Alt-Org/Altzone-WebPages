'use client';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Container } from '@/shared/ui/Container';
import cls from './FurnitureSetsPage.module.scss';
import { FurnitureManager, SetCard, FurnitureFilters } from '@/entities/Furniture';
import { useClientTranslation } from '@/shared/i18n';
import { SetInfo } from '@/entities/Furniture/types/set';

const FurnitureSetsPage = () => {
    const { t } = useClientTranslation('furniture');

    const manager = new FurnitureManager();

    return (
        <div className={classNames(cls.SetsPage)}>
            <Container className={cls.Container}>
                <FurnitureFilters />
                <h1>{t('furnituresets-title')}</h1>
                <div className={cls.CardsContainer}>
                    {manager.getAllFurnitureSets().map((set: SetInfo) => {
                        return (
                            <SetCard
                                set={set}
                                key={set.id}
                            />
                        );
                    })}
                </div>
                <h3>{t('furnituresets-morecomingsoon')}</h3>
            </Container>
        </div>
    );
};

export default FurnitureSetsPage;
