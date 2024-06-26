import { useSelector } from 'react-redux';
import { StateSchema } from "@/preparedApp/providers/StoreProvider";
import {userPermissions,UserPermissions} from "./userPermissions";

// export const useUserPermissions = () => {
//
//
//     const state = useSelector((state: StateSchema) => state);
//
//     const canI = (permission: UserPermissions) => {
//         const check = userPermissions[permission];
//         return check ? check(state) : false;
//     };
//
//     return {canI};
// }



// useUserPermissions.ts
// import { useSelector } from 'react-redux';
// import { StateSchema } from "@/preparedApp/providers/StoreProvider";
// import { userPermissions, UserPermissions } from "./userPermissions";
import {selectHasClan, selectIsAuthenticated} from "@/entities/Auth/model/authUserSlice";

export const useUserPermissions = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const hasClan = useSelector(selectHasClan);

    const canI = (permission: UserPermissions) => {
        // const check = userPermissions[permission];
        switch (permission) {
            case 'canISeeLogin':
                return !isAuthenticated;
            case 'canISeeLogout':
                return isAuthenticated;
            case 'canICreateClan':
                return isAuthenticated && !hasClan;
            case 'canISeeOwnClan':
                return isAuthenticated && hasClan;
            default:
                return false;
        }
    };

    return { canI };
}
