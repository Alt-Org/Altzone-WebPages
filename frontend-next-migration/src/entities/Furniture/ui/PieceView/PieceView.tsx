'use client';
import { ForwardedRef, forwardRef } from 'react';
import { MaterialType, Piece, SetInfo } from '../../types/set';
import cls from './PieceView.module.scss';
import { PieceCard } from '../PieceContainer/PieceContainer';
import { useClientTranslation } from '@/shared/i18n';
import { TFunction } from 'i18next';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import coinIcon from '@/shared/assets/images/furniture/CommonCurrencySymbol.png';
import Image from 'next/image';

type Props = {
    piece: Piece;
    set: SetInfo;
};

const materialsToString = (materials: Array<MaterialType>, t: TFunction): string => {
    let str = '';

    let comma = false;
    for (const material of materials) {
        if (comma) {
            str = str + ', ';
        }
        comma = true;

        str = str + t(material.name);
    }

    return str;
};

const PieceView = forwardRef((props: Props, ref: ForwardedRef<HTMLDivElement>) => {
    const { piece, set } = props;

    const { t } = useClientTranslation('furnitureinfo');

    const onClose = () => {
        if (!ref) {
            return;
        }
        if (!('current' in ref)) {
            return;
        }
        const div = ref.current;
        if (!div) {
            return;
        }

        div.style.display = 'none';
    };

    const { color, lightcolor, darkcolor } = piece.rarity;

    piece.set = set;
    return (
        <div
            ref={ref}
            className={cls.Background}
        >
            <button
                onClick={onClose}
                className={cls.Catch}
            />
            <div className={cls.Container}>
                <div className={cls.Content}>
                    <PieceCard
                        noView={true}
                        item={piece}
                    />
                    <div className={cls.Info}>
                        <h2
                            //style={{ color: `${lightcolor}` }}
                            className={cls.Title}
                        >
                            {t(`${set.path}.ITEMS.${piece.path}.name`)}
                        </h2>

                        <div
                            className={cls.Table}
                            style={
                                {
                                    //color: `${color}`
                                }
                            }
                        >
                            <div>
                                <label>{t('label-weight')}:</label>
                                <p>{piece.weight} kg</p>
                            </div>
                            <div>
                                <label>{t('label-price')}:</label>
                                <p>{piece.cost}</p>
                                <Image
                                    className={cls.Coin}
                                    src={coinIcon}
                                    alt={'coin-icon'}
                                />
                            </div>
                            <div>
                                <label>{t('label-author')}:</label>
                                <p>{set.author}</p>
                            </div>
                            <div>
                                <label>{t('label-materials')}:</label>
                                <p>{materialsToString(piece.materials, t)}</p>
                            </div>
                        </div>
                        <p
                            style={
                                {
                                    //color: `${darkcolor}`
                                }
                            }
                        >
                            {t(`${set.path}.ITEMS.${piece.path}.desc`)}
                        </p>
                    </div>
                    <Button
                        onClick={onClose}
                        className={cls.Close}
                        theme={ButtonTheme.Graffiti}
                    >
                        X
                    </Button>
                </div>
            </div>
        </div>
    );
});

PieceView.displayName = 'PieceView';

export default PieceView;
