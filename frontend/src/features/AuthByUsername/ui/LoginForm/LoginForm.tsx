import {FieldValues, useForm} from "react-hook-form";
import {CustomForm} from "@/shared/ui/CustomForm";
import cls from "./LoginForm.module.scss"
import {IUserLoginDto, useLoginMutation} from "@/entities/Auth";
import {ValidationLoginSchema} from "../../validations";
import {yupResolver} from "@hookform/resolvers/yup";

export const LoginForm = () => {

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

        </CustomForm>
    )

}
