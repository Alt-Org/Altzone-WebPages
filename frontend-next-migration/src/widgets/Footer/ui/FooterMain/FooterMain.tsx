import { useClientTranslation } from '@/shared/i18n';
import { envHelper } from '@/shared/const/envHelper';
import { socialIconLinks } from '../../model/data/socialSectionMenu';
import { FooterDesktop, FooterMobile } from '@/shared/ui/v2/Footer';
import useSizes from '@/shared/lib/hooks/useSizes';

interface Props {
    className?: string;
}

export const Footer = (props: Props) => {
    const { className } = props;

    const { t } = useClientTranslation('footer');

    const { isMobileSize, isTabletSize } = useSizes();
    const isTouchSize = isMobileSize || isTabletSize;

    return isTouchSize ? (
        <FooterMobile
            className={className}
            title={t('FooterTitle')}
            texts={{
                currentYear: new Date().getFullYear(),
                privacy: t('FooterPrivacy'),
                cookies: t('FooterCookies'),
                consent: t('FooterConsent'),
                companyName: envHelper.companyName,
            }}
            socialIconLinks={socialIconLinks}
        />
    ) : (
        <FooterDesktop
            className={className}
            title={t('FooterTitle')}
            // todo probably it should be internalized as well
            texts={{
                currentYear: new Date().getFullYear(),
                privacy: t('FooterPrivacy'),
                cookies: t('FooterCookies'),
                consent: t('FooterConsent'),
                companyName: envHelper.companyName,
            }}
            socialIconLinks={socialIconLinks}
        />
    );
};
