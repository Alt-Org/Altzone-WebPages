'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { LoginForm } from '@/features/AuthByUsername';
import { getRouteMainPage, getRouteRegisterPage } from '@/shared/appLinks/RoutePaths';

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
        router.push(getRouteMainPage());
    };

    return (
        <main
            role="main"
            style={{
                minHeight: `${height}px`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <LoginForm
                toForgottenPwPage={''}
                toRegisterPage={getRouteRegisterPage()}
                onSuccessLogin={handleSuccessLogin}
            />
        </main>
    );
};

export default AuthSubLoginPage;
