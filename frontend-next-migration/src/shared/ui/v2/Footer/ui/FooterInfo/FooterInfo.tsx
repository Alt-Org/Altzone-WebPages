import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { FooterLinks } from '@/shared/ui/v2/Footer/ui/FooterLinks';
import cls from './FooterInfo.module.scss';

/** Props for the FooterInfo component, which displays informational links in the footer. */
interface FooterInfoProps {
    className?: string;
    title: string;
    whatIsPrgLabel: string;
    altZoneHistoryLabel: string;
    developersDesignersLabel: string;
    termsAndPrivacyLabel: string;
}

/** Component for displaying informational links in the footer, such as "What is PRG", "ALT Zone history", etc.
 * @param props - Props for the FooterInfo component, including title and labels for the informational links.
 * @returns A React component that renders the footer information section with a title and a list of informational links.
 * @remarks This component is memoized for performance optimization, preventing unnecessary re-renders when props do not change.
 */
export const FooterInfo = memo((props: FooterInfoProps) => {
    const {
        className = '',
        title,
        whatIsPrgLabel,
        altZoneHistoryLabel,
        developersDesignersLabel,
        termsAndPrivacyLabel,
    } = props;

    /* Render the footer info section with a title and a list of informational links. */
    return (
        <div className={classNames(cls.FooterInfo, {}, [className])}>
            <h3 className={cls.Title}>{title}</h3>
            <FooterLinks
                className={cls.Links}
                whatIsPrgLabel={whatIsPrgLabel}
                altZoneHistoryLabel={altZoneHistoryLabel}
                developersDesignersLabel={developersDesignersLabel}
                termsAndPrivacyLabel={termsAndPrivacyLabel}
            />
        </div>
    );
});

FooterInfo.displayName = 'FooterInfo';
