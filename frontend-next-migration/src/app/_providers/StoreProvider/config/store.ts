import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistStore,
    persistReducer,
} from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { authUserReducer, authMiddleware } from '@/entities/Auth';
import { envHelper } from '@/shared/const/envHelper';
import { gameApi, strapiApi } from '@/shared/api';
import { StateSchema } from './StateSchema';

const createNoopStorage = () => {
    return {
        // todo check if can delete the params
        // eslint-disable-next-line  @typescript-eslint/no-unused-vars
        getItem(_key: any) {
            return Promise.resolve(null);
        },
        // eslint-disable-next-line  @typescript-eslint/no-unused-vars
        setItem(_key: any, value: any) {
            return Promise.resolve(value);
        },
        // eslint-disable-next-line  @typescript-eslint/no-unused-vars
        removeItem(_key: any) {
            return Promise.resolve();
        },
    };
};

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

export function createReduxStore(initialState?: StateSchema) {
    const rootReducer = combineReducers({
        authUser: authUserReducer,
        [gameApi.reducerPath]: gameApi.reducer,
        [strapiApi.reducerPath]: strapiApi.reducer,
    });

    const persistConfig = {
        key: 'root',
        storage,
        blacklist: [gameApi.reducerPath, strapiApi.reducerPath],
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);

    const store = configureStore({
        // reducer: rootReducer,
        reducer: persistedReducer,
        //only in dev mode
        devTools: envHelper.isDevMode,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }).concat(gameApi.middleware, strapiApi.middleware, authMiddleware),
    });

    const persistor = persistStore(store);

    setupListeners(store.dispatch);

    return { store, persistor };
}
