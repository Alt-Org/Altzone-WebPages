'use client'
import { CustomForm } from "@/shared/ui/CustomForm";
import cls from "./LoginForm.module.scss";
import { AppLink, AppLinkTheme } from "@/shared/ui/AppLink/AppLink";
import {useLoginForm} from "../../model/useLoginForm";
import {useClientTranslation} from "@/shared/i18n";

type Props = {
    toForgottenPwPage: string;
    toRegisterPage: string;
    onSuccessLogin: () => void;
};

export const LoginForm = ({ toForgottenPwPage, toRegisterPage, onSuccessLogin}: Props) => {

    const {t} = useClientTranslation("auth");

    const {
        register,
        handleSubmit,
        onFormSubmit,
        errors
    } = useLoginForm({onSuccessLogin});

    return (
        <CustomForm className={cls.Form} onSubmit={handleSubmit(onFormSubmit)}>
            <CustomForm.Header>
                {t('log_in')}
            </CustomForm.Header>
            <CustomForm.InputField
                key={"username"}
                error={errors?.username?.message && t(`${errors?.username?.message}`)}
                label={t('username')}
                inputProps={{ ...register('username'), required: true }}
            />
            <CustomForm.InputField
                key={"password"}
                error={errors?.password?.message  && t(`${errors?.password?.message}`)}
                label={t('password')}
                inputProps={{ ...register('password'), type: "password", required: true }}
            />
            <CustomForm.Button type="submit">
                {t('send')}
            </CustomForm.Button>
            <AppLink theme={AppLinkTheme.PRIMARY} to={toRegisterPage} className={cls.registerLink}>
                {t("text_to_register")}
            </AppLink>
        </CustomForm>
    );
};
