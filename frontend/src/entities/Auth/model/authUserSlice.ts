import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AccessTokenInfo, AuthUserSchema} from "../types/authUser";
import {LS_KEYS} from "@/shared/const/env/LS_KEYS";
import {IProfile} from "@/entities/User";
import {StateSchema} from "@/app/providers/StoreProvider";

const storedAuthUser = localStorage.getItem(LS_KEYS.AUTH_USER);
const parsedAuthUser: AuthUserSchema = storedAuthUser
    ? JSON.parse(storedAuthUser) as AuthUserSchema
    : {
    isSessionExpired : false
};

const initialState: AuthUserSchema = {
    accessTokenInfo: parsedAuthUser.accessTokenInfo,
    profile: parsedAuthUser.profile,
    isSessionExpired: parsedAuthUser.isSessionExpired || false
};

export const authUserSlice = createSlice({
    name: "authUser",
    initialState: initialState,
    // extraReducers: (builder) => {
    //     builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
    //         authUserSlice.caseReducers.logout(state);
    //     });
    //
    // },
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

// Selector to get the whole authUser state
export const selectAuthUserState = (state: StateSchema) => state.authUser;
// Selector to get the profile from the authUser state
export const selectProfile = (state: StateSchema) => state.authUser.profile;
// Selector to get the access token info from the authUser state
export const selectAccessTokenInfo = (state: StateSchema) => state.authUser.accessTokenInfo;

// Selector to get the is Session Expired info from the authUser state
export const selectIsSessionExpired = (state: StateSchema) => state.authUser.isSessionExpired;
