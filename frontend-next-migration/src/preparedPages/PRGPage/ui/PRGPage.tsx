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
import actionPlanImg from '@/shared/assets/images/PRGPage/actionplan.png';
import activityReportImg from '@/shared/assets/images/PRGPage/annualreport.png';
import associationRulesImg from '@/shared/assets/images/PRGPage/associationrules.png';
import { classNames } from '@/shared/lib/classNames/classNames';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useMemo } from 'react';
import { CustomSwitch, CustomSwitchItems } from '@/shared/ui/CustomSwitch';
import type { ToggleItem } from '@/shared/ui/CustomSwitch';

type PrgT = TFunction<'prg'>;

interface CheckPdfButtonProps {
    /** External URL to the PDF document. */
    link: string;
    /** Translation function for button label. */
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
    /** Board member portrait image. */
    picture: StaticImageData;
    /** Full name of the board member. */
    name: string;
    /** Translation key for the member's job title. */
    job: string;
    /** Translation key for the member's profession. */
    profession: string;
    /** Translation function for resolving job/profession labels. */
    t: PrgT;
    /** When true, renders the compact mobile layout. */
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

const BOARD_MEMBERS = [
    {
        picture: Helena,
        name: 'Helena Pavloff-Pelkonen',
        job: 'helena-job',
        profession: 'helena-profession',
    },
    { picture: Esa, name: 'Esa Pavloff-Pelkonen', job: 'esa-job', profession: 'esa-profession' },
    {
        picture: Emmi_Irina,
        name: 'Emmi-Irina Pavloff',
        job: 'emmi-irina-job',
        profession: 'emmi-irina-profession',
    },
] as const;

const DOCUMENT_TABS = ['action-plan', 'activity-report', 'bylaws'] as const;

type DocumentTab = (typeof DOCUMENT_TABS)[number];

const tabTranslationKeys: Record<DocumentTab, string> = {
    'action-plan': 'action-plan',
    'activity-report': 'activity-report',
    bylaws: 'bylaws',
};

const tabTextKeys: Record<DocumentTab, string> = {
    'action-plan': 'action-plan-text',
    'activity-report': 'activity-report-text',
    bylaws: 'bylaws-text',
};

const tabLinks: Record<DocumentTab, string> = {
    'action-plan': AppExternalLinks.prgActionPlan,
    'activity-report': AppExternalLinks.prgActivityReport,
    bylaws: AppExternalLinks.prgBylaws,
};

const tabImages: Record<DocumentTab, StaticImageData> = {
    'action-plan': actionPlanImg,
    'activity-report': activityReportImg,
    bylaws: associationRulesImg,
};

const tabImageSide: Record<DocumentTab, 'left' | 'right'> = {
    'action-plan': 'right',
    'activity-report': 'left',
    bylaws: 'right',
};

const PRGPage = () => {
    const { t } = useClientTranslation('prg');
    const { isMobileSize, isTabletSize } = useSizes();
    const [activeTab, setActiveTab] = useState<DocumentTab>('action-plan');

    const tabElements: ToggleItem[] = useMemo(
        () =>
            DOCUMENT_TABS.map((tab) => ({
                type: CustomSwitchItems.ToggleItem,
                isOpen: activeTab === tab,
                onOpen: () => setActiveTab(tab),
                children: isMobileSize ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                        src={tabImages[tab].src}
                        alt={t(tabTranslationKeys[tab])}
                        className={cls.tabIcon}
                    />
                ) : (
                    <p>{t(tabTranslationKeys[tab])}</p>
                ),
            })),
        [activeTab, t, isMobileSize],
    );

    return (
        <div className={cls.Container}>
            <div className={cls.titleGap}>
                <PageTitle
                    titleText={t('head-title')}
                    alternate={true}
                    searchVisible={false}
                />
            </div>
            <Image
                src={prgDeveloper}
                alt="prgDeveloper"
            />
            <div className={classNames(cls.TextContainer, undefined, [cls.MarginBottom])}>
                <p className={cls.Subheading}>{t('prg')}</p>
                <p className={cls.textCenter}>{t('prg-text')}</p>
                <div className={cls.headingWithLines}>
                    <span className={cls.headingWithLinesText}>{t('prg-board')}</span>
                </div>
                <div
                    className={classNames(cls.BoardCardContainer, {
                        [cls.BoardCardMobileContainer]: isMobileSize || isTabletSize,
                    })}
                >
                    {BOARD_MEMBERS.map((member) => (
                        <Boardcard
                            key={member.name}
                            picture={member.picture}
                            name={member.name}
                            job={member.job}
                            profession={member.profession}
                            t={t}
                            isMobileSize={isMobileSize || isTabletSize}
                        />
                    ))}
                </div>
                <div className={cls.ButtonBlock}>
                    <AppLink
                        to={'/team'}
                        className={classNames(cls.pdfButton, undefined, [cls.teamButton])}
                        aria-label={t('link-to-team-page')}
                        isExternal={false}
                    >
                        <span className={cls.label}>{t('alt-zone-team')}</span>
                    </AppLink>
                </div>
            </div>
            <CustomSwitch
                elements={tabElements}
                className={cls.prgTabSwitch}
            />
            <div className={classNames(cls.TextContainer, undefined, [cls.tabContentContainer])}>
                <div
                    className={classNames(cls.tabContentLayout, {
                        [cls.tabContentLayoutReverse]: tabImageSide[activeTab] === 'left',
                    })}
                >
                    <div className={cls.tabTextArea}>
                        <p className={cls.Subheading}>{t(tabTranslationKeys[activeTab])}</p>
                        <p className={cls.textCenter}>{t(tabTextKeys[activeTab])}</p>
                        <div className={cls.ButtonBlock}>
                            <CheckPdfButton
                                link={tabLinks[activeTab]}
                                t={t}
                            />
                        </div>
                    </div>
                    <div className={cls.tabImageArea}>
                        <Image
                            src={tabImages[activeTab]}
                            alt={t(tabTranslationKeys[activeTab])}
                            className={cls.tabImage}
                        />
                    </div>
                </div>
            </div>
            <div className={classNames(cls.TextContainer, undefined, [cls.MarginBottom])}>
                <p className={cls.Subheading}>{t('registry-title')}</p>
                <div
                    className={cls.registryInfo}
                    style={{ whiteSpace: 'pre-line' }}
                >
                    {t('registry-info')}
                </div>
            </div>
        </div>
    );
};

export default PRGPage;
