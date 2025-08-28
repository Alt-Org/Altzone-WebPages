'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useClientTranslation } from '@/shared/i18n';
import { classNames } from '@/shared/lib/classNames/classNames';
import type { Piece } from '../../types/furniture';
import PieceView from '../PieceView/PieceView';
import cls from './PieceCard.module.scss';
import { FurnitureManager } from '../../model/FurnitureManager';

type Props = {
    item: Piece;
};

type InnerProps = {
    item: Piece;
    set: NonNullable<Piece['set']>;
};

export const PieceCard = ({ item }: Props) => {
    if (!item.set) return null;
    return (
        <PieceCardInner
            item={item}
            set={item.set}
        />
    );
};

const PieceCardInner = ({ item, set }: InnerProps) => {
    const { t } = useClientTranslation('furnitureinfo');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { path, rarity, cover, num } = item;
    const { coverposition, path: setpath } = set;
    const { color, lightcolor, darkcolor } = rarity;

    const tmanager = new FurnitureManager();
    const setTranslations = tmanager.getSetTranslation(t, setpath);
    const pieceTranslations = tmanager.getPieceTranslation(setTranslations, path);

    const handleOpenDialog = () => setIsDialogOpen(true);
    const handleCloseDialog = () => setIsDialogOpen(false);

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
                    <p className={cls.Title}>{pieceTranslations.name}</p>
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
