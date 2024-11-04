import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';
import {
    getRouteLoginPage,
    getRouteMainPage,
    getRouteRegisterPage,
} from '@/shared/appLinks/RoutePaths';

// @ts-ignore
const DynamicLoginForm = dynamic(() => import('@/features/AuthByUsername/ui/LoginForm/LoginForm'), {
    loading: () => <p>Loading login form...</p>,
});
// @ts-ignore
const DynamicRegisterForm = dynamic(
    () => import('@/features/AuthByUsername/ui/RegisterForm/RegisterForm'),
    {
        loading: () => <p>Loading register form...</p>,
    },
);

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

    const FormComponent = formType === 'login' ? DynamicLoginForm : DynamicRegisterForm;

    return (
        <FormComponent
        // toLoginPage={toOtherPageLocal}
        // toRegisterPage={toOtherPageLocal}
        // onSuccessLogin={handleSuccessLogin}
        />
    );
};

export default AuthWidget;
