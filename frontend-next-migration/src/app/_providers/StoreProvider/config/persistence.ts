import type { PersistedState, WebStorage } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { LS_KEYS } from '@/shared/const/LS_KEYS';
import type { RootState } from './store';

export const PERSIST_VERSION = 1;

const legacyKeys = [LS_KEYS.AUTH_USER, LS_KEYS.PROFILE];

export function createPersistenceStorage(): WebStorage {
    if (typeof window === 'undefined') {
        return {
            getItem: () => Promise.resolve(null),
            setItem: () => Promise.resolve(),
            removeItem: () => Promise.resolve(),
        };
    }

    const storage = createWebStorage('local');
    let hasLegacyKeys = true;

    return {
        ...storage,
        async setItem(key, value) {
            await storage.setItem(key, value);
            // Retain legacy data until the replacement has been written successfully.
            if (hasLegacyKeys) {
                await Promise.all(legacyKeys.map((legacyKey) => storage.removeItem(legacyKey)));
                hasLegacyKeys = false;
            }
        },
    };
}

async function readLegacyObject<Value>(storage: WebStorage, key: string) {
    try {
        const raw = await storage.getItem(key);
        const value: unknown = raw ? JSON.parse(raw) : undefined;
        return value && typeof value === 'object' && !Array.isArray(value)
            ? (value as Value)
            : undefined;
    } catch {
        return undefined;
    }
}

export async function migratePersistedState(
    state: PersistedState,
    storage: WebStorage,
    defaults: RootState,
): Promise<PersistedState & Partial<RootState>> {
    if (state && state._persist.version >= PERSIST_VERSION) {
        return state;
    }

    const restored: (NonNullable<PersistedState> & Partial<RootState>) | undefined = state;
    const [authUser, profile] = await Promise.all([
        readLegacyObject<RootState['authUser']>(storage, LS_KEYS.AUTH_USER),
        readLegacyObject<RootState['profile']>(storage, LS_KEYS.PROFILE),
    ]);
    // Clear legacy auth if the session is expired, otherwise restore the profile
    const restoredAuth = restored?.authUser ?? { ...defaults.authUser, ...authUser };
    const migratedAuth = restoredAuth.isSessionExpired
        ? { ...restoredAuth, accessTokenInfo: undefined }
        : restoredAuth;

    return {
        ...restored,
        authUser: migratedAuth,
        // Older logout handling left the separate profile key behind.
        profile: migratedAuth.accessTokenInfo
            ? (restored?.profile ?? { ...defaults.profile, ...profile })
            : { profile: undefined },
        _persist: { version: PERSIST_VERSION, rehydrated: false },
    };
}
