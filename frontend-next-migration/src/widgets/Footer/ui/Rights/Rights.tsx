import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Rights.module.scss';
import { AppRoutesLinks } from '@/shared/appLinks/RoutePaths';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
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
  return (
    <p className={classNames(cls.Rights, {}, [className])}>
      <span className={cls.copySymbol}>&copy;</span> {CurrentYear} {CompanyName}{' '}
      <AppLink to={AppRoutesLinks.COOKIES}>{Cookies}</AppLink>{' '}
      <AppLink to={AppRoutesLinks.PRIVACY}>{Privacy}</AppLink>
    </p>
  );
});

Rights.displayName = 'Footer-Rights';
