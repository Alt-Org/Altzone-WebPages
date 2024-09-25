// "use client"
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { AccessTokenInfo, AuthUserSchema } from "../types/authUser";
import { LS_KEYS } from "@/shared/const/LS_KEYS";
import { IProfile } from "@/entities/Profile";
import { StateSchema } from "@/app/_providers/StoreProvider";
import { useEffect } from "react";
import { PURGE } from "redux-persist";


// const storedAuthUser = localStorage.getItem(LS_KEYS.AUTH_USER);
let storedAuthUser;

if (typeof localStorage !== 'undefined') {
    storedAuthUser = localStorage.getItem(LS_KEYS.AUTH_USER);
}


const parsedAuthUser: AuthUserSchema = storedAuthUser
    ? JSON.parse(storedAuthUser) as AuthUserSchema
    : {
        isSessionExpired: false
    };



const initialState: AuthUserSchema = {
    accessTokenInfo: parsedAuthUser.accessTokenInfo,
    profile: parsedAuthUser.profile,
    isSessionExpired: parsedAuthUser.isSessionExpired || false
};

export const authUserSlice = createSlice({
    name: "authUser",
    initialState: initialState,

    extraReducers: (builder) => {
        builder.addCase(PURGE, (state) => {
            // This extra reducer handles the PURGE action from redux-persist.
            // It resets the state to its initial values, effectively clearing
            // the persisted state when a purge is triggered.
            state.profile = undefined;
            state.accessTokenInfo = undefined;
            state.isSessionExpired = true;
        });
    },

    reducers: {
        setProfile: (state, action: PayloadAction<IProfile>) => {
            state.profile = action.payload;
        },
        setAccessTokenInfo: (state, action: PayloadAction<AccessTokenInfo>) => {
            state.accessTokenInfo = action.payload;
        },

        setIsSessionExpired: (state, action: PayloadAction<boolean>) => {
            state.isSessionExpired = action.payload;
        },

        logout: (state) => {
            state.profile = undefined;
            state.accessTokenInfo = undefined;
            state.isSessionExpired = true
        },

    }
});

export const { actions: authUserActions } = authUserSlice;
export const { reducer: authUserReducer } = authUserSlice;


// Selector to check if the user is authenticated
// export const selectIsAuthenticated = (state: StateSchema) =>
//     !!state.authUser.profile || !!state.authUser.accessTokenInfo;


export const selectIsAuthenticated = createSelector(
    (state: StateSchema) => state.authUser.profile,
    (state: StateSchema) => state.authUser.accessTokenInfo,
    (profile, accessTokenInfo) => !!profile || !!accessTokenInfo
);


// Selector to get the whole authUser state
export const selectAuthUserState = (state: StateSchema) => state.authUser;
// Selector to get the profile from the authUser state
export const selectProfile = (state: StateSchema) => state.authUser.profile;
// Selector to get the access token info from the authUser state
export const selectAccessTokenInfo = (state: StateSchema) => state.authUser.accessTokenInfo;
// Selector to get clan id
export const selectClanId = (state: StateSchema) => state.authUser.profile?.Player.clan_id;
// Selector to get the is Session Expired info from the authUser state
export const selectIsSessionExpired = (state: StateSchema) => state.authUser.isSessionExpired;

// Selector to check if the user has a clan
export const selectHasClan = createSelector(
    selectProfile,
    (profile) => !!profile && !!profile.Player && !!profile.Player.clan_id
);

