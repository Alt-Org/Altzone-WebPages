import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
    IUserRegisterDto,
    useRegisterMutation,
    useLoginMutation,
    authUserActions,
} from '@/entities/Auth';
import { useClientTranslation } from '@/shared/i18n';
import { ValidationRegisterSchema } from '../validations';
import { useDispatch } from 'react-redux';
import { profileActions } from '@/entities/Profile';
import { getJwtExpTimeStamp } from '@/shared/lib/getJwtExpTimeStamp';
import { useRouter } from 'next/navigation';

export const useRegisterForm = () => {
    const { t } = useClientTranslation('auth');
    const dispatch = useDispatch();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm({
        resolver: yupResolver(ValidationRegisterSchema),
    });

    const [regist, { isLoading: isRegisterLoading }] = useRegisterMutation();
    const [login, { isLoading: isLoginLoading }] = useLoginMutation();

    const onFormSubmit = async (fieldValues: FieldValues) => {
        try {
            const registerPayload: IUserRegisterDto = {
                username: fieldValues.username,
                password: fieldValues.password,
                repeatPassword: fieldValues.password,
                Player: {
                    uniqueIdentifier: fieldValues.username,
                    backpackCapacity: 100,
                    name: fieldValues.username,
                    above13: fieldValues.ageConsent,
                    parentalAuth: true,
                },
            };
            // Register the user
            await regist(registerPayload).unwrap();

            // auto-login
            const loginResponse = await login({
                username: fieldValues.username,
                password: fieldValues.password,
            }).unwrap();

            toast.success(t('account-created'));

            dispatch(
                authUserActions.setAccessTokenInfo({
                    accessToken: loginResponse.accessToken,
                    accessTokenExpiresAt: getJwtExpTimeStamp(loginResponse.accessToken),
                }),
            );

            dispatch(
                profileActions.setProfile({
                    username: loginResponse.username,
                    Player: loginResponse.Player,
                    _id: loginResponse._id,
                }),
            );

            // Redirect to home page
            router.push('/');
        } catch (error: any) {
            const errorMessage =
                error?.data?.message?.[0] ??
                error?.data?.message ??
                t('Käyttäjänimi on jo käytössä, valitse toinen käyttäjänimi');
            toast.error(errorMessage);
        }
    };

    const formState = {
        onFormSubmit,
        errors,
        isLoading: isRegisterLoading || isLoginLoading,
        register,
        handleSubmit,
        getValues,
    };

    return formState;
};
