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
    granted: boolean;
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
                    return { granted: true };
                } else {
                    return { granted: false, error: PermissionError.AlreadyAuthenticated };
                }

            case 'canISeeLogout':
                if (isAuthenticated) {
                    return { granted: true };
                } else {
                    return { granted: false, error: PermissionError.NotAuthenticated };
                }

            case 'canICreateClan':
                if (!isAuthenticated) {
                    return { granted: false, error: PermissionError.NotAuthenticated };
                } else if (hasClan) {
                    return { granted: false, error: PermissionError.AlreadyInClan };
                } else {
                    return { granted: true };
                }

            case 'canISeeClans':
                if (isAuthenticated) {
                    return { granted: true };
                } else {
                    return { granted: false, error: PermissionError.NotAuthenticated };
                }

            case 'canISeeOwnClan':
                if (!isAuthenticated) {
                    return { granted: false, error: PermissionError.NotAuthenticated };
                } else if (!hasClan) {
                    return { granted: false, error: PermissionError.NotInClan };
                } else {
                    return { granted: true };
                }

            case 'canIJoinClan':
                if (!isAuthenticated) {
                    return { granted: false, error: PermissionError.NotAuthenticated };
                } else if (hasClan) {
                    return { granted: false, error: PermissionError.AlreadyInClan };
                // } else if (clanLimitExceeded) {
                //     return { answer: false, error: PermissionError.ClanLimitExceeded };
                } else {
                    return { granted: true };
                }

            default:
                return { granted: false, error: PermissionError.UnknownPermission };
        }
    };

    return { canI };
};
