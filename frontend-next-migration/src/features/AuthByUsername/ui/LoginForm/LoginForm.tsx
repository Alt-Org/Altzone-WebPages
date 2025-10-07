'use client';
import { useClientTranslation } from '@/shared/i18n';
import { useLoginForm } from '../../model/useLoginForm';
import { BaseAuthForm } from '@/entities/Auth';
import { ReactNode } from 'react';

export interface LoginFormProps {
    onSuccessLogin?: () => void;
    extraContent?: ReactNode;
}

const LoginForm = (props: LoginFormProps) => {
    const { onSuccessLogin = function () {}, extraContent } = props;
    const { t } = useClientTranslation('auth');
    const { register, handleSubmit, onFormSubmit, errors } = useLoginForm({ onSuccessLogin });

    const handleFormMouseEvents = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    return (
        <div onMouseLeave={handleFormMouseEvents}>
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
                                autoComplete: 'username',
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
                                autoComplete: 'current-password',
                            }}
                            showPasswordToggle={true}
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
        </div>
    );
};

export default LoginForm;
