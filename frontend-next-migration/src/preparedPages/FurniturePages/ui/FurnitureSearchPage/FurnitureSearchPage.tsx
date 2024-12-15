'use client';
import { Ref, useRef, useState } from 'react';
import { FurnitureManager, FurnitureCardsContainer } from '@/entities/Furniture';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Container } from '@/shared/ui/Container';
import { useClientTranslation } from '@/shared/i18n';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { getRouteAllFurnitureSetsPage } from '@/shared/appLinks/RoutePaths';
import cls from './FurnitureSearchPage.module.scss';

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

    const list = manager.getPiecesByKeyword(input, useClientTranslation('furnitureinfo').t);
    return (
        <>
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
            <FurnitureCardsContainer items={list} />
        </>
    );
};

export default FurnitureSearchPage;
