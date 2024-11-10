import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProfile, ProfileSchema } from '../../types/profile';
import { PURGE } from 'redux-persist';
import { LS_KEYS } from '@/shared/const/LS_KEYS';
import { IPlayer } from '@/entities/User';

// initializing defaultProfile might not be necessary, needs testing
// without initializing, profile might be prone to causing errors if fields inside Player arent always set
// const defaultProfile: ProfileSchema = {
//     profile: {
//         _id: null,
//         username: null,
//         Player: {
//             _id: null,
//             name: null,
//             backpackCapacity: null,
//             uniqueIdentifier: null,
//             profile_id: null,
//             clan_id: null,
//             above13: null,
//         },
//     },
// };

let storedProfile;

if (typeof localStorage !== 'undefined') {
    storedProfile = localStorage.getItem(LS_KEYS.PROFILE);
}

// const parsedProfile: ProfileSchema = storedProfile
//     ? (JSON.parse(storedProfile) as ProfileSchema)
//     : defaultProfile;

const parsedProfile: ProfileSchema = storedProfile
    ? (JSON.parse(storedProfile) as ProfileSchema)
    : { profile: undefined };

const initialState: ProfileSchema = { profile: parsedProfile.profile };

type ProfileState = {
    profile: ProfileSchema;
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    extraReducers: (builder) => {
        // Not entirely sure how PURGE works in store?
        builder.addCase(PURGE, (state) => {
            state.profile = undefined;
        });
    },
    reducers: {
        setProfile: (state, action: PayloadAction<IProfile<IPlayer>>) => {
            state.profile = action.payload;
        },
    },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;

// Selector to get the profile from the profile state
export const selectProfile = (state: ProfileState) => state.profile?.profile;

// Selector to get clan id
export const selectClanId = (state: ProfileState) => state.profile.profile?.Player.clan_id;

// Selector to check if the user has a clan
export const selectHasClan = createSelector(
    selectProfile,
    (profile) => !!profile && !!profile.Player && !!profile.Player.clan_id,
);
