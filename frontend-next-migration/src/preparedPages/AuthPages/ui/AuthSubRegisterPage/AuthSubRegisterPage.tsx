import { RegisterForm } from '@/features/AuthByUsername';
import { getLoginPageRoute } from '@/shared/appLinks/RoutePaths';

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
            <RegisterForm toLoginPage={getLoginPageRoute()} />
        </div>
    );
};

export default AuthSubRegisterPage;
