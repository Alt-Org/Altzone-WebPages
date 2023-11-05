import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { ValidationAddNewClan } from '../validations';
import {IClanCreateDto,useCreateClanMutation} from "@/entities/Clan";


type Props = {
    onSuccess: () => void;
}

export const useNewClanForm = ({onSuccess}: Props) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(ValidationAddNewClan),
    });


    const [create, { data, isLoading, isError, error }] = useCreateClanMutation();

    async function onFormSubmit(fieldValues: FieldValues) {
        await create(fieldValues as IClanCreateDto);
    }

    useEffect(() => {
        if (data) {
            toast.success('Klaani oli  luotu!');
            onSuccess();
            return;
        }

        if (error) {
            // @ts-ignore
            toast.error(error?.data?.message);
            return;
        }
    }, [isLoading]);

    return {
        register,
        handleSubmit,
        onFormSubmit,
        errors,
    };
};
