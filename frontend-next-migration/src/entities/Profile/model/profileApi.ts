import { gameApi } from '@/shared/api';
import { IUpdateProfileDto, IGetProfileInfoResponse } from '../types/profile';

const profileUrl = 'profile';
const profileApi = gameApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfileInfo: builder.query<IGetProfileInfoResponse, void>({
            query: () => ({
                url: `${profileUrl}/info`,
                method: 'GET',
            }),
        }),
        deleteProfile: builder.mutation<void, void>({
            query: () => ({
                url: `${profileUrl}`,
                method: 'DELETE',
            }),
        }),

        updateProfile: builder.mutation<void, IUpdateProfileDto>({
            query: (updateDto) => ({
                url: `${profileUrl}`,
                method: 'PUT',
                body: updateDto,
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetProfileInfoQuery,
    useDeleteProfileMutation,
    useUpdateProfileMutation,
    endpoints: profileEndpoints,
} = profileApi;
