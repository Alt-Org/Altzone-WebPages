import dynamic from 'next/dynamic';
import { LoginFormProps } from './LoginForm';

const LoginForm = dynamic<LoginFormProps>(() => import('./LoginForm'), {
    loading: () => <p>Loading login form...</p>,
});

export default LoginForm;
