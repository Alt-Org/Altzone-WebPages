export {
    // profileEndpoints,
    useDeleteProfileMutation,
} from './model/profileApi';
export type { IProfile } from './types/profile';

export {
    profileActions,
    selectProfile,
    profileReducer,
    selectClanId,
    selectHasClan,
} from './model/profileSlice/profileSlice';
