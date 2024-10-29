import Head from 'next/head';
import { NewClanForm } from '@/features/AddNewClan';
import { envHelper } from '@/shared/const/envHelper';
import { getNewClanPageRoute } from '@/shared/appLinks/RoutePaths';
import cls from './ClanAddSubPage.module.scss';

const ClanAddSubPage = () => (
    <div className={cls.ClanAddSubPage}>
        <Head>
            <title>Luo uusi klaani</title>
            <meta
                name="description"
                content="Luo uusi klaani ja aloita pelaaminen yhdessä ystäviesi kanssa."
            />
            <meta
                name="keywords"
                content=" altzone, KLAANI, klaani, peli, klaani, peliyhteisö, luo klaani, liity klaaniin"
            />
            <link
                rel="canonical"
                href={`${envHelper.appDomain}/${getNewClanPageRoute()}`}
            />
            <meta
                property="og:type"
                content="website"
            />
            <meta
                property="og:title"
                content="Luo uusi klaani"
            />
            <meta
                property="og:description"
                content="Luo uusi klaani ja aloita pelaaminen yhdessä ystäviesi kanssa."
            />
            <meta
                property="og:url"
                content={`${envHelper.appDomain}/${getNewClanPageRoute()}`}
            />
        </Head>
        <NewClanForm className={cls.NewClanForm} />
    </div>
);

export default ClanAddSubPage;
