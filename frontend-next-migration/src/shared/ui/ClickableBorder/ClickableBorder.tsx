import React, { ReactNode, useState } from 'react';
import cls from "./ClickableBorder.module.scss";
import {classNames} from "@/shared/lib/classNames/classNames";

type Props = {
    children: ReactNode;
    borderImageSource: any;
    className?: string;
};

const ClickableBorder = ({ children, borderImageSource, className = "" }: Props) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div
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
};

export default ClickableBorder;

