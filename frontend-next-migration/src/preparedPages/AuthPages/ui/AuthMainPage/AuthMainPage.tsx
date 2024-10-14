'use client'
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { RoutePaths } from '@/shared/appLinks/RoutePaths';

const AuthMainPage = () => {
    const router = useRouter();
    const pathName = usePathname()


    useEffect(() => {
        if (pathName === `${RoutePaths.auth}` || pathName=== `${RoutePaths.auth}/`) {
            router.push(`${RoutePaths.auth_login}`);
        }
    }, [router, pathName]);

    return null;
}

export default AuthMainPage;
