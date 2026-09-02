'use client';
import { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './StoreProvider';
import { ThemeProvider } from './ThemeProvider';
import { CookiesProvider } from 'react-cookie';

interface ProvidersProps {
    children: ReactNode;
}

function ToastDebug() {
    return (
        <div
            style={{
                position: 'fixed',
                bottom: 20,
                left: 20,
                zIndex: 99999,
                display: 'flex',
                gap: 8,
            }}
        >
            <button onClick={() => toast.success('Success toast')}>success</button>
            <button onClick={() => toast.error('Error toast')}>error</button>
            <button onClick={() => toast.info('Info toast')}>info</button>
            <button onClick={() => toast.warning('Warning toast')}>warning</button>
        </div>
    );
}

export function Providers({ children }: ProvidersProps) {
    return (
        <ReduxProvider store={store}>
            <PersistGate
                loading={null}
                persistor={persistor}
            >
                <CookiesProvider>
                    <ThemeProvider>
                        <ToastContainer theme="dark" />
                        {children}
                        <ToastDebug />
                    </ThemeProvider>
                </CookiesProvider>
            </PersistGate>
        </ReduxProvider>
    );
}
