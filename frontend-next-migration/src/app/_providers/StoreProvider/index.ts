"use client"
import { StoreProvider,store, persistor } from './ui/StoreProvider';
import { createReduxStore } from './config/store';
import type { StateSchema } from './config/StateSchema';

export {
    store,
    persistor,
    StoreProvider,
    createReduxStore,
    StateSchema,
};
