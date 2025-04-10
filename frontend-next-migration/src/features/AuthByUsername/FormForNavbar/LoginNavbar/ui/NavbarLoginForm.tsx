'use client';
import { useRouter } from 'next/navigation';
import LoginForm from '@/features/AuthByUsername/ui/LoginForm/LoginForm';
import styles from './NavbarLoginForm.module.scss';

const NavbarLoginForm = () => {
    const router = useRouter();

    const handleSuccessLogin = () => {
        router.refresh();
    };

    return (
        <div className="p-4 w-64 bg-white rounded shadow">
            <LoginForm
                toForgottenPwPage="/auth/forgottenPassword"
                toRegisterPage="/auth/register"
                onSuccessLogin={handleSuccessLogin}
            />
        </div>
    );
};

export default NavbarLoginForm;
