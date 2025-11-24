import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    getRouteCookiesPage,
    getRoutePrivacyPage,
    getRouteEthicalGuidelinesPage,
} from '@/shared/appLinks/RoutePaths';
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

    const { cookies, consent, currentYear, privacy, ethics, companyName } = texts;

    const handleResetCookies = useResetCookies();

    return (
        <div className={classNames(cls.Rights, {}, [className])}>
            <div className={cls.RightContainer}>
                <p className={cls.RightLinkContainer}>
                    <AppLink
                        className={classNames(cls.cookies, {}, [cls.linkHover])}
                        to={getRouteCookiesPage()}
                    >
                        {cookies}
                    </AppLink>{' '}
                    <AppLink
                        className={classNames(cls.privacy, {}, [cls.linkHover])}
                        to={getRoutePrivacyPage()}
                    >
                        {privacy}
                    </AppLink>
                    <span
                        onClick={handleResetCookies}
                        className={classNames(cls.resetCookies, {}, [cls.linkHover])}
                    >
                        {consent}
                    </span>
                    <AppLink
                        className={classNames(cls.ethics, {}, [cls.linkHover])}
                        to={getRouteEthicalGuidelinesPage()}
                    >
                        {ethics}
                    </AppLink>
                </p>
            </div>
            <p>
                <span className={cls.copySymbol}>&copy;</span> {currentYear} {companyName}{' '}
            </p>
        </div>
    );
});

Rights.displayName = 'Footer-Rights';
