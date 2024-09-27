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
export type UserPermissionsV2 =
    | 'canISeeLogin'
    | 'canISeeLogout'
    | 'canICreateClan'
    | 'canISeeClans'
    | 'canISeeOwnClan'
    | 'canIJoinClan';

interface PermissionResult {
    isGranted: boolean;
    error?: PermissionError;
}

// todo remove v2 after everything will be moved to this hook
export const useUserPermissionsV2 = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const hasClan = useSelector(selectHasClan);
    // const clanLimitExceeded = useSelector(selectClanLimitExceeded);

    const canI = (permission: UserPermissionsV2): PermissionResult => {
        switch (permission) {
            case 'canISeeLogin':
                if (!isAuthenticated) {
                    return { isGranted: true };
                } else {
                    return { isGranted: false, error: PermissionError.AlreadyAuthenticated };
                }

            case 'canISeeLogout':
                if (isAuthenticated) {
                    return { isGranted: true };
                } else {
                    return { isGranted: false, error: PermissionError.NotAuthenticated };
                }

            case 'canICreateClan':
                if (!isAuthenticated) {
                    return { isGranted: false, error: PermissionError.NotAuthenticated };
                } else if (hasClan) {
                    return { isGranted: false, error: PermissionError.AlreadyInClan };
                } else {
                    return { isGranted: true };
                }

            case 'canISeeClans':
                if (isAuthenticated) {
                    return { isGranted: true };
                } else {
                    return { isGranted: false, error: PermissionError.NotAuthenticated };
                }

            case 'canISeeOwnClan':
                if (!isAuthenticated) {
                    return { isGranted: false, error: PermissionError.NotAuthenticated };
                } else if (!hasClan) {
                    return { isGranted: false, error: PermissionError.NotInClan };
                } else {
                    return { isGranted: true };
                }

            case 'canIJoinClan':
                if (!isAuthenticated) {
                    return { isGranted: false, error: PermissionError.NotAuthenticated };
                } else if (hasClan) {
                    return { isGranted: false, error: PermissionError.AlreadyInClan };
                // } else if (clanLimitExceeded) {
                //     return { answer: false, error: PermissionError.ClanLimitExceeded };
                } else {
                    return { isGranted: true };
                }

            default:
                return { isGranted: false, error: PermissionError.UnknownPermission };
        }
    };

    return { canI };
};
