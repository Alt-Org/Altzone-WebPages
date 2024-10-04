import {gameApi} from "@/shared/api";
import {
    IUserRegisterDto,
    IUserLoginDto, ILoginResponse,
} from "../types/authUser";

const authApi = gameApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ILoginResponse, IUserLoginDto>({
            query: (loginDTO) => ({
                url: '/auth/signIn',
                method: 'POST',
                body: loginDTO,
            }),
        }),
        register: builder.mutation<Object, IUserRegisterDto>({
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
    }),
    overrideExisting: false,
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    endpoints: authEndpoints
} = authApi;
