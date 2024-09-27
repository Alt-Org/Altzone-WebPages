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


interface GrantedPermissionResult<T> {
    isGranted: true;
    result?: T;
    ifYes(callback: () => T): GrantedPermissionResult<T>;
    ifNo(callback: (error: PermissionError) => void): GrantedPermissionResult<T>;
    and(condition: boolean): GrantedPermissionResult<T>;
}

interface NotGrantedPermissionResult<T> {
    isGranted: false;
    error: PermissionError;
    result?: T;
    ifYes(callback: () => void): NotGrantedPermissionResult<T>;
    ifNo(callback: (error: PermissionError) => T): NotGrantedPermissionResult<T>;
    and(condition: boolean): NotGrantedPermissionResult<T>;
}

export type PermissionResult<T> = GrantedPermissionResult<T> | NotGrantedPermissionResult<T>;




// export type PermissionResult = GrantedPermissionResult | NotGrantedPermissionResult;

export type UserPermissionsV2 =
    | 'login'
    | 'logout'
    | 'clan:create'
    | 'clan:see'
    | 'clan:seeOwn'
    | 'clan:join';

const createGrantedResult = <T>(): GrantedPermissionResult<T> => {
    let conditionMet = true;
    let result: T | undefined;

    return {
        isGranted: true,
        result,
        ifYes(callback: () => T): GrantedPermissionResult<T> {
            if (conditionMet) {
                result = callback();
                this.result = result;
            }
            return this;
        },
        ifNo(_: (error: PermissionError) => void): GrantedPermissionResult<T> {
            return this;
        },
        and(condition: boolean): GrantedPermissionResult<T> {
            conditionMet = conditionMet && condition;
            return this;
        },
    };
};

const createNotGrantedResult = <T>(error: PermissionError): NotGrantedPermissionResult<T> => {
    let result: T | undefined;

    return {
        isGranted: false,
        error,
        result,
        ifYes(_: () => void): NotGrantedPermissionResult<T> {
            return this;
        },
        ifNo(callback: (error: PermissionError) => T): NotGrantedPermissionResult<T> {
            result = callback(error);
            this.result = result;
            return this;
        },
        and(_: boolean): NotGrantedPermissionResult<T> {
            return this;
        },
    };
};



export const useUserPermissionsV2 = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const hasClan = useSelector(selectHasClan);

    const userActionWith = <T>(permission: UserPermissionsV2): PermissionResult<T> => {
        switch (permission) {
            case 'login':
                return !isAuthenticated
                    ? createGrantedResult<T>()
                    : createNotGrantedResult<T>(PermissionError.AlreadyAuthenticated);

            case 'logout':
                return isAuthenticated
                    ? createGrantedResult<T>()
                    : createNotGrantedResult<T>(PermissionError.NotAuthenticated);

            case 'clan:create':
                if (!isAuthenticated) {
                    return createNotGrantedResult<T>(PermissionError.NotAuthenticated);
                }
                if (hasClan) {
                    return createNotGrantedResult<T>(PermissionError.AlreadyInClan);
                }
                return createGrantedResult();

            case 'clan:see':
                return isAuthenticated
                    ? createGrantedResult<T>()
                    : createNotGrantedResult<T>(PermissionError.NotAuthenticated);

            case 'clan:seeOwn':
                if (!isAuthenticated) {
                    return createNotGrantedResult<T>(PermissionError.NotAuthenticated);
                }
                if (!hasClan) {
                    return createNotGrantedResult<T>(PermissionError.NotInClan);
                }
                return createGrantedResult();

            case 'clan:join':
                if (!isAuthenticated) {
                    return createNotGrantedResult<T>(PermissionError.NotAuthenticated);
                }
                if (hasClan) {
                    return createNotGrantedResult<T>(PermissionError.AlreadyInClan);
                }
                return createGrantedResult();

            default:
                return createNotGrantedResult<T>(PermissionError.UnknownPermission);
        }
    };

    return { userActionWith };
};


