import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'jotai';
import { App } from './App';
import { MyThemeProvider } from '../providers/ThemeProvider';
import { SnackbarProvider } from 'notistack';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <SnackbarProvider>
        <MyThemeProvider>
            <Provider>
                <App />
            </Provider>
        </MyThemeProvider>
    </SnackbarProvider>
)
