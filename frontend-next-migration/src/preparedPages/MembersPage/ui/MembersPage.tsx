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
import {useParams} from "next/navigation";
import {useClientTranslation} from "@/shared/i18n";

const MembersPage = () => {

    const params = useParams();
    const lng = params.lng as string;
    const {t} = useClientTranslation(lng, "members");

    return (
        <div className={classNames(cls.MembersPage)}>
            <Head>
                <title>{t('head-title')}</title>
                <meta name="description" content={t('head-description')} />
                <meta name="keywords" content="altzone, tiimi, kehittäjät, sarjakuvat, pelit, yhteisö" />
                <link rel="canonical" href={`${envHelper.appDomain}/${RoutePaths.MEMBERS}`} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={t('head-title')} />
                <meta property="og:description" content={t('head-description')} />
                <meta property="og:url" content={`${envHelper.appDomain}/${RoutePaths.MEMBERS}`} />
            </Head>

            {/*<div className={cls.backgroundOpacity}></div>*/}
            <div className={cls.navbarWrapper}>
            <Navbar overlaid={true} className={cls.navbar}/>
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


