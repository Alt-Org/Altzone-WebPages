'use client';
import cls from './PRGPage.module.scss';
import { PageTitle } from '@/shared/ui/PageTitle';
import type { TFunction } from 'i18next';
import { useClientTranslation } from '@/shared/i18n';
import Image, { StaticImageData } from 'next/image';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import useSizes from '@/shared/lib/hooks/useSizes';
import actionPlanImg from '@/shared/assets/images/PRGPage/actionplan.png';
import activityReportImg from '@/shared/assets/images/PRGPage/annualreport.png';
import associationRulesImg from '@/shared/assets/images/PRGPage/associationrules.png';
import { classNames } from '@/shared/lib/classNames/classNames';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useMemo } from 'react';
import { CustomSwitch, CustomSwitchItems } from '@/shared/ui/CustomSwitch';
import type { ToggleItem } from '@/shared/ui/CustomSwitch';
import { useParams } from 'next/navigation';
import { useGetPrgPageData, type PrgBoardMember } from '@/entities/Prg';

type PrgT = TFunction<'prg'>;

interface CheckPdfButtonProps {
    /** External URL to the PDF document. */
    link: string;
    /** Translation function for button label. */
    t: PrgT;
}

const CheckPdfButton = (checkPdfButtonProps: CheckPdfButtonProps) => {
    if (!checkPdfButtonProps.link) {
        return null;
    }
    return (
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
};

interface BoardCardProps {
    /** Board member portrait image. */
    boardMember: PrgBoardMember;
    /** When true, renders the compact mobile layout. */
    isMobileSize: boolean;
}

const Boardcard = (props: BoardCardProps) => {
    const { boardMember, isMobileSize } = props;
    if (!isMobileSize) {
        return (
            <div className={cls.BoardCard}>
                {boardMember.imageUrl && (
                    <Image
                        src={boardMember.imageUrl}
                        alt={boardMember.name}
                        width={410}
                        height={410}
                    />
                )}
                <div className={cls.BoardCardInfoArea}>
                    <p className={cls.Name}>{boardMember.name}</p>
                    <p className={cls.Job}>{boardMember.jobTitle}</p>
                    <p className={cls.Profession}>{boardMember.profession}</p>
                </div>
            </div>
        );
    }
    return (
        <div className={cls.BoardCardMobile}>
            {boardMember.imageUrl && (
                <Image
                    src={boardMember.imageUrl}
                    alt={boardMember.name}
                    width={410}
                    height={410}
                />
            )}
            <div className={cls.BoardCardInfoAreaMobile}>
                <p className={cls.NameMobile}>{boardMember.name}</p>
                <p className={cls.JobMobile}>{boardMember.jobTitle}</p>
                <p className={cls.ProfessionMobile}>{boardMember.profession}</p>
            </div>
        </div>
    );
};

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

const BoardMembers = (props: {
    boardMembers?: PrgBoardMember[];
    isMobileSize: boolean;
    loading: boolean;
    error: boolean;
    t: PrgT;
}) => {
    const { boardMembers, isMobileSize, loading, error, t } = props;
    if (loading) return <p>{t('loading')}</p>;
    if (error) return <p>{t('load-error')}</p>;
    return (
        <div
            className={classNames(cls.BoardCardContainer, {
                [cls.BoardCardMobileContainer]: isMobileSize,
            })}
        >
            {boardMembers?.map((member) => (
                <Boardcard
                    key={member.name}
                    boardMember={member}
                    isMobileSize={isMobileSize}
                />
            ))}
        </div>
    );
};

const PRGPage = () => {
    const { t } = useClientTranslation('prg');
    const { isMobileSize, isTabletSize } = useSizes();
    const [activeTab, setActiveTab] = useState<DocumentTab>('action-plan');
    const params = useParams();
    const lng = params.lng;
    const {
        fullPrgPageData: prgPageData,
        loading,
        error,
    } = useGetPrgPageData(lng === 'fi' ? 'fi' : 'en');
    const isSmallScreen = isMobileSize || isTabletSize;

    const tabElements: ToggleItem[] = useMemo(
        () =>
            DOCUMENT_TABS.map((tab) => ({
                type: CustomSwitchItems.ToggleItem,
                isOpen: activeTab === tab,
                onOpen: () => setActiveTab(tab),
                children: <p>{t(tabTranslationKeys[tab])}</p>,
            })),
        [activeTab, t],
    );
    const tabLinks: Record<DocumentTab, string> = {
        'action-plan': prgPageData?.documents?.actionPlanUrl || '',
        'activity-report': prgPageData?.documents?.activityReportUrl || '',
        bylaws: prgPageData?.documents?.bylawsUrl || '',
    };

    const renderTabSwitch = () => (
        <>
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
        </>
    );

    const renderMobileTabs = () => (
        <div className={cls.mobileTabs}>
            {DOCUMENT_TABS.map((tab) => (
                <div
                    key={tab}
                    className={classNames(cls.TextContainer, undefined, [cls.mobileTabCard])}
                >
                    <p className={cls.Subheading}>{t(tabTranslationKeys[tab])}</p>
                    <p className={cls.textCenter}>{t(tabTextKeys[tab])}</p>
                    <Image
                        src={tabImages[tab]}
                        alt={t(tabTranslationKeys[tab])}
                        className={cls.tabImage}
                    />
                    <div className={cls.ButtonBlock}>
                        <CheckPdfButton
                            link={tabLinks[tab]}
                            t={t}
                        />
                    </div>
                </div>
            ))}
        </div>
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
            {prgPageData.heroImageUrl && (
                <Image
                    src={prgPageData.heroImageUrl}
                    alt={t('head-title')}
                    width={1600}
                    height={800}
                />
            )}
            <div className={classNames(cls.TextContainer, undefined, [cls.MarginBottom])}>
                <p className={cls.Subheading}>{t('prg')}</p>
                <p className={cls.textCenter}>{t('prg-text')}</p>
                <div className={cls.headingWithLines}>
                    <span className={cls.headingWithLinesText}>{t('prg-board')}</span>
                </div>
                <BoardMembers
                    boardMembers={prgPageData.boardMembers}
                    isMobileSize={isSmallScreen}
                    loading={loading.prgBoardMembersIsLoading}
                    error={!!error.prgBoardMembersError}
                    t={t}
                />
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
            {isSmallScreen ? renderMobileTabs() : renderTabSwitch()}
            <div className={classNames(cls.TextContainer, undefined, [cls.MarginBottom])}>
                <p className={cls.Subheading}>{t('registry-title')}</p>
                <div className={cls.registryInfo}>
                    {loading.prgPageIsLoading
                        ? t('loading')
                        : error.prgPageError
                          ? t('load-error')
                          : prgPageData.registryInfo}
                </div>
            </div>
        </div>
    );
};

export default PRGPage;
