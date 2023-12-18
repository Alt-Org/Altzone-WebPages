// import {Helmet} from "react-helmet-async";
import {envHelper} from "@/shared/const/env/envHelper";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";

import Head from "next/head";

function PrivacyPage() {
    return (
        <div>
            <Head>
                <title>Yksityisyyskäytäntö</title>
                <meta name="description" content="Tutustu AltZonen yksityisyyskäytäntöön ja saa tietää, miten käsittelemme henkilötietojasi." />
                <meta name="keywords" content="altzone, yksityisyyskäytäntö, tietosuoja, henkilötiedot" />
                <link rel="canonical" href={`${envHelper.appDomain}/${RoutePaths.PRIVACY}`} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Yksityisyyskäytäntö - Altzone" />
                <meta property="og:description" content="Tutustu AltZonen yksityisyyskäytäntöön ja saa tietää, miten käsittelemme henkilötietojasi." />
                <meta property="og:url" content={`${envHelper.appDomain}/${RoutePaths.PRIVACY}`} />
            </Head>



        </div>
    );
}

export default PrivacyPage;