'use client';
import { forwardRef, LegacyRef } from 'react';
import { Piece, SetInfo } from '../../types/set';
import cls from './PieceView.module.scss';

type Props = {
    piece?: Piece;
    set?: SetInfo;
};

const PieceView = forwardRef((props: Props, ref: LegacyRef<HTMLDivElement>) => {
    return (
        <div
            ref={ref}
            className={cls.Background}
        >
            <div className={cls.Container} />
        </div>
    );
});

PieceView.displayName = 'PieceView';

export default PieceView;
