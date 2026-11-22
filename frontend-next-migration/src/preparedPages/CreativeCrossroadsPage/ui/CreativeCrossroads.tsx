'use client';
import cls from './CreativeCrossroads.module.scss';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import ccimage from '@/shared/assets/images/creativeCrossroads/creative_crossroads.png';
import logo from '@/shared/assets/images/creativeCrossroads/logo.png';
import { classNames } from '@/shared/lib/classNames/classNames';
import EventsSection from './EventsSection';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import ShowCase from './ShowCase';
import SocialsSection from './SocialsSection';

const CreativeCrossroads = () => {
    const { t } = useTranslation('creative-crossroads');
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
                        src={logo}
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
                <div className={cls.contentPanel}>
                    <h2 className={cls.panelTitle}>{t('purpose-title')}</h2>
                    <p>{t('purpose-description')}</p>
                </div>
                <div className={cls.contentPanel}>
                    <h2 className={cls.panelTitle}>{t('aimed-at-title')}</h2>
                    <p>{t('aimed-at-description')}</p>
                </div>
                <ShowCase />
                <EventsSection />
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

export default CreativeCrossroads;
