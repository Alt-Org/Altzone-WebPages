import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import {envHelper} from "@/shared/const/env/envHelper";
import {StateSchema} from "./StateSchema";
import {authApi,authUserReducer, authMiddleware} from "@/entities/Auth";
import {clanApi} from "@/entities/Clan";
import {galleryApi} from "@/entities/Gallery";


export function createReduxStore(initialState?: StateSchema) {

    const rootReducers: ReducersMapObject<StateSchema> = {
        authUser: authUserReducer,
        [authApi.reducerPath]: authApi.reducer,
        [clanApi.reducerPath]: clanApi.reducer,
        [galleryApi.reducerPath]: galleryApi.reducer,
    };


    return configureStore({
        reducer: rootReducers,
        //only in dev mode
        devTools: envHelper.isDevMode,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
            authApi.middleware,
            clanApi.middleware,
            galleryApi.middleware,
            authMiddleware,
            // devicesApi.middleware,
            // usersApi.middleware,
            // deviceViewsApi.middleware,
        ),
    });

}

