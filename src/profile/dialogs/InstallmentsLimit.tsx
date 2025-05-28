import { Box, Button, Modal, Text } from '@mantine/core';

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
    headerWrap: {
        width: '100%',
        height: '70px',
        display: 'block',
        margin: '0 auto',
        textAlign: 'center',
    }
}

type InstallmentsLimitProps = {
    isOpen: boolean,
    handleClose: () => void,
    limit: number,
}

export const InstallmentsLimit = ({ isOpen, handleClose, limit }: InstallmentsLimitProps) => {
    return <Modal
        opened={isOpen}
        onClose={handleClose}
    >
        <Box style={css.headerWrap}>
            <Text style={{ ...css.titleStyle, fontSize: '22px' }}>{limit} руб.</Text>
            <Text style={{ ...css.textStyle, marginTop: '0px' }}>Ваш лимит на оплату частями</Text>
        </Box>
        <Text style={css.titleStyle}>Как работает оплата частями</Text>

        <Text style={css.textStyle}>1. При оформлении заказа в корзине нажмите "Частями"</Text>

        <Text style={css.textStyle}>2. Выберите, когда спишется первый платёж: сразу или потом. Если будет переплата — покажем её отдельно</Text>

        <Text style={css.textStyle}>3. Платежи спишутся автоматически по графику, но можно внести их досрочно</Text>

        <Button
            fullWidth
            onClick={handleClose}
            size='md'
        >
            Понятно, спасибо
        </Button>
    </Modal>
}