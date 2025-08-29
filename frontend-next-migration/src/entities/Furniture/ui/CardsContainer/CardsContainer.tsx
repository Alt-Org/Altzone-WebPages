'use client';
import { PieceCard } from '../PieceCard/PieceCard';
import type { Piece } from '../../types/furniture';
import cls from './CardsContainer.module.scss';

type CardsContainerProps = { items: Piece[] };

export default function CardsContainer({ items }: CardsContainerProps) {
    return (
        <div className={cls.CardsContainer}>
            {items.map((item) => (
                <PieceCard
                    item={item}
                    key={`${item.set?.path ?? 'Unknown'}${item.path}`}
                />
            ))}
        </div>
    );
}
