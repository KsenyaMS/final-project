import React, { useState, useCallback, useEffect } from 'react';
import { useMantineTheme, Text, Button } from '@mantine/core';
import { Card } from '../components/Card';
import { DetailUserInfo, getStatisticByUserId, StatisticType } from '../../api/user';
import { IconArrowRight } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { BalanceDialog } from './dialogs/BalanceDialog';
import { InstallmentsLimit } from './dialogs/InstallmentsLimit';
import { SupportDialog } from './dialogs/SupportDialog';
import styles from './DetailsWidget.module.css';
import { AreaChart } from '@mantine/charts';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis } from 'recharts';

const css = {
    mainCardStyle: {
        alignItems: 'center',
        justifyContent: 'space-between',
        display: 'flex',
        boxSizing: 'border-box',
        padding: '20px',
        color: 'gray',
        height: '100px',
    },
    boldText: {
        fontSize: '20px',
        fontWeight: 700,
        color: 'black',
    },
    buttonCard: {
        marginBottom: '20px',
        boxSizing: 'border-box',
        padding: '20px',
        width: '100%',
        height: '100px',
    },
}

const IconButton = React.memo(({ handleClick }) => (
    <Button
        variant="light"
        radius={'lg'}
        onClick={handleClick}
    >
        <IconArrowRight size={14} />
    </Button>
));

enum DialogType {
    Balance = 'balance',
    Limit = 'limit',
    Support = 'support',
    Questions = 'questions',
    Refund = 'refund',
}

type DetailsWidgetProps = {
    details: DetailUserInfo,
    userId: string,
}

export const DetailsWidget = ({ details, userId }: DetailsWidgetProps) => {
    const mantineTheme = useMantineTheme();
    const [statisticInfo, setStatisticInfo] = useState<StatisticType | undefined>();
    const [dialogType, setDialogType] = useState<DialogType | undefined>();
    const [isOpen, { open, close }] = useDisclosure(false);

    const handleLimitButtonClick = useCallback(() => {
        setDialogType(DialogType.Limit);
        open();
    }, [open])

    const getStatisticInfo = async (userId: string) => {
        const result = await getStatisticByUserId(userId);
        setStatisticInfo(result);
    }

    useEffect(() => {
        getStatisticInfo(userId);
    }, [userId])

    return (
        <div className={styles.wrap}>
            <div className={styles.difficultRow}>
                <Card
                    cardStyle={{
                        ...css.mainCardStyle,
                        width: '49%',
                    }}
                >
                    <div>
                        <Text style={css.boldText}>
                            {details.balance} руб.
                        </Text>
                        <Text size='15px'>
                            Ваш кошелёк
                        </Text>
                    </div>
                    <Button
                        size='md'
                        onClick={() => {
                            setDialogType(DialogType.Balance);
                            open();
                        }}
                    >
                        Пополнить
                    </Button>
                </Card>
                <Card
                    cardStyle={{
                        ...css.mainCardStyle,
                        width: '49%',
                    }}
                >
                    <div>
                        <Text style={css.boldText}>
                            {details.limitOnPaymentInInstallments} руб.
                        </Text>
                        <Text size='15px'>
                            Лимит на оплату частями
                        </Text>
                    </div>
                    <IconButton
                        handleClick={() => handleLimitButtonClick()}
                    />
                </Card>
            </div>
            <div className={styles.difficultRow}>
                <Card
                    cardStyle={{
                        ...css.mainCardStyle,
                        width: '32%',
                    }}
                >
                    <div>
                        <Text style={css.boldText}>
                            Избранное
                        </Text>
                        <Text size='15px'>
                            {details.favoriteGoods} товаров
                        </Text>
                    </div>
                    {/* <Button size='md'>Пополнить</Button> */}
                </Card>
                <Card
                    cardStyle={{
                        ...css.mainCardStyle,
                        width: '32%',
                    }}
                >
                    <div>
                        <Text style={css.boldText}>
                            Покупки
                        </Text>
                        <Text size='15px'>
                            {details.purchases} товаров
                        </Text>
                    </div>
                    {/* <Button size='md'>Пополнить</Button> */}
                </Card>
                <Card
                    cardStyle={{
                        ...css.mainCardStyle,
                        width: '32%',
                    }}
                >
                    <div>
                        <Text style={css.boldText}>
                            Ждут оценки
                        </Text>
                        <Text size='15px'>
                            {details.awaitingEvaluation} товаров
                        </Text>
                    </div>
                    {/* <Button size='md'>Пополнить</Button> */}
                </Card>
            </div>
            <Card cardStyle={{ ...css.buttonCard, height: '120px' }}>
                <Text style={css.boldText}>
                    Сервис и помощь
                </Text>
                <div className={styles.serviceButtonWrap}>
                    <Button
                        color={mantineTheme.colors.gray[1]}
                        style={{ color: 'black' }}
                        size='md'
                        fullWidth
                        onClick={() => {
                            setDialogType(DialogType.Support);
                            open();
                        }}
                    >
                        Написать в поддержку
                    </Button>
                    <Button
                        color={mantineTheme.colors.gray[1]}
                        style={{ color: 'black' }}
                        size='md'
                        fullWidth
                    >
                        Вернуть товар
                    </Button>
                    <Button
                        color={mantineTheme.colors.gray[1]}
                        style={{ color: 'black' }}
                        size='md'
                        fullWidth
                    >
                        Частые вопросы
                    </Button>
                </div>
            </Card>
            <Card cardStyle={{ ...css.buttonCard, height: '350px', padding: '30px 15px 15px 15px' }}>
                <Text style={{ ...css.boldText, marginBottom: '15px' }}>
                    Статистика трат за 3 месяца
                </Text>
                <LineChart width={1000} height={300} data={statisticInfo?.statistic}>
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Line type="monotone" dataKey={statisticInfo?.keys[0]} stroke="blue" yAxisId={0} />
                    <Line type="monotone" dataKey={statisticInfo?.keys[1]} stroke="red" yAxisId={1} />
                    <Line type="monotone" dataKey={statisticInfo?.keys[2]} stroke="green" yAxisId={2} />
                </LineChart>
            </Card>
            {details.balance &&
                <BalanceDialog
                    isOpen={isOpen && dialogType === DialogType.Balance}
                    handleClose={close}
                />
            }
            {details.limitOnPaymentInInstallments &&
                <InstallmentsLimit
                    isOpen={isOpen && dialogType === DialogType.Limit}
                    limit={details.limitOnPaymentInInstallments}
                    handleClose={close}
                />
            }
            <SupportDialog
                isOpen={isOpen && dialogType === DialogType.Support}
                handleClose={close}
            />
        </div>
    )
}
