import { useTranslation } from 'react-i18next';
import cls from './CreativeCrossroads.module.scss';
const EventsSection = () => {
    const { t } = useTranslation('creative-crossroads');
    return (
        <div className={cls.contentPanel}>
            <h2 className={cls.panelTitle}>{t('events-title')}</h2>
            <div className={cls.eventsPanel}>
                <p>{t('events-description')}</p>
                <p>{t('events-description2')}</p>
            </div>
            <h2 className={cls.panelTitle}>{t('previous-events')}</h2>
            <div className={cls.events}>
                <div className={cls.eventDate}>26.2.2026</div>
                <div className={cls.eventDescription}>
                    <div className={cls.eventTitle}>{t('event1-title')}</div>
                    <div className={cls.eventDetails}>{t('event1-details')}</div>
                </div>
                <div className={cls.eventDate}>13.6.-31.7.2026</div>
                <div className={cls.eventDescription}>
                    <div className={cls.eventTitle}>{t('event2-title')}</div>
                    <div className={cls.eventDetails}>{t('event2-details')}</div>
                </div>
            </div>
            <h2 className={cls.panelTitle}>{t('upcoming-events')}</h2>
            <div className={cls.events}>
                <div className={cls.eventDate}>27.1.2027</div>
                <div className={cls.eventDescription}>
                    <div className={cls.eventTitle}>{t('event3-title')}</div>
                    <div className={cls.eventDetails}>{t('event3-details')}</div>
                </div>
            </div>
        </div>
    );
};
export default EventsSection;
