import { combineReducers, configureStore, type UnknownAction } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist';
import type { PersistConfig } from 'redux-persist';
import { authUserReducer, authMiddleware } from '@/entities/Auth';
import { profileReducer } from '@/entities/Profile';
import { navBarReducer } from '@/widgets/Navbar';
import { envHelper } from '@/shared/const/envHelper';
import { gameApi } from '@/shared/api/gameApi';
import { strapiApi } from '@/shared/api/strapiApi';
import { directusApi } from '@/shared/api/directusApi';
import { createPersistenceStorage, migratePersistedState, PERSIST_VERSION } from './persistence';

export const rootReducer = combineReducers({
    authUser: authUserReducer,
    profile: profileReducer,
    navbar: navBarReducer,
    [gameApi.reducerPath]: gameApi.reducer,
    [strapiApi.reducerPath]: strapiApi.reducer,
    [directusApi.reducerPath]: directusApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type InitialState = Partial<RootState>;

export function createReduxStore(initialState?: InitialState) {
    const storage = createPersistenceStorage();
    const defaults = rootReducer(initialState, { type: '@@INIT' });

    const persistConfig: PersistConfig<RootState> = {
        key: 'root',
        version: PERSIST_VERSION,
        storage,
        blacklist: [gameApi.reducerPath, strapiApi.reducerPath, directusApi.reducerPath],
        migrate: (state) => migratePersistedState(state, storage, defaults),
    };

    // Seed the base reducer without requiring callers to supply internal _persist metadata.
    const persistedReducer = persistReducer(
        persistConfig,
        (state: RootState | undefined, action: UnknownAction) =>
            rootReducer(state ?? defaults, action),
    );

    return configureStore({
        reducer: persistedReducer,
        devTools: envHelper.isDevMode,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }).concat(
                gameApi.middleware,
                strapiApi.middleware,
                directusApi.middleware,
                authMiddleware,
            ),
    });
}

export type AppStore = ReturnType<typeof createReduxStore>;
export type AppDispatch = AppStore['dispatch'];
