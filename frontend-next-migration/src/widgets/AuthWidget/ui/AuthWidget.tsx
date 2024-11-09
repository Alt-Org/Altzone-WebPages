'use client';
import { redirect } from 'next/navigation';
import {
    getRouteLoginPage,
    getRouteMainPage,
    getRouteRegisterPage,
} from '@/shared/appLinks/RoutePaths';
import { LoginForm, RegisterForm } from '@/features/AuthByUsername';

type AuthWidgetProps = {
    formType: 'login' | 'register';
    toOtherPage?: string;
    redirectToOnSuccessLogin?: string;
};

const AuthWidget = ({
    formType,
    toOtherPage,
    redirectToOnSuccessLogin = getRouteMainPage(),
}: AuthWidgetProps) => {
    const handleSuccessLogin = () => {
        redirect(redirectToOnSuccessLogin);
    };

    const toOtherPageLocal =
        toOtherPage || (formType === 'register' ? getRouteLoginPage() : getRouteRegisterPage());

    const FormComponent = formType === 'login' ? LoginForm : RegisterForm;

    return (
        <FormComponent
            toLoginPage={toOtherPageLocal}
            toRegisterPage={toOtherPageLocal}
            onSuccessLogin={handleSuccessLogin}
        />
    );
};

export default AuthWidget;
