import { useSelector } from 'react-redux';
import { selectHasClan, selectIsAuthenticated } from "./authUserSlice";

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

    // todo possibly we could here useMemo hook
    const checkPermissionFor = (permission: UserPermissionsV2): PermissionResult => {
        switch (permission) {
            case 'login':
                return !isAuthenticated
                    ? createGrantedResult()
                    : createNotGrantedResult(PermissionError.AlreadyAuthenticated);

            case 'logout':
                return isAuthenticated
                    ? createGrantedResult()
                    : createNotGrantedResult(PermissionError.NotAuthenticated);

            case 'clan:create':
                if (!isAuthenticated) {
                    return createNotGrantedResult(PermissionError.NotAuthenticated);
                }
                if (hasClan) {
                    return createNotGrantedResult(PermissionError.AlreadyInClan);
                }
                return createGrantedResult();

            case 'clan:seeAll':
                return isAuthenticated
                    ? createGrantedResult()
                    : createNotGrantedResult(PermissionError.NotAuthenticated);

            case 'clan:seeOwn':
                if (!isAuthenticated) {
                    return createNotGrantedResult(PermissionError.NotAuthenticated);
                }
                if (!hasClan) {
                    return createNotGrantedResult(PermissionError.NotInClan);
                }
                return createGrantedResult();

            case 'clan:join':
                if (!isAuthenticated) {
                    return createNotGrantedResult(PermissionError.NotAuthenticated);
                }
                if (hasClan) {
                    return createNotGrantedResult(PermissionError.AlreadyInClan);
                }
                return createGrantedResult();

            default:
                console.warn(`Unhandled permission type: ${permission}`);
                return createNotGrantedResult(PermissionError.UnknownPermission);
        }
    };

    return { checkPermissionFor };
};
