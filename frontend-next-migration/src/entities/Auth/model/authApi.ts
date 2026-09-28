import { gameApi } from '@/shared/api';
import {
    IUserRegisterDto,
    IUserLoginDto,
    IRefreshAuthDto,
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
        refreshAuth: builder.mutation<AccessTokenInfoResponse, IRefreshAuthDto>({
            query: (refreshAuthDto) => ({
                url: '/auth/refresh',
                method: 'POST',
                body: refreshAuthDto,
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
