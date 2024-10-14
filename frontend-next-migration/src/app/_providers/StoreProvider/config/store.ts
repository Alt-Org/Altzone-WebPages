import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { envHelper } from '@/shared/const/envHelper';
import { StateSchema } from './StateSchema';
import { authUserReducer, authMiddleware } from '@/entities/Auth';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/query';
import {gameApi, strapiApi} from '@/shared/api';

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

export function createReduxStore(initialState?: StateSchema) {
  const rootReducer = combineReducers({
    authUser: authUserReducer,
    [gameApi.reducerPath]: gameApi.reducer,
    [strapiApi.reducerPath]: strapiApi.reducer,
  });

  const persistConfig = {
    key: 'root',
    storage,
    blacklist: [
        gameApi.reducerPath,
      strapiApi.reducerPath
    ],
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
      }).concat(
          gameApi.middleware,
          strapiApi.middleware,
          authMiddleware
      ),
  });

  const persistor = persistStore(store);

  setupListeners(store.dispatch);

  return { store, persistor };
}
