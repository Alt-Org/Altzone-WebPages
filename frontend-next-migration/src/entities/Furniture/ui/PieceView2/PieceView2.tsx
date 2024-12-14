'use client';
import { TFunction } from 'i18next';
import Image from 'next/image';
import { ReactNode } from 'react';
import { useClientTranslation } from '@/shared/i18n';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import coinIcon from '@/shared/assets/images/furniture/CommonCurrencySymbol.png';
import { MaterialType, Piece } from '../../types/furniture';
import cls from './PieceView2.module.scss';

// 'use client';
// import { TFunction } from 'i18next';
// import Image from 'next/image';
// import { forwardRef, ReactNode, useImperativeHandle, useRef } from 'react';
// import { useClientTranslation } from '@/shared/i18n';
// import { Button, ButtonTheme } from '@/shared/ui/Button';
// import coinIcon from '@/shared/assets/images/furniture/CommonCurrencySymbol.png';
// import { MaterialType, Piece, SetInfo } from '../../types/furniture';
// import cls from './PieceView2.module.scss';
//
// type Props = {
//     piece: Piece;
//     leftCorner?: ReactNode;
// };
//
// export type PieceViewRef = {
//     open: () => void;
//     close: () => void;
// };
//
// const materialsToString = (materials: Array<MaterialType>, t: TFunction): string => {
//     return materials.map((material) => t(material.name)).join(', ');
// };
//
// const PieceView = forwardRef<PieceViewRef, Props>(({ piece, leftCorner }: Props, ref) => {
//     const dialogRef = useRef<HTMLDialogElement>(null);
//     const { t } = useClientTranslation('furnitureinfo');
//
//     useImperativeHandle(ref, () => ({
//         open: () => dialogRef.current?.showModal(),
//         close: () => dialogRef.current?.close(),
//     }));
//
//     const onClose = () => {
//         dialogRef.current?.close();
//     };
//
//     const { set, rarity } = piece;
//     const { color, lightcolor, darkcolor } = rarity;
//
//     return (
//         <dialog
//             ref={dialogRef}
//             className={cls.Dialog}
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
//                             <p>{piece.weight} kg</p>
//                         </div>
//                         <div>
//                             <label>{t('label-price')}:</label>
//                             <p>{piece.cost}</p>
//                             <Image
//                                 className={cls.Coin}
//                                 src={coinIcon}
//                                 alt="coin-icon"
//                             />
//                         </div>
//                         <div>
//                             <label>{t('label-author')}:</label>
//                             <p>{set?.author}</p>
//                         </div>
//                         <div>
//                             <label>{t('label-materials')}:</label>
//                             <p>{materialsToString(piece.materials, t)}</p>
//                         </div>
//                     </div>
//
//                     <p style={{ color: darkcolor }}>{t(`${set?.path}.ITEMS.${piece.path}.desc`)}</p>
//                 </div>
//
//                 <Button
//                     onClick={onClose}
//                     className={cls.Close}
//                     theme={ButtonTheme.Graffiti}
//                 >
//                     X
//                 </Button>
//             </div>
//         </dialog>
//     );
// });
//
// PieceView.displayName = 'PieceView';
//
// export default PieceView;
type Props = {
    piece: Piece;
    leftCorner?: ReactNode;
    isOpen: boolean;
    onClose: () => void;
};

const materialsToString = (materials: Array<MaterialType>, t: TFunction): string => {
    return materials.map((material) => t(material.name)).join(', ');
};

const PieceView = ({ piece, leftCorner, isOpen, onClose }: Props) => {
    const { t } = useClientTranslation('furnitureinfo');

    const { set, rarity } = piece;
    const { color, lightcolor, darkcolor } = rarity;

    if (!isOpen) return null;

    return (
        <dialog
            open
            className={cls.Dialog}
        >
            <div className={cls.Container}>
                <div className={cls.leftCorner}>{leftCorner}</div>
                <div className={cls.rightCorner}>
                    <h2
                        className={cls.Title}
                        style={{ color: lightcolor }}
                    >
                        {t(`${set?.path}.ITEMS.${piece.path}.name`)}
                    </h2>
                    <div
                        className={cls.Table}
                        style={{ color }}
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
                                alt="coin-icon"
                            />
                        </div>
                        <div>
                            <label>{t('label-author')}:</label>
                            <p>{set?.author}</p>
                        </div>
                        <div>
                            <label>{t('label-materials')}:</label>
                            <p>{materialsToString(piece.materials, t)}</p>
                        </div>
                    </div>

                    <p style={{ color: darkcolor }}>{t(`${set?.path}.ITEMS.${piece.path}.desc`)}</p>
                </div>

                <Button
                    onClick={onClose}
                    className={cls.Close}
                    theme={ButtonTheme.Graffiti}
                >
                    X
                </Button>
            </div>
        </dialog>
    );
};

export default PieceView;
