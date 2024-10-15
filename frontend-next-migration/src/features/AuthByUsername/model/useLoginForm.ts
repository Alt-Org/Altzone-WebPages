import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { ValidationLoginSchema } from '../validations';
import {authUserActions, IUserLoginDto, useLoginMutation} from '@/entities/Auth';
import {useDispatch} from "react-redux";
import {getJwtExpTimeStamp} from "@/shared/lib/getJwtExpTimeStamp";
import { useClientTranslation } from '@/shared/i18n';

type Props = {
    onSuccessLogin: () => void;
}

export const useLoginForm = ({onSuccessLogin}: Props) => {

    const {t} = useClientTranslation("auth");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(ValidationLoginSchema),
    });

    const dispatch = useDispatch();


    const [login, { data, isLoading, isError, error }] = useLoginMutation();

    async function onFormSubmit(fieldValues: FieldValues) {
        await login(fieldValues as IUserLoginDto);
    }
    
    useEffect(() => {
        if (data) {
            dispatch(authUserActions.setAccessTokenInfo({
                accessToken: data.accessToken,
                accessTokenExpiresAt: getJwtExpTimeStamp(data.accessToken)
            }
            ));
            dispatch(
                authUserActions.setProfile(
                    {
                        username : data.username,
                        Player: data.Player,
                        _id: data._id
                    }
                ));

            dispatch(
                authUserActions.setIsSessionExpired(false));
            toast.success(t('welcome'));
            onSuccessLogin();
            return;
        }

        if (error) {
            // @ts-ignore
            toast.error(error?.data?.message);
            return;
        }
    }, [data, isLoading, error, dispatch, onSuccessLogin, t]);

    return {
        register,
        handleSubmit,
        onFormSubmit,
        errors,
    };
};
