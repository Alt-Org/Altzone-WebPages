import { classNames } from "@/shared/lib/classNames/classNames";
import { Link, LinkProps } from "react-router-dom";
import {FC, memo, ReactNode} from "react";
import cls from "./AppLink.module.scss";

export enum AppLinkTheme {
    PRIMARY = "primary",
    SECONDARY = "secondary",
    RED = "red",
}

interface AppLinkProps {
    to: LinkProps["to"] | string ;
    className?: string;
    theme?: AppLinkTheme;
    isExternal?: boolean;
    children: ReactNode;
}

export const AppLink: FC<AppLinkProps> = memo((props) => {
    const {
        to,
        className = '',
        children,
        theme = AppLinkTheme.PRIMARY,
        isExternal,
    } = props;

    if(isExternal && typeof to === 'string'){
        return (
            <a
                key={to}
                className={classNames(cls.AppLink, {}, [className, cls[theme]])}
                href={to} target='_blank'>
                {children}
            </a>
        )
    }

    return (
        <Link
            key={to as string}
            to={to}
            className={classNames(cls.AppLink, {}, [className, cls[theme]])}
        >
            {children}
        </Link>
    );
});
