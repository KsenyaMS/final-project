import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProfilePage } from './pages/ProfilePage';
import { Layout } from './components/Layout';
import { AuthorizationPage } from './pages/AuthorizationPage';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { MyTheme } from '../styles/theme';
import { useMyThemeProvider } from '../providers/ThemeProvider';

export const App = () => {
    const { theme } = useMyThemeProvider();

    return <MantineProvider theme={MyTheme[theme]}>
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="*" element={<AuthorizationPage />} />
                    <Route path="login" element={<AuthorizationPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    </MantineProvider >
}