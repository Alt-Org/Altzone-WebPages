import { CustomForm } from "@/shared/ui/CustomForm";
import cls from "./NewClanForm.module.scss";
import {useNewClanForm} from "../../model/useNewClanForm";
import {classNames} from "@/shared/lib/classNames/classNames";

type Props = {
    onSuccess: () => void;
    className?: string;
};

export const NewClanForm = ({onSuccess, className = ""}: Props) => {

    const {
        register,
        handleSubmit,
        onFormSubmit,
        errors
    } = useNewClanForm({onSuccess});

    return (
        <CustomForm className={classNames(cls.Form, {}, [className])} onSubmit={handleSubmit(onFormSubmit)}>
            <CustomForm.Header>
                Luo Klaani
            </CustomForm.Header>

            <CustomForm.InputField
                key={"name"}
                error={errors?.name?.message}
                label={"Name"}
                inputProps={{ ...register('name'), required: true }}
            />

            <CustomForm.InputField
                key={"gameCoins"}
                error={errors?.gameCoins?.message}
                label={"Game coins"}
                inputProps={{ ...register('gameCoins'), required: true , type: "number"}}
            />

            <CustomForm.InputField
                key={"tag"}
                error={errors?.tag?.message}
                label={"Tag"}
                inputProps={{ ...register('tag'), required: true }}
            />

            <CustomForm.Button type="submit">
                Submit
            </CustomForm.Button>

        </CustomForm>
    );
};
