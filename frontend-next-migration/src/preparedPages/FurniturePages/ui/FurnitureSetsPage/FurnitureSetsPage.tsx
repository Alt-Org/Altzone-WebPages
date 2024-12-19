'use client';
import { FurnitureManager, SetCard } from '@/entities/Furniture';
import { FurnitureFilters } from './_components/FurnitureFilters/FurnitureFilters';
import cls from './FurnitureSetsPage.module.scss';

export interface FurniturePageProps {
    buttonsearchlabel: string;
    buttoncategorieslabel: string;
    header: string;
    comingsoon: string;
}

const FurnitureSetsPage = (props: FurniturePageProps) => {
    const manager = new FurnitureManager();

    const { buttoncategorieslabel, buttonsearchlabel, header, comingsoon } = props;

    return (
        <>
            <FurnitureFilters
                searchText={buttonsearchlabel}
                categoriesText={buttoncategorieslabel}
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
            <h3>{comingsoon}</h3>
        </>
    );
};

export default FurnitureSetsPage;
