import React, { ReactNode, useState, forwardRef, ForwardedRef, CSSProperties } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ClickableBorder.module.scss';

/**
 * Props for ClickableBorder component.
 */
type Props = {
    children: ReactNode;
    borderImageSource: any;
    className?: string;
};

/**
 * A component that wraps its children with a border that changes on hover.
 *
 * @component
 * @example
 * // Usage example:
 * import ClickableBorder from './ClickableBorder';
 *
 * const MyComponent = () => (
 *   <ClickableBorder borderImageSource="/images/border-image.png">
 *     <div>Content inside the border</div>
 *   </ClickableBorder>
 * );
 */
const ClickableBorder = forwardRef((props: Props, ref: ForwardedRef<HTMLDivElement>) => {
    const { children, borderImageSource, className = '' } = props;
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const borderImageStyle = isHovered
        ? { borderImageSource: `url(${borderImageSource})` }
        : { borderImageSource: 'none' };

    const mods = { [cls.hovered]: isHovered };

    return (
        <div
            ref={ref}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={classNames(cls.content, mods, [className])}
            style={borderImageStyle}
        >
            {children}
        </div>
    );
});

export default ClickableBorder;

ClickableBorder.displayName = 'ClickableBorder';
