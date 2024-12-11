import React, { ReactNode } from 'react';
// todo check for update https://github.com/cedricdelpoux/react-responsive-masonry/pull/121
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import cls from './MasonryWrapper.module.scss';

interface MyWrapperProps {
    children: ReactNode;
}

export const MasonryWrapper = (props: MyWrapperProps) => {
    const { children } = props;

    const columnBreakPoints = {
        1100: 4,
        800: 3,
        500: 2,
    };

    return (
        <ResponsiveMasonry
            columnsCountBreakPoints={columnBreakPoints}
            className={cls.Container}
        >
            <Masonry gutter={'10px'}>{children}</Masonry>
        </ResponsiveMasonry>
    );
};
