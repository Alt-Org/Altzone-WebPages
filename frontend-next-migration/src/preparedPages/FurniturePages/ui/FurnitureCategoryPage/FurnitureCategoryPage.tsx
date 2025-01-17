'use client';
import { useState, useMemo, useCallback } from 'react';
import { FurnitureManager, categories, FurnitureCardsContainer } from '@/entities/Furniture';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { getRouteAllFurnitureSetsPage } from '@/shared/appLinks/RoutePaths';
import cls from './FurnitureCategoryPage.module.scss';

export interface FurnitureCategoryPageProps {
    translations: Record<string, string>;
    textBack: string;
    textResults: string;
    textNoResults: string;
}

const FurnitureCategoryPage = (props: FurnitureCategoryPageProps) => {
    const manager = useMemo(() => new FurnitureManager(), []);

    const { translations, textBack, textResults, textNoResults } = props;

    const [category, setCategory] = useState(categories.CHAIRS);
    const list = useMemo(() => manager.getPiecesByCategory(category), [manager, category]);
    const cats = useMemo(() => Object.entries(categories), []);
    const renderCategoryButtons = useCallback(
        () =>
            cats.map(([cat, value]) => (
                <Button
                    key={cat}
                    className={classNames(cls.categoryButton, { [cls.active]: value === category })}
                    onClick={() => setCategory(value)}
                >
                    {translations[cat]}
                </Button>
            )),
        [translations, category, cats],
    );

    const renderPieceCards = useCallback(() => <FurnitureCardsContainer items={list} />, [list]);

    const hasNoResults = list.length === 0;

    const renderContent = useMemo(
        () => (hasNoResults ? <h3>{textNoResults}</h3> : renderPieceCards()),
        [renderPieceCards, textNoResults],
    );

    return (
        <>
            <h1 className={cls.title}>{textResults}</h1>
            <div className={cls.Buttons}>{renderCategoryButtons()}</div>
            <div className={cls.Back}>
                <AppLink to={getRouteAllFurnitureSetsPage()}>&lt;- {textBack}</AppLink>
            </div>
            {renderContent}
        </>
    );
};

export default FurnitureCategoryPage;
