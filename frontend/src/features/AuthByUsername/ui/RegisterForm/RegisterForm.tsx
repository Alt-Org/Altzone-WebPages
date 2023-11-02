import { CustomForm } from "@/shared/ui/CustomForm";
import cls from "./RegisterForm.module.scss";
import { AppLink, AppLinkTheme } from "@/shared/ui/AppLink/AppLink";
import { useRegisterForm } from "../../model/useRegisterForm";

type Props = {
    toLoginPage: string;
}

export const RegisterForm = ({ toLoginPage }: Props) => {

    const {
        register,
        handleSubmit,
        onFormSubmit,
        errors
    } = useRegisterForm(toLoginPage);

    return (
        <CustomForm className={cls.Form} onSubmit={handleSubmit(onFormSubmit)}>
            <CustomForm.Header>
                Rekisteröidy
            </CustomForm.Header>

            <CustomForm.InputField
                key={"username"}
                error={errors?.username?.message}
                label={"Käyttäjänimi"}
                inputProps={{ ...register('username'), required: true }}
            />

            <CustomForm.InputField
                key={"password"}
                error={errors?.password?.message}
                label={"Salasana"}
                inputProps={{ ...register('password'), type: "password", required: true }}
            />

            <CustomForm.InputField
                key={"repeatPassword"}
                error={errors?.repeatPassword?.message}
                label={"Toista salasana"}
                inputProps={{ ...register('repeatPassword'), type: "password", required: true }}
            />

            <CustomForm.InputField
                key={"name"}
                error={errors?.name?.message}
                label={"Nimi"}
                inputProps={{ ...register('name'), required: true }}
            />

            <CustomForm.InputField
                key={"backpackCapacity"}
                error={errors?.backpackCapacity?.message}
                label={"backpackCapacity"}
                inputProps={{ ...register('backpackCapacity'), required: true, type: "number" }}
            />

            <CustomForm.InputField
                key={"uniqueIdentifier"}
                error={errors?.uniqueIdentifier?.message}
                label={"uniqueIdentifier"}
                inputProps={{ ...register('uniqueIdentifier'), required: true }}
            />

            <CustomForm.Button type="submit">
                Lähetä
            </CustomForm.Button>

            <AppLink theme={AppLinkTheme.PRIMARY} to={toLoginPage} className={cls.loginLink}>
                {"Onko sinulla jo tili? Kirjaudu sisään"}
            </AppLink>
        </CustomForm>
    );
}
