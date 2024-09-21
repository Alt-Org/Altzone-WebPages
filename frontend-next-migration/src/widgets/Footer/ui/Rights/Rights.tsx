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
  texts: {
      cookies: string;
      privacy: string;
      consent: string;
      currentYear: number;
  }
}



export const Rights = memo((props : RightsProps) => {

  const {
      className = '',
      texts
  } = props;

  const { cookies, consent, currentYear, privacy } = texts;

  const handleResetCookies = useResetCookies();

  return (
    <p className={classNames(cls.Rights, {}, [className])}>
      <span className={cls.copySymbol}>&copy;</span> {currentYear} {CompanyName}{' '}
      <AppLink className={cls.cookies} to={AppRoutesLinks.COOKIES}>
        {cookies}
      </AppLink>{' '}
      <AppLink className={cls.privacy} to={AppRoutesLinks.PRIVACY}>
        {privacy}
      </AppLink>
      <span onClick={handleResetCookies} className={cls.resetCookies}>
        {consent}
      </span>
    </p>
  );
});

Rights.displayName = 'Footer-Rights';
