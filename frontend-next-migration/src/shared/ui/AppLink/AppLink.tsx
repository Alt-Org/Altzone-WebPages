import Link from "next/link";
import { FC, memo, ReactNode } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./AppLink.module.scss";

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  RED = 'red',
}

interface AppLinkProps {
  to: string;
  className?: string;
  theme?: AppLinkTheme;
  isExternal?: boolean;
  children: ReactNode;
}

/**
 * `AppLink` is a reusable component that renders a link. It can handle both internal and external URLs.
 *
 * @param props - The properties for the `AppLink` component.
 *
 * @example
 * ```tsx
 * import { AppLink, AppLinkTheme } from "./AppLink";
 *
 * const MyComponent = () => (
 *   <div>
 *     <AppLink to="https://external.com" isExternal theme={AppLinkTheme.PRIMARY}>
 *       External Link
 *     </AppLink>
 *     <AppLink to="/internal-page" theme={AppLinkTheme.SECONDARY}>
 *       Internal Link
 *     </AppLink>
 *   </div>
 * );
 * ```
 */
export const AppLink: FC<AppLinkProps> = memo((props) => {
  const {
    to,
    className = '',
    children,
    theme = AppLinkTheme.PRIMARY,
    isExternal,
  } = props;

  if (isExternal) {
    return (
          <a
              href={to}
              className={classNames(cls.AppLink, {}, [className, cls[theme]])}
              target="_blank"
              rel="noopener noreferrer"
          >
            {children}
          </a>
    );
  }

  return (
      <Link href={to} className={classNames(cls.AppLink, {}, [className, cls[theme]])}>
        {children}
      </Link>
  );
});

AppLink.displayName = 'AppLink';
