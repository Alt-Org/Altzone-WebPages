'use client';
import cls from './PieceContainer.module.scss';
import { RefObject, useRef } from 'react';
import Image from 'next/image';
import PieceView from '../PieceView/PieceView';
import { useClientTranslation } from '@/shared/i18n';

type Props = {
    noView?: boolean;
    item: any;
};

export const PieceCard = (props: Props) => {
    const { noView, item } = props;
    const { path, rarity, cover, set, num } = item;

    const setpath = set.path;

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
            <div
                className={card}
                style={{
                    background: `linear-gradient(180deg, ${lightcolor} 0%, ${color} 10%, ${color} 40%, ${darkcolor} 50%, ${darkcolor} 100%)`,
                }}
            >
                <button
                    className={cls.Container}
                    onClick={click}
                >
                    <Image
                        className={cls.Cover}
                        src={cover}
                        alt={'cover'}
                    />
                    <p className={cls.Title}>{t(`${setpath}.ITEMS.${path}.name`)}</p>
                    <p className={cls.Id}>{num}</p>
                </button>
            </div>
        </div>
    );
};
