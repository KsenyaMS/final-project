import React, { createContext, useState, useEffect } from 'react';

export enum ThemeType {
    Light = 'light',
    Dark = 'dark',
}

export type MyThemeProviderType = {
    theme: ThemeType,
    handleThemeChange: (theme: ThemeType) => void,
}

export const initialContext: MyThemeProviderType = {
    theme: ThemeType.Light,
    handleThemeChange: () => { },
};

export const ThemeContext = createContext<MyThemeProviderType>(initialContext);

export type MyThemeProviderOptions = {
    children?: React.ReactNode,
};

export const MyThemeProvider = ({ children }: MyThemeProviderOptions): JSX.Element => {
    const [theme, setTheme] = useState<ThemeType>(ThemeType.Light);

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme) {
            setTheme(theme);
        }
    }, [])

    const handleThemeChange = (theme: ThemeType) => {
        localStorage.setItem('theme', theme);
        setTheme(theme);
    }

    return (
        <ThemeContext.Provider
            value={{
                theme,
                handleThemeChange,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const useMyThemeProvider = (): MyThemeProviderType => React.useContext(ThemeContext);