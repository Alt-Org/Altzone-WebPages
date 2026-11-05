'use client';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StoreProvider } from './StoreProvider';
import { ThemeProvider } from './ThemeProvider';
import { CookiesProvider } from 'react-cookie';

interface ProvidersProps {
    children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <StoreProvider>
            <CookiesProvider>
                <ThemeProvider>
                    <ToastContainer />
                    {children}
                </ThemeProvider>
            </CookiesProvider>
        </StoreProvider>
    );
}
