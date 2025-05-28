import { Button, Modal, Text, useMantineTheme } from '@mantine/core';
import { Notification, putDetailsUserInfoById } from '../../../api/user';
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

type NotificationDialogProps = {
    isOpen: boolean,
    handleClose: () => void,
    notificationList: Notification[],
    userId: string
}

export const NotificationDialog = ({ isOpen, handleClose, notificationList, userId }: NotificationDialogProps) => {
    const mantineTheme = useMantineTheme();
    const { enqueueSnackbar } = useSnackbar();

    const handleSaveButtonClick = async () => {
        try {
            await putDetailsUserInfoById(userId, { notifications: notificationList });
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
        <Text style={css.titleStyle}>Уведомления</Text>

        {!!notificationList.length && notificationList.map((item, idx) =>
            <div
                key={idx}
                className={styles.listItem}
                style={{ background: mantineTheme.colors.gray[1] }}
            >
                <Text style={css.titleStyle}>
                    {item.name}
                </Text>
                <Text style={css.textStyle}>
                    {item.description}
                </Text>
            </div>
        )}
        {!notificationList.length &&
            <Text style={css.textStyle}>
                Нет уведомлений
            </Text>
        }

        <Button
            fullWidth
            onClick={handleSaveButtonClick}
            size='md'
            style={{ marginTop: '20px' }}
            disabled={!notificationList.length}
        >
            Удалить
        </Button>
    </Modal>
}