import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import {
    getRoutePrivacyPage,
    getRoutePrgPage,
    getRouteAboutPage,
    getRouteTeamPage,
} from '@/shared/appLinks/RoutePaths';
import cls from './FooterLinks.module.scss';

/** Props for the FooterLinks component, which displays a list of informational links in the footer. */
interface FooterLinksProps {
    className?: string;
    whatIsPrgLabel: string;
    altZoneHistoryLabel: string;
    developersDesignersLabel: string;
    termsAndPrivacyLabel: string;
}

/** Component for displaying informational links in the footer, such as "What is PRG", "ALT Zone history", etc. */
export const FooterLinks = memo((props: FooterLinksProps) => {
    const {
        className = '',
        whatIsPrgLabel,
        altZoneHistoryLabel,
        developersDesignersLabel,
        termsAndPrivacyLabel,
    } = props;

    /* Render the footer links as a navigation list with links to different informational pages. */
    return (
        <nav className={classNames(cls.FooterLinks, {}, [className])}>
            <ul className={cls.LinksList}>
                <li>
                    <AppLink
                        to={getRoutePrgPage()}
                        className={cls.Link}
                    >
                        {whatIsPrgLabel}
                    </AppLink>
                </li>
                <li>
                    <AppLink
                        to={getRouteAboutPage()}
                        className={cls.Link}
                    >
                        {altZoneHistoryLabel}
                    </AppLink>
                </li>
                <li>
                    <AppLink
                        to={getRouteTeamPage()}
                        className={cls.Link}
                    >
                        {developersDesignersLabel}
                    </AppLink>
                </li>
                <li>
                    <AppLink
                        to={getRoutePrivacyPage()}
                        className={cls.Link}
                    >
                        {termsAndPrivacyLabel}
                    </AppLink>
                </li>
            </ul>
        </nav>
    );
});

FooterLinks.displayName = 'FooterLinks';
