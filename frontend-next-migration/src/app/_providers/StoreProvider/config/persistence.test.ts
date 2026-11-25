import { persistStore, type Persistor } from 'redux-persist';
import { createReduxStore } from './store';
import { createPersistenceStorage } from './persistence';
import { LS_KEYS } from '@/shared/const/LS_KEYS';
import { authUserActions } from '@/entities/Auth';
import { profileActions } from '@/entities/Profile';

const tokenInfo = { accessToken: 'saved-token', accessTokenExpiresAt: 2000000000 };
const profile = { _id: 'profile-1', username: 'Player', Player: null };

function startPersistence(store: ReturnType<typeof createReduxStore>) {
    return new Promise<Persistor>((resolve) => {
        const persistor = persistStore(store, undefined, () => resolve(persistor));
    });
}

describe('Redux persistence migration', () => {
    const persistors: Persistor[] = [];

    beforeEach(() => localStorage.clear());

    afterEach(async () => {
        await Promise.all(persistors.map((persistor) => persistor.flush()));
        persistors.forEach((persistor) => persistor.pause());
        persistors.length = 0;
        localStorage.clear();
        jest.restoreAllMocks();
    });

    it('migrates legacy auth, profile, and navbar keys and removes them only after saving', async () => {
        localStorage.setItem(LS_KEYS.AUTH_USER, JSON.stringify({ accessTokenInfo: tokenInfo }));
        localStorage.setItem(LS_KEYS.PROFILE, JSON.stringify({ profile }));

        const store = createReduxStore();
        expect(store.getState().authUser.accessTokenInfo).toBeUndefined();
        const persistor = await startPersistence(store);
        persistors.push(persistor);

        expect(store.getState().authUser).toEqual({
            accessTokenInfo: tokenInfo,
            isSessionExpired: false,
        });
        expect(store.getState().profile.profile).toEqual(profile);
        expect(store.getState().navbar).toEqual({
            isCollapsed: false,
            isFixed: false,
        });
        expect(localStorage.getItem(LS_KEYS.AUTH_USER)).not.toBeNull();

        await persistor.flush();
        expect(localStorage.getItem(LS_KEYS.AUTH_USER)).toBeNull();
        expect(localStorage.getItem(LS_KEYS.PROFILE)).toBeNull();

        const saved = JSON.parse(localStorage.getItem('persist:root') ?? '{}');
        expect(Object.keys(saved).sort()).toEqual(['_persist', 'authUser', 'navbar', 'profile']);
    });

    it('prefers a persisted logout over stale legacy auth and profile keys', async () => {
        localStorage.setItem(
            'persist:root',
            JSON.stringify({
                authUser: JSON.stringify({ accessTokenInfo: tokenInfo, isSessionExpired: true }),
                _persist: JSON.stringify({ version: -1, rehydrated: true }),
            }),
        );
        localStorage.setItem(
            LS_KEYS.AUTH_USER,
            JSON.stringify({ accessTokenInfo: tokenInfo, isSessionExpired: true }),
        );
        localStorage.setItem(LS_KEYS.PROFILE, JSON.stringify({ profile }));

        const store = createReduxStore();
        persistors.push(await startPersistence(store));

        expect(store.getState().authUser.accessTokenInfo).toBeUndefined();
        expect(store.getState().authUser.isSessionExpired).toBe(true);
        expect(store.getState().profile.profile).toBeUndefined();
    });

    it('restores a legacy profile alongside an existing persisted authenticated session', async () => {
        localStorage.setItem(
            'persist:root',
            JSON.stringify({
                authUser: JSON.stringify({ accessTokenInfo: tokenInfo, isSessionExpired: false }),
                _persist: JSON.stringify({ version: -1, rehydrated: true }),
            }),
        );
        localStorage.setItem(LS_KEYS.PROFILE, JSON.stringify({ profile }));

        const store = createReduxStore();
        persistors.push(await startPersistence(store));

        expect(store.getState().authUser.accessTokenInfo).toEqual(tokenInfo);
        expect(store.getState().profile.profile).toEqual(profile);
    });

    it('restores new state after refresh and does not restore a logged-out session', async () => {
        const first = createReduxStore();
        const persistor = await startPersistence(first);
        persistors.push(persistor);
        first.dispatch(authUserActions.setAccessTokenInfo(tokenInfo));
        first.dispatch(profileActions.setProfile(profile));
        await persistor.flush();
        persistor.pause();

        const second = createReduxStore();
        const secondPersistor = await startPersistence(second);
        persistors.push(secondPersistor);
        expect(second.getState().authUser.accessTokenInfo).toEqual(tokenInfo);
        expect(second.getState().profile.profile).toEqual(profile);

        second.dispatch(authUserActions.logout());
        await secondPersistor.flush();
        secondPersistor.pause();

        const third = createReduxStore();
        persistors.push(await startPersistence(third));
        expect(third.getState().authUser.accessTokenInfo).toBeUndefined();
        expect(third.getState().profile.profile).toBeUndefined();
    });

    it('ignores malformed legacy JSON and preserves explicit initial state', async () => {
        localStorage.setItem(LS_KEYS.AUTH_USER, '{broken json');
        localStorage.setItem(LS_KEYS.PROFILE, 'null');
        const store = createReduxStore({});
        persistors.push(await startPersistence(store));

        expect(store.getState().authUser.isSessionExpired).toBe(false);
        expect(store.getState().profile.profile).toBeUndefined();
    });

    it('retains legacy data if writing the new persisted state fails', async () => {
        localStorage.setItem(LS_KEYS.AUTH_USER, JSON.stringify({ accessTokenInfo: tokenInfo }));
        const storage = createPersistenceStorage();
        jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
            throw new Error('Storage is full');
        });

        await expect(storage.setItem('persist:root', '{}')).rejects.toThrow('Storage is full');
        expect(localStorage.getItem(LS_KEYS.AUTH_USER)).not.toBeNull();
    });
});
