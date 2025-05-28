import { Button, Modal, Text, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { Card, putDetailsUserInfoById } from '../../../api/user';
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

type CardsDialogProps = {
    isOpen: boolean,
    handleClose: () => void,
    cardList: Card[],
    userId: string
}

export const CardsDialog = ({ isOpen, handleClose, cardList, userId }: CardsDialogProps) => {
    const mantineTheme = useMantineTheme();
    const { enqueueSnackbar } = useSnackbar();
    const [cards, setCards] = useState<Card[]>(cardList);

    const handleSaveButtonClick = async () => {
        try {
            await putDetailsUserInfoById(userId, { cards });
            handleClose();
        }
        catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    }

    const handleDeleteButtonClick = (cardNumber: string) => {
        const newCardList = cardList
            .filter(item => item.cardNumber !== cardNumber);
        setCards(newCardList);
    }

    return <Modal
        opened={isOpen}
        onClose={handleClose}
    >
        <Text style={css.titleStyle}>Способы оплаты</Text>

        {!!cards.length && cards.map((item, idx) =>
            <div
                key={idx}
                className={styles.listItem}
                style={{ background: mantineTheme.colors.gray[1] }}
            >
                <div className={styles.buttonWrap}>
                    <Text style={css.titleStyle}>
                        {item.cardNumber}
                    </Text>
                    <Button
                        size='xs'
                        onClick={() => handleDeleteButtonClick(item.cardNumber)}
                    >
                        Удалить
                    </Button>
                </div>
                {item.isActive &&
                    <Text style={{ ...css.secondaryText, color: mantineTheme.colors.green[6] }}>
                        Основной
                    </Text>
                }
            </div>
        )}
        {!cards.length &&
            <Text style={css.textStyle}>
                У вас нет карт, привязанных к вашему аккаунту
            </Text>
        }

        <Button
            fullWidth
            onClick={handleSaveButtonClick}
            size='md'
            style={{ marginTop: '20px' }}
        >
            Сохранить
        </Button>
    </Modal>
}