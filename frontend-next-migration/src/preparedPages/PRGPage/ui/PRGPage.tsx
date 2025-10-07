'use client';
import cls from './PRGPage.module.scss';
import { PageTitle } from '@/shared/ui/PageTitle';
import type { TFunction } from 'i18next';
import { useClientTranslation } from '@/shared/i18n';
import prgDeveloper from '@/shared/assets/images/prgDeveloper.png';
import Image, { StaticImageData } from 'next/image';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import useSizes from '@/shared/lib/hooks/useSizes';
import Helena from '@/shared/assets/images/board/helena.png';
import Esa from '@/shared/assets/images/board/esa.png';
import Emmi_Irina from '@/shared/assets/images/board/emmi-irina.png';
import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';
import { classNames } from '@/shared/lib/classNames/classNames';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type PrgT = TFunction<'prg'>;

interface CheckPdfButtonProps {
    link: string;
    t: PrgT;
}

const CheckPdfButton = (checkPdfButtonProps: CheckPdfButtonProps) => (
    <AppLink
        to={checkPdfButtonProps.link}
        className={cls.pdfButton}
        aria-label={checkPdfButtonProps.t('open-pdf')}
        isExternal={true}
    >
        <span className={cls.label}>{checkPdfButtonProps.t('check-pdf')}</span>
        <FontAwesomeIcon
            className={cls.externalLinkIcon}
            icon={faExternalLink}
        />
    </AppLink>
);

interface BoardCardProps {
    picture: StaticImageData;
    name: string;
    job: string;
    profession: string;
    t: PrgT;
    isMobileSize: boolean;
}

const Boardcard = (props: BoardCardProps) => {
    const { picture, name, job, profession, t, isMobileSize } = props;
    if (!isMobileSize) {
        return (
            <div className={cls.BoardCard}>
                <Image
                    src={picture}
                    alt={name}
                />
                <div className={cls.BoardCardInfoArea}>
                    <p className={cls.Name}>{name}</p>
                    <p className={cls.Job}>{t(job)}</p>
                    <p className={cls.Profession}>{t(profession)}</p>
                </div>
            </div>
        );
    }
    return (
        <div className={cls.BoardCardMobile}>
            <Image
                src={picture}
                alt={name}
            />
            <div className={cls.BoardCardInfoAreaMobile}>
                <p className={cls.NameMobile}>{name}</p>
                <p className={cls.JobMobile}>{t(job)}</p>
                <p className={cls.ProfessionMobile}>{t(profession)}</p>
            </div>
        </div>
    );
};

const PRGPage = () => {
    const { t } = useClientTranslation('prg');
    const { isMobileSize, isTabletSize } = useSizes();

    return (
        <div className={cls.Container}>
            <PageTitle
                titleText={t('head-title')}
                alternate={true}
                searchVisible={false}
            />
            <Image
                src={prgDeveloper}
                alt="prgDeveloper"
            />
            <div className={cls.TextContainer}>
                <p className={cls.Subheading}>{t('prg')}</p>
                <p className={cls.textColumns}>{t('prg-text')}</p>
            </div>
            <div className={cls.TextContainer}>
                <p className={cls.Subheading}>{t('action-plan')}</p>
                <p className={cls.textCenter}>{t('action-plan-text')}</p>
                <div className={cls.ButtonBlock}>
                    <CheckPdfButton
                        link={AppExternalLinks.prgActionPlan}
                        t={t}
                    />
                </div>
                <p className={cls.Subheading}>{t('activity-report')}</p>
                <p className={cls.textCenter}>{t('activity-report-text')}</p>
                <div className={cls.ButtonBlock}>
                    <CheckPdfButton
                        link={AppExternalLinks.prgActivityReport}
                        t={t}
                    />
                </div>
                <p className={cls.Subheading}>{t('bylaws')}</p>
                <p className={cls.textCenter}>{t('bylaws-text')}</p>
                <div className={cls.ButtonBlock}>
                    <CheckPdfButton
                        link={AppExternalLinks.prgBylaws}
                        t={t}
                    />
                </div>
            </div>
            <div className={classNames(cls.TextContainer, undefined, [cls.MarginBottom])}>
                <p className={cls.Subheading}>{t('prg-board')}</p>
                {!isMobileSize && !isTabletSize ? (
                    <div className={cls.BoardCardContainer}>
                        <Boardcard
                            picture={Helena}
                            name={'Helena Pavloff-Pelkonen'}
                            job={'helena-job'}
                            profession={'helena-profession'}
                            t={t}
                            isMobileSize={isMobileSize}
                        />
                        <Boardcard
                            picture={Esa}
                            name={'Esa Pavloff-Pelkonen'}
                            job={'esa-job'}
                            profession={'esa-profession'}
                            t={t}
                            isMobileSize={isMobileSize}
                        />
                        <Boardcard
                            picture={Emmi_Irina}
                            name={'Emmi-Irina Pavloff'}
                            job={'emmi-irina-job'}
                            profession={'emmi-irina-profession'}
                            t={t}
                            isMobileSize={isMobileSize}
                        />
                    </div>
                ) : (
                    <div className={cls.BoardCardMobileContainer}>
                        <Boardcard
                            picture={Helena}
                            name={'Helena Pavloff-Pelkonen'}
                            job={'helena-job'}
                            profession={'helena-profession'}
                            t={t}
                            isMobileSize={isMobileSize || isTabletSize}
                        />
                        <Boardcard
                            picture={Esa}
                            name={'Esa Pavloff-Pelkonen'}
                            job={'esa-job'}
                            profession={'esa-profession'}
                            t={t}
                            isMobileSize={isMobileSize || isTabletSize}
                        />
                        <Boardcard
                            picture={Emmi_Irina}
                            name={'Emmi-Irina Pavloff'}
                            job={'emmi-irina-job'}
                            profession={'emmi-irina-profession'}
                            t={t}
                            isMobileSize={isMobileSize || isTabletSize}
                        />
                    </div>
                )}
                <AppLink
                    to={'/team'}
                    className={cls.MeetBoard}
                    aria-label={t('link-to-team-page')}
                    isExternal={true}
                >
                    <span className={classNames(cls.label, undefined, [cls.bold, cls.Underline])}>
                        {t('alt-zone-team')}&nbsp;
                    </span>
                    <FontAwesomeIcon
                        className={cls.externalLinkIcon}
                        icon={faExternalLink}
                    />
                </AppLink>
            </div>
        </div>
    );
};

export default PRGPage;
