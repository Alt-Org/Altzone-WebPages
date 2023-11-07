'use client'
import {Navbar} from "@/widgets/Navbar";
import cls from './MembersPage.module.scss'
import {MembersSection} from "@/widgets/MembersSection";
import {classNames} from "@/shared/lib/classNames/classNames";
import backgroundImg from '@/shared/assets/images/clanBg/space.webp'
import {withBackgroundImage} from "@/shared/lib/hocs/withBackgroundImage";
import {ScrollTop} from "@/features/ScrollTop";
import {envHelper} from "@/shared/const/env/envHelper";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";
import Head from "next/head";

const MembersPage = () => {
    return (
        <div className={classNames(cls.MembersPage)}>
            <Head>
                <title>Tiimi</title>
                <meta name="description" content="Tutustu Altzone-projektin tiimiin, joka on omistautunut luomaan mieleenpainuvia pelikokemuksia ja sarjakuvagallerioita." />
                <meta name="keywords" content="altzone, tiimi, kehittäjät, sarjakuvat, pelit, yhteisö" />
                <link rel="canonical" href={`${envHelper.appDomain}/${RoutePaths.MEMBERS}`} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Tiimi - Altzone" />
                <meta property="og:description" content="Tutustu Altzone-projektin tiimiin, joka on omistautunut luomaan mieleenpainuvia pelikokemuksia ja sarjakuvagallerioita." />
                <meta property="og:url" content={`${envHelper.appDomain}/${RoutePaths.MEMBERS}`} />
            </Head>

            {/*<div className={cls.backgroundOpacity}></div>*/}
            <div className={cls.navbarWrapper}>
            <Navbar overlayed={true} className={cls.navbar}/>
            </div>
            <MembersSection  className={cls.workersSection}/>
            <ScrollTop/>
        </div>
    );
};

export default  withBackgroundImage({
    alt: "Members-Page space background",
    imagePath: backgroundImg  as unknown as string,
    shouldBeLazyLoaded: true
})(MembersPage);


