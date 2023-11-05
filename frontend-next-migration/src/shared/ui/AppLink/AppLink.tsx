import { classNames } from "@/shared/lib/classNames/classNames";
import Link from "next/link";
import {FC, memo, ReactNode} from "react";
import cls from "./AppLink.module.scss";

export enum AppLinkTheme {
    PRIMARY = "primary",
    SECONDARY = "secondary",
    RED = "red",
}

interface AppLinkProps {
    to: string;
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
            legacyBehavior
            key={to as string}
            href={to}
            passHref
        >
            <a className={classNames(cls.AppLink, {}, [className, cls[theme]])}>
                {children}
            </a>
        </Link>
    );
});
