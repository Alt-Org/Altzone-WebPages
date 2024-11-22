'use client';
import { TFunction } from 'i18next';
import { Piece, SetInfo } from '../../types/set';
import cls from './PieceContainer.module.scss';
import { createRef, LegacyRef } from 'react';
import Image from 'next/image';
import coin from '@/shared/assets/images/furniture/512Kolikko.png';
import PieceView from '../PieceView/PieceView';

type Props = {
    item: any;
    t: TFunction<string, undefined>;
};

export const PieceCard = (props: Props) => {
    const { path, cost, rarity, cover, set } = props.item;

    const setpath = set.path;

    const { color, lightcolor, darkcolor } = rarity;

    const ref: LegacyRef<HTMLDivElement> = createRef();
    const click = () => {
        const div = ref.current;
        if (!div) {
            return;
        }

        div.style.display = 'block';
    };

    const { t } = props;
    return (
        <div>
            <div
                className={cls.ViewContainer}
                ref={ref}
            >
                <PieceView
                    piece={props.item}
                    set={set}
                />
            </div>
            <div
                className={cls.Card}
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
                    <div className={cls.Price}>
                        {t(`price`)}:{cost}
                        <Image
                            className={cls.Coin}
                            alt={'money-icon'}
                            src={coin}
                        />
                    </div>
                </button>
            </div>
        </div>
    );
};
