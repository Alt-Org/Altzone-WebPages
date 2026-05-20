import { useClientTranslation } from '@/shared/i18n';
import { envHelper } from '@/shared/const/envHelper';
import { socialIconLinks } from '@/shared/const/socialSectionMenu';
import { FooterDesktop, FooterMobile } from '@/shared/ui/v2/Footer';
import useSizes from '@/shared/lib/hooks/useSizes';

interface Props {
    className?: string;
}

// Contact emails - can be moved to config if needed
const CONTACT_EMAILS = ['psykkis@hotmail.com', 'proyaleg@gmail.com'];

export const Footer = (props: Props) => {
    const { className } = props;

    const { t } = useClientTranslation('footer');

    const { isMobileSize, isTabletSize } = useSizes();
    const isTouchSize = isMobileSize || isTabletSize;

    const infoLinksProps = {
        workWithUsLabel: t('WorkWithUs'),
        whatIsPrgLabel: t('WhatIsPRG'),
        altZoneHistoryLabel: t('AltZoneHistory'),
        developersDesignersLabel: t('DevelopersDesigners'),
        termsAndPrivacyLabel: t('TermsAndPrivacy'),
    };

    const texts = {
        currentYear: new Date().getFullYear(),
        privacy: t('FooterPrivacy'),
        cookies: t('FooterCookies'),
        consent: t('FooterConsent'),
        ethics: t('FooterEthics'),
        companyName: envHelper.companyName,
    };

    return isTouchSize ? (
        <FooterMobile
            className={className}
            texts={texts}
            socialIconLinks={socialIconLinks}
            contactTitle={t('Contact')}
            contactEmails={CONTACT_EMAILS}
            infoTitle={t('Information')}
            infoLinks={infoLinksProps}
        />
    ) : (
        <FooterDesktop
            className={className}
            texts={texts}
            socialIconLinks={socialIconLinks}
            contactTitle={t('Contact')}
            contactEmails={CONTACT_EMAILS}
            infoTitle={t('Information')}
            infoLinks={infoLinksProps}
        />
    );
};
