'use client';
import { useClientTranslation } from '@/shared/i18n';
import { useLoginForm } from '../../model/useLoginForm';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import { BaseAuthForm } from '@/entities/Auth';
import { ReactNode } from 'react';

type Props = {
    toForgottenPwPage?: string;
    toRegisterPage: string;
    onSuccessLogin: () => void;
    extraContent?: ReactNode;
};

export const LoginForm = (props: Props) => {
    const { toRegisterPage, onSuccessLogin, toForgottenPwPage = '', extraContent } = props;

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
                        label={t('username')}
                        inputProps={{ ...register('username'), required: true }}
                    />
                    <BaseAuthForm.InputField
                        key={'password'}
                        error={errors?.password?.message && t(`${errors.password.message}`)}
                        label={t('password')}
                        inputProps={{ ...register('password'), type: 'password', required: true }}
                    />
                </>
            }
            actions={
                <>
                    <BaseAuthForm.SubmitButton>{t('send')}</BaseAuthForm.SubmitButton>
                    {extraContent && <div>{extraContent}</div>}
                    <AppLink
                        theme={AppLinkTheme.PRIMARY}
                        to={toRegisterPage}
                    >
                        {t('text_to_register')}
                    </AppLink>
                </>
            }
            onSubmit={handleSubmit(onFormSubmit)}
        />
    );
};
