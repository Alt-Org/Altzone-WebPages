import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { FooterLinks } from '@/shared/ui/v2/Footer/ui/FooterLinks';
import cls from './FooterInfo.module.scss';

interface FooterInfoProps {
    className?: string;
    title: string;
    whatIsPrgLabel: string;
    altZoneHistoryLabel: string;
    developersDesignersLabel: string;
    termsAndPrivacyLabel: string;
}

export const FooterInfo = memo((props: FooterInfoProps) => {
    const {
        className = '',
        title,
        whatIsPrgLabel,
        altZoneHistoryLabel,
        developersDesignersLabel,
        termsAndPrivacyLabel,
    } = props;

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
