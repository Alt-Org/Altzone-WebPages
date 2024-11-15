'use client';
import { TFunction } from 'i18next';
import { Piece } from '../../types/set';
import cls from './PieceContainer.module.scss';
import { createRef, LegacyRef } from 'react';

type Props = {
    item: any;
    setpath: string;
    t: TFunction<string, undefined>;
};

export const PieceCard = (props: Props) => {
    const { path, num, description, cost, weight, rarity, set } = props.item;
    const { setpath } = props;

    const ref: LegacyRef<HTMLDivElement> = createRef();
    const click = () => {
        const div: HTMLDivElement | null = ref.current;
        if (!div) {
            return;
        }

        div.style.display = 'block';
    };

    const { t } = props;
    return (
        <div>
            <div
                className={cls.Card}
                style={{ backgroundColor: rarity.color }}
            >
                <button
                    className={cls.Container}
                    onClick={click}
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
                        <li>{t(`${setpath}.ITEMS.${path}.name`)}</li>
                        <li>
                            {t(`${setpath}.name`)} {num}
                        </li>
                        <li>
                            {t('price')}: {cost}
                        </li>
                    </ul>
                </button>
            </div>
        </div>
    );
};
