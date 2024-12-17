import { Middleware } from '@reduxjs/toolkit';
import { LS_KEYS } from '@/shared/const/LS_KEYS';
import { authEndpoints } from '../model/authApi';
import { authUserActions } from '../model/authUserSlice/authUserSlice';
import { profileActions } from '@/entities/Profile/model/profileSlice/profileSlice';

export const authMiddleware: Middleware = (storeAPI) => (next) => (action) => {
    // Let the action pass to the next middleware or reducer
    const result = next(action);

    const isLogoutPending = authEndpoints.logout.matchPending(action);
    if (isLogoutPending) {
        storeAPI.dispatch(authUserActions.setIsSessionExpired(true));
        storeAPI.dispatch(authUserActions.logout());
        localStorage.removeItem(LS_KEYS.AUTH_USER);
        // navigatorHelper.navigate?.(RoutePath.auth_session_exp);
    }

    switch (action.type) {
        // This has replaced authUserActions.setProfile
        case profileActions.setProfile.toString():
            const updatedUserData = { ...storeAPI.getState().profile, profile: action.payload };
            localStorage.setItem(LS_KEYS.PROFILE, JSON.stringify(updatedUserData));
            break;

        case authUserActions.setAccessTokenInfo.toString():
            const updatedTokenData = {
                ...storeAPI.getState().authUser,
                accessTokenInfo: action.payload,
            };
            localStorage.setItem(LS_KEYS.AUTH_USER, JSON.stringify(updatedTokenData));
            break;

        case authUserActions.setIsSessionExpired.toString():
            const IsSessionExpiredData = {
                ...storeAPI.getState().authUser,
                isSessionExpired: action.payload,
            };
            localStorage.setItem(LS_KEYS.AUTH_USER, JSON.stringify(IsSessionExpiredData));
            break;

        default:
            break;
    }

    return result;
};
