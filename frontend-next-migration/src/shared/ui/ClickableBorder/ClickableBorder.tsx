import React, {ReactNode, useState, forwardRef, ForwardedRef, CSSProperties} from 'react';
import cls from "./ClickableBorder.module.scss";
import {classNames} from "@/shared/lib/classNames/classNames";

type Props = {
    children: ReactNode;
    borderImageSource: any;
    className?: string;
};

const ClickableBorder = forwardRef(
    (props: Props, ref: ForwardedRef<HTMLDivElement>) => {
        const {children, borderImageSource, className = "", } = props;
        const [isHovered, setIsHovered] = useState(false);
        const handleMouseEnter = () => {
        setIsHovered(true);
        };
        const handleMouseLeave = () => {
        setIsHovered(false);
        };

        return (
            <div
                ref={ref}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={classNames(cls.content, {}, [className])}
                style={{
                    borderImageSource: isHovered ? `url(${borderImageSource})` : 'none',
                }}
            >
                {children}
            </div>
        );
});

export default ClickableBorder;
