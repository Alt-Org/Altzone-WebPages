import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProfile, ProfileSchema } from '../../types/profile';
import { PURGE } from 'redux-persist';
import { IPlayer } from '@/entities/User';

const initialState: ProfileSchema = { profile: undefined };

type ProfileState = { profile: ProfileSchema };

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(PURGE, (state) => {
            state.profile = undefined;
        });
    },
    reducers: {
        setProfile: (state, action: PayloadAction<IProfile<IPlayer>>) => {
            state.profile = action.payload;
        },
        clearProfile: (state) => {
            state.profile = undefined;
        },
    },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;

export const selectProfile = (state: ProfileState) => state.profile.profile;

export const selectClanId = (state: ProfileState) => selectProfile(state)?.Player?.clan_id;

export const selectHasClan = createSelector(selectProfile, (profile) => !!profile?.Player?.clan_id);
