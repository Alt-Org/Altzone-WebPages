import { classNames } from "@/shared/lib/classNames/classNames";
import { Link, LinkProps } from "react-router-dom";
import { FC } from "react";
import cls from "./AppLink.module.scss";

export enum AppLinkTheme {
    PRIMARY = "primary",
    SECONDARY = "secondary",
    RED = "red",
}

interface AppLinkProps extends LinkProps {
    to: LinkProps["to"] | string ;
    className?: string;
    theme?: AppLinkTheme;
    external?: boolean;
}

export const AppLink: FC<AppLinkProps> = (props) => {
    const {
        to,
        className = '',
        children,
        theme = AppLinkTheme.PRIMARY,
        external,
        ...otherProps
    } = props;

    if(external && typeof to === 'string'){
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
            {...otherProps}
        >
            {children}
        </Link>
    );
};
