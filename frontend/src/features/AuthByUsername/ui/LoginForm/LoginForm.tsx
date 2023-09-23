import { CustomForm } from "@/shared/ui/CustomForm";
import cls from "./LoginForm.module.scss";
import { AppLink, AppLinkTheme } from "@/shared/ui/AppLink/AppLink";
import {useLoginForm} from "../../model/useLoginForm";

type Props = {
    toForgottenPwPage: string;
    toRegisterPage: string;
    onSuccessLogin: () => void;
};

export const LoginForm = ({ toForgottenPwPage, toRegisterPage, onSuccessLogin}: Props) => {
    
    const {
        register,
        handleSubmit,
        onFormSubmit,
        errors
    } = useLoginForm({onSuccessLogin});

    return (
        <CustomForm className={cls.Form} onSubmit={handleSubmit(onFormSubmit)}>
            <CustomForm.Header>
                Login
            </CustomForm.Header>
            <CustomForm.InputField
                key={"username"}
                error={errors?.username?.message}
                label={"Username"}
                inputProps={{ ...register('username'), required: true }}
            />
            <CustomForm.InputField
                key={"password"}
                error={errors?.password?.message}
                label={"Password"}
                inputProps={{ ...register('password'), type: "password", required: true }}
            />
            <CustomForm.Button type="submit">
                Submit
            </CustomForm.Button>
            <AppLink theme={AppLinkTheme.PRIMARY} to={toRegisterPage} className={cls.registerLink}>
                {"Don't have account yet? Sign Up"}
            </AppLink>
        </CustomForm>
    );
};
