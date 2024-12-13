'use client';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Container } from '@/shared/ui/Container';
import cls from './FurnitureSearchPage.module.scss';
import { FurnitureManager, SetCard, FurnitureFilters, PieceCard } from '@/entities/Furniture';
import { useClientTranslation } from '@/shared/i18n';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { getRouteAllFurnitureSetsPage } from '@/shared/appLinks/RoutePaths';
import { FormEvent, Ref, useRef, useState } from 'react';
import { Piece } from '@/entities/Furniture/types/furniture';

const FurnitureSearchPage = () => {
    const { t } = useClientTranslation('furnituresearch');

    const manager = new FurnitureManager();

    const [input, setinput] = useState('');

    const ref: Ref<HTMLInputElement> = useRef(null);
    const oninput = () => {
        const el: HTMLInputElement | null = ref.current;
        if (!el) {
            return;
        }

        setinput(el.value);
    };

    let i = 0;
    const list = manager.getPiecesByKeyword(input, useClientTranslation('furnitureinfo').t);
    return (
        <div className={classNames(cls.Page)}>
            <Container className={cls.Container}>
                <h1>{t('results')}</h1>
                <div className={cls.Searchbar}>
                    <input
                        onInput={oninput}
                        ref={ref}
                        placeholder={t('search-placeholder')}
                    />
                </div>
                <div className={cls.Back}>
                    <AppLink to={getRouteAllFurnitureSetsPage()}>&lt;- {t('text-back')}</AppLink>
                </div>
                <div className={cls.CardsContainer}>
                    {list.map((item: Piece) => {
                        i++;
                        return (
                            <PieceCard
                                item={item}
                                key={i}
                            />
                        );
                    })}
                </div>
            </Container>
        </div>
    );
};

export default FurnitureSearchPage;
