import { StrictMode } from 'react';
import {HelmetProvider } from 'react-helmet-async';
import  {createRoot} from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { ErrorBoundary } from "@/app/providers/ErrorBoundary";
import App from "@/app/App";
import {StoreProvider} from "@/app/providers/StoreProvider";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import '../src/app/styles/index.scss'

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <StoreProvider>

            <BrowserRouter>
                <ErrorBoundary>
                    <ThemeProvider>
                        <ToastContainer />
                        <HelmetProvider>
                        <App />
                        </HelmetProvider>
                    </ThemeProvider>
                </ErrorBoundary>

            </BrowserRouter>

        </StoreProvider>
    </StrictMode>
);
