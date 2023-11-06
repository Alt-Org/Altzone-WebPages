import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { RoutePaths } from '@/shared/appLinks/RoutePaths';

const AuthMainPage = () => {
    const router = useRouter();

    useEffect(() => {
        if (router.pathname === `${RoutePaths.auth}` || router.pathname === `${RoutePaths.auth}/`) {
            router.push(`/${RoutePaths.auth_login}`);
        }
    }, [router]);

    return (
     <></>
    );
}

export default AuthMainPage;


// import {ComponentType, useEffect} from 'react';
// import {useNavigate, useLocation} from "react-router-dom";
// import {RoutePaths} from "@/shared/appLinks/RoutePaths";
//
//
// const AuthMainPage = () => {
//     const navigate = useNavigate();
//     const { pathname } = useLocation();
//
//     useEffect(() => {
//         // Redirect to RoutePath.auth_login if the location pathname is RoutePath.auth or with a trailing slash
//         if (pathname === RoutePaths.auth || pathname === `${RoutePaths.auth}/`) {
//             navigate(RoutePaths.auth_login);
//         }
//
//     }, [pathname, navigate]);
//
//     return (
//         <> <Outlet /></>
//     )
// }
//
// export default AuthMainPage;
