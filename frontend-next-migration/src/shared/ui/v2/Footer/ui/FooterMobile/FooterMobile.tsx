import { memo } from 'react';
import { SocialIconLink, Texts } from '@/shared/types/types';
import { SocialSection } from '@/shared/SocialSection/SocialSection';
import { FooterContact } from '@/shared/ui/v2/Footer/ui/FooterContact';
import { FooterInfo } from '@/shared/ui/v2/Footer/ui/FooterInfo';
import { FeedbackCard } from '@/shared/ui/v2/Feedback';
import cls from './FooterMobile.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface Props {
    socialIconLinks: SocialIconLink[];
    texts: Texts;
    contactTitle: string;
    contactEmailLabel?: string;
    contactEmails: string[];
    infoTitle: string;
    infoLinks?: {
        workWithUsLabel: string;
        whatIsPrgLabel: string;
        altZoneHistoryLabel: string;
        developersDesignersLabel: string;
        termsAndPrivacyLabel: string;
    };
    className?: string;
}

const FooterMobileComponent = memo((props: Props) => {
    const {
        socialIconLinks,
        texts,
        contactTitle,
        contactEmailLabel,
        contactEmails,
        infoTitle,
        infoLinks,
        className = '',
    } = props;

    return (
        <footer className={classNames(cls.Footer, {}, [className])}>
            <div className={cls.SocialBar}>
                <SocialSection
                    className={cls.socialSection}
                    socialIconLinks={socialIconLinks}
                />
            </div>
            <div className={cls.FooterContainer}>
                <FooterContact
                    className={cls.contactSection}
                    title={contactTitle}
                    emailLabel={contactEmailLabel}
                    emails={contactEmails}
                    workWithUsLabel={infoLinks?.workWithUsLabel}
                />
                {infoLinks && (
                    <FooterInfo
                        className={cls.infoSection}
                        title={infoTitle}
                        whatIsPrgLabel={infoLinks.whatIsPrgLabel}
                        altZoneHistoryLabel={infoLinks.altZoneHistoryLabel}
                        developersDesignersLabel={infoLinks.developersDesignersLabel}
                        termsAndPrivacyLabel={infoLinks.termsAndPrivacyLabel}
                    />
                )}
                <FeedbackCard variant="embedabble" />
                <p className={cls.Copyright}>
                    <span className={cls.CopySymbol}>&copy;</span> {texts.currentYear}{' '}
                    {texts.companyName}
                </p>
            </div>
        </footer>
    );
});

FooterMobileComponent.displayName = 'FooterMobileComponent';

export default FooterMobileComponent;
