import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Rights.module.scss';
import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';
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
      <a href={AppExternalLinks.cookies} className={cls.link}>
        {Cookies}
      </a>{' '}
      <a href={AppExternalLinks.privacy} className={cls.link}>
        {Privacy}
      </a>
    </p>
  );
});

Rights.displayName = 'Footer-Rights';
