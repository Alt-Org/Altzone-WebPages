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
    const [isActive, setIsActive] = useState(false);

    const handleMouseEnter = () => setIsActive(true);
    const handleMouseLeave = () => setIsActive(false);
    const handleFocus = () => setIsActive(true);
    const handleBlur = () => setIsActive(false);

    const borderImageStyle = isActive
        ? { borderImageSource: `url(${borderImageSource})` }
        : { borderImageSource: 'none' };

    const mods = { [cls.hovered]: isActive };

    return (
        <div
            ref={ref}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={classNames(cls.content, mods, [className])}
            style={borderImageStyle}
        >
            {children}
        </div>
    );
});

export default ClickableBorder;

ClickableBorder.displayName = 'ClickableBorder';
