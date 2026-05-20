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

/** Component for displaying informational links in the footer, such as "What is PRG", "ALT Zone history", etc. */
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
