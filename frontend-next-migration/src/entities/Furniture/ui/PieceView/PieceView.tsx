'use client';
import { forwardRef, LegacyRef } from 'react';
import { Piece, SetInfo } from '../../types/set';
import cls from './PieceView.module.scss';

type Props = {
    piece?: Piece;
    set?: SetInfo;
};

const PieceView = (props: Props) => {
    return (
        <div className={cls.Background}>
            <div className={cls.Container} />
            AAAA
        </div>
    );
};

PieceView.displayName = 'PieceView';

export default PieceView;
