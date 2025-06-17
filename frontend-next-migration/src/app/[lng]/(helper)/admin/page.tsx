// import { CustomEditor } from '@/shared/ui/CustomEditor';
'use client';
import { ModularCard, ModularCardTheme } from '@/shared/ui/v2/ModularCard';
import hannu from '@/shared/assets/images/heros/hannu-hodari/hannu-hodari.png';
import vihapuhe from '@/shared/assets/images/heros/hate-speech/Vihapuhe.png';
import jokester from '@/shared/assets/images/heros/jokester/Jokester.png';
import sleeper from '@/shared/assets/images/heros/sleeper/Sleeper_new.png';
import fatePriest from '@/shared/assets/images/heros/fate-priest/fate-priest.png';
import mirror from '@/shared/assets/images/heros/mirror/Mirror.png';
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
import cls from '@/shared/ui/v2/ModularCard/ui/ModularCard.module.scss';

// import ChatBotComponent from '@/features/Chatbot/ChatBot'; // Uncomment if needed
// import { useGetProfileInfoQuery, profileActions } from '@/entities/Profile/';
// import { useGetClanLeaderboardPositionQuery } from '@/entities/Clan/';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';

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

    const { t } = useClientTranslation('admin');
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
            {/* Testing ModularCard */}
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
        </LayoutWithSidebars>
    );
};

export default Page;
