'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/features/AuthByUsername';
import {RoutePaths} from "@/shared/appLinks/RoutePaths";

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
