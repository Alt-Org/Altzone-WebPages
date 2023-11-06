import { StateSchema } from "@/preparedApp/providers/StoreProvider";
import {selectHasClan, selectIsAuthenticated} from "../model/authUserSlice";


const canISeeClans = (state: StateSchema) => {
    return selectIsAuthenticated(state);
};

const canISeeLogin = (state: StateSchema) => {
    return !selectIsAuthenticated(state);
}

const canISeeLogout = (state: StateSchema) => {
    return selectIsAuthenticated(state);
}

const canICreateClan = (state: StateSchema) => {
    return selectIsAuthenticated(state) && !selectHasClan(state);
};

const canISeeOwnClan = (state: StateSchema) => {
    return selectIsAuthenticated(state) && selectHasClan(state);
};


export const userPermissions = {
    canISeeLogin,
    canISeeLogout,
    canICreateClan,
    canISeeClans,
    canISeeOwnClan
}

export type UserPermissions = keyof typeof userPermissions;
