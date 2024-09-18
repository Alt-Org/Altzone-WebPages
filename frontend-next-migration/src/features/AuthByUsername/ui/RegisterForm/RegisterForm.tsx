'use client'
import { CustomForm } from "@/shared/ui/CustomForm";
import cls from "./RegisterForm.module.scss";
import { AppLink, AppLinkTheme } from "@/shared/ui/AppLink/AppLink";
import { useRegisterForm } from "../../model/useRegisterForm";
import {useParams} from "next/navigation";
import {useClientTranslation} from "@/shared/i18n";

type Props = {
    toLoginPage: string;
}

export const RegisterForm = ({ toLoginPage }: Props) => {

    const params = useParams();
    const lng = params.lng as string;
    const {t} = useClientTranslation(lng, "auth");


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
                error={errors?.password?.message  && t(`${errors?.password?.message}`)}
                label={t("password")}
                inputProps={{ ...register('password'), type: "password", required: true }}
            />

            <CustomForm.InputField
                key={"repeatPassword"}
                error={errors?.repeatPassword?.message && t(`${errors?.repeatPassword?.message}`)}
                label={t("password_again")}
                inputProps={{ ...register('repeatPassword'), type: "password", required: true }}
            />

            <CustomForm.InputField
                key={"name"}
                error={errors?.name?.message && t(`${errors?.name?.message}`)}
                label={t('name')}
                inputProps={{ ...register('name'), required: true }}
            />

            <CustomForm.InputField
                key={"backpackCapacity"}
                error={errors?.backpackCapacity?.message && t(`${errors?.backpackCapacity?.message}`)}
                label={t("backpackCapacity")}
                inputProps={{ ...register('backpackCapacity'), required: true, type: "number" }}
            />

            <CustomForm.InputField
                key={"uniqueIdentifier"}
                error={errors?.uniqueIdentifier?.message && t(`${errors?.uniqueIdentifier?.message}`)}
                label={t("uniqueIdentifier")}
                inputProps={{ ...register('uniqueIdentifier'), required: true }}
            />

            <CustomForm.Checkbox
                key={"ageConsent"}
                error={errors?.ageConsent?.message && t(`${errors?.ageConsent?.message}`)}
                // todo add i18n
                label={t("I confirm that I am at least 13 years old and I agree to the collection of necessary data.")}
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
