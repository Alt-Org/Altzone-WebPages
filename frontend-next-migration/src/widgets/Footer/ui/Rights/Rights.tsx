import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Rights.module.scss';
import { AppRoutesLinks } from '@/shared/appLinks/RoutePaths';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { useResetCookies } from '@/shared/lib/hooks/useResetCookies';
import {
  CurrentYear,
  CompanyName,
  Cookies,
  Privacy,
} from '../../model/data/text';

interface RightsProps {
  className?: string;
}

export const Rights = memo(({ className = '' }: RightsProps) => {
  const handleResetCookies = useResetCookies();

  return (
    <p className={classNames(cls.Rights, {}, [className])}>
      <span className={cls.copySymbol}>&copy;</span> {CurrentYear} {CompanyName}{' '}
      <AppLink className={cls.cookies} to={AppRoutesLinks.COOKIES}>
        {Cookies}
      </AppLink>{' '}
      <AppLink className={cls.privacy} to={AppRoutesLinks.PRIVACY}>
        {Privacy}
      </AppLink>
      <span onClick={handleResetCookies} className={cls.resetCookies}>
        Consent
      </span>
    </p>
  );
});

Rights.displayName = 'Footer-Rights';
