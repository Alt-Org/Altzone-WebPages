import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ValidationRegisterSchema } from '../validations';
import { IUserRegisterDto, useRegisterMutation } from '@/entities/Auth';
import { useEffect } from "react";
import { toast } from "react-toastify";

export const useRegisterForm = (toLoginPage: string) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(ValidationRegisterSchema),
    });

    const [regist, { data, isLoading, isError, error }] = useRegisterMutation();

    async function onFormSubmit(fieldValues: FieldValues) {
        const ObjectToBeSent: IUserRegisterDto = {
            username: fieldValues.username,
            password: fieldValues.password,
            repeatPassword: fieldValues.password,
            Player: {
                uniqueIdentifier: fieldValues.uniqueIdentifier,
                backpackCapacity: fieldValues.backpackCapacity,
                name: fieldValues.name,
                above13: fieldValues.ageConsent,
            },
        };
        console.log(ObjectToBeSent);
        await regist(ObjectToBeSent);
    }

    useEffect(() => {
        if (data) {
            toast.success('Tili on luotu!');
            console.log(data);
            return;
        }

        if (error) {
            // @ts-ignore
            console.log(error);
            toast.error(error?.data?.message[0] ?? error?.data?.message);
            return;
        }
    }, [isLoading, data, error]);


    return {
        register,
        handleSubmit,
        onFormSubmit,
        errors,
        toLoginPage,
    };
};
