'use client';
import { useClientTranslation } from '@/shared/i18n';
import { useLoginForm } from '../../model/useLoginForm';
import { BaseAuthForm } from '@/entities/Auth';
import { ReactNode } from 'react';
import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';

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
        <div
            onMouseLeave={handleFormMouseEvents}
            style={{ width: '100%' }}
        >
            <BaseAuthForm
                header={t('log_in')}
                fields={
                    <>
                        <BaseAuthForm.InputField
                            key={'username'}
                            error={errors?.username?.message && t(`${errors.username.message}`)}
                            label={t('username')}
                            inputProps={{
                                ...register('username'),
                                required: true,
                                autoComplete: 'username',
                            }}
                        />
                        <BaseAuthForm.InputField
                            key={'password'}
                            error={errors?.password?.message && t(`${errors.password.message}`)}
                            label={t('password')}
                            inputProps={{
                                ...register('password'),
                                type: 'password',
                                required: true,
                                autoComplete: 'current-password',
                            }}
                            showPasswordToggle={true}
                        />
                        <BaseAuthForm.Checkbox label={t('remember_me')} />
                    </>
                }
                actions={
                    <>
                        <BaseAuthForm.SubmitButton>{t('log_in')}</BaseAuthForm.SubmitButton>
                        <p>
                            {t('register_in_game_prefix')}{' '}
                            <a
                                href={AppExternalLinks.downloadAndroid}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {t('register_in_game_link')}
                            </a>
                        </p>
                        {extraContent && <div>{extraContent}</div>}
                    </>
                }
                onSubmit={handleSubmit(onFormSubmit)}
            />
        </div>
    );
};

export default LoginForm;
