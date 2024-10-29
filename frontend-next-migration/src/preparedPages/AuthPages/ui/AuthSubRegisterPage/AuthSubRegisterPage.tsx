import { RegisterForm } from '@/features/AuthByUsername';
import { getRouteLoginPage } from '@/shared/appLinks/RoutePaths';

const AuthSubRegisterPage = () => {
    return (
        <div
            style={{
                minHeight: '100vh',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <RegisterForm toLoginPage={getRouteLoginPage()} />
        </div>
    );
};

export default AuthSubRegisterPage;
