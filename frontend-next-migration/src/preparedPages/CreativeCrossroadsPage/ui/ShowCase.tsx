import { useTranslation } from 'react-i18next';
import cls from './CreativeCrossroads.module.scss';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ShowCase = () => {
    const { t } = useTranslation('creative-crossroads');

    return (
        <div className={cls.contentPanel}>
            <h2 className={cls.panelTitle}>{t('showcase-title')}</h2>
            <div className={cls.youtubePanel}>
                <iframe
                    className={cls.youtubeEmbed}
                    src="https://www.youtube.com/embed/f9WQJPsxMig"
                    title="Creative Crossroads showcase"
                    loading="lazy"
                    allow="encrypted-media; picture-in-picture"
                    allowFullScreen
                />
                <div className={cls.showcase}>
                    <p>{t('showcase-description')}</p>
                    <span>
                        <AppLink
                            to="https://www.youtube.com/@CreativeCrossroadsFinland"
                            isExternal={true}
                            className={cls.links}
                        >
                            {t('showcase-link')} <FontAwesomeIcon icon={faYoutube} />
                        </AppLink>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ShowCase;
