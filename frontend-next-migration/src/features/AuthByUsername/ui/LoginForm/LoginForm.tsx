'use client';
import { useClientTranslation } from '@/shared/i18n';
import { useLoginForm } from '../../model/useLoginForm';
import { BaseAuthForm } from '@/entities/Auth';
import { ReactNode } from 'react';

export interface LoginFormProps {
    toForgottenPwPage?: string;
    toRegisterPage: string;
    onSuccessLogin?: () => void;
    extraContent?: ReactNode;
}

const LoginForm = (props: LoginFormProps) => {
    const {
        toRegisterPage,
        onSuccessLogin = function () {},
        toForgottenPwPage = '',
        extraContent,
    } = props;

    const { t } = useClientTranslation('auth');
    const { register, handleSubmit, onFormSubmit, errors } = useLoginForm({ onSuccessLogin });

    return (
        <BaseAuthForm
            header={t('log_in')}
            fields={
                <>
                    <BaseAuthForm.InputField
                        key={'username'}
                        error={errors?.username?.message && t(`${errors.username.message}`)}
                        label={t('')}
                        inputProps={{
                            ...register('username'),
                            required: true,
                            placeholder: t('username'),
                        }}
                    />
                    <BaseAuthForm.InputField
                        key={'password'}
                        error={errors?.password?.message && t(`${errors.password.message}`)}
                        label={t('')}
                        inputProps={{
                            ...register('password'),
                            type: 'password',
                            required: true,
                            placeholder: t('password'),
                        }}
                    />
                </>
            }
            actions={
                <>
                    <BaseAuthForm.SubmitButton>{t('log_in')}</BaseAuthForm.SubmitButton>
                    {extraContent && <div>{extraContent}</div>}
                </>
            }
            onSubmit={handleSubmit(onFormSubmit)}
        />
    );
};

export default LoginForm;
