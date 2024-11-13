'use client';
import { TFunction } from 'i18next';
import { Piece } from '../../types/set';
import cls from './PieceContainer.module.scss';

type Props = {
    item: any;
    t: TFunction<string, undefined>;
};

export const PieceCard = (props: Props) => {
    const { name, num, description, cost, weight, rarity, set } = props.item;

    const { t } = props;
    return (
        <div
            className={cls.Card}
            style={{ backgroundColor: rarity.color }}
        >
            <p className={cls.info} />
            <div className={cls.Fade} />
            <div
                className={cls.Banner}
                style={{ color: rarity.color }}
            >
                {t(rarity.name)}
            </div>
            <ul className={cls.Stats}>
                <li>{name}</li>
                <li>
                    {set.name} {num}
                </li>
                <li>Hinta: {cost}</li>
            </ul>
        </div>
    );
};
