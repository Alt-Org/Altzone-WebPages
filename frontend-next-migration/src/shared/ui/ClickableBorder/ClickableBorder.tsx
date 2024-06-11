import React, {
  ReactNode,
  useState,
  forwardRef,
  ForwardedRef,
  CSSProperties,
  HTMLAttributes,
} from 'react';
import cls from './ClickableBorder.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  borderImageSource: any;
  className?: string;
  onClick?: () => void;
  isPopupOpen?: boolean;
};

const ClickableBorder = forwardRef(
  (
    {
      children,
      borderImageSource,
      className = '',
      onClick,
      isPopupOpen,
      ...rest
    }: Props,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const handleClick = () => {
      if (onClick) {
        onClick();
      }
    };

    const borderImageStyle: CSSProperties = isHovered
      ? { borderImageSource: `url(${borderImageSource})` }
      : { borderImageSource: 'none' };

    const mods = { [cls.hovered]: isHovered };

    return (
      <div
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className={classNames(cls.content, mods, [className])}
        style={borderImageStyle}
        {...rest} // `rest` now does not include `isPopupOpen`
      >
        {children}
      </div>
    );
  },
);

export default ClickableBorder;

ClickableBorder.displayName = 'ClickableBorder';
