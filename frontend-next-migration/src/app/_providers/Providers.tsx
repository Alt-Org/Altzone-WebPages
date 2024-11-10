'use client';
import { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './StoreProvider';
import { ThemeProvider } from './ThemeProvider';

interface ProvidersProps {
    children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <ReduxProvider store={store}>
            <PersistGate
                loading={null}
                persistor={persistor}
            >
                <ThemeProvider>
                    <ToastContainer />
                    {children}
                </ThemeProvider>
            </PersistGate>
        </ReduxProvider>
    );
}
