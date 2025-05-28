import { Button, Modal, Text } from '@mantine/core';

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
    }
}

type BalanceDialogProps = {
    isOpen: boolean,
    handleClose: () => void,
}

export const BalanceDialog = ({ isOpen, handleClose }: BalanceDialogProps) => {
    return <Modal
        opened={isOpen}
        onClose={handleClose}
    >
        <Text style={css.titleStyle}>Как пополнить кошелёк</Text>

        <Text style={css.textStyle}>1. В приложении банка, к которому привязан ваш номер , выберите перевод по телефону или СБП</Text>

        <Text style={css.textStyle}>2. Укажите тот же телефон, сумму и получателя</Text>

        <Text style={css.textStyle}>3. Готово: деньги в кошельке</Text>

        <Button
            fullWidth
            onClick={handleClose}
            size='md'
        >
            Понятно, спасибо
        </Button>
    </Modal>
}