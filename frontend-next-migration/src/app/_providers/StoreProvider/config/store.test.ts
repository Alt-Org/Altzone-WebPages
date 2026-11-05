/** @jest-environment node */
import { createReduxStore, type AppStore } from './store';
import { authEndpoints, authUserActions } from '@/entities/Auth';
import { profileActions, selectProfile, selectClanId } from '@/entities/Profile';
import { gameApi } from '@/shared/api/gameApi';

jest.mock('@/shared/const/envHelper', () => ({
    envHelper: { apiLink: 'https://game.test', isDevMode: false },
}));

const tokenInfo = { accessToken: 'redux-token', accessTokenExpiresAt: 2000000000 };
const profile = {
    _id: 'profile-1',
    username: 'Player',
    Player: {
        _id: 'player-1',
        name: 'Player',
        backpackCapacity: 200,
        uniqueIdentifier: '123',
        profile_id: 'profile-1',
        clan_id: 'clan-1',
        above13: true,
        parentalAuth: false,
        points: 0,
    },
};

describe('Redux store integration', () => {
    const stores: AppStore[] = [];

    const makeStore = () => {
        const store = createReduxStore({
            authUser: { accessTokenInfo: tokenInfo, isSessionExpired: false },
            profile: { profile },
        });
        stores.push(store);
        return store;
    };

    afterEach(() => {
        stores.forEach((store) => store.dispatch(gameApi.util.resetApiState()));
        stores.length = 0;
        jest.restoreAllMocks();
    });

    it('creates independent stores with usable profile selectors and partial preload input', () => {
        const first = makeStore();
        const second = makeStore();

        first.dispatch(profileActions.clearProfile());

        expect(selectProfile(first.getState())).toBeUndefined();
        expect(selectProfile(second.getState())).toEqual(profile);
        expect(selectClanId(second.getState())).toBe('clan-1');
        expect(first.getState()).not.toHaveProperty('_persist');
    });

    it('reads the current Redux token for every request without browser storage', async () => {
        const store = makeStore();
        const fetchMock = jest
            .spyOn(globalThis, 'fetch')
            .mockImplementation(
                async () =>
                    new Response(JSON.stringify({ ...profile, accessToken: 'response-token' })),
            );

        await store.dispatch(
            authEndpoints.login.initiate({ username: 'Player', password: 'test' }),
        );
        store.dispatch(
            authUserActions.setAccessTokenInfo({ ...tokenInfo, accessToken: 'new-token' }),
        );
        await store.dispatch(
            authEndpoints.login.initiate({ username: 'Player', password: 'test' }),
        );

        const requests = fetchMock.mock.calls.map(([input]) => input as Request);
        expect(requests[0].headers.get('Authorization')).toBe('Bearer redux-token');
        expect(requests[1].headers.get('Authorization')).toBe('Bearer new-token');
    });

    it.each([200, 500])(
        'sends the logout token, then clears the session even with HTTP %s',
        async (status) => {
            const store = makeStore();
            const fetchMock = jest.spyOn(globalThis, 'fetch').mockImplementation(async () => {
                expect(store.getState().authUser.accessTokenInfo).toEqual(tokenInfo);
                return new Response(JSON.stringify({}), { status });
            });

            await store.dispatch(authEndpoints.logout.initiate());

            const request = fetchMock.mock.calls[0][0] as Request;
            expect(request.headers.get('Authorization')).toBe('Bearer redux-token');
            expect(store.getState().authUser).toEqual({
                accessTokenInfo: undefined,
                isSessionExpired: true,
            });
            expect(selectProfile(store.getState())).toBeUndefined();
            expect(store.getState().gameApi.mutations).toEqual({});
        },
    );

    it('clears cached private data and the profile on a direct logout action', async () => {
        const store = makeStore();
        const api = gameApi.injectEndpoints({
            endpoints: (builder) => ({
                migrationPrivateData: builder.query<{ secret: string }, void>({
                    query: () => '/private',
                }),
            }),
        });
        jest.spyOn(globalThis, 'fetch').mockResolvedValue(
            new Response(JSON.stringify({ secret: 'private' })),
        );
        const query = store.dispatch(api.endpoints.migrationPrivateData.initiate());
        await query;
        expect(api.endpoints.migrationPrivateData.select()(store.getState()).data).toEqual({
            secret: 'private',
        });

        store.dispatch(authUserActions.logout());

        expect(store.getState().gameApi.queries).toEqual({});
        expect(selectProfile(store.getState())).toBeUndefined();
        query.unsubscribe();
    });
});
