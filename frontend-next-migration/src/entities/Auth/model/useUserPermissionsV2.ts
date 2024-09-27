import { useSelector } from 'react-redux';
import {selectHasClan, selectIsAuthenticated} from "./authUserSlice";

export enum PermissionError {
    NotAuthenticated = 'NotAuthenticated',
    AlreadyAuthenticated = 'AlreadyAuthenticated',
    AlreadyInClan = 'AlreadyInClan',
    NotInClan = 'NotInClan',
    ClanLimitExceeded = 'ClanLimitExceeded',
    UnknownPermission = 'UnknownPermission',
}

// todo remove v2 after everything will be moved to this hook
// export type UserPermissionsV2 =
//     | 'canISeeLogin'
//     | 'canISeeLogout'
//     | 'canICreateClan'
//     | 'canISeeClans'
//     | 'canISeeOwnClan'
//     | 'canIJoinClan';


interface GrantedPermissionResult {
    isGranted: true;
}

interface NotGrantedPermissionResult {
    isGranted: false;
    error: PermissionError;
}

export type PermissionResult = GrantedPermissionResult | NotGrantedPermissionResult;

export type UserPermissionsV2 =
    | 'login:see'
    | 'logout:see'
    | 'clan:create'
    | 'clan:see'
    | 'clan:seeOwn'
    | 'clan:join';


// todo remove v2 after everything will be moved to this hook
export const useUserPermissionsV2 = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const hasClan = useSelector(selectHasClan);
    // const clanLimitExceeded = useSelector(selectClanLimitExceeded);

    const getPermissionFor = (permission: UserPermissionsV2): PermissionResult => {
        switch (permission) {
            case 'login:see':
                return !isAuthenticated
                    ? { isGranted: true }
                    : { isGranted: false, error: PermissionError.AlreadyAuthenticated };

            case 'logout:see':
                return isAuthenticated
                    ? { isGranted: true }
                    : { isGranted: false, error: PermissionError.NotAuthenticated };

            case 'clan:create':
                if (!isAuthenticated) {
                    return { isGranted: false, error: PermissionError.NotAuthenticated };
                }
                if (hasClan) {
                    return { isGranted: false, error: PermissionError.AlreadyInClan };
                }
                return { isGranted: true };

            case 'clan:see':
                return isAuthenticated
                    ? { isGranted: true }
                    : { isGranted: false, error: PermissionError.NotAuthenticated };

            case 'clan:seeOwn':
                if (!isAuthenticated) {
                    return { isGranted: false, error: PermissionError.NotAuthenticated };
                }
                if (!hasClan) {
                    return { isGranted: false, error: PermissionError.NotInClan };
                }
                return { isGranted: true };

            case 'clan:join':
                if (!isAuthenticated) {
                    return { isGranted: false, error: PermissionError.NotAuthenticated };
                }
                if (hasClan) {
                    return { isGranted: false, error: PermissionError.AlreadyInClan };
                }
                // if (clanLimitExceeded) {
                //     return { granted: false, error: PermissionError.ClanLimitExceeded };
                // }
                return { isGranted: true };

            default:
                return { isGranted: false, error: PermissionError.UnknownPermission };
        }
    };

    return { getPermissionFor };
};



// interface PermissionResult {
//     granted: boolean;
//     error?: PermissionError;
// }
//
// // todo remove v2 after everything will be moved to this hook
// export const useUserPermissionsV2 = () => {
//     const isAuthenticated = useSelector(selectIsAuthenticated);
//     const hasClan = useSelector(selectHasClan);
//     // const clanLimitExceeded = useSelector(selectClanLimitExceeded);
//
//     const canPerformActionFor = (permission: UserPermissionsV2): PermissionResult => {
//         switch (permission) {
//             case 'seeLogin':
//                 if (!isAuthenticated) {
//                     return { granted: true };
//                 } else {
//                     return { granted: false, error: PermissionError.AlreadyAuthenticated };
//                 }
//
//             case 'seeLogout':
//                 if (isAuthenticated) {
//                     return { granted: true };
//                 } else {
//                     return { granted: false, error: PermissionError.NotAuthenticated };
//                 }
//
//             case 'createClan':
//                 if (!isAuthenticated) {
//                     return { granted: false, error: PermissionError.NotAuthenticated };
//                 } else if (hasClan) {
//                     return { granted: false, error: PermissionError.AlreadyInClan };
//                 } else {
//                     return { granted: true };
//                 }
//
//             case 'seeClans':
//                 if (isAuthenticated) {
//                     return { granted: true };
//                 } else {
//                     return { granted: false, error: PermissionError.NotAuthenticated };
//                 }
//
//             case 'seeOwnClan':
//                 if (!isAuthenticated) {
//                     return { granted: false, error: PermissionError.NotAuthenticated };
//                 } else if (!hasClan) {
//                     return { granted: false, error: PermissionError.NotInClan };
//                 } else {
//                     return { granted: true };
//                 }
//
//             case 'joinClan':
//                 if (!isAuthenticated) {
//                     return { granted: false, error: PermissionError.NotAuthenticated };
//                 } else if (hasClan) {
//                     return { granted: false, error: PermissionError.AlreadyInClan };
//                 // } else if (clanLimitExceeded) {
//                 //     return { answer: false, error: PermissionError.ClanLimitExceeded };
//                 } else {
//                     return { granted: true };
//                 }
//
//             default:
//                 return { granted: false, error: PermissionError.UnknownPermission };
//         }
//     };
//
//     return { getPermissionResult };
// };
