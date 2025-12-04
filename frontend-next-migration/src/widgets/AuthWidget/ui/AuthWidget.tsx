'use client';
import { redirect } from 'next/navigation';
import { getRouteMainPage } from '@/shared/appLinks/RoutePaths';
import { LoginForm, RegisterForm } from '@/features/AuthByUsername';

type AuthWidgetProps = {
    formType: 'login' | 'register';
    redirectToOnSuccessLogin?: string;
};

const AuthWidget = ({
    formType,
    redirectToOnSuccessLogin = getRouteMainPage(),
}: AuthWidgetProps) => {
    const handleSuccessLogin = () => {
        redirect(redirectToOnSuccessLogin);
    };

    if (formType === 'login') {
        return <LoginForm onSuccessLogin={handleSuccessLogin} />;
    }

    return <RegisterForm />;
};

export default AuthWidget;
