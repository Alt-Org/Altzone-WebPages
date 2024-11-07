import { gameApi } from '@/shared/api';
import { IUpdateProfileDto } from '../types/profile';

const profileUrl = 'profile';
const profileApi = gameApi.injectEndpoints({
    endpoints: (builder) => ({
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
    useDeleteProfileMutation,
    useUpdateProfileMutation,
    endpoints: profileEndpoints,
} = profileApi;
