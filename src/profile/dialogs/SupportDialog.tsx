import { Button, Modal, Text, Textarea } from '@mantine/core';
import React from 'react';

const css = {
    titleStyle: {
        marginBottom: '10px',
        fontWeight: 600,
        fontSize: '19px',
    }
}

type BalanceDialogProps = {
    isOpen: boolean,
    handleClose: () => void,
}

export const SupportDialog = ({ isOpen, handleClose }: BalanceDialogProps) => {
    return <Modal
        opened={isOpen}
        onClose={handleClose}
    >
        <Text style={css.titleStyle}>Обращение</Text>
        <Textarea
            placeholder="Опишите свою проблему..."
            required
            radius="md"
            fullWidth
            style={{
                marginBottom: '20px',
            }}
        />

        <Button
            fullWidth
            onClick={handleClose}
            size='md'
        >
            Отправить
        </Button>
    </Modal>
}