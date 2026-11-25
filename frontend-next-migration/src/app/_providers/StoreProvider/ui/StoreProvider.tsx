'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, type Persistor } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { createReduxStore, type AppStore, type InitialState } from '../config/store';

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: InitialState;
}

export const StoreProvider = ({ children, initialState }: StoreProviderProps) => {
    const storeRef = useRef<AppStore | null>(null);
    const persistorRef = useRef<Persistor | null>(null);
    const [persistor, setPersistor] = useState<Persistor | null>(null);

    if (storeRef.current === null) {
        storeRef.current = createReduxStore(initialState);
    }

    const store = storeRef.current;

    useEffect(() => {
        // Reuse the persistor when React Strict Mode replays effects.
        if (persistorRef.current === null) {
            persistorRef.current = persistStore(store);
        }
        setPersistor(persistorRef.current);

        const unsubscribe = setupListeners(store.dispatch);
        return () => {
            unsubscribe();
            void persistorRef.current?.flush();
        };
    }, [store]);

    return (
        <Provider store={store}>
            {persistor && (
                <PersistGate
                    loading={null}
                    persistor={persistor}
                >
                    {children}
                </PersistGate>
            )}
        </Provider>
    );
};
