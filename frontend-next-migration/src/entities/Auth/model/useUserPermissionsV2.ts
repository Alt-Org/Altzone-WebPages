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

export type UserPermissions =
    | 'canISeeLogin'
    | 'canISeeLogout'
    | 'canICreateClan'
    | 'canISeeClans'
    | 'canISeeOwnClan'
    | 'canIJoinClan';

interface PermissionResult {
    answer: boolean;
    error?: PermissionError;
}

export const useUserPermissionsV2 = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const hasClan = useSelector(selectHasClan);
    // const clanLimitExceeded = useSelector(selectClanLimitExceeded);

    const canI = (permission: UserPermissions): PermissionResult => {
        switch (permission) {
            case 'canISeeLogin':
                if (!isAuthenticated) {
                    return { answer: true };
                } else {
                    return { answer: false, error: PermissionError.AlreadyAuthenticated };
                }

            case 'canISeeLogout':
                if (isAuthenticated) {
                    return { answer: true };
                } else {
                    return { answer: false, error: PermissionError.NotAuthenticated };
                }

            case 'canICreateClan':
                if (!isAuthenticated) {
                    return { answer: false, error: PermissionError.NotAuthenticated };
                } else if (hasClan) {
                    return { answer: false, error: PermissionError.AlreadyInClan };
                } else {
                    return { answer: true };
                }

            case 'canISeeClans':
                if (isAuthenticated) {
                    return { answer: true };
                } else {
                    return { answer: false, error: PermissionError.NotAuthenticated };
                }

            case 'canISeeOwnClan':
                if (!isAuthenticated) {
                    return { answer: false, error: PermissionError.NotAuthenticated };
                } else if (!hasClan) {
                    return { answer: false, error: PermissionError.NotInClan };
                } else {
                    return { answer: true };
                }

            // case 'canIJoinClan':
            //     if (!isAuthenticated) {
            //         return { answer: false, error: PermissionError.NotAuthenticated };
            //     } else if (hasClan) {
            //         return { answer: false, error: PermissionError.AlreadyInClan };
            //     } else if (clanLimitExceeded) {
            //         return { answer: false, error: PermissionError.ClanLimitExceeded };
            //     } else {
            //         return { answer: true };
            //     }

            default:
                return { answer: false, error: PermissionError.UnknownPermission };
        }
    };

    return { canI };
};
