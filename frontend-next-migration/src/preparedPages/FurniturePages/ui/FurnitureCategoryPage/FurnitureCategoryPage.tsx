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
    textback: string;
    textresults: string;
    textnoresults: string;
}

const FurnitureCategoryPage = (props: FurnitureCategoryPageProps) => {
    const manager = useMemo(() => new FurnitureManager(), []);

    const { translations, textback, textresults, textnoresults } = props;

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
        () => (hasNoResults ? <h3>{textnoresults}</h3> : renderPieceCards()),
        [renderPieceCards, textnoresults],
    );

    return (
        <>
            <h1 className={cls.title}>{textresults}</h1>
            <div className={cls.Buttons}>{renderCategoryButtons()}</div>
            <div className={cls.Back}>
                <AppLink to={getRouteAllFurnitureSetsPage()}>&lt;- {textback}</AppLink>
            </div>
            {renderContent}
        </>
    );
};

export default FurnitureCategoryPage;
