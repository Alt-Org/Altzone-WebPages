'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { IClanCreateDto, useCreateClanMutation } from '@/entities/Clan';
import { profileActions, selectProfile } from '@/entities/Profile/model/profileSlice/profileSlice';
import { ValidationAddNewClan } from '../validations';
import { ProfileSchema } from '@/entities/Profile/types/profile';

type Props = {
    onSuccess?: () => void;
};

export const useNewClanForm = ({ onSuccess }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(ValidationAddNewClan),
    });

    const [
        create,
        {
            data,
            isLoading,
            // isError,
            error,
        },
    ] = useCreateClanMutation();

    const profile = useSelector((state: ProfileSchema) => selectProfile(state));
    const dispatch = useDispatch();

    //update store profile after creating new clan
    const handleUpdateClanId = (newClanId: string) => {
        if (profile) {
            const updatedProfile = {
                ...profile,
                Player: {
                    ...profile.Player,
                    clan_id: newClanId,
                },
            };
            dispatch(profileActions.setProfile(updatedProfile));
        } else {
            console.error('No Profile found in store');
        }
    };

    async function onFormSubmit(fieldValues: FieldValues) {
        //converting label to array of lowercase strings
        const newFieldValues = {
            ...fieldValues,
            labels: fieldValues.labels.map((item: any) => item.value.toLowerCase()),
        };

        await create(newFieldValues as IClanCreateDto);
    }

    useEffect(() => {
        if (data) {
            const clanId = data.data.Clan?._id;
            handleUpdateClanId(clanId);
            toast.success('Klaani oli  luotu!');
            onSuccess?.();
            return;
        }

        if (error) {
            // @ts-ignore todo it works but ts for some reason doesnt recognise the type, figure our why fix
            toast.error(error?.data?.message);
            return;
        }
    }, [isLoading, data, error, onSuccess]);

    return {
        register,
        handleSubmit,
        onFormSubmit,
        errors,
        setValue,
    };
};
