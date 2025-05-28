import React from 'react';
import { Box } from '@mantine/core';
import styles from './Components.module.css';

type CardProps = {
    children?: React.ReactNode,
    cardStyle: { [key: string]: string }
}

export const Card = ({ children, cardStyle }: CardProps) => {

    return (
        <Box
            className={styles.cardWrap}
            style={cardStyle}
        >
            {children}
        </Box>
    )
}