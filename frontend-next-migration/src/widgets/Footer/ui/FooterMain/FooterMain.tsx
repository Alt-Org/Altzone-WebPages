import { useClientTranslation } from '@/shared/i18n';
import { envHelper } from '@/shared/const/envHelper';
import { socialIconLinks } from '../../model/data/socialSectionMenu';
import FooterDesktop from '../FooterDesktop/FooterDesktop';

interface Props {
    className?: string;
}

export const Footer = (props: Props) => {
    const { className } = props;

    const { t } = useClientTranslation('footer');

    return (
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
