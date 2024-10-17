import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import { IProfile } from "@/entities/Profile";
import { IPlayer } from "@/entities/User";
import { LS_KEYS } from "@/shared/const/LS_KEYS";
import { AccessTokenInfo, AuthUserSchema } from "../types/authUser";

// "use client"
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

// we should use this helper type instead full Schema(from app/**/StateSchema) to avoid circular dependencies
type AuthState = {
    authUser: AuthUserSchema;
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
        //todo profile should have its own state in the profile entity !!!!!!!
        setProfile: (state, action: PayloadAction<IProfile<IPlayer>>) => {
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
    (state: AuthState) => state.authUser.profile,
    (state: AuthState) => state.authUser.accessTokenInfo,
    (profile, accessTokenInfo) => !!profile || !!accessTokenInfo
);


// Selector to get the whole authUser state
export const selectAuthUserState = (state: AuthState) => state.authUser;

//todo profile should have its own selector in the profile entity !!!!!!!
// Selector to get the profile from the authUser state
export const selectProfile = (state: AuthState) => state.authUser.profile;
// Selector to get the access token info from the authUser state

export const selectAccessTokenInfo = (state: AuthState) => state.authUser.accessTokenInfo;
//todo profile should have its own state in the profile entity !!!!!!!
// Selector to get clan id
export const selectClanId = (state: AuthState) => state.authUser.profile?.Player.clan_id;
// Selector to get the is Session Expired info from the authUser state
export const selectIsSessionExpired = (state: AuthState) => state.authUser.isSessionExpired;

//todo profile should have its own state in the profile entity !!!!!!!
// Selector to check if the user has a clan
export const selectHasClan = createSelector(
    selectProfile,
    (profile) => !!profile && !!profile.Player && !!profile.Player.clan_id
);

