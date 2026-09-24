import { gameApi } from '@/shared/api';
import {
    IUserRegisterDto,
    IUserLoginDto,
    ILoginResponse,
    AccessTokenInfoResponse,
} from '../types/authUser';

const authApi = gameApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ILoginResponse, IUserLoginDto>({
            query: (loginDTO) => ({
                url: '/auth/signIn',
                method: 'POST',
                body: loginDTO,
            }),
        }),
        register: builder.mutation<object, IUserRegisterDto>({
            query: (registerDto) => ({
                url: '/profile',
                method: 'POST',
                body: registerDto,
            }),
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        }),
        refreshAuth: builder.mutation<AccessTokenInfoResponse, void>({
            query: () => ({
                url: '/auth/refresh',
                method: 'POST',
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useRefreshAuthMutation,
    endpoints: authEndpoints,
} = authApi;
