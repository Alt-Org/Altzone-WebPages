"use client"
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
// import storage from 'redux-persist/lib/storage';
import {envHelper} from "@/shared/const/env/envHelper";
import {StateSchema} from "./StateSchema";
import {authApi,authUserReducer, authMiddleware} from "@/entities/Auth";
import {clanApi} from "@/entities/Clan";
import {galleryApi} from "@/entities/Gallery";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist";


const createNoopStorage= () => {
    return {
        getItem(_key: any){
            return Promise.resolve(null)
        },
        setItem(_key: any, value: any){
            return Promise.resolve(value)
        },
        removeItem(_key: any){
            return Promise.resolve()
        }

    }
}

const storage =
    typeof window !== "undefined"
        ? createWebStorage("local")
        : createNoopStorage();


export function createReduxStore(initialState?: StateSchema) {

    const rootReducer = combineReducers({
        authUser: authUserReducer,
        [authApi.reducerPath]: authApi.reducer,
        [clanApi.reducerPath]: clanApi.reducer,
        [galleryApi.reducerPath]: galleryApi.reducer,
    });

    const persistConfig = {
        key: 'root',
        storage,
        blacklist: [authApi.reducerPath, clanApi.reducerPath, galleryApi.reducerPath]
    };


    const persistedReducer = persistReducer(persistConfig, rootReducer);


    const store = configureStore({
        // reducer: rootReducers,
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
                authApi.middleware,
                clanApi.middleware,
                galleryApi.middleware,
                authMiddleware,
            ),

    });

    const persistor = persistStore(store);

    return { store, persistor };

}

