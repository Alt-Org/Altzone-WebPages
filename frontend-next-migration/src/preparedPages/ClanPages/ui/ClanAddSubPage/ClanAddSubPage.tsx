import {NewClanForm} from "@/features/AddNewClan";
import cls from "./ClanAddSubPage.module.scss";
import {envHelper} from "@/shared/const/envHelper";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";
import Head from "next/head";

const ClanAddSubPage = () => (
    <div className={cls.ClanAddSubPage}>
        <Head>
            <title>Luo uusi klaani</title>
            <meta name="description" content="Luo uusi klaani ja aloita pelaaminen yhdessä ystäviesi kanssa." />
            <meta name="keywords" content=" altzone, KLAANI, klaani, peli, klaani, peliyhteisö, luo klaani, liity klaaniin" />
            <link rel="canonical" href={`${envHelper.appDomain}/${RoutePaths.clan_add_new}`} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Luo uusi klaani" />
            <meta property="og:description" content="Luo uusi klaani ja aloita pelaaminen yhdessä ystäviesi kanssa." />
            <meta property="og:url" content={`${envHelper.appDomain}/${RoutePaths.clan_add_new}`} />
        </Head>
        <NewClanForm onSuccess={()=> console.log()} className={cls.NewClanForm}/>
    </div>
);

export default ClanAddSubPage;
