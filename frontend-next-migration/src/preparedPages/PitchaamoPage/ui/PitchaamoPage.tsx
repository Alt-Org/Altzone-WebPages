'use client';
import cls from './PitchaamoPage.module.scss';
import { useTranslation } from '@/shared/i18n/settings/client';
import Image from 'next/image';
import ccimage from '@/shared/assets/images/creativeCrossroads/creative_crossroads.png';
import { classNames } from '@/shared/lib/classNames/classNames';
import prglogo from '@/shared/assets/images/PRG-logo-new.png';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import SocialsSection from './SocialsSection';
import PitchaamoFlow from './PitchaamoFlow';
import PitchaamoProjects from './PitchaamoProjects';
import correctIcon from '@/shared/assets/icons/pitchaamoCorrect.svg';
import WhyJoinPitchaamo from './WhyJoinPitchaamo';

const pitchOfferKeys = [
    'pitch-offer-1',
    'pitch-offer-2',
    'pitch-offer-3',
    'pitch-offer-4',
    'pitch-offer-5',
    'pitch-offer-6',
];

const PitchOffers = ({ t }: { t: (key: string) => string }) => (
    <ul
        className={cls.pitchOffers}
        role="list"
    >
        {pitchOfferKeys.map((key) => (
            <li
                key={key}
                className={cls.pitchOffer}
            >
                <Image
                    src={correctIcon}
                    alt="checkmark"
                    width={47}
                    height={34}
                />
                <span>{t(key)}</span>
            </li>
        ))}
    </ul>
);

const PitchaamoPage = () => {
    const { t } = useTranslation('pitchaamo');

    return (
        <main className={cls.main}>
            <div className={cls.header}>
                <Image
                    src={ccimage}
                    alt="Creative Crossroads"
                    width={1440}
                    height={810}
                    priority
                />
                <h1 className={cls.title}>{t('head-title')}</h1>
            </div>
            <div className={cls.content}>
                <div className={classNames(cls.contentPanel, undefined, [cls.introPanel])}>
                    <Image
                        src={prglogo}
                        alt="Logo"
                        width={300}
                        height={300}
                        priority
                    />
                    <div className={cls.introText}>
                        <h2 className={cls.panelTitle}>{t('intro-title')}</h2>
                        <p>{t('intro-description')}</p>
                        <p>{t('intro-description2')}</p>
                    </div>
                </div>
                <PitchaamoFlow />
                <div className={cls.contentPanel}>
                    <h2 className={cls.panelTitle}>{t('pitch-title')}</h2>
                    <PitchOffers t={t} />
                </div>
                <WhyJoinPitchaamo />
                <PitchaamoProjects />
                <div className={cls.contentPanel}>
                    <h2 className={cls.panelTitle}>{t('join-title')}</h2>
                    <p>{t('join-description')}</p>
                    <p>{t('join-description2')}</p>
                    <span>
                        <AppLink
                            to="mailto:proyaleg@gmail.com"
                            isExternal={true}
                            className={cls.links}
                        >
                            proyaleg@gmail.com
                        </AppLink>
                    </span>
                </div>
                <SocialsSection />
                <div className={cls.prgPanel}>
                    <h2 className={cls.prgTitle}>{t('prg-title')}</h2>
                    <AppLink
                        to="https://proyaleg.fi"
                        isExternal={true}
                        className={cls.links}
                    >
                        PRG ry
                    </AppLink>
                </div>
            </div>
        </main>
    );
};

export default PitchaamoPage;
