'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useClientTranslation } from '@/shared/i18n';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Piece } from '../../types/furniture';
import PieceView from '../PieceView/PieceView';
import cls from './PieceCard.module.scss';

type Props = {
    item: Piece;
};

export const PieceCard = (props: Props) => {
    const { item } = props;
    const { path, rarity, cover, set, num } = item;

    if (!set) {
        return null;
    }

    const { coverposition, path: setpath } = set;
    const { color, lightcolor, darkcolor } = rarity;

    const { t } = useClientTranslation('furnitureinfo');

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const renderCard = (isStatic: boolean) => (
        <div className={isStatic ? cls.StaticCard : cls.Card}>
            <div
                className={cls.Content}
                style={{
                    background: `linear-gradient(180deg, ${lightcolor} 0%, ${color} 10%, ${color} 40%, ${darkcolor} 50%, ${darkcolor} 100%)`,
                }}
            >
                <button
                    className={classNames(cls.Container, { [cls.StaticContainer]: isStatic })}
                    onClick={!isStatic ? handleOpenDialog : undefined}
                    disabled={isStatic}
                >
                    <Image
                        className={`${cls.Cover} ${cls[coverposition]}`}
                        src={cover}
                        alt="cover"
                    />
                    <p className={cls.Title}>{t(`${setpath}.ITEMS.${path}.name`)}</p>
                    <p className={cls.Id}>{num}</p>
                </button>
            </div>
        </div>
    );

    return (
        <div>
            {isDialogOpen && (
                <div className={cls.ViewContainer}>
                    <PieceView
                        piece={item}
                        isOpen={isDialogOpen}
                        onClose={handleCloseDialog}
                        leftCorner={renderCard(true)}
                    />
                </div>
            )}
            {renderCard(false)}
        </div>
    );
};
