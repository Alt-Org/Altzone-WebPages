import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { IUserRegisterDto, useRegisterMutation } from '@/entities/Auth';
import { useClientTranslation } from '@/shared/i18n';
import { ValidationRegisterSchema } from '../validations';

export const useRegisterForm = (toLoginPage: string) => {
    const { t } = useClientTranslation('auth');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(ValidationRegisterSchema),
    });

    const [
        regist,
        {
            data,
            isLoading,
            // isError,
            error,
        },
    ] = useRegisterMutation();

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
                parentalAuth: false,
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
            // @ts-ignore todo it works but ts for some reason doesnt recognise the type, figure our why and fix
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
