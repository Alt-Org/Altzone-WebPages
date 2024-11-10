import { PURGE } from 'redux-persist';
import { ProfileSchema } from '../../types/profile';
import { profileReducer, profileActions, selectHasClan, selectClanId } from './profileSlice';

describe('profileSlice', () => {
    //initialState if defaultProfile is used
    // const initialState: ProfileSchema = {
    //     profile: {
    //         _id: null,
    //         username: null,
    //         Player: {
    //             _id: null,
    //             name: null,
    //             backpackCapacity: null,
    //             uniqueIdentifier: null,
    //             profile_id: null,
    //             clan_id: null,
    //             above13: null,
    //         },
    //     },
    // };

    //initialState if defualtProfile not used
    const initialState: ProfileSchema = {
        profile: undefined,
    };

    it('should return the initial state when passed an empty action', () => {
        expect(profileReducer(undefined, { type: '' })).toEqual(initialState);
    });

    it('should handle setProfile', () => {
        const profile = {
            username: 'John',
            Player: {
                name: 'John Doe',
            },
        };
        // @ts-ignore
        const action = profileActions.setProfile(profile);
        const expectedState = {
            ...initialState,
            profile,
        };

        expect(profileReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle PURGE action', () => {
        const stateWithProfile = {
            profile: {
                username: 'John',
                Player: {
                    name: 'John Doe',
                },
            },
        };
        const action = { type: PURGE };
        const expectedState = {
            profile: undefined,
        };
        // @ts-ignore
        expect(profileReducer(stateWithProfile, action)).toEqual(expectedState);
    });

    it('selectHasClan should return TRUE since user has a clan', () => {
        const clan_id = '12345';
        const state = {
            profile: {
                profile: {
                    Player: {
                        clan_id: clan_id,
                    },
                },
            },
        };
        // @ts-ignore
        expect(selectHasClan(state)).toBe(true);
    });

    it('selectClanId should return the set clan_id since user has a clan', () => {
        const clan_id = '12345';
        const state = {
            profile: {
                profile: {
                    Player: {
                        clan_id: clan_id,
                    },
                },
            },
        };
        // @ts-ignore
        expect(selectClanId(state)).toBe(clan_id);
    });

    it('selectHasClan should return FALSE since user does not have a clan', () => {
        const clan_id = undefined;
        const state = {
            profile: {
                profile: {
                    Player: {
                        clan_id: clan_id,
                    },
                },
            },
        };
        // @ts-ignore
        expect(selectHasClan(state)).toBe(false);
    });
});
