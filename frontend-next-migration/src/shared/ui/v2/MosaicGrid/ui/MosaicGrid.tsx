import cls from './MosaicGrid.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

export interface MosaicGridProps {
    className?: string;
}

const MosaicGrid = ({ className }: MosaicGridProps) => {
    return (
        <div className={classNames(cls.MosaicGrid, undefined, [className ? className : ''])}>
            <div className={classNames(cls.MosaicGridItem)} />
        </div>
    );
};

export { MosaicGrid };
