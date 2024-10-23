import { useSelector } from 'react-redux';
import { selectHasClan, selectIsAuthenticated } from '../authUserSlice/authUserSlice';

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

export type UserPermissionsV2 =
    | 'login'
    | 'logout'
    | 'clan:create'
    | 'clan:seeAll'
    | 'clan:seeOwn'
    | 'clan:join';

const createGrantedResult = (): GrantedPermissionResult => ({
    isGranted: true,
});

const createNotGrantedResult = (error: PermissionError): NotGrantedPermissionResult => ({
    isGranted: false,
    error,
});

export const useUserPermissionsV2 = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const hasClan = useSelector(selectHasClan);

    const permissionHandlers: Record<UserPermissionsV2, () => PermissionResult> = {
        login: () =>
            !isAuthenticated
                ? createGrantedResult()
                : createNotGrantedResult(PermissionError.AlreadyAuthenticated),

        logout: () =>
            isAuthenticated
                ? createGrantedResult()
                : createNotGrantedResult(PermissionError.NotAuthenticated),

        'clan:create': () => {
            if (!isAuthenticated) return createNotGrantedResult(PermissionError.NotAuthenticated);
            if (hasClan) return createNotGrantedResult(PermissionError.AlreadyInClan);
            return createGrantedResult();
        },

        'clan:seeAll': () =>
            isAuthenticated
                ? createGrantedResult()
                : createNotGrantedResult(PermissionError.NotAuthenticated),

        'clan:seeOwn': () => {
            if (!isAuthenticated) return createNotGrantedResult(PermissionError.NotAuthenticated);
            if (!hasClan) return createNotGrantedResult(PermissionError.NotInClan);
            return createGrantedResult();
        },

        'clan:join': () => {
            if (!isAuthenticated) return createNotGrantedResult(PermissionError.NotAuthenticated);
            if (hasClan) return createNotGrantedResult(PermissionError.AlreadyInClan);
            return createGrantedResult();
        },
    };

    const checkPermissionFor = (permission: UserPermissionsV2): PermissionResult => {
        const handler = permissionHandlers[permission];
        if (handler) {
            return handler();
        }
        console.warn(`Unhandled permission type: ${permission}`);
        return createNotGrantedResult(PermissionError.UnknownPermission);
    };

    return { checkPermissionFor };
};
