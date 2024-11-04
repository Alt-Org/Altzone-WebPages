import dynamic from 'next/dynamic';

const RegisterForm = dynamic(() => import('./RegisterForm'), {
    loading: () => <p>Loading register form...</p>,
});

export default RegisterForm;
