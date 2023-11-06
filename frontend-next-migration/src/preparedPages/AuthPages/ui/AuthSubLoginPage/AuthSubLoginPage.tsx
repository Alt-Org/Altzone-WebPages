'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { LoginForm } from '@/features/AuthByUsername';
import Head from 'next/head';
import {RoutePaths} from "@/shared/appLinks/RoutePaths";
import {envHelper} from "@/shared/const/env/envHelper";

const AuthSubLoginPage = () => {
    const router = useRouter();

    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerHeight !== height) {
                setHeight(window.innerHeight);
            }
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
        };
    }, [height]);

    const handleSuccessLogin = () => {
        router.push(RoutePaths.MAIN);
    };

    return (
        <>
            <Head>
                <title>Kirjaudu sisään</title>
                <meta name="description" content="Kirjaudu sisään Altzone-tilillesi ja liity peliyhteisöömme." />
                <meta name="keywords" content="altzone, peli, peliyhteisö, kirjaudu sisään, login, jäsen" />
                <link rel="canonical" href={`${envHelper.appDomain}/${RoutePaths.auth_login}`} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Kirjaudu sisään" />
                <meta property="og:description" content="Kirjaudu sisään Altzone-tilillesi ja liity peliyhteisöömme." />
                <meta property="og:url" content={`${envHelper.appDomain}/${RoutePaths.auth_login}`} />
            </Head>
            <div style={{ minHeight: `${height}px`, display: "flex", justifyContent: "center", alignItems: "center"}}>
                <LoginForm
                    toForgottenPwPage={""}
                    toRegisterPage={RoutePaths.auth_register}
                    onSuccessLogin={handleSuccessLogin}
                />
            </div>
        </>
    );
}

export default AuthSubLoginPage;
