import { Button, Modal, Text, useMantineTheme } from '@mantine/core';
import React from 'react';

const css = {
    textStyle: {
        margin: '15px 20px',
        fontSize: '17px',
        fontWeight: 500,
    },
    titleStyle: {
        margin: '0px 20px',
        fontWeight: 600,
        fontSize: '19px',
    },
    listItem: {
        margin: '20px 0px 50px 0px',
        padding: '5px 15px',
        borderRadius: '15px',
    },
    secondaryText: {
        margin: '0px 20px 15px 20px',
        fontSize: '14px',
        fontWeight: 400,
        color: 'green',
    },
}

type RequisitesDialogProps = {
    isOpen: boolean,
    handleClose: () => void,
}

export const RequisitesDialog = ({ isOpen, handleClose }: RequisitesDialogProps) => {
    const mantineTheme = useMantineTheme();

    return <Modal
        opened={isOpen}
        onClose={handleClose}
    >
        <Text style={css.titleStyle}>Реквизиты</Text>
        <div style={{ ...css.listItem, background: mantineTheme.colors.gray[1] }}>
            <Text style={css.textStyle}>
                Добавить реквизиты
            </Text>
        </div>

        <Button
            fullWidth
            onClick={handleClose}
            size='md'
        >
            Закрыть
        </Button>
    </Modal>
}