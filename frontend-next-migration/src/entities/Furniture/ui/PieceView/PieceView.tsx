'use client';
import { TFunction } from 'i18next';
import Image from 'next/image';
import { ReactNode } from 'react';
import { useClientTranslation } from '@/shared/i18n';
import coinIcon from '@/shared/assets/images/furniture/CommonCurrencySymbol.png';
import Dialog from '@/shared/ui/Dialog/Dialog';
import { MaterialType, Piece } from '../../types/furniture';
import cls from './PieceView.module.scss';
import { FurnitureManager, getMaterialName } from '../../model/FurnitureManager';

interface Props {
    piece: Piece;
    leftCorner?: ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

const materialsToString = (materials: Array<MaterialType>, t: TFunction): string => {
    return materials.map((material) => getMaterialName(t, material.name)).join(', ');
};

const PieceView = ({ piece, leftCorner, isOpen, onClose }: Props) => {
    const { t } = useClientTranslation('furnitureinfo');
    const { set, rarity, path } = piece;
    const { lightcolor, darkcolor } = rarity;

    const manager = new FurnitureManager();

    const translationPath = manager.getPieceTranslation(
        manager.getSetTranslation(t, set?.path || 'Unknown'),
        path,
    );

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
        >
            <section className={cls.Container}>
                <div className={cls.leftCorner}>{leftCorner}</div>

                <article className={cls.rightCorner}>
                    <h2
                        className={cls.Title}
                        style={{ color: lightcolor }}
                    >
                        {translationPath.name}
                    </h2>

                    <div className={cls.Details}>
                        <div className={cls.DetailItem}>
                            <span className={cls.Label}>{t('label-weight')}:</span>
                            <span className={cls.Value}>{piece.weight} kg</span>
                        </div>
                        <div className={cls.DetailItem}>
                            <span className={cls.Label}>{t('label-price')}:</span>
                            <span className={cls.Value}>
                                {piece.cost}
                                <Image
                                    className={cls.Coin}
                                    src={coinIcon}
                                    alt={t('label-coin-icon')}
                                />
                            </span>
                        </div>
                        <div className={cls.DetailItem}>
                            <span className={cls.Label}>{t('label-author')}:</span>
                            <span className={cls.Value}>{set?.author || t('label-unknown')}</span>
                        </div>
                        <div className={cls.DetailItem}>
                            <span className={cls.Label}>{t('label-materials')}:</span>
                            <span className={cls.Value}>
                                {materialsToString(piece.materials, t)}
                            </span>
                        </div>
                    </div>
                    <p style={{ color: darkcolor }}>{translationPath.desc}</p>
                </article>
            </section>
        </Dialog>
    );
};

export default PieceView;
