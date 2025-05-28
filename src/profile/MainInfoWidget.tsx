import React, { useCallback, useState } from 'react';
import { useMantineTheme, Text, Avatar, ActionIcon } from '@mantine/core';
import { Card } from '../components/Card';
import { DetailUserInfo, putDetailsUserInfoById } from '../../api/user';
import { UserInfo } from '../../providers/UserListProvider';
import { IconBellFilled } from '@tabler/icons-react';
import avatar from "../images/avatar.jpg";
import { useSnackbar } from 'notistack';
import { useDisclosure } from '@mantine/hooks';
import { SettingsDialog } from './dialogs/SettingsDialog';
import { DevicesDialog } from './dialogs/DevicesDialog';
import { CardsDialog } from './dialogs/CardsDialog';
import { RequisitesDialog } from './dialogs/RequisitesDialog';
import { UserAccountDialog } from './dialogs/UserAccountDialog';
import { NotificationDialog } from './dialogs/NotificationDialog';
import { YandexInfo } from '../pages/ProfilePage';
import styles from './MainInfoWidget.module.css';

const css = {
    textStyle: {
        fontSize: '14px',
        fontWeight: 600,
        marginTop: 0,
        color: 'gray'
    },
    boldText: {
        fontWeight: 700,
        color: 'black'
    },
    payText: {
        fontSize: '14px',
        whiteSpace: 'nowrap',
        color: 'gray',
    },
}

const NotificationButton = React.memo(({ handleClick }) => (
    <ActionIcon
        variant="filled"
        aria-label="Settings"
        radius={'lg'}
        size={35}
        style={{
            cursor: 'pointer',
        }}
    >
        <IconBellFilled
            stroke={1.5}
            onClick={handleClick}
        />
    </ActionIcon>
));

enum DialogType {
    Settings = 'settings',
    Devices = 'devices',
    Cards = 'cards',
    Requisites = 'requisites',
    Account = 'account',
    Notification = 'notigication',
}

type MainInfoWidgetProps = {
    details: DetailUserInfo & UserInfo,
    yandexInfo: YandexInfo,
}

export const MainInfoWidget = ({ details, yandexInfo }: MainInfoWidgetProps) => {
    const mantineTheme = useMantineTheme();
    const { enqueueSnackbar } = useSnackbar();
    const [avatarSrc, setAvatarSrc] = useState<string>(avatar);

    const [isOpen, { open, close }] = useDisclosure(false);
    const [dialogType, setDialogType] = useState<DialogType | undefined>();

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async () => {
                setAvatarSrc(reader.result as string);
                try {
                    await putDetailsUserInfoById(details.id, { avatarSrc: reader.result as string });
                }
                catch (error) {
                    enqueueSnackbar(error.message, { variant: 'error' });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNotificationButtonClick = useCallback(() => {
        setDialogType(DialogType.Notification);
        open();
    }, [open])

    return (
        <Card
            cardStyle={{
                width: '30%',
                minWidth: '400px',
                height: '80vh',
            }}
        >
            <div className={styles.userInfoWrap}>
                <div className={styles.avatarWrap}>
                    <Avatar
                        src={avatarSrc}
                        size={50}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className={styles.avatarIntupStyle}
                        onChange={handleAvatarChange}
                    />
                    <Text
                        style={{ marginLeft: '10px' }}
                        onClick={() => {
                            setDialogType(DialogType.Account);
                            open();
                        }}
                    >
                        {yandexInfo ? yandexInfo?.login : details.userName}
                    </Text>
                </div>
                <NotificationButton handleClick={() => handleNotificationButtonClick()} />
            </div>
            <div className={styles.infoWrap}>
                <div
                    className={styles.infoBox}
                    style={{
                        padding: '25px 15px',
                        background: mantineTheme.colors.gray[1],
                    }}
                >
                    <Text style={{ color: 'gray' }}>Ваша скидка</Text>
                    <Text style={css.boldText}>
                        до {details.sale}%
                    </Text>
                </div>
                <div
                    className={styles.infoBox}
                    style={{
                        padding: '25px 15px',
                        background: mantineTheme.colors.gray[1],
                    }}
                >
                    <Text style={css.payText}>Оплата при получении</Text>
                    <Text style={css.boldText}>
                        до {details.limitOnPaymentUponReceipt} руб.
                    </Text>
                </div>
            </div>
            <div className={styles.settingsWrap}>
                <Text style={{ ...css.textStyle }}>
                    Финансы
                </Text>
                <div
                    className={`${styles.infoBox} ${styles.horizontalBlock}`}
                    style={{
                        background: mantineTheme.colors.gray[1],
                        padding: '13px 15px',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        setDialogType(DialogType.Cards);
                        open();
                    }}
                >
                    <Text>Способы оплаты</Text>
                </div>
                <div
                    className={`${styles.infoBox} ${styles.horizontalBlock}`}
                    style={{
                        background: mantineTheme.colors.gray[1],
                        padding: '13px 15px',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        setDialogType(DialogType.Requisites);
                        open();
                    }}
                >
                    <Text>Реквизиты</Text>
                </div>
            </div>
            <div className={styles.settingsWrap}>
                <Text style={{ ...css.textStyle }}>
                    Управление
                </Text>
                <div
                    className={`${styles.infoBox} ${styles.horizontalBlock}`}
                    style={{
                        background: mantineTheme.colors.gray[1],
                        padding: '13px 15px',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        setDialogType(DialogType.Settings);
                        open();
                    }}
                >
                    <Text>Настройки</Text>
                </div>
                <div
                    className={`${styles.infoBox} ${styles.horizontalBlock}`}
                    style={{
                        background: mantineTheme.colors.gray[1],
                        padding: '13px 15px',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        setDialogType(DialogType.Devices);
                        open();
                    }}
                >
                    <Text>Ваши устройства</Text>
                </div>
            </div>
            <SettingsDialog
                isOpen={isOpen && dialogType === DialogType.Settings}
                handleClose={close}
                isReceiveMessages={details.isReceiveMessages}
                isConsiderPreferences={details.isConsiderPreferences}
                userId={details.id}
            />
            <DevicesDialog
                isOpen={isOpen && dialogType === DialogType.Devices}
                handleClose={close}
                deviceList={details.deviceList}
                userId={details.id}
            />
            <CardsDialog
                isOpen={isOpen && dialogType === DialogType.Cards}
                handleClose={close}
                cardList={details.cards}
                userId={details.id}
            />
            <RequisitesDialog
                isOpen={isOpen && dialogType === DialogType.Requisites}
                handleClose={close}
                cardList={details.cards}
                userId={details.id}
            />
            <UserAccountDialog
                isOpen={isOpen && dialogType === DialogType.Account}
                handleClose={close}
                details={details}
            />
            <NotificationDialog
                isOpen={isOpen && dialogType === DialogType.Notification}
                handleClose={close}
                notificationList={details.notifications}
                userId={details.id}
            />
        </Card>
    )
}
