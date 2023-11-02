import { useState, useEffect } from 'react';
import { ComponentType } from 'react';
import { RoutePaths } from '@/shared/appLinks/RoutePaths';
import { LoginForm } from '@/features/AuthByUsername';
import {useNavigate} from 'react-router-dom';



type Props = {
    HasOutletChildren: ComponentType;
}

const AuthSubLoginPage = ({ HasOutletChildren }: Props) => {
    const navigate = useNavigate();

    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [height]);

    useEffect(() => {
        const handleResize = () => {
            if(window.innerHeight !== height){
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

    return (
        <>
            <div style={{ minHeight: `${height}px`, display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <LoginForm
                        toForgottenPwPage={""}
                        toRegisterPage={RoutePaths.auth_register}
                        onSuccessLogin={() => navigate(RoutePaths.MAIN)}
                    />
            </div>
            <HasOutletChildren />
        </>
    );
}

export default AuthSubLoginPage;
