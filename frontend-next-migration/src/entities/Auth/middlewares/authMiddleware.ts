import { Middleware } from '@reduxjs/toolkit';
import { gameApi } from '@/shared/api/gameApi';
import { authEndpoints } from '../model/authApi';
import { authUserActions } from '../model/authUserSlice/authUserSlice';
import { profileActions } from '@/entities/Profile';

export const authMiddleware: Middleware = (storeAPI) => (next) => (action) => {
    const result = next(action);

    // Keep the token available while the logout request is being sent.
    if (authEndpoints.logout.matchFulfilled(action) || authEndpoints.logout.matchRejected(action)) {
        storeAPI.dispatch(authUserActions.logout());
    }

    if (authUserActions.logout.match(action)) {
        storeAPI.dispatch(profileActions.clearProfile());
        storeAPI.dispatch(gameApi.util.resetApiState());
    }

    return result;
};
