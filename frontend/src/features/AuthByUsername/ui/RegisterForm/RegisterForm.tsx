import {CustomForm} from "@/shared/ui/CustomForm";
import cls from "./RegisterForm.module.scss"
import {AppLink, AppLinkTheme} from "@/shared/ui/AppLink/AppLink";
import {useRegisterForm} from "../../model/useRegisterForm";


type Props = {
    toLoginPage: string;
}

export const RegisterForm = ({toLoginPage}: Props) => {

    const {
        register,
        handleSubmit,
        onFormSubmit,
        errors
    } = useRegisterForm(toLoginPage);

    return(
        <CustomForm  className={cls.Form} onSubmit={handleSubmit(onFormSubmit)}>

            <CustomForm.Header>
                Register
            </CustomForm.Header>

            <CustomForm.InputField
                key={"username"}
                error={errors?.username?.message}
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


            <CustomForm.InputField
                key={"repeatPassword"}
                error={errors?.repeatPassword?.message}
                label={"Repeat password"}
                inputProps={{...register('repeatPassword'),
                    type: "password",
                    required: true
                }}
            />


            <CustomForm.InputField
                key={"name"}
                error={errors?.name?.message}
                label={"Name"}
                inputProps={{...register('name'),
                    required: true
                }}
            />


            <CustomForm.InputField
                key={"backpackCapacity"}
                error={errors?.backpackCapacity?.message}
                label={"Backpack Capacity"}
                inputProps={{...register('backpackCapacity'),
                    required: true,
                    type: "number"
                }}
            />

            <CustomForm.InputField
                key={"uniqueIdentifier"}
                error={errors?.uniqueIdentifier?.message}
                label={"Unique Identifier"}
                inputProps={{...register('uniqueIdentifier'),
                    required: true
                }}
            />


            <CustomForm.Button type="submit">
                Submit
            </CustomForm.Button>


            <AppLink theme={AppLinkTheme.PRIMARY} to={toLoginPage}  className={cls.loginLink}>
                {"Already have account? Sign In"}
            </AppLink>

        </CustomForm>
    )

}
