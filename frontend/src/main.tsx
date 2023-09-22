import { StrictMode } from 'react';
import  {createRoot} from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { ErrorBoundary } from "@/app/providers/ErrorBoundary";
import App from "@/app/App";
import '../src/app/styles/index.scss'
import {StoreProvider} from "@/app/providers/StoreProvider";


createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <StoreProvider>
            <BrowserRouter>
                <ErrorBoundary>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </ErrorBoundary>
            </BrowserRouter>
        </StoreProvider>
    </StrictMode>
);
