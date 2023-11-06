import {RoutePaths} from "@/shared/appLinks/RoutePaths";
import {RegisterForm} from "@/features/AuthByUsername";
import {envHelper} from "@/shared/const/env/envHelper";
import {Helmet} from "react-helmet-async";

const AuthSubRegisterPage = () => {
    return (
    <>
        <Helmet>
            <title>Rekisteröidy</title>
            <meta name="description" content="Rekisteröidy Altzone-tilille ja liity peliyhteisöömme." />
            <meta name="keywords" content="altzone, peli, peliyhteisö, rekisteröidy, register, jäsenyys" />
            <link rel="canonical" href={`${envHelper.appDomain}/${RoutePaths.auth_register}`} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Rekisteröidy" />
            <meta property="og:description" content="Rekisteröidy Altzone-tilille ja liity peliyhteisöömme." />
            <meta property="og:url" content={`${envHelper.appDomain}/${RoutePaths.auth_register}`} />
        </Helmet>
        <div style={{minHeight: "100vh", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <RegisterForm toLoginPage={RoutePaths.auth_login} />
        </div>
    </>
    );
}

export default AuthSubRegisterPage;
