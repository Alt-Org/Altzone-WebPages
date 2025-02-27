import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProfile, ProfileSchema } from '../../types/profile';
import { PURGE } from 'redux-persist';
import { LS_KEYS } from '@/shared/const/LS_KEYS';
import { IPlayer } from '@/entities/User';

let storedProfile;
if (typeof localStorage !== 'undefined') {
    storedProfile = localStorage.getItem(LS_KEYS.PROFILE);
}

const parsedProfile: ProfileSchema = storedProfile
    ? (JSON.parse(storedProfile) as ProfileSchema)
    : { Profile: undefined };

const initialState: ProfileSchema = parsedProfile;

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(PURGE, (state) => {
            state.Profile = undefined;
        });
    },
    reducers: {
        setProfile: (state, action: PayloadAction<IProfile<IPlayer>>) => {
            state.Profile = action.payload;
        },
    },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;

export const selectProfile = (state: ProfileSchema) => state.Profile;

export const selectClanId = (state: ProfileSchema) => state.Profile?.Player?.clan_id;

export const selectHasClan = createSelector(selectProfile, (Profile) => !!Profile?.Player?.clan_id);
