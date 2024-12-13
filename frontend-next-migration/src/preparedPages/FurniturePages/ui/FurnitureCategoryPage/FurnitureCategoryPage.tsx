'use client';
import { useState, useMemo, useCallback } from 'react';
import { FurnitureManager, types, PieceCard, PieceType } from '@/entities/Furniture';
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
    const [category, setCategory] = useState(types.CHAIRS);

    const list = useMemo(() => manager.getPiecesByCategory(category), [manager, category]);
    const categories = useMemo(() => Object.entries(types), []);

    const getCategoryButtonClass = useCallback(
        (value: PieceType) =>
            classNames('', {
                [cls.Enabled]: value === category,
                [cls.Disabled]: value !== category,
            }),
        [category],
    );

    const renderCategoryButtons = useCallback(
        () =>
            categories.map(([category, value]) => (
                <Button
                    key={category}
                    className={getCategoryButtonClass(value)}
                    onClick={() => setCategory(value)}
                >
                    {t(category)}
                </Button>
            )),
        [categories, getCategoryButtonClass, t],
    );

    const renderPieceCards = useCallback(
        () =>
            list.map((item) => (
                <PieceCard
                    item={item}
                    key={item.path}
                />
            )),
        [list],
    );

    const hasNoResults = list.length === 0;

    const renderContent = useMemo(
        () =>
            hasNoResults ? (
                <h3>{t('no-results')}</h3>
            ) : (
                <div className={cls.CardsContainer}>{renderPieceCards()}</div>
            ),
        [renderPieceCards, t],
    );

    return (
        <div className={classNames(cls.Page)}>
            <Container className={cls.Container}>
                <h1>{t('results')}</h1>

                <div className={cls.Buttons}>{renderCategoryButtons()}</div>

                <div className={cls.Back}>
                    <AppLink to={getRouteAllFurnitureSetsPage()}>&lt;- {t('text-back')}</AppLink>
                </div>

                {renderContent}
            </Container>
        </div>
    );
};

export default FurnitureCategoryPage;
