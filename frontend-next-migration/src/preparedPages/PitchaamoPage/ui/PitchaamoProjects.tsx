import { useTranslation } from '@/shared/i18n/settings/client';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './PitchaamoPage.module.scss';

const currentProjects = ['map-ink', 'time-clock'] as const;

const PitchaamoProjects = () => {
    const { t } = useTranslation('pitchaamo');

    return (
        <div className={cls.contentPanel}>
            <section className={cls.projectGroup}>
                <h2 className={cls.panelTitle}>{t('past-projects-title')}</h2>
                <article className={classNames(cls.projectCard, undefined, [cls.youtubePanel])}>
                    <iframe
                        className={cls.youtubeEmbed}
                        src="https://www.youtube.com/embed/t5QHINLUS48"
                        title="Extraterritory"
                        loading="lazy"
                        allow="encrypted-media; picture-in-picture"
                        allowFullScreen
                    />
                    <div className={cls.projectCopy}>
                        <h3>Extraterritory</h3>
                        <p>{t('project-extraterritory-description')}</p>
                    </div>
                </article>
            </section>
            <section className={cls.projectGroup}>
                <h2 className={cls.panelTitle}>{t('current-projects-title')}</h2>
                <div className={cls.currentProjects}>
                    {currentProjects.map((project) => (
                        <article
                            key={project}
                            className={classNames(cls.projectCard, undefined, [cls.projectCopy])}
                        >
                            <h3>{t(`project-${project}-title`)}</h3>
                            <p>{t(`project-${project}-description`)}</p>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default PitchaamoProjects;
