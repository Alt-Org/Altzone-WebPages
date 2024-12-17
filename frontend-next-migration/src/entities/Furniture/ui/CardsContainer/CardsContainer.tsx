'use client';
import { PieceCard, Piece } from '@/entities/Furniture';
import cls from './CardsContainer.module.scss';

interface CardsContainerProps {
    items: Piece[];
}

const CardsContainer = ({ items }: CardsContainerProps) => {
    return (
        <div className={cls.CardsContainer}>
            {items.map((item: Piece) => (
                <PieceCard
                    item={item}
                    key={((item.set && item.set.path) || 'Unknown') + item.path}
                />
            ))}
        </div>
    );
};

export default CardsContainer;
