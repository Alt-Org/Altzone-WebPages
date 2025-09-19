'use client';
import { useClientTranslation } from '@/shared/i18n';
import { useRegisterForm } from '../../model/useRegisterForm';
import { BaseAuthForm } from '@/entities/Auth';
import { ReactNode } from 'react';

export interface RegisterFormProps {
    toLoginPage: string;
    extraContent?: ReactNode;
}

const RegisterForm = (props: RegisterFormProps) => {
    const { toLoginPage, extraContent } = props;

    const { t } = useClientTranslation('auth');
    const { register, handleSubmit, onFormSubmit, errors } = useRegisterForm();

    return (
        <BaseAuthForm
            header={t('register')}
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
                        showPasswordToggle={true}
                    />
                    <BaseAuthForm.InputField
                        key={'repeatPassword'}
                        error={
                            errors?.repeatPassword?.message && t(`${errors.repeatPassword.message}`)
                        }
                        label={t('')}
                        inputProps={{
                            ...register('repeatPassword'),
                            type: 'password',
                            required: true,
                            placeholder: t('password_again'),
                        }}
                        showPasswordToggle={true}
                    />
                    <BaseAuthForm.Checkbox
                        key={'ageConsent'}
                        error={errors?.ageConsent?.message && t(`${errors.ageConsent.message}`)}
                        label={t('age_Consent')}
                        inputProps={{ ...register('ageConsent', { required: true }) }}
                    />
                </>
            }
            actions={
                <>
                    <BaseAuthForm.SubmitButton>{t('register')}</BaseAuthForm.SubmitButton>
                    {extraContent && <div>{extraContent}</div>}
                </>
            }
            onSubmit={handleSubmit(onFormSubmit)}
        />
    );
};

export default RegisterForm;
