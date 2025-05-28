import React from 'react';
import { Header } from './Header';
import { useMantineTheme } from '@mantine/core';
import styles from './Components.module.css';

export const Layout = ({ children }: { children?: React.ReactNode }) => {
    const mantineTheme = useMantineTheme();

    return (
        <div
            className={styles.layoutWrap}
            style={{ background: mantineTheme.colors.gray[1] }}
        >
            <Header />
            {children}
        </div>
    )
}