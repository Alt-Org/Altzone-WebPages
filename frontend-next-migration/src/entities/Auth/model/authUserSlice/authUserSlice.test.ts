import { PURGE } from 'redux-persist';
import { AuthUserSchema } from '../../types/authUser';
import {
    authUserReducer,
    authUserActions,
    selectIsAuthenticated,
    selectHasClan,
} from './authUserSlice';

describe('authUserSlice', () => {
    const initialState: AuthUserSchema = {
        accessTokenInfo: undefined,
        profile: undefined,
        isSessionExpired: false,
    };

    it('should return the initial state when passed an empty action', () => {
        expect(authUserReducer(undefined, { type: '' })).toEqual(initialState);
    });

    it('should handle setProfile', () => {
        const profile = { name: 'John Doe', email: 'john@example.com' };
        // @ts-ignore
        const action = authUserActions.setProfile(profile);
        const expectedState = {
            ...initialState,
            profile,
        };

        expect(authUserReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle setAccessTokenInfo', () => {
        const accessTokenInfo = { token: 'abc123' };
        // @ts-ignore
        const action = authUserActions.setAccessTokenInfo(accessTokenInfo);
        const expectedState = {
            ...initialState,
            accessTokenInfo,
        };

        expect(authUserReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle setIsSessionExpired', () => {
        const action = authUserActions.setIsSessionExpired(true);
        const expectedState = {
            ...initialState,
            isSessionExpired: true,
        };

        expect(authUserReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle logout', () => {
        const stateWithProfile = {
            accessTokenInfo: { token: 'abc123' },
            profile: { name: 'John Doe', email: 'john@example.com' },
            isSessionExpired: false,
        };
        const action = authUserActions.logout();
        const expectedState = {
            ...initialState,
            isSessionExpired: true,
        };

        // @ts-ignore
        expect(authUserReducer(stateWithProfile, action)).toEqual(expectedState);
    });

    it('should handle PURGE action', () => {
        const stateWithProfile = {
            accessTokenInfo: { token: 'abc123' },
            profile: { name: 'John Doe', email: 'john@example.com' },
            isSessionExpired: false,
        };
        const action = { type: PURGE };
        const expectedState = {
            ...initialState,
            isSessionExpired: true,
        };
        // @ts-ignore
        expect(authUserReducer(stateWithProfile, action)).toEqual(expectedState);
    });

    // Селекторы
    it('selectIsAuthenticated should return true if profile exists', () => {
        const state = {
            authUser: { profile: { name: 'John Doe' }, accessTokenInfo: undefined },
        };
        // @ts-ignore
        expect(selectIsAuthenticated(state)).toBe(true);
    });

    it('selectIsAuthenticated should return true if accessTokenInfo exists', () => {
        const state = {
            authUser: { profile: undefined, accessTokenInfo: { token: 'abc123' } },
        };
        // @ts-ignore
        expect(selectIsAuthenticated(state)).toBe(true);
    });

    it('selectIsAuthenticated should return false if neither profile nor accessTokenInfo exist', () => {
        const state = {
            authUser: { profile: undefined, accessTokenInfo: undefined },
        };
        // @ts-ignore
        expect(selectIsAuthenticated(state)).toBe(false);
    });

    it('selectHasClan should return true if the user has a clan', () => {
        const state = {
            authUser: { profile: { Player: { clan_id: '123' } } },
        };
        // @ts-ignore
        expect(selectHasClan(state)).toBe(true);
    });

    it('selectHasClan should return false if the user does not have a clan', () => {
        const state = {
            authUser: { profile: { Player: { clan_id: undefined } } },
        };
        // @ts-ignore
        expect(selectHasClan(state)).toBe(false);
    });
});
