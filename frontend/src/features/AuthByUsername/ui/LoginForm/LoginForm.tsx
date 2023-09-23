import {FieldValues, useForm} from "react-hook-form";
import {CustomForm} from "@/shared/ui/CustomForm";
import cls from "./LoginForm.module.scss"
import {IUserLoginDto, useLoginMutation} from "@/entities/Auth";
import {ValidationLoginSchema} from "../../validations";
import {yupResolver} from "@hookform/resolvers/yup";
import {AppLink, AppLinkTheme} from "@/shared/ui/AppLink/AppLink";


type Props = {
    toForgottenPwPage: string;
    toRegisterPage: string;
}

export const LoginForm = ({toForgottenPwPage,toRegisterPage}: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors},
    } = useForm({
        resolver: yupResolver(ValidationLoginSchema),
    });


    const [login, { data, isLoading, isError ,error}] = useLoginMutation();


    async function onFormSubmit (fieldValues : FieldValues) {
        await login(fieldValues as IUserLoginDto);
    }


    return(
        <CustomForm  className={cls.Form} onSubmit={handleSubmit(onFormSubmit)}>

            <CustomForm.Header>
                Login
            </CustomForm.Header>

            <CustomForm.InputField
                key={"username"}
                error={errors?.username?.message}
                // error={errors?.username}
                label={"Username"}
                inputProps={{...register('username'),
                    required: true
                }}
            />

            <CustomForm.InputField
                key={"password"}
                error={errors?.password?.message}
                label={"Password"}
                inputProps={{...register('password'),
                    type: "password",
                    required: true
                }}
            />

            <CustomForm.Button type="submit">
                Submit
            </CustomForm.Button>

            <AppLink theme={AppLinkTheme.PRIMARY} to={toRegisterPage}  className={cls.registerLink}>
                {"Don't have account yet? Sign Up"}
            </AppLink>

        </CustomForm>
    )

}
