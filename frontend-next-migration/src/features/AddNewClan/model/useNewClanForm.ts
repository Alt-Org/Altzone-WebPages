'use client'
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { StateSchema } from "@/app/_providers/StoreProvider";
import { IClanCreateDto, useCreateClanMutation } from "@/entities/Clan";
import { authUserActions, selectProfile } from "@/entities/Auth";
import { ValidationAddNewClan } from "../validations";

type Props = {
    onSuccess?: () => void;
}

export const useNewClanForm = ({ onSuccess }: Props) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(ValidationAddNewClan),
    });

    const [create, { data, isLoading, isError, error }] = useCreateClanMutation();

    const profile = useSelector((state: StateSchema) => selectProfile(state));
    const dispatch = useDispatch();

    // const authUser = useSelector((state: StateSchema) => selectAuthUserState(state));
    // //update localstorage keys when creating new clan
    // function updateClanId(newClanId: string): void {
    //     console.log("newclanid" + newClanId);
    //     if (authUser?.profile?.Player) {
    //         authUser.profile.Player.clan_id = newClanId;
    //         localStorage.setItem('AuthUser', JSON.stringify(authUser));
    //     } else {
    //         console.error('No Player found in localStorage');
    //     }
    // }

    //update store profile after creating new clan. (apparently updates localstorage too)
    const handleUpdateClanId = (newClanId: string) => {

        if (profile) {
            const updatedProfile = {
                ...profile,
                Player: {
                    ...profile.Player,
                    clan_id: newClanId,
                },
            };
            dispatch(authUserActions.setProfile(updatedProfile));
        } else {
            console.error('No Profile found in store');
        }
    };

    async function onFormSubmit(fieldValues: FieldValues) {
        await create(fieldValues as IClanCreateDto);
    }

    useEffect(() => {
        if (data) {
            const clanId = data.data.Clan?._id;
            handleUpdateClanId(clanId);
            //updateClanId(clanId);
            toast.success('Klaani oli  luotu!');
            onSuccess?.();
            return;
        }

        if (error) {
            // @ts-ignore
            toast.error(error?.data?.message);
            return;
        }
    }, [isLoading, data, error, onSuccess]);

    return {
        register,
        handleSubmit,
        onFormSubmit,
        errors,
    };
};
