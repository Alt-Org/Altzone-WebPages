'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { RoutePaths, getLoginPageRoute } from '@/shared/appLinks/RoutePaths';

const AuthMainPage = () => {
    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        if (pathName === `${RoutePaths.auth}` || pathName === `${RoutePaths.auth}/`) {
            router.push(getLoginPageRoute());
        }
    }, [router, pathName]);

    return null;
};

export default AuthMainPage;
