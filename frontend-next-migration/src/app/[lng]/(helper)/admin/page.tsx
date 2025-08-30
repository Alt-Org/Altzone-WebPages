/* eslint-disable max-lines */
// import { CustomEditor } from '@/shared/ui/CustomEditor';
'use client';
import { ModularCard, ModularCardTheme } from '@/shared/ui/v2/ModularCard';
import hannu from '@/shared/assets/images/heros/hannu-hodari/hannu-hodari.png';
import vihapuhe from '@/shared/assets/images/heros/hate-speech/Vihapuhe.png';
import jokester from '@/shared/assets/images/heros/jokester/Jokester.png';
import sleeper from '@/shared/assets/images/heros/sleeper/Sleeper_new.png';
import fatePriest from '@/shared/assets/images/heros/fate-priest/fate-priest.png';
import mirror from '@/shared/assets/images/heros/mirror/Mirror.png';
import { useRef } from 'react';
import {
    NavMenuWithDropdowns,
    NavMenuWithDropdownsProps,
} from '@/shared/ui/NavMenuWithDropdownsV2';
import { RoutePaths } from '@/shared/appLinks/RoutePaths';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import { PageTitle } from '@/shared/ui/PageTitle';
import { useClientTranslation } from '@/shared/i18n';
import { WallIntroAnimation } from '@/shared/ui/v2/WallIntroAnimation';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { DescriptionCard, DescriptionCardTheme } from '@/shared/ui/v2/DescriptionCard';
import defenceGallery from '@/shared/assets/images/descriptionCard/defense_gallery.png';
import defenceGalleryMobile from '@/shared/assets/images/descriptionCard/defense_gallery_mobile.png';
import retroflector from '@/shared/assets/images/descriptionCard/retroflector.png';
import { MobileCard, MobileCardLink, MobileCardTheme } from '@/shared/ui/v2/MobileCard';
import { CreateBoxTest } from '@/features/BoxTest/ui/CreateBoxTest';
import { ClaimTesterAccountTest } from '@/features/BoxTest/ui/ClaimTesterAccountTest';
import { DeleteBoxTest } from '@/features/BoxTest/ui/DeleteBoxTest';
import { ResetBoxTest } from '@/features/BoxTest/ui/ResetBoxTest';
import { StartTestingSessionTest } from '@/features/BoxTest/ui/StartTestingSessionTest';
import { GetBoxByIdTest } from '@/features/BoxTest/ui/GetBoxByIdTest';
import { DeleteBoxByIdTest } from '@/features/BoxTest/ui/DeleteBoxByIdTest';
import { AddDailyTaskToBoxTest } from '@/features/BoxTest/ui/AddDailyTaskToBoxTest';
import { UpdateBoxDailyTaskTest } from '@/features/BoxTest/ui/UpdateBoxDailyTaskTest';
import { AddMultipleDailyTasksTest } from '@/features/BoxTest/ui/AddMultipleDailTasksTest';
import { DeleteBoxDailyTaskByIdTest } from '@/features/BoxTest/ui/DeleteBoxDailyTaskByIdTest';
import { DefineTesterAmountTest } from '@/features/BoxTest/ui/DefineTesterAmountTest';
import {
    DescriptionCardMobile,
    DescriptionCardMobileLink,
    DescriptionCardMobileTheme,
} from '@/shared/ui/v2/DescriptionCardMobile';
import useSizes from '@/shared/lib/hooks/useSizes';

const Page = () => {
    const navMenuWithDropdownsProps2: NavMenuWithDropdownsProps = {
        title: 'Klaanit',
        openByDefault: false,
        titleAsActive: true,
        dropdownItems: [
            { elementText: 'Selaa Klaaneja', link: { path: '/clans', isExternal: false } },
            { elementText: 'Leaderboard', link: { path: '/clans/leaderboard', isExternal: false } },
            { elementText: 'Klaanisivu', link: { path: '/clans/myclan', isExternal: false } },
            { elementText: 'Kauppa', link: { path: '/store', isExternal: false } },
        ],
    };

    const navMenuWithDropdownsProps3: NavMenuWithDropdownsProps = {
        title: 'Klaanit',
        staticDropdown: true,
        dropdownItems: [
            { elementText: 'Selaa Klaaneja', link: { path: '/clans', isExternal: false } },
            { elementText: 'Leaderboard', link: { path: '/clans/leaderboard', isExternal: false } },
            { elementText: 'Klaanisivu', link: { path: '/clans/myclan', isExternal: false } },
            { elementText: 'Kauppa', link: { path: '/store', isExternal: false } },
        ],
    };

    const navMenuWithDropdownsProps4: NavMenuWithDropdownsProps = {
        title: 'Klaanit',
        staticDropdown: true,
        dropdownItems: [
            { elementText: 'Selaa Klaaneja', link: { path: '/clans', isExternal: false } },
            { elementText: 'Leaderboard', link: { path: '/clans/leaderboard', isExternal: false } },
            { elementText: 'Klaanisivu', link: { path: '/clans/myclan', isExternal: false } },
            {
                title: 'Heroes',
                openByDefault: false,
                elements: [
                    // links can be used as well, just add the "link" to object
                    {
                        elementText: 'Hero 1',
                        id: 'hero1',
                        link: { path: RoutePaths.HEROES, isExternal: false },
                    },
                    { elementText: 'Hero 2', id: 'hero2' },
                ],
            },
            { elementText: 'Kauppa', link: { path: '/store', isExternal: false } },
        ],
    };

    const navMenuWithDropdownsProps: NavMenuWithDropdownsProps = {
        title: 'Forum',
        openByDefault: true,
        dropdownItems: [
            {
                title: 'Heroes',
                openByDefault: false,
                elements: [
                    // links can be used as well, just add the "link" to object
                    {
                        elementText: 'Hero 1',
                        id: 'hero1',
                        link: { path: RoutePaths.HEROES, isExternal: false },
                    },
                    { elementText: 'Hero 2', id: 'hero2' },
                ],
            },
        ],
    };
    const cardRef = useRef<HTMLDivElement>(null);
    const { isMobileSize } = useSizes();
    const { t } = useClientTranslation('admin');
    const componentsArray = Array(9).fill(null);
    const handleFocusAndScroll = () => {
        if (cardRef.current) {
            cardRef.current.focus();
            cardRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest',
            });
        }
    };

    return (
        <LayoutWithSidebars
            // rightSidebar={di}
            // leftSidebar={<div></div>}
            leftTopSidebar={{
                component: (
                    <div style={{ width: '100%', maxWidth: '600px' }}>
                        <NavMenuWithDropdowns {...navMenuWithDropdownsProps} />
                    </div>
                ),
            }}
            // rightBottomSidebar={{
            //     hideOnMobile: true,
            //     // hideOnDesktop: true,
            //     component: (
            //         <div style={{ width: '100%', maxWidth: '600px' }}>
            //             <NavMenuWithDropdowns {...navMenuWithDropdownsProps} />
            //         </div>
            //     ),
            // }}
        >
            {/* Testing Box Api */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: '20px 0',
                }}
            >
                <ClaimTesterAccountTest />
                <CreateBoxTest />
                <DeleteBoxTest />
                <ResetBoxTest />
                <StartTestingSessionTest />
                <GetBoxByIdTest />
                <DeleteBoxByIdTest />
                <AddDailyTaskToBoxTest />
                <UpdateBoxDailyTaskTest />
                <AddMultipleDailyTasksTest />
                <DeleteBoxDailyTaskByIdTest />
                <DefineTesterAmountTest />
            </div>

            {/* End of Testing Box Api */}
            {/* Testing ModularCard */}
            <button
                style={{
                    paddingLeft: '1em',
                    paddingRight: '1em',
                    border: '1px solid black',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    backgroundColor: 'lightblue',
                }}
                onClick={handleFocusAndScroll}
            >
                focus
            </button>
            <h2>Testing Defense Gallery ModularCard</h2>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '16px',
                    margin: '10px 0 20px',
                }}
            >
                {[
                    { id: 1, src: vihapuhe },
                    { id: 2, src: jokester },
                    { id: 3, src: fatePriest },
                    { id: 4, src: mirror },
                    { id: 5, src: hannu },
                    { id: 6, src: sleeper },
                ].map((card) => (
                    <div
                        key={card.id}
                        style={{
                            flexBasis: 'calc(50% - 8px)', // makes 2 columns, vertical gap = 32px
                        }}
                    >
                        <ModularCard
                            className="customClass"
                            theme={ModularCardTheme.DEFENSECARD}
                            // onClick={() => {
                            //     // console.log(`clicked modularcard ${card.id}`);
                            // }} // Needs use-client parent
                            withScalableLink={true}
                        >
                            <ModularCard.Texts>
                                <ModularCard.Texts.Title>Torjujat </ModularCard.Texts.Title>
                                <ModularCard.Texts.Body>Hahmon nimi</ModularCard.Texts.Body>
                            </ModularCard.Texts>
                            <ModularCard.Image
                                style={{ '--before-color': 'green' } as React.CSSProperties}
                            >
                                <ModularCard.Image.Image
                                    src={card.src}
                                    alt="hannu hodari"
                                />
                            </ModularCard.Image>
                        </ModularCard>
                    </div>
                ))}
            </div>
            {/* End of Testing ModularCard */}

            <WallIntroAnimation renderOnce={true} />
            <h4>NavMenuWithDropdownsV2 using Clan Example</h4>
            <div style={{ margin: '20px' }}>
                <h5>
                    Version with dropdown closed by default (mainly designed for mobile but works
                    works for both. Test in mobile resolution too)
                </h5>
            </div>
            <NavMenuWithDropdowns {...navMenuWithDropdownsProps2} />
            <div style={{ margin: '20px' }}>
                <h5>
                    Static version of dropdown, mainly meant for desktop. (if staticDropdown is
                    dropdown will always be open)
                </h5>
            </div>
            <NavMenuWithDropdowns {...navMenuWithDropdownsProps3} />
            <div style={{ margin: '20px' }}>
                <h5>Static version of dropdown with subcategories, mainly meant for desktop.</h5>
            </div>
            <NavMenuWithDropdowns {...navMenuWithDropdownsProps4} />

            <div style={{ margin: '20px' }}>
                <h5>Theme switcher component.</h5>
            </div>
            <ThemeSwitcher />

            <h1 style={{ marginTop: '20px' }}>Main Page Content</h1>
            {/* Testing ModularCard */}
            <div
                style={{
                    display: 'flex',
                    gap: '10px',
                    flexWrap: 'wrap',
                    margin: '10px 0 20px',
                }}
            >
                {[{ id: 1 }, { id: 2 }].map((card) => (
                    <div
                        key={card.id}
                        style={{
                            width: '100%',
                            flexBasis: 'calc(50% - 5px)', // makes 2 columns, vertical gap = 10px
                            /*  flexBasis: 100%; on mobile tablet devices  */
                        }}
                    >
                        <ModularCard
                            className="customClass"
                            theme={ModularCardTheme.NEWSCARD}
                            // onClick={() => {
                            //     // console.log(`clicked modularcard ${card.id}`);
                            // }} // Needs use-client parent
                            withScalableLink={true}
                        >
                            <ModularCard.Texts>
                                <ModularCard.Texts.Title>Title</ModularCard.Texts.Title>
                                <ModularCard.Texts.Body>
                                    This is the main content, adapting to both desktop and mobile
                                    main content, adapting to both desktop and mobile devices main
                                    content, adapting to both desktop and mobile devices main
                                    content, adapting to both desktop and mobile devices main
                                    content, adapting to both desktop and mobile devices
                                </ModularCard.Texts.Body>
                                <ModularCard.Texts.Footnote>Footnote</ModularCard.Texts.Footnote>
                            </ModularCard.Texts>
                            <ModularCard.Image>
                                <ModularCard.Image.Triangle />
                                <ModularCard.Image.Image
                                    src={hannu}
                                    alt="hannu hodari"
                                />
                            </ModularCard.Image>
                        </ModularCard>
                    </div>
                ))}
                <div
                    style={{
                        width: '100%',
                    }}
                >
                    <ModularCard
                        className="customClass"
                        theme={ModularCardTheme.TITLEIMAGE}
                        // onClick={() => {
                        //     // console.log(`clicked modularcard ${card.id}`);
                        // }} // Needs use-client parent
                        path="/fi/page/details"
                        isExternal={false}
                        withScalableLink={true}
                    >
                        <ModularCard.Texts>
                            <ModularCard.Texts.Title>Title</ModularCard.Texts.Title>
                        </ModularCard.Texts>
                        <ModularCard.Image>
                            <ModularCard.Image.Triangle />
                            <ModularCard.Image.Image
                                src={hannu}
                                alt="hannu hodari"
                            />
                        </ModularCard.Image>
                    </ModularCard>
                </div>
            </div>
            <p>
                This is the main content, adapting to both desktop and mobile devices. This is the
                main content, adapting to both desktop and mobile devices
            </p>
            <PageTitle
                titleText={t('adminTestTitle')}
                searchVisible={false}
                dynamicTitle="admin"
            />
            <PageTitle
                titleText={t('staticTestTitle')}
                searchVisible={true}
            />
            <PageTitle
                titleText={t('adminTestTitle')}
                searchVisible={false}
                dynamicTitle="admin"
            />
            <p>
                This is the main content, adapting to both desktop and mobile devices. This is the
                main content, adapting to both desktop and mobile devices
            </p>
            <p>
                This is the main content, adapting to both desktop and mobile devices. This is the
                main content, adapting to both desktop and mobile devices
            </p>
            <p>
                This is the main content, adapting to both desktop and mobile devices. This is the
                main content, adapting to both desktop and mobile devices
            </p>
            <p>
                This is the main content, adapting to both desktop and mobile devices. This is the
                main content, adapting to both desktop and mobile devices
            </p>
            <p>
                This is the main content, adapting to both desktop and mobile devices. This is the
                main content, adapting to both desktop and mobile devices
            </p>
            <p>
                This is the main content, adapting to both desktop and mobile devices. This is the
                main content, adapting to both desktop and mobile devices
            </p>
            <p>
                This is the main content, adapting to both desktop and mobile devices. This is the
                main content, adapting to both desktop and mobile devices
            </p>
            <p>
                This is the main content, adapting to both desktop and mobile devices. This is the
                main content, adapting to both desktop and mobile devices
            </p>
            <p>
                This is the main content, adapting to both desktop and mobile devices. This is the
                main content, adapting to both desktop and mobile devices
            </p>
            <p>
                This is the main content, adapting to both desktop and mobile devices. This is the
                main content, adapting to both desktop and mobile devices
            </p>
            <p>
                This is the main content, adapting to both desktop and mobile devices. This is the
                main content, adapting to both desktop and mobile devices
            </p>
            <p>
                This is the main content, adapting to both desktop and mobile devices. This is the
                main content, adapting to both desktop and mobile devices
            </p>
            <p>
                This is the main content, adapting to both desktop and mobile devices. This is the
                main content, adapting to both desktop and mobile devices
            </p>
            <p>
                This is the main content, adapting to both desktop and mobile devices. This is the
                main content, adapting to both desktop and mobile devices
            </p>
            <p>
                This is the main content, adapting to both desktop and mobile devices. This is the
                main content, adapting to both desktop and mobile devices
            </p>
            <p>
                This is the main content, adapting to both desktop and mobile devices. This is the
                main content, adapting to both desktop and mobile devices
            </p>
            <p>
                This is the main content, adapting to both desktop and mobile devices. This is the
                main content, adapting to both desktop and mobile devices
            </p>
            <p>
                This is the main content, adapting to both desktop and mobile devices. This is the
                main content, adapting to both desktop and mobile devices
            </p>
            {isMobileSize ? (
                <>
                    <DescriptionCardMobile theme={DescriptionCardMobileTheme.DEFENSEGALLERY}>
                        <DescriptionCardMobile.Texts title="Defenssigalleria">
                            Lorem ipsum dolor sit amet consectetur. Id tincidunt scelerisque augue
                            leo nam diam tortor eget pharetra.
                        </DescriptionCardMobile.Texts>
                        <DescriptionCardMobile.Image
                            src={defenceGalleryMobile}
                            alt="defence gallery"
                        />
                    </DescriptionCardMobile>
                    <DescriptionCardMobileLink
                        path="/hero-development"
                        ariaLabel="link to hero development page"
                        withScalableLink={true}
                    >
                        <DescriptionCardMobile theme={DescriptionCardMobileTheme.DEFENSEGALLERY}>
                            <DescriptionCardMobile.Texts title="Torjujat">
                                Torjujat ovat ujoudeltaan tehokkaita suojautumaan kilpensä taakse.
                                Heidän kilpensä ei kuitenkaan ole loputon, vaan sekin antaa lopulta
                                periksi paineen kasvaessa.
                            </DescriptionCardMobile.Texts>
                            <DescriptionCardMobile.Image
                                src={retroflector}
                                alt="retroflector"
                                backgroundColor="#FF0000"
                            />
                        </DescriptionCardMobile>
                    </DescriptionCardMobileLink>
                </>
            ) : (
                <>
                    <DescriptionCard theme={DescriptionCardTheme.DEFENSEGALLERY}>
                        <DescriptionCard.Texts width="35%">
                            <DescriptionCard.Texts.Title>
                                Defenssigalleria
                            </DescriptionCard.Texts.Title>
                            <DescriptionCard.Texts.Body>
                                Lorem ipsum dolor sit amet consectetur. Id tincidunt scelerisque
                                augue leo nam diam tortor eget pharetra.
                            </DescriptionCard.Texts.Body>
                        </DescriptionCard.Texts>
                        <DescriptionCard.Image width="65%">
                            <DescriptionCard.Image.Image
                                src={defenceGallery}
                                alt="defence gallery"
                            />
                        </DescriptionCard.Image>
                    </DescriptionCard>
                    <DescriptionCard theme={DescriptionCardTheme.DEFENSEGALLERY}>
                        <DescriptionCard.Texts>
                            <DescriptionCard.Texts.Title>Torjujat</DescriptionCard.Texts.Title>
                            <DescriptionCard.Texts.Body>
                                Torjujat ovat ujoudeltaan tehokkaita suojautumaan kilpensä taakse.
                                Heidän kilpensä ei kuitenkaan ole loputon, vaan sekin antaa lopulta
                                periksi paineen kasvaessa.
                            </DescriptionCard.Texts.Body>
                        </DescriptionCard.Texts>
                        <DescriptionCard.Image bgColour="#FF0000">
                            <DescriptionCard.Image.Triangle />
                            <DescriptionCard.Image.Image
                                src={retroflector}
                                alt="defence gallery"
                                height={100}
                                marginLeft="20%"
                            />
                        </DescriptionCard.Image>
                    </DescriptionCard>
                </>
            )}
            <div
                style={{
                    display: 'flex',
                    gap: '.5em',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    marginTop: '.5em',
                }}
            >
                {componentsArray.map((_, index) => {
                    if (index === 0)
                        return (
                            <MobileCardLink
                                key={index}
                                path="/hero-development"
                                ariaLabel="link to hero development page"
                                withScalableLink={true}
                            >
                                <MobileCard
                                    ref={cardRef}
                                    theme={MobileCardTheme.DEFENSEGALLERY}
                                >
                                    <MobileCard.Texts
                                        title1="Mikälie"
                                        title2="Skitsofreenikko"
                                    />
                                    <MobileCard.Image
                                        backgroundColor="yellow"
                                        src={jokester}
                                        alt="Jåker"
                                    />
                                </MobileCard>
                            </MobileCardLink>
                        );
                    return (
                        <MobileCard
                            key={index}
                            theme={MobileCardTheme.DEFENSEGALLERY}
                        >
                            <MobileCard.Texts
                                title1="Torjujat"
                                title2="Ahmatti"
                            />
                            <MobileCard.Image
                                backgroundColor="#FF0000"
                                src={hannu}
                                alt="hannu hodari"
                            />
                        </MobileCard>
                    );
                })}
            </div>
        </LayoutWithSidebars>
    );
};

export default Page;
