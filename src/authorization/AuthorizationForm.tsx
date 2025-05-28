import { useState } from 'react';
import { User, UserType } from '../../providers/AuthorizationProvider';
import {
    Anchor,
    Button,
    Container,
    Group,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    useMantineTheme,
} from '@mantine/core';
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthorizationSchema } from '../../entities/AuthorizationValidationSchema';
import z from 'zod';
import { AuthorizationTabs } from '../pages/AuthorizationPage';
import { useUserList } from '../../providers/UserListProvider';
import md5 from 'md5';

const css = {
    errorTextStyle: {
        fontSize: '13px',
        color: '#f24141',
    }
}

export type AuthorizationFormProps = {
    setTabCode: (tabCode: AuthorizationTabs) => void,
    handleYandexButtonClick: () => void,
    handleAuthorizationButtonClick: (params: User) => void,
}

export const AuthorizationForm = ({
    setTabCode,
    handleYandexButtonClick,
    handleAuthorizationButtonClick,
}: AuthorizationFormProps) => {
    const mantineTheme = useMantineTheme();
    const { userList } = useUserList();
    const [errorObj, setErrorObj] = useState<{ [key: string]: { message: string } }>();

    const { register, handleSubmit } = useForm<AuthorizationSchema>();
    const onSubmit: SubmitHandler<AuthorizationSchema> = async (data) => {
        try {
            await AuthorizationSchema.parseAsync(data);
            const passwordHash = md5(data.password);
            const correctUser = userList
                .find(item => item.email === data.email && item.password === passwordHash);

            if (!correctUser) {
                setErrorObj({
                    auth: {
                        message: 'Неверное имя пользователя или пароль'
                    }
                })
                return;
            }

            const params: User = {
                userType: UserType.User,
                id: correctUser.id,
            }
            handleAuthorizationButtonClick(params);
        }
        catch (err) {
            if (err instanceof z.ZodError) {
                const errList = err.issues.map((e) => ({ path: e.path[0], message: e.message }));
                const errObj = {};
                errList.forEach(error => {
                    errObj[error.path] = {
                        message: error.message
                    }
                })
                setErrorObj(errObj);
            }
        }
    }

    return (
        <Container size={420} my={40}>
            <Paper
                withBorder
                shadow="sm"
                p={22}
                mt={30}
                radius="md"
            >
                <TextInput
                    label="Email"
                    placeholder="you@mantine.dev"
                    required
                    radius="md"
                    data-testid="auth-email-input"
                    {...register("email")}
                />
                {errorObj?.['email'] &&
                    <Text style={css.errorTextStyle}>
                        {errorObj['email'].message}
                    </Text>
                }
                <PasswordInput
                    label="Пароль"
                    placeholder="Пароль"
                    required
                    mt="md"
                    radius="md"
                    data-testid="auth-password-input"
                    {...register("password")}
                />
                {errorObj?.['password'] &&
                    <Text style={css.errorTextStyle}>
                        {errorObj['password'].message}
                    </Text>
                }
                {errorObj?.['auth'] &&
                    <Text style={css.errorTextStyle}>
                        {errorObj['auth'].message}
                    </Text>
                }
                <Group justify="space-between" mt="lg">
                    <Anchor
                        component="button"
                        size="sm"
                        onClick={() => setTabCode(AuthorizationTabs.NewPassword)}
                        data-testid="forgot-password-button"
                    >
                        Забыли пароль?
                    </Anchor>
                </Group>
                <Button
                    fullWidth
                    mt="md"
                    radius="md"
                    onClick={handleSubmit(onSubmit)}
                    data-testid="authorization-button"
                >
                    Войти
                </Button>
                <Button
                    fullWidth
                    mt="md"
                    radius="md"
                    onClick={handleYandexButtonClick}
                >
                    Войти по Яндекс ID
                </Button>
                <Button
                    fullWidth
                    mt="md"
                    radius="md"
                    color={mantineTheme.colors.secondary[0]}
                    onClick={() => setTabCode(AuthorizationTabs.Registration)}
                    data-testid="registration-button"
                >
                    Зарегистрироваться
                </Button>
            </Paper>
        </Container>
    );
}