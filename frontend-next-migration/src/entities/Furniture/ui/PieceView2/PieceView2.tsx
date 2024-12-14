'use client';
import { TFunction } from 'i18next';
import Image from 'next/image';
import { ReactNode } from 'react';
import { useClientTranslation } from '@/shared/i18n';
import coinIcon from '@/shared/assets/images/furniture/CommonCurrencySymbol.png';
import Dialog from '@/shared/ui/Dialog/Dialog';
import { MaterialType, Piece } from '../../types/furniture';
import cls from './PieceView2.module.scss';

// 'use client';
// import { TFunction } from 'i18next';
// import Image from 'next/image';
// import { ReactNode } from 'react';
// import { useClientTranslation } from '@/shared/i18n';
// import coinIcon from '@/shared/assets/images/furniture/CommonCurrencySymbol.png';
// import Dialog from '@/shared/ui/Dialog/Dialog';
// import { MaterialType, Piece } from '../../types/furniture';
// import cls from './PieceView2.module.scss';
//
// type Props = {
//     piece: Piece;
//     leftCorner?: ReactNode;
//     isOpen: boolean;
//     onClose: () => void;
// };
//
// const materialsToString = (materials: Array<MaterialType>, t: TFunction): string => {
//     return materials.map((material) => t(material.name)).join(', ');
// };
//
// const PieceView2 = ({ piece, leftCorner, isOpen, onClose }: Props) => {
//     const { t } = useClientTranslation('furnitureinfo');
//     const { set, rarity } = piece;
//     const { color, lightcolor, darkcolor } = rarity;
//     return (
//         <Dialog
//             isOpen={isOpen}
//             onClose={onClose}
//         >
//             <div className={cls.Container}>
//                 <div className={cls.leftCorner}>{leftCorner}</div>
//                 <div className={cls.rightCorner}>
//                     <h2
//                         className={cls.Title}
//                         style={{ color: lightcolor }}
//                     >
//                         {t(`${set?.path}.ITEMS.${piece.path}.name`)}
//                     </h2>
//                     <div
//                         className={cls.Table}
//                         style={{ color }}
//                     >
//                         <div>
//                             <label>{t('label-weight')}:</label>
//                             <span>{piece.weight} kg</span>
//                         </div>
//                         <div>
//                             <label>{t('label-price')}:</label>
//                             <span>{piece.cost}</span>
//                             <Image
//                                 className={cls.Coin}
//                                 src={coinIcon}
//                                 alt="coin-icon"
//                             />
//                         </div>
//                         <div>
//                             <label>{t('label-author')}:</label>
//                             <span>{set?.author}</span>
//                         </div>
//                         <div>
//                             <label>{t('label-materials')}:</label>
//                             <label>{materialsToString(piece.materials, t)}</label>
//                         </div>
//                     </div>
//
//                     <p style={{ color: darkcolor }}>{t(`${set?.path}.ITEMS.${piece.path}.desc`)}</p>
//                 </div>
//             </div>
//         </Dialog>
//     );
// };
//
// export default PieceView2;
type Props = {
    piece: Piece;
    leftCorner?: ReactNode;
    isOpen: boolean;
    onClose: () => void;
};

const materialsToString = (materials: Array<MaterialType>, t: TFunction): string => {
    return materials.map((material) => t(material.name)).join(', ');
};

const PieceView2 = ({ piece, leftCorner, isOpen, onClose }: Props) => {
    const { t } = useClientTranslation('furnitureinfo');
    const { set, rarity } = piece;
    const { lightcolor, darkcolor } = rarity;

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
                        {t(`${set?.path}.ITEMS.${piece.path}.name`, {
                            defaultValue: 'Unknown Item',
                        })}
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
                    <p style={{ color: darkcolor }}>
                        {t(`${set?.path}.ITEMS.${piece.path}.desc`, {
                            defaultValue: 'No description available',
                        })}
                    </p>
                </article>
            </section>
        </Dialog>
    );
};

export default PieceView2;
