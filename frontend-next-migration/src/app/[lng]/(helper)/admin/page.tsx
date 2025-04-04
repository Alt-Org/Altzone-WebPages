// import { CustomEditor } from '@/shared/ui/CustomEditor';
'use client';
import { ScrollTop } from '@/features/ScrollTop';
import { ModularCard, ModularCardTheme } from '@/shared/ui/v2/ModularCard';
import hannu from '@/shared/assets/images/heros/hannu-hodari/hannu-hodari.png';
import {
    NavMenuWithDropdowns,
    NavMenuWithDropdownsProps,
} from '@/shared/ui/NavMenuWithDropdownsV2';
import { RoutePaths } from '@/shared/appLinks/RoutePaths';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import { ComingSoon } from '@/widgets/ComingSoon';
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
            // {
            //     title: 'Heroes',
            //     openByDefault: true,
            //     elements: [
            //         // links can be used as well, just add the "link" to object
            //         {
            //             elementText: 'Hero 1',
            //             id: 'hero1',
            //             link: { path: RoutePaths.HEROES, isExternal: false },
            //         },
            //         { elementText: 'Hero 2', id: 'hero2' },
            //     ],
            // },

            // {
            //     title: 'News',
            //     openByDefault: false,
            //     elements: [
            //         {
            //             elementText: 'Piece of news 1',
            //             id: 'news1',
            //             link: {
            //                 path: 'https://gamerant.com/capcom-reports-high-pc-sales/',
            //                 isExternal: true,
            //             },
            //         },
            //         { elementText: 'Piece of news 2', id: 'news2' },
            //         { elementText: 'Piece of news 3', id: 'news3' },
            //     ],
            // },
        ],
    };

    // Testing clan api
    // const clanPosition = useGetClanLeaderboardPositionQuery();

    // Testing api: get profile info
    // const dispatch = useDispatch();
    // const { data, error } = useGetProfileInfoQuery();

    // useEffect(() => {
    //     if (data?.data?.Profile) {
    //         dispatch(
    //             profileActions.setProfile({
    //                 username: data.data.Profile.username,
    //                 Player: data.data.Profile.Player,
    //                 _id: data.data.Profile._id,
    //             }),
    //         );
    //     }
    // }, []);
    return (
        <main>
            <ComingSoon />
        </main>
        // <LayoutWithSidebars
        //     // rightSidebar={di}
        //     // leftSidebar={<div></div>}
        //     leftTopSidebar={{
        //         component: (
        //             <div style={{ width: '100%', maxWidth: '600px' }}>
        //                 <NavMenuWithDropdowns {...navMenuWithDropdownsProps} />
        //             </div>
        //         ),
        //     }}
        //     rightBottomSidebar={{
        //         hideOnMobile: true,
        //         // hideOnDesktop: true,
        //         component: (
        //             <div style={{ width: '100%', maxWidth: '600px' }}>
        //                 <NavMenuWithDropdowns {...navMenuWithDropdownsProps} />
        //             </div>
        //         ),
        //     }}
        // >
        //     <h4>NavMenuWithDropdownsV2 using Clan Example</h4>
        //     <div style={{ margin: '20px' }}>
        //         <h5>
        //             Version with dropdown closed by default (mainly designed for mobile but works
        //             for both. Test in mobile resolution too)
        //         </h5>
        //     </div>
        //     <NavMenuWithDropdowns {...navMenuWithDropdownsProps2} />
        //     <div style={{ margin: '20px' }}>
        //         <h5>
        //             Static version of dropdown, mainly meant for desktop. (if staticDropdown is true
        //             dropdown will always be open)
        //         </h5>
        //     </div>
        //     <NavMenuWithDropdowns {...navMenuWithDropdownsProps3} />
        //     <div style={{ margin: '20px' }}>
        //         <h5>Static version of dropdown with subcategories, mainly meant for desktop.</h5>
        //     </div>
        //     <NavMenuWithDropdowns {...navMenuWithDropdownsProps4} />
        //     <h1>Main Page Content</h1>
        //     {/* Testing ModularCard */}
        //     <div
        //         style={{
        //             display: 'flex',
        //             gap: '10px',
        //             flexWrap: 'wrap',
        //             margin: '10px 0 20px',
        //         }}
        //     >
        //         {[{ id: 1 }, { id: 2 }].map((card) => (
        //             <div
        //                 key={card.id}
        //                 style={{
        //                     width: '100%',
        //                     // flexBasis: 'calc(50% - 5px)', // makes 2 columns, vertical gap = 10px
        //                     /*  flexBasis: 100%; on mobile tablet devices  */
        //                 }}
        //             >
        //                 <ModularCard
        //                     className="customClass"
        //                     theme={ModularCardTheme.NEWSCARD}
        //                     // onClick={() => {
        //                     //     // console.log(`clicked modularcard ${card.id}`);
        //                     // }} // Needs use-client parent
        //                     withScalableLink={true}
        //                 >
        //                     <ModularCard.Texts>
        //                         <ModularCard.Texts.Title>Title</ModularCard.Texts.Title>
        //                         <ModularCard.Texts.Body>
        //                             This is the main content, adapting to both desktop and mobile
        //                             main content, adapting to both desktop and mobile devices main
        //                             content, adapting to both desktop and mobile devices main
        //                             content, adapting to both desktop and mobile devices main
        //                             content, adapting to both desktop and mobile devices
        //                         </ModularCard.Texts.Body>
        //                         <ModularCard.Texts.Footnote>Footnote</ModularCard.Texts.Footnote>
        //                     </ModularCard.Texts>
        //                     <ModularCard.Image>
        //                         <ModularCard.Image.Triangle />
        //                         <ModularCard.Image.Image
        //                             src={hannu}
        //                             alt="hannu hodari"
        //                         />
        //                     </ModularCard.Image>
        //                 </ModularCard>
        //             </div>
        //         ))}
        //         <div
        //             style={{
        //                 width: '100%',
        //             }}
        //         >
        //             <ModularCard
        //                 className="customClass"
        //                 theme={ModularCardTheme.TITLEIMAGE}
        //                 // onClick={() => {
        //                 //     // console.log(`clicked modularcard ${card.id}`);
        //                 // }} // Needs use-client parent
        //                 path="/fi/page/details"
        //                 isExternal={false}
        //                 withScalableLink={true}
        //             >
        //                 <ModularCard.Texts>
        //                     <ModularCard.Texts.Title>Title</ModularCard.Texts.Title>
        //                 </ModularCard.Texts>
        //                 <ModularCard.Image>
        //                     <ModularCard.Image.Triangle />
        //                     <ModularCard.Image.Image
        //                         src={hannu}
        //                         alt="hannu hodari"
        //                     />
        //                 </ModularCard.Image>
        //             </ModularCard>
        //         </div>
        //     </div>
        //     <p>
        //         This is the main content, adapting to both desktop and mobile devices. This is the
        //         main content, adapting to both desktop and mobile devices
        //     </p>
        //     <p>
        //         This is the main content, adapting to both desktop and mobile devices. This is the
        //         main content, adapting to both desktop and mobile devices
        //     </p>
        //     <p>
        //         This is the main content, adapting to both desktop and mobile devices. This is the
        //         main content, adapting to both desktop and mobile devices
        //     </p>
        //     <p>
        //         This is the main content, adapting to both desktop and mobile devices. This is the
        //         main content, adapting to both desktop and mobile devices
        //     </p>
        //     <p>
        //         This is the main content, adapting to both desktop and mobile devices. This is the
        //         main content, adapting to both desktop and mobile devices
        //     </p>
        //     <p>
        //         This is the main content, adapting to both desktop and mobile devices. This is the
        //         main content, adapting to both desktop and mobile devices
        //     </p>
        //     <p>
        //         This is the main content, adapting to both desktop and mobile devices. This is the
        //         main content, adapting to both desktop and mobile devices
        //     </p>
        //     <p>
        //         This is the main content, adapting to both desktop and mobile devices. This is the
        //         main content, adapting to both desktop and mobile devices
        //     </p>
        //     <p>
        //         This is the main content, adapting to both desktop and mobile devices. This is the
        //         main content, adapting to both desktop and mobile devices
        //     </p>
        //     <p>
        //         This is the main content, adapting to both desktop and mobile devices. This is the
        //         main content, adapting to both desktop and mobile devices
        //     </p>
        //     <p>
        //         This is the main content, adapting to both desktop and mobile devices. This is the
        //         main content, adapting to both desktop and mobile devices
        //     </p>

        //     <p>This is the main content, adapting to both desktop and mobile devices.</p>
        //     <p>This is the main content, adapting to both desktop and mobile devices.</p>
        //     <p>This is the main content, adapting to both desktop and mobile devices.</p>
        //     <p>This is the main content, adapting to both desktop and mobile devices.</p>
        //     <p>This is the main content, adapting to both desktop and mobile devices.</p>
        //     <p>This is the main content, adapting to both desktop and mobile devices.</p>
        //     <p>This is the main content, adapting to both desktop and mobile devices.</p>
        //     <p>This is the main content, adapting to both desktop and mobile devices.</p>
        //     <p>This is the main content, adapting to both desktop and mobile devices.</p>
        //     <p>This is the main content, adapting to both desktop and mobile devices.</p>
        //     <p>This is the main content, adapting to both desktop and mobile devices.</p>
        //     <p>This is the main content, adapting to both desktop and mobile devices.</p>
        //     <p>This is the main content, adapting to both desktop and mobile devices.</p>
        //     <p>This is the main content, adapting to both desktop and mobile devices.</p>
        //     <p>This is the main content, adapting to both desktop and mobile devices.</p>
        //     <p>This is the main content, adapting to both desktop and mobile devices.</p>
        //     <p>This is the main content, adapting to both desktop and mobile devices.</p>
        //     <p>This is the main content, adapting to both desktop and mobile devices.</p>
        //     <p>This is the main content, adapting to both desktop and mobile devices.</p>

        //     <p>
        //         This is the main content, adapting to both desktop and mobile devices. This is the
        //         main content, adapting to both desktop and mobile devices
        //     </p>
        //     <p>
        //         This is the main content, adapting to both desktop and mobile devices. This is the
        //         main content, adapting to both desktop and mobile devices
        //     </p>
        //     <p>
        //         This is the main content, adapting to both desktop and mobile devices. This is the
        //         main content, adapting to both desktop and mobile devices
        //     </p>
        //     <p>
        //         This is the main content, adapting to both desktop and mobile devices. This is the
        //         main content, adapting to both desktop and mobile devices
        //     </p>
        //     <p>
        //         This is the main content, adapting to both desktop and mobile devices. This is the
        //         main content, adapting to both desktop and mobile devices
        //     </p>
        //     <p>
        //         This is the main content, adapting to both desktop and mobile devices. This is the
        //         main content, adapting to both desktop and mobile devices
        //     </p>
        //     <p>
        //         This is the main content, adapting to both desktop and mobile devices. This is the
        //         main content, adapting to both desktop and mobile devices
        //     </p>
        //     <p>
        //         This is the main content, adapting to both desktop and mobile devices. This is the
        //         main content, adapting to both desktop and mobile devices
        //     </p>

        //     {/* Get clan leaderboard position */}
        //     {/* {clanPosition.error ? (
        //         <p style={{ wordWrap: 'break-word', color: 'red' }}>
        //             Please login to get clan leaderboard position
        //         </p>
        //     ) : (
        //         <p style={{ wordWrap: 'break-word', color: 'green' }}>
        //             {JSON.stringify(clanPosition.data)}
        //         </p>
        //     )} */}

        //     {/* Get profile info */}
        //     {/* {error ? (
        //         <p style={{ wordWrap: 'break-word', color: 'red' }}>
        //             Please login to get profile info
        //         </p>
        //     ) : (
        //         <p style={{ wordWrap: 'break-word', color: 'green' }}>
        //             {JSON.stringify(data?.data?.Profile?.username)}
        //         </p>
        //     )} */}
        //     <ScrollTop />
        // </LayoutWithSidebars>
    );
};

export default Page;

// <div
//     style={{
//         display: 'flex',
//         justifyContent: 'center',
//         marginTop: '200px',
//     }}
// >
//     {/*better to use className for that, inline styled used only for testing*/}
//     <div style={{ width: '100%', maxWidth: '600px' }}>
//         <NavMenuWithDropdowns {...navMenuWithDropdownsProps} />
//     </div>
//
//     {/*<NavigationDropdown menuItems={menuData}/>*/}
// </div>

{
    /*<CustomEditor.CreateNewMode entityName={'News_Blog'} />*/
}
