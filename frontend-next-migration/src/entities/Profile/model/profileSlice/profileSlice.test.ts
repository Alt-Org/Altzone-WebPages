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
            _id: '650d422567e23912f940abe0',
            username: 'John',
            Player: {
                _id: 'string',
                name: 'string',
                backpackCapacity: 200,
                uniqueIdentifier: '200',
                profile_id: 'string',
                clan_id: 'string',
                above13: true,
            },
        };

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
                _id: '650d422567e23912f940abe0',
                username: 'John',
                Player: {
                    _id: 'string',
                    name: 'string',
                    backpackCapacity: 200,
                    uniqueIdentifier: '200',
                    profile_id: 'string',
                    clan_id: 'string',
                    above13: true,
                },
            },
        };
        const action = { type: PURGE };
        const expectedState = {
            profile: undefined,
        };
        expect(profileReducer(stateWithProfile, action)).toEqual(expectedState);
    });

    it('selectHasClan should return TRUE since user has a clan', () => {
        const clan_id = '12345';
        const state = {
            profile: {
                _id: '650d422567e23912f940abe0',
                username: 'John',
                Player: {
                    _id: 'string',
                    name: 'string',
                    backpackCapacity: 200,
                    uniqueIdentifier: '200',
                    profile_id: 'string',
                    clan_id: clan_id,
                    above13: true,
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
