'use client';
import { FurnitureManager, SetCard } from '@/entities/Furniture';
import { FurnitureFilters } from './_components/FurnitureFilters/FurnitureFilters';
import cls from './FurnitureSetsPage.module.scss';

export interface FurniturePageProps {
    buttonSearchLabel: string;
    buttonCategoriesLabel: string;
    header: string;
    comingSoon: string;
}

const FurnitureSetsPage = (props: FurniturePageProps) => {
    const manager = new FurnitureManager();

    const { buttonCategoriesLabel, buttonSearchLabel, header, comingSoon } = props;

    return (
        <>
            <FurnitureFilters
                searchText={buttonSearchLabel}
                categoriesText={buttonCategoriesLabel}
            />
            <h1 className={cls.title}>{header}</h1>
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
            <h3>{comingSoon}</h3>
        </>
    );
};

export default FurnitureSetsPage;
