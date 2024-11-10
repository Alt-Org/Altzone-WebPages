import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './HorizontalLines.module.scss';

/**
 * Represents a component that renders horizontal lines.
 * @constructor
 * @returns {JSX.Element} The rendered horizontal lines.
 */
const HorizontalLines = (): JSX.Element => {
    return (
        <div className={cls.horizontalLineDiv}>
            <hr className={classNames(cls.firstLine, {}, [cls.horizontalLine])} />
            <hr className={classNames(cls.secondLine, {}, [cls.horizontalLine])} />
        </div>
    );
};

export default HorizontalLines;
