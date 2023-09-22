import {FieldValues, useForm} from "react-hook-form";
import {CustomForm} from "@/shared/ui/CustomForm";
import cls from "./LoginForm.module.scss"
import {IUserLoginDto, useLoginMutation} from "@/entities/Auth";
import {Validations} from "../../validations";


export const LoginForm = () => {

    const {
        register,
        handleSubmit,
        formState: { errors},
    } = useForm();


    const [login, { data, isLoading, isError ,error}] = useLoginMutation();


    async function onFormSubmit (fieldValues : FieldValues) {
        await login(fieldValues as IUserLoginDto);
    }


    return(
        <CustomForm  className={cls.Form} onSubmit={handleSubmit(onFormSubmit)}>

            {JSON.stringify(isError)}
            {JSON.stringify(data)}

            <CustomForm.Header>
                Login
            </CustomForm.Header>

            <CustomForm.InputField
                key={"username"}
                error={errors?.username?.message}
                label={"Username"}
                inputProps={{...register('username',
                        {
                            ...Validations.username
                        }
                    ),
                    required: true
                }}
            />

            <CustomForm.InputField
                key={"password"}
                error={errors?.password && (errors?.password?.message || 'Please enter a valid password') }
                label={"Password"}
                inputProps={{...register('password',
                        {
                    ...Validations.password
                    }),
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
