import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ValidationRegisterSchema } from '../validations';
import { IUserRegisterDto, useRegisterMutation } from '@/entities/Auth';
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useClientTranslation } from '@/shared/i18n';

export const useRegisterForm = (toLoginPage: string) => {

    const {t} = useClientTranslation("auth");

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
                uniqueIdentifier: fieldValues.username,
                backpackCapacity: 100,
                name: fieldValues.username,
                above13: fieldValues.ageConsent,
            },
        };
        await regist(ObjectToBeSent);
    }

    useEffect(() => {
        if (data) {
            toast.success(t('account-created'));
            return;
        }

        if (error) {
            // @ts-ignore
            toast.error(error?.data?.message[0] ?? error?.data?.message);
            return;
        }
    }, [isLoading, data, error, t]);


    return {
        register,
        handleSubmit,
        onFormSubmit,
        errors,
        toLoginPage,
    };
};
