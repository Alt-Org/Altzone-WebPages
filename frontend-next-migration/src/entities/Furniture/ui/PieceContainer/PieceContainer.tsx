'use client';
import { TFunction } from 'i18next';
import { Piece } from '../../types/set';
import cls from './PieceContainer.module.scss';
import { createRef, LegacyRef } from 'react';
import Image from 'next/image';
import coin from '@/shared/assets/images/furniture/512Kolikko.png';

type Props = {
    item: any;
    setpath: string;
    t: TFunction<string, undefined>;
};

export const PieceCard = (props: Props) => {
    const { path, num, description, cost, weight, rarity, set, cover } = props.item;
    const { setpath } = props;

    const { color, lightcolor, darkcolor } = rarity;

    const ref: LegacyRef<HTMLDivElement> = createRef();
    const click = () => {
        const div: HTMLDivElement | null = ref.current;
        if (!div) {
            return;
        }

        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }

        //div.appendChild()
    };

    const { t } = props;
    return (
        <div>
            <div ref={ref} />
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
