'use client';
import cls from './PieceContainer.module.scss';
import { RefObject, useRef } from 'react';
import Image from 'next/image';
import PieceView from '../PieceView/PieceView';
import { useClientTranslation } from '@/shared/i18n';
import { Piece } from '../../types/furniture';

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

    const ref: RefObject<HTMLDivElement> = useRef(null);
    const click = () => {
        if (noView) {
            return;
        }

        const div = ref.current;
        if (!div) {
            return;
        }

        div.style.display = 'block';
    };

    let card = cls.Card;
    if (noView) {
        card = cls.StaticCard;
    }

    const { t } = useClientTranslation('furnitureinfo');
    return (
        <div>
            {noView ? (
                <div />
            ) : (
                <div className={cls.ViewContainer}>
                    <PieceView
                        piece={item}
                        set={set}
                        ref={ref}
                    />
                </div>
            )}
            <div className={card}>
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
                            alt={'cover'}
                        />
                        <p className={cls.Title}>{t(`${setpath}.ITEMS.${path}.name`)}</p>
                        <p className={cls.Id}>{num}</p>
                    </button>
                </div>
            </div>
        </div>
    );
};
