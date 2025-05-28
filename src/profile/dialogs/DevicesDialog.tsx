import { Button, Modal, Text, useMantineTheme } from '@mantine/core';
import { Device, putDetailsUserInfoById } from '../../../api/user';
import { useSnackbar } from 'notistack';
import styles from './Dialog.module.css';

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
    secondaryText: {
        margin: '0px 20px 15px 20px',
        fontSize: '14px',
        fontWeight: 400,
        color: 'green',
    },
}

type DevicesDialogProps = {
    isOpen: boolean,
    handleClose: () => void,
    deviceList: Device[],
    userId: string
}

export const DevicesDialog = ({ isOpen, handleClose, deviceList, userId }: DevicesDialogProps) => {
    const mantineTheme = useMantineTheme();
    const { enqueueSnackbar } = useSnackbar();

    const handleSaveButtonClick = async () => {
        try {
            const activeDevice: Device = deviceList
                .find(item => item.isActive);
            await putDetailsUserInfoById(userId, { deviceList: [activeDevice] });
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
        <Text style={css.titleStyle}>Ваши устройства</Text>

        <Text style={css.textStyle}>На них вы входили в этот профиль</Text>

        {deviceList.map((item, idx) =>
            <div
                key={idx}
                className={styles.listItem}
                style={{ background: mantineTheme.colors.gray[1] }}
            >
                <Text
                    style={css.titleStyle}
                >
                    {item.name}
                </Text>
                {item.isActive &&
                    <Text style={{ ...css.secondaryText, color: mantineTheme.colors.green[6] }}>
                        Текущий сеанс
                    </Text>
                }
            </div>
        )}

        <Button
            fullWidth
            onClick={handleSaveButtonClick}
            size='md'
        >
            Выйти на всех, кроме этого
        </Button>
    </Modal>
}