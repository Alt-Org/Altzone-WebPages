'use client'
import { CustomForm } from "@/shared/ui/CustomForm";
import cls from "./RegisterForm.module.scss";
import { AppLink, AppLinkTheme } from "@/shared/ui/AppLink/AppLink";
import { useRegisterForm } from "../../model/useRegisterForm";
import { useClientTranslation } from "@/shared/i18n";

type Props = {
    toLoginPage: string;
}

export const RegisterForm = ({ toLoginPage }: Props) => {

    const { t } = useClientTranslation("auth");

    const {
        register,
        handleSubmit,
        onFormSubmit,
        errors
    } = useRegisterForm(toLoginPage);

    return (
        <CustomForm className={cls.Form} onSubmit={handleSubmit(onFormSubmit)}>
            <CustomForm.Header>
                {t("register")}
            </CustomForm.Header>

            <CustomForm.InputField
                key={"username"}
                error={errors?.username?.message && t(`${errors?.username?.message}`)}
                label={t("username")}
                inputProps={{ ...register('username'), required: true }}
            />

            <CustomForm.InputField
                key={"password"}
                error={errors?.password?.message && t(`${errors?.password?.message}`)}
                label={t("password")}
                inputProps={{ ...register('password'), type: "password", required: true }}
            />

            <CustomForm.InputField
                key={"repeatPassword"}
                error={errors?.repeatPassword?.message && t(`${errors?.repeatPassword?.message}`)}
                label={t("password_again")}
                inputProps={{ ...register('repeatPassword'), type: "password", required: true }}
            />

            <CustomForm.Checkbox
                key={"ageConsent"}
                error={errors?.ageConsent?.message && t(`${errors?.ageConsent?.message}`)}
                label={t("age_Consent")}
                inputProps={{ ...register('ageConsent', { required: true }) }}
            />


            <CustomForm.Button type="submit">
                {t('send')}
            </CustomForm.Button>

            <AppLink theme={AppLinkTheme.PRIMARY} to={toLoginPage} className={cls.loginLink}>
                {t("text_to_login")}
            </AppLink>
        </CustomForm>
    );
}
