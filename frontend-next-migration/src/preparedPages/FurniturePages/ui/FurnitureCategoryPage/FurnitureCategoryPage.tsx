'use client';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Container } from '@/shared/ui/Container';
import cls from './FurnitureCategoryPage.module.scss';
import {
    FurnitureManager,
    SetCard,
    FurnitureFilters,
    types,
    PieceCard,
} from '@/entities/Furniture';
import { useClientTranslation } from '@/shared/i18n';
import { useRef, useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { Piece, PieceType } from '@/entities/Furniture/types/set';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { getRouteAllFurnitureSetsPage } from '@/shared/appLinks/RoutePaths';

const FurnitureCategoryPage = () => {
    const { t } = useClientTranslation('furniturecategory');
    const t2 = useClientTranslation('furnitureinfo').t;

    const manager = new FurnitureManager();

    const [category, setCategory] = useState(types.CHAIRS);

    let i = 0;
    const list = manager.getPiecesByCategory(category);
    return (
        <div className={classNames(cls.Page)}>
            <Container className={cls.Container}>
                <div>
                    {Object.entries(types).map((value) => {
                        const id = value[0];
                        const val = value[1];

                        const onClick = () => {
                            setCategory(val);
                        };
                        return val === category ? (
                            <Button
                                key={id}
                                className={cls.Enabled}
                                id={id}
                                onClick={onClick}
                            >
                                {t(id)}
                            </Button>
                        ) : (
                            <Button
                                key={id}
                                className={cls.Disabled}
                                id={id}
                                onClick={onClick}
                            >
                                {t(id)}
                            </Button>
                        );
                    })}
                </div>
                <div className={cls.Back}>
                    <AppLink to={getRouteAllFurnitureSetsPage()}>&lt;- {t('text-back')}</AppLink>
                </div>
                <h1>{t('results')}</h1>
                {list.length === 0 ? (
                    <h3>{t('no-results')}</h3>
                ) : (
                    <div className={cls.CardsContainer}>
                        {list.map((item: Piece) => {
                            i++;
                            return (
                                <PieceCard
                                    item={item}
                                    t={t2}
                                    key={i}
                                />
                            );
                        })}
                    </div>
                )}
            </Container>
        </div>
    );
};

export default FurnitureCategoryPage;
