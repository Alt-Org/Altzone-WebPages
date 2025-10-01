'use client';
import { Ref, useRef, useState } from 'react';
import { FurnitureManager, FurnitureCardsContainer } from '@/entities/Furniture';
import { useClientTranslation } from '@/shared/i18n';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { getRouteAllFurnitureSetsPage } from '@/shared/appLinks/RoutePaths';
import cls from './FurnitureSearchPage.module.scss';

export interface FurnitureSearchPageProps {
    header: string;
    placeholder: string;
    textBack: string;
}

const FurnitureSearchPage = (props: FurnitureSearchPageProps) => {
    const manager = new FurnitureManager();

    const { header, placeholder, textBack } = props;

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
            <h1 className={cls.title}>{header}</h1>
            <div className={cls.Searchbar}>
                <input
                    onInput={oninput}
                    ref={ref}
                    placeholder={placeholder}
                />
            </div>
            <div className={cls.Back}>
                <AppLink to={getRouteAllFurnitureSetsPage()}>&lt;- {textBack}</AppLink>
            </div>
            <FurnitureCardsContainer items={list} />
        </>
    );
};

export default FurnitureSearchPage;
