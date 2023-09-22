    import { Middleware } from '@reduxjs/toolkit';
    import {LS_KEYS} from "@/shared/const/env/LS_KEYS";
    import {authUserActions} from "../model/authUserSlice";
    import {authEndpoints} from "../model/authApi";

    export const authMiddleware: Middleware = storeAPI => next => action => {

        // Let the action pass to the next middleware or reducer
        const result = next(action);

        const isLogoutPending = authEndpoints.logout.matchPending(action);
        if(isLogoutPending){
            storeAPI.dispatch(authUserActions.setIsSessionExpired(true));
            storeAPI.dispatch(authUserActions.logout());
            localStorage.removeItem(LS_KEYS.AUTH_USER);
            // navigatorHelper.navigate?.(RoutePath.auth_session_exp);
        }

        switch(action.type) {
            case authUserActions.setProfile.toString():
                const updatedUserData = { ...storeAPI.getState().authUser, user: action.payload };
                localStorage.setItem(LS_KEYS.AUTH_USER, JSON.stringify(updatedUserData));
                break;

            case authUserActions.setAccessTokenInfo.toString():
                const updatedTokenData = { ...storeAPI.getState().authUser, accessTokenInfo: action.payload };
                localStorage.setItem(LS_KEYS.AUTH_USER, JSON.stringify(updatedTokenData));
                break;

            case authUserActions.setIsSessionExpired.toString():
                const IsSessionExpiredData = { ...storeAPI.getState().authUser, isSessionExpired: action.payload };
                localStorage.setItem(LS_KEYS.AUTH_USER, JSON.stringify(IsSessionExpiredData));
                break;

            default:
                break;
        }

        return result;
    };

