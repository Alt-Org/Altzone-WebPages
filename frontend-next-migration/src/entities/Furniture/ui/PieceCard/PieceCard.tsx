'use client';
import Image from 'next/image';
import { RefObject, useRef } from 'react';
import { useClientTranslation } from '@/shared/i18n';
import { Piece } from '../../types/furniture';
import PieceView from '../PieceView/PieceView';
import PieceView2, { PieceViewRef } from '../PieceView2/PieceView2';
import cls from './PieceCard.module.scss';

type Props = {
    noView?: boolean;
    item: Piece;
};

export const PieceCard = (props: Props) => {
    const { noView, item } = props;
    const { path, rarity, cover, set, num } = item;

    if (!set) {
        return;
    }

    const { coverposition, path: setpath } = set;
    const { color, lightcolor, darkcolor } = rarity;

    const ref2: RefObject<PieceViewRef> = useRef(null);
    const ref: RefObject<HTMLDivElement> = useRef(null);

    const { t } = useClientTranslation('furnitureinfo');

    const handleOpenDialog = () => {
        ref2.current?.open();
    };

    const click = () => {
        if (noView) {
            return;
        }

        handleOpenDialog();

        const div = ref.current;
        if (!div) {
            return;
        }
        div.style.display = 'block';
    };

    const renderCard = (noView: boolean) => (
        <div className={noView ? cls.StaticCard : cls.Card}>
            <div
                className={cls.Content}
                style={{
                    background: `linear-gradient(180deg, ${lightcolor} 0%, ${color} 10%, ${color} 40%, ${darkcolor} 50%, ${darkcolor} 100%)`,
                }}
            >
                <button
                    className={cls.Container}
                    onClick={click}
                >
                    <Image
                        className={`${cls.Cover} ${cls[coverposition]}`}
                        src={cover}
                        alt="cover"
                    />
                    <p className={cls.Title}>{t(`${setpath}.ITEMS.${path}.name`)}</p>
                    <p className={cls.Id}>{num}</p>
                </button>
            </div>
        </div>
    );

    return (
        <div>
            {!noView && (
                <div className={cls.ViewContainer}>
                    <PieceView
                        piece={item}
                        set={set}
                        ref={ref}
                    />
                    <PieceView2
                        piece={item}
                        ref={ref2}
                        leftCorner={renderCard(true)}
                    />
                </div>
            )}
            {renderCard(false)}
        </div>
    );
};
