import { classNames } from '@/shared/lib/classNames/classNames';
import Link from 'next/link';
import { FC, memo, ReactNode } from 'react';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cls from './AppLink.module.scss';

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

  if (isExternal && typeof to === 'string') {
    return (
      <a
        key={to}
        className={classNames(cls.AppLink, {}, [className, cls[theme]])}
        href={to}
        target='_blank'
        rel='noopener noreferrer'>
        {children}{' '}
        <FontAwesomeIcon
          icon={faExternalLink}
          size='sm'
          color='var(--secondary-color)'
        />
      </a>
    );
  }

  return (
    <Link legacyBehavior key={to as string} href={to} passHref>
      <a className={classNames(cls.AppLink, {}, [className, cls[theme]])}>
        {children}
      </a>
    </Link>
  );
});

AppLink.displayName = 'AppLink';
