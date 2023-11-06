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
