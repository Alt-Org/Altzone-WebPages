import ideaIcon from '@/shared/assets/icons/pitchaamoIdea.svg';
import paintIcon from '@/shared/assets/icons/pitchaamoPaint.svg';
import teamIcon from '@/shared/assets/icons/pitchaamoTeam.svg';
import { useTranslation } from '@/shared/i18n/settings/client';
import { classNames } from '@/shared/lib/classNames/classNames';
import Image from 'next/image';
import cls from './PitchaamoPage.module.scss';

const reasons = [
    {
        icon: paintIcon,
        title: 'why-join-development-title',
        description: 'why-join-development-description',
    },
    {
        icon: teamIcon,
        title: 'why-join-collaboration-title',
        description: 'why-join-collaboration-description',
    },
    {
        icon: ideaIcon,
        title: 'why-join-ownership-title',
        description: 'why-join-ownership-description',
    },
];

const WhyJoinPitchaamo = () => {
    const { t } = useTranslation('pitchaamo');

    return (
        <section className={classNames(cls.contentPanel, undefined, [cls.whyJoinPanel])}>
            <h2 className={cls.panelTitle}>{t('why-join-title')}</h2>
            <div className={cls.whyJoinReasons}>
                {reasons.map(({ icon, title, description }) => (
                    <div
                        key={title}
                        className={cls.whyJoinReason}
                    >
                        <Image
                            src={icon}
                            alt="icon"
                            width={80}
                            height={80}
                        />
                        <div className={cls.whyJoinCopy}>
                            <h3>{t(title)}</h3>
                            <p>{t(description)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhyJoinPitchaamo;
