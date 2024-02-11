import { selectHasClan, selectIsAuthenticated } from "../model/authUserSlice";
import {createSelector} from "@reduxjs/toolkit";

const canISeeClans = createSelector(
    selectIsAuthenticated,
    (isAuthenticated) => isAuthenticated
);

const canISeeLogin = createSelector(
    selectIsAuthenticated,
    (isAuthenticated) => !isAuthenticated
);

const canISeeLogout = createSelector(
    selectIsAuthenticated,
    (isAuthenticated) => isAuthenticated
);

const canICreateClan = createSelector(
    selectIsAuthenticated,
    selectHasClan,
    (isAuthenticated, hasClan) => isAuthenticated && !hasClan
);

const canISeeOwnClan = createSelector(
    selectIsAuthenticated,
    selectHasClan,
    (isAuthenticated, hasClan) => isAuthenticated && hasClan
);



export const userPermissions = {
    canISeeLogin,
    canISeeLogout,
    canICreateClan,
    canISeeClans,
    canISeeOwnClan
};

export type UserPermissions = keyof typeof userPermissions;
