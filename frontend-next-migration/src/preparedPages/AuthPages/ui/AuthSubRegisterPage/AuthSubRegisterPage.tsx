import { RegisterForm } from '@/features/AuthByUsername';
import { RoutePaths } from '@/shared/appLinks/RoutePaths';

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
            <RegisterForm toLoginPage={RoutePaths.auth_login} />
        </div>
    );
};

export default AuthSubRegisterPage;
