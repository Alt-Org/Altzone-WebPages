'use client';
import { TFunction } from 'i18next';
import Image from 'next/image';
import { ReactNode, useEffect, useRef } from 'react';
import { useClientTranslation } from '@/shared/i18n';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import coinIcon from '@/shared/assets/images/furniture/CommonCurrencySymbol.png';
import useScrollLock from '@/shared/lib/hooks/useScrollLock';
import { MaterialType, Piece } from '../../types/furniture';
import cls from './PieceView2.module.scss';

// 'use client';
// import { TFunction } from 'i18next';
// import Image from 'next/image';
// import { ReactNode, useEffect, useRef } from 'react';
// import { useClientTranslation } from '@/shared/i18n';
// import { Button, ButtonTheme } from '@/shared/ui/Button';
// import coinIcon from '@/shared/assets/images/furniture/CommonCurrencySymbol.png';
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
//     const dialogRef = useRef<HTMLDialogElement>(null);
//
//     const { set, rarity } = piece;
//     const { color, lightcolor, darkcolor } = rarity;
//
//     //dialog api says us to do like this
//     useEffect(() => {
//         const dialog = dialogRef.current;
//
//         if (!dialog) return;
//
//         if (isOpen) {
//             if (!dialog.open) {
//                 dialog.showModal();
//             }
//         } else if (dialog.open) {
//             dialog.close();
//         }
//     }, [isOpen]);
//
//     const handleClose = () => {
//         onClose();
//     };
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
//                     onClick={handleClose}
//                     className={cls.Close}
//                     theme={ButtonTheme.Graffiti}
//                 >
//                     X
//                 </Button>
//             </div>
//         </dialog>
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

const preventScroll = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    return false;
};

const preventArrowScroll = (event: KeyboardEvent) => {
    const keysToBlock = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
    if (keysToBlock.includes(event.key)) {
        event.preventDefault();
    }
};

const materialsToString = (materials: Array<MaterialType>, t: TFunction): string => {
    return materials.map((material) => t(material.name)).join(', ');
};

const PieceView2 = ({ piece, leftCorner, isOpen, onClose }: Props) => {
    const { t } = useClientTranslation('furnitureinfo');
    const dialogRef = useRef<HTMLDialogElement>(null);

    const { set, rarity } = piece;
    const { color, lightcolor, darkcolor } = rarity;

    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog) return;

        if (isOpen) {
            if (!dialog.open) {
                dialog.showModal();
            }
        } else if (dialog.open) {
            dialog.close();
        }
    }, [isOpen]);

    useScrollLock(isOpen);

    // useEffect(() => {
    //     const abortController = new AbortController();
    //     const signal = abortController.signal;
    //
    //     const preventScroll = (event: Event) => {
    //         event.preventDefault();
    //         event.stopPropagation();
    //         return false;
    //     };
    //
    //     const preventArrowScroll = (event: KeyboardEvent) => {
    //         const keysToBlock = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
    //         if (keysToBlock.includes(event.key)) {
    //             event.preventDefault();
    //         }
    //     };
    //
    //     if (isOpen) {
    //         window.addEventListener('wheel', preventScroll, { passive: false, signal });
    //         window.addEventListener('touchmove', preventScroll, { passive: false, signal });
    //         window.addEventListener('keydown', preventArrowScroll, { signal });
    //     }
    //
    //     return () => {
    //         abortController.abort();
    //     };
    // }, [isOpen]);

    const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
        if (event.target === dialogRef.current) {
            onClose();
        }
    };

    return (
        <dialog
            ref={dialogRef}
            className={cls.Dialog}
            onClick={handleBackdropClick} // Обработчик клика на backdrop
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

export default PieceView2;
