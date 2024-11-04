import { redirect } from 'next/navigation';
import { LoginForm, RegisterForm } from '@/features/AuthByUsername';
import {
    getRouteLoginPage,
    getRouteMainPage,
    getRouteRegisterPage,
} from '@/shared/appLinks/RoutePaths';

type AuthWidgetProps = {
    formType: 'login' | 'register';
    toOtherPage?: string;
    redirectToOnSuccessLogin?: string;
};

const AuthWidget = (props: AuthWidgetProps) => {
    const { formType, toOtherPage, redirectToOnSuccessLogin = getRouteMainPage() } = props;

    const handleSuccessLogin = () => {
        redirect(redirectToOnSuccessLogin);
    };

    const toOtherPageLocal =
        toOtherPage || (formType === 'register' ? getRouteLoginPage() : getRouteRegisterPage());

    const FormComponent =
        formType === 'login'
            ? () => (
                  <LoginForm
                      toRegisterPage={toOtherPageLocal}
                      onSuccessLogin={handleSuccessLogin}
                  />
              )
            : () => (
                  <RegisterForm
                      toLoginPage={toOtherPageLocal}
                      // just sample how it could work in future, in this case we could create another feature e.g. authByGoogle
                      // extraContent={<button onClick={handleRegisterLogin}>Register with Google</button>}
                  />
              );

    return <FormComponent />;
};

export default AuthWidget;
