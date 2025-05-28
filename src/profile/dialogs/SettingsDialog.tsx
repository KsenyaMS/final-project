import { Box, Button, Modal, Switch, Text } from '@mantine/core';
import { useState } from 'react';
import { putDetailsUserInfoById } from '../../../api/user';
import { useSnackbar } from 'notistack';

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
    checkboxWrapStyle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}

type SettingsDialogFormProps = {
    isReceiveMessages: boolean,
    isConsiderPreferences: boolean,
}

type SettingsDialogProps = {
    isOpen: boolean,
    handleClose: () => void,
    isReceiveMessages: boolean,
    isConsiderPreferences: boolean,
    userId: string,
}

export const SettingsDialog = ({
    isOpen,
    handleClose,
    isReceiveMessages,
    isConsiderPreferences,
    userId,
}: SettingsDialogProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const [settings, setSettings] = useState<SettingsDialogFormProps | undefined>({ isReceiveMessages, isConsiderPreferences });

    const handleSaveButtonClick = async () => {
        try {
            await putDetailsUserInfoById(userId, settings);
            handleClose();
        }
        catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    }

    return <Modal
        opened={isOpen}
        onClose={handleClose}
    >
        <Text style={css.titleStyle}>Настройки</Text>

        <Box style={css.checkboxWrapStyle}>
            <Text style={css.textStyle}>Получать СМС-рассылки</Text>
            <Switch
                checked={settings.isReceiveMessages}
                onChange={(event) => setSettings(prev => ({ ...prev, isReceiveMessages: event.target.checked }))}
            />
        </Box>
        <Box style={css.checkboxWrapStyle}>
            <Text style={css.textStyle}>Учитывать предпочтения в результатах поиска</Text>
            <Switch
                checked={settings.isConsiderPreferences}
                onChange={(event) => setSettings(prev => ({ ...prev, isConsiderPreferences: event.target.checked }))}
            />
        </Box>

        <Button
            fullWidth
            onClick={handleSaveButtonClick}
            size='md'
        >
            Сохранить
        </Button>
    </Modal>
}