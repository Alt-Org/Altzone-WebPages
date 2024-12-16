'use client';
import { useState, useMemo, useCallback } from 'react';
import {
    FurnitureManager,
    categories,
    PieceCard,
    FurnitureCardsContainer,
} from '@/entities/Furniture';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Container } from '@/shared/ui/Container';
import { useClientTranslation } from '@/shared/i18n';
import { Button } from '@/shared/ui/Button';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { getRouteAllFurnitureSetsPage } from '@/shared/appLinks/RoutePaths';
import cls from './FurnitureCategoryPage.module.scss';

const FurnitureCategoryPage = () => {
    const { t } = useClientTranslation('furniturecategory');
    const manager = useMemo(() => new FurnitureManager(), []);

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
                    {t(cat)}
                </Button>
            )),
        [t, category, cats],
    );

    const renderPieceCards = useCallback(() => <FurnitureCardsContainer items={list} />, [list]);

    const hasNoResults = list.length === 0;

    const renderContent = useMemo(
        () => (hasNoResults ? <h3>{t('no-results')}</h3> : renderPieceCards()),
        [renderPieceCards, t],
    );

    return (
        <>
            <h1 className={cls.title}>{t('results')}</h1>
            <div className={cls.Buttons}>{renderCategoryButtons()}</div>
            <div className={cls.Back}>
                <AppLink to={getRouteAllFurnitureSetsPage()}>&lt;- {t('text-back')}</AppLink>
            </div>
            {renderContent}
        </>
    );
};

export default FurnitureCategoryPage;
