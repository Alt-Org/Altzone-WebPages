import { renderHook } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { selectHasClan, selectIsAuthenticated } from '../authUserSlice';
import { useUserPermissionsV2, PermissionError } from './useUserPermissionsV2';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
}));

describe('useUserPermissionsV2', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('login permission', () => {
        it('should grant login permission when not authenticated', () => {
            // @ts-ignore
            useSelector.mockImplementation((selector) => {
                if (selector === selectIsAuthenticated) return false;
                return false;
            });

            const { result } = renderHook(() => useUserPermissionsV2());
            const permissionResult = result.current.checkPermissionFor('login');

            expect(permissionResult).toEqual({ isGranted: true });
        });

        it('should deny login permission when already authenticated', () => {
            // @ts-ignore
            useSelector.mockImplementation((selector) => {
                if (selector === selectIsAuthenticated) return true;
                return false;
            });

            const { result } = renderHook(() => useUserPermissionsV2());
            const permissionResult = result.current.checkPermissionFor('login');

            expect(permissionResult).toEqual({
                isGranted: false,
                error: PermissionError.AlreadyAuthenticated,
            });
        });
    });

    describe('logout permission', () => {
        it('should grant logout permission when authenticated', () => {
            // @ts-ignore
            useSelector.mockImplementation((selector) => {
                if (selector === selectIsAuthenticated) return true;
                return false;
            });

            const { result } = renderHook(() => useUserPermissionsV2());
            const permissionResult = result.current.checkPermissionFor('logout');

            expect(permissionResult).toEqual({ isGranted: true });
        });

        it('should deny logout permission when not authenticated', () => {
            // @ts-ignore
            useSelector.mockImplementation((selector) => {
                if (selector === selectIsAuthenticated) return false;
                return false;
            });

            const { result } = renderHook(() => useUserPermissionsV2());
            const permissionResult = result.current.checkPermissionFor('logout');

            expect(permissionResult).toEqual({
                isGranted: false,
                error: PermissionError.NotAuthenticated,
            });
        });
    });

    describe('clan:create permission', () => {
        it('should grant clan:create permission when authenticated and not in a clan', () => {
            // @ts-ignore
            useSelector.mockImplementation((selector) => {
                if (selector === selectIsAuthenticated) return true;
                if (selector === selectHasClan) return false;
                return false;
            });

            const { result } = renderHook(() => useUserPermissionsV2());
            const permissionResult = result.current.checkPermissionFor('clan:create');

            expect(permissionResult).toEqual({ isGranted: true });
        });

        it('should deny clan:create permission when authenticated and already in a clan', () => {
            // @ts-ignore
            useSelector.mockImplementation((selector) => {
                if (selector === selectIsAuthenticated) return true;
                if (selector === selectHasClan) return true;
                return false;
            });

            const { result } = renderHook(() => useUserPermissionsV2());
            const permissionResult = result.current.checkPermissionFor('clan:create');

            expect(permissionResult).toEqual({
                isGranted: false,
                error: PermissionError.AlreadyInClan,
            });
        });

        it('should deny clan:create permission when not authenticated', () => {
            // @ts-ignore
            useSelector.mockImplementation((selector) => {
                if (selector === selectIsAuthenticated) return false;
                return false;
            });

            const { result } = renderHook(() => useUserPermissionsV2());
            const permissionResult = result.current.checkPermissionFor('clan:create');

            expect(permissionResult).toEqual({
                isGranted: false,
                error: PermissionError.NotAuthenticated,
            });
        });
    });

    describe('clan:seeAll permission', () => {
        it('should grant clan:seeAll permission when authenticated', () => {
            // @ts-ignore
            useSelector.mockImplementation((selector) => {
                if (selector === selectIsAuthenticated) return true;
                return false;
            });

            const { result } = renderHook(() => useUserPermissionsV2());
            const permissionResult = result.current.checkPermissionFor('clan:seeAll');

            expect(permissionResult).toEqual({ isGranted: true });
        });

        it('should deny clan:seeAll permission when not authenticated', () => {
            // @ts-ignore
            useSelector.mockImplementation((selector) => {
                if (selector === selectIsAuthenticated) return false;
                return false;
            });

            const { result } = renderHook(() => useUserPermissionsV2());
            const permissionResult = result.current.checkPermissionFor('clan:seeAll');

            expect(permissionResult).toEqual({
                isGranted: false,
                error: PermissionError.NotAuthenticated,
            });
        });
    });

    describe('clan:seeOwn permission', () => {
        it('should grant clan:seeOwn permission when authenticated and in a clan', () => {
            // @ts-ignore
            useSelector.mockImplementation((selector) => {
                if (selector === selectIsAuthenticated) return true;
                if (selector === selectHasClan) return true;
                return false;
            });

            const { result } = renderHook(() => useUserPermissionsV2());
            const permissionResult = result.current.checkPermissionFor('clan:seeOwn');

            expect(permissionResult).toEqual({ isGranted: true });
        });

        it('should deny clan:seeOwn permission when authenticated and not in a clan', () => {
            // @ts-ignore
            useSelector.mockImplementation((selector) => {
                if (selector === selectIsAuthenticated) return true;
                if (selector === selectHasClan) return false;
                return false;
            });

            const { result } = renderHook(() => useUserPermissionsV2());
            const permissionResult = result.current.checkPermissionFor('clan:seeOwn');

            expect(permissionResult).toEqual({
                isGranted: false,
                error: PermissionError.NotInClan,
            });
        });

        it('should deny clan:seeOwn permission when not authenticated', () => {
            // @ts-ignore
            useSelector.mockImplementation((selector) => {
                if (selector === selectIsAuthenticated) return false;
                return false;
            });

            const { result } = renderHook(() => useUserPermissionsV2());
            const permissionResult = result.current.checkPermissionFor('clan:seeOwn');

            expect(permissionResult).toEqual({
                isGranted: false,
                error: PermissionError.NotAuthenticated,
            });
        });
    });

    describe('clan:join permission', () => {
        it('should grant clan:join permission when authenticated and not in a clan', () => {
            // @ts-ignore
            useSelector.mockImplementation((selector) => {
                if (selector === selectIsAuthenticated) return true;
                if (selector === selectHasClan) return false;
                return false;
            });

            const { result } = renderHook(() => useUserPermissionsV2());
            const permissionResult = result.current.checkPermissionFor('clan:join');

            expect(permissionResult).toEqual({ isGranted: true });
        });

        it('should deny clan:join permission when authenticated and already in a clan', () => {
            // @ts-ignore
            useSelector.mockImplementation((selector) => {
                if (selector === selectIsAuthenticated) return true;
                if (selector === selectHasClan) return true;
                return false;
            });

            const { result } = renderHook(() => useUserPermissionsV2());
            const permissionResult = result.current.checkPermissionFor('clan:join');

            expect(permissionResult).toEqual({
                isGranted: false,
                error: PermissionError.AlreadyInClan,
            });
        });

        it('should deny clan:join permission when not authenticated', () => {
            // @ts-ignore
            useSelector.mockImplementation((selector) => {
                if (selector === selectIsAuthenticated) return false;
                return false;
            });

            const { result } = renderHook(() => useUserPermissionsV2());
            const permissionResult = result.current.checkPermissionFor('clan:join');

            expect(permissionResult).toEqual({
                isGranted: false,
                error: PermissionError.NotAuthenticated,
            });
        });
    });

    describe('unknown permission', () => {
        it('should return unknown permission error for unhandled permissions', () => {
            const { result } = renderHook(() => useUserPermissionsV2());
            // @ts-ignore
            const permissionResult = result.current.checkPermissionFor('unknown:permission');

            expect(permissionResult).toEqual({
                isGranted: false,
                error: PermissionError.UnknownPermission,
            });
        });
    });
});
