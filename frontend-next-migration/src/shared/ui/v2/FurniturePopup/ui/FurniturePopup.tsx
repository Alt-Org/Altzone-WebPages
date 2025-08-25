import React, { useState, useLayoutEffect } from 'react';
import { Piece } from '@/entities/Furniture';
import { useClientTranslation } from '@/shared/i18n';
import Image from 'next/image';
import cls from './FurniturePopup.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import xButton from '@/shared/assets/icons/xButton.svg';
import commonCurrencySymbol from '@/shared/assets/icons/CommonCurrencySymbol.svg';

interface FurniturePopupProps {
    item: Piece;
    setPath: string;
    isOpen: boolean;
    onClose: () => void;
}

export const FurniturePopup: React.FC<FurniturePopupProps> = ({
    item,
    setPath,
    isOpen,
    onClose,
}) => {
    const { t } = useClientTranslation('furnitureinfo');
    const [isVisible, setIsVisible] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);

    useLayoutEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setIsFadingOut(false);
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsFadingOut(true);
    };

    const handleTransitionEnd = () => {
        if (isFadingOut) {
            setIsVisible(false);
            onClose();
        }
    };

    if (!isOpen && !isVisible) return null;

    return (
        <div
            className={classNames(cls.PopupOverlay, { [cls.fadeOut]: isFadingOut })}
            onClick={handleClose}
            onAnimationEnd={handleTransitionEnd}
        >
            <div
                className={classNames(cls.PopupContent, { [cls.fadeOut]: isFadingOut })}
                onClick={(event) => event.stopPropagation()}
            >
                <div
                    className={cls.CloseButton}
                    onClick={handleClose}
                >
                    <Image
                        src={xButton}
                        alt="close"
                    />
                </div>
                <div>
                    <div className={cls.PopupBody}>
                        <div className={cls.InfoColumn}>
                            <div className={cls.PopupHeader}>
                                <h2 className={cls.PopupTitle}>
                                    {t(`${setPath}.items.${item.path}.name`)}
                                </h2>
                            </div>
                            <div className={cls.InfoItem}>
                                <span className={cls.InfoLabel}>{`${t('label-price')}:`}</span>
                                <div style={{ display: 'flex' }}>
                                    <span className={cls.InfoValue}>{item.cost}&ensp;</span>
                                    <Image
                                        src={commonCurrencySymbol}
                                        alt={'currency symbol'}
                                    />
                                </div>
                            </div>
                            <div className={cls.InfoItem}>
                                <span className={cls.InfoLabel}>{`${t('label-weight')}:`}</span>
                                <span className={cls.InfoValue}>{item.weight} kg</span>
                            </div>
                            <div className={cls.InfoItem}>
                                <span className={cls.InfoLabel}>{`${t('label-materials')}:`}</span>
                                <span className={cls.InfoValue}>
                                    {item.materials
                                        .map((mat) => t(`materials.${mat.name}.name`))
                                        .join(', ')}
                                </span>
                            </div>
                            <div className={cls.InfoItem}>
                                <span
                                    className={cls.InfoLabel}
                                >{`${t('label-diagnosis-number')}:`}</span>
                                <span className={cls.InfoValue}>{item.num}</span>
                            </div>
                            <div className={cls.InfoItem}>
                                <span className={cls.InfoLabel}>{`${t('collection')}:`}</span>
                                <span className={cls.InfoValue}>{t(`${setPath}.name`)}</span>
                            </div>
                            <div className={cls.InfoItem}>
                                <span className={cls.InfoLabel}>{`${t('label-author')}:`}</span>
                                <span className={cls.InfoValue}>{item.set?.author || ''}</span>
                            </div>
                        </div>
                        <div className={cls.ImageColumn}>
                            <Image
                                src={item.cover}
                                alt={t(`${setPath}.items.${item.path}.name`)}
                                width={300}
                                height={300}
                                objectFit="contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
