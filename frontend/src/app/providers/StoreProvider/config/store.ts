import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import {envHelper} from "@/shared/const/env/envHelper";
import {StateSchema} from "./StateSchema";
import {authApi,authUserReducer, authMiddleware} from "@/entities/Auth";


export function createReduxStore(initialState?: StateSchema) {

    const rootReducers: ReducersMapObject<StateSchema> = {
        authUser: authUserReducer,
        [authApi.reducerPath]: authApi.reducer,
        // [devicesApi.reducerPath]: devicesApi.reducer,
        // [usersApi.reducerPath]: usersApi.reducer,
        // [deviceViewsApi.reducerPath]: deviceViewsApi.reducer,

    };


    return configureStore({
        reducer: rootReducers,
        //only in dev mode
        devTools: envHelper.isDevMode,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
            authApi.middleware,
            authMiddleware,
            // devicesApi.middleware,
            // usersApi.middleware,
            // deviceViewsApi.middleware,
        ),
    });

}

