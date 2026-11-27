import { useTranslation } from 'react-i18next';
import cls from './CreativeCrossroads.module.scss';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { faInstagram, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SocialsSection = () => {
    const { t } = useTranslation('creative-crossroads');
    return (
        <div className={cls.contentPanel}>
            <h2 className={cls.panelTitle}>{t('followus-title')}</h2>
            <p>{t('followus-description')}</p>
            <div className={cls.socialLinks}>
                <AppLink
                    to="https://www.instagram.com/gamingpsyche"
                    isExternal={true}
                    className={cls.links}
                >
                    @gamingpsyche
                    <FontAwesomeIcon
                        icon={faInstagram}
                        className={cls.bigIcon}
                    />
                </AppLink>
                <AppLink
                    to="https://www.facebook.com/groups/creativecrossroads"
                    isExternal={true}
                    className={cls.links}
                >
                    {t('followus-facebook')}
                    <FontAwesomeIcon
                        icon={faFacebook}
                        className={cls.bigIcon}
                    />
                </AppLink>
                <AppLink
                    to="https://www.youtube.com/@CreativeCrossroadsFinland"
                    isExternal={true}
                    className={cls.links}
                >
                    @CreativeCrossroadsFinland
                    <FontAwesomeIcon
                        icon={faYoutube}
                        className={cls.bigIcon}
                    />
                </AppLink>
            </div>
        </div>
    );
};
export default SocialsSection;
