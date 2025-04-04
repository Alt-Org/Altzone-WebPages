import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getRouteCookiesPage, getRoutePrivacyPage } from '@/shared/appLinks/RoutePaths';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { useResetCookies } from '@/shared/lib/hooks/useResetCookies';
import { Texts } from '../../model/types/types';
import cls from './Rights.module.scss';

interface RightsProps {
    className?: string;
    texts: Texts;
}

export const Rights = memo((props: RightsProps) => {
    const { className = '', texts } = props;

    const { cookies, consent, currentYear, privacy, companyName } = texts;

    const handleResetCookies = useResetCookies();

    return (
        <div className={classNames(cls.Rights, {}, [className])}>
            <div className={cls.RightContainer}>
                <p className={cls.RightLinkContainer}>
                    <AppLink
                        className={cls.cookies}
                        to={getRouteCookiesPage()}
                    >
                        {cookies}
                    </AppLink>{' '}
                    <AppLink
                        className={cls.privacy}
                        to={getRoutePrivacyPage()}
                    >
                        {privacy}
                    </AppLink>
                    <span
                        onClick={handleResetCookies}
                        className={cls.resetCookies}
                    >
                        {consent}
                    </span>
                </p>
            </div>
            <p>
                <span className={cls.copySymbol}>&copy;</span> {currentYear} {companyName}{' '}
            </p>
        </div>
    );
});

Rights.displayName = 'Footer-Rights';
