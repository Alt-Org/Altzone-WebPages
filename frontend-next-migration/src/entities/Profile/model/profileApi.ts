import {gameApi} from "@/shared/api";

const profileUrl = "profile";
const profileApi = gameApi.injectEndpoints({
    endpoints: (builder) => ({
        deleteProfile: builder.mutation<void, void>({
            query: () => ({
                url: `${profileUrl}`,
                method: 'DELETE',
            }),
        }),
    }),
    overrideExisting: false
})

export const {
    useDeleteProfileMutation,
    endpoints: profileEndpoints
} = profileApi;

