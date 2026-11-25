import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { AccessTokenInfo, AuthUserSchema } from '../../types/authUser';

const initialState: AuthUserSchema = {
    accessTokenInfo: undefined,
    isSessionExpired: false,
};

// we should use this helper type instead full Schema(from app/**/StateSchema) to avoid circular dependencies
type AuthState = {
    authUser: AuthUserSchema;
};

export const authUserSlice = createSlice({
    name: 'authUser',
    initialState: initialState,

    extraReducers: (builder) => {
        builder.addCase(PURGE, (state) => {
            // This extra reducer handles the PURGE action from redux-persist.
            // It resets the state to its initial values, effectively clearing
            // the persisted state when a purge is triggered.
            state.accessTokenInfo = undefined;
            state.isSessionExpired = true;
        });
    },

    reducers: {
        setAccessTokenInfo: (state, action: PayloadAction<AccessTokenInfo>) => {
            state.accessTokenInfo = action.payload;
        },

        setIsSessionExpired: (state, action: PayloadAction<boolean>) => {
            state.isSessionExpired = action.payload;
        },

        logout: (state) => {
            state.accessTokenInfo = undefined;
            state.isSessionExpired = true;
        },
    },
});

export const { actions: authUserActions } = authUserSlice;
export const { reducer: authUserReducer } = authUserSlice;

// Selector to check if the user is authenticated
export const selectIsAuthenticated = createSelector(
    (state: AuthState) => state.authUser.accessTokenInfo,
    (accessTokenInfo) => !!accessTokenInfo,
);

// Selector to get the whole authUser state
export const selectAuthUserState = (state: AuthState) => state.authUser;

// Selector to get the access token info from the authUser state
export const selectAccessTokenInfo = (state: AuthState) => state.authUser.accessTokenInfo;

// Selector to get the is Session Expired info from the authUser state
export const selectIsSessionExpired = (state: AuthState) => state.authUser.isSessionExpired;
