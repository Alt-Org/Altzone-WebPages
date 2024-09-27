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

interface GrantedPermissionResult {
    isGranted: true;
}

interface NotGrantedPermissionResult {
    isGranted: false;
    error: PermissionError;
}

export type PermissionResult = GrantedPermissionResult | NotGrantedPermissionResult;

// todo remove v2 after everything will be moved to this hook
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

    // todo figure out can we get this limit if not we should make an issue to our server github
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
