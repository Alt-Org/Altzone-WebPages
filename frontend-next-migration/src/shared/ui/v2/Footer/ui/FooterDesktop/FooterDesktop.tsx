import { memo } from 'react';
import Image from 'next/image';
import { SocialIconLink, Texts } from '@/shared/types/types';
import { SocialSection } from '@/shared/SocialSection/SocialSection';
import { FooterContact } from '@/shared/ui/v2/Footer/ui/FooterContact';
import { FooterInfo } from '@/shared/ui/v2/Footer/ui/FooterInfo';
import cls from './FooterDesktop.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import prgLogo from '@/shared/assets/images/PRG_Logo.png';

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

const FooterDesktopComponent = memo((props: Props) => {
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
            <div className={cls.Inner}>
                <div className={cls.BrandColumn}>
                    <Image
                        className={cls.Logo}
                        src={prgLogo}
                        alt="PRG Logo"
                        width={150}
                        height={150}
                        priority
                    />
                </div>

                <div className={cls.ContentGrid}>
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
                </div>
            </div>

            <div className={cls.BottomSection}>
                <p className={cls.Copyright}>
                    <span className={cls.CopySymbol}>&copy;</span> {texts.currentYear}{' '}
                    {texts.companyName}
                </p>
            </div>
        </footer>
    );
});

FooterDesktopComponent.displayName = 'FooterDesktopComponent';

export default FooterDesktopComponent;
