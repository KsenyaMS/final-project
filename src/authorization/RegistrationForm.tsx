import { useState } from 'react';
import { useNavigate } from 'react-router';
import { UserType, useUserInfo } from '../../providers/AuthorizationProvider';
import {
    Button,
    Container,
    Paper,
    PasswordInput,
    Text,
    TextInput,
} from '@mantine/core';
import { useForm, SubmitHandler } from "react-hook-form";
import { RegistrationSchema } from '../../entities/RegistrationValidationSchema';
import z from 'zod';
import { UserInfo, useUserList } from '../../providers/UserListProvider';
import md5 from 'md5';
import { CreateUserInfo, createUserInfo } from '../../api/user';
import { useSnackbar } from 'notistack';

const css = {
    errorTextStyle: {
        fontSize: '13px',
        color: '#f24141',
    }
}

export const RegistrationForm = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { handleChangeUserInfo } = useUserInfo();
    const { userList, handleChangeUserList } = useUserList();

    const [errorObj, setErrorObj] = useState<{ [key: string]: { message: string } }>();

    const { register, handleSubmit } = useForm<RegistrationSchema>();
    const onSubmit: SubmitHandler<RegistrationSchema> = async (data) => {
        try {
            await RegistrationSchema.parseAsync(data);
            const passwordHash = md5(data.password);
            const isCorrect = !userList
                .find(item => item.email === data.email && item.password === passwordHash && item.userName === data.userName);

            if (!isCorrect) {
                setErrorObj({
                    registration: {
                        message: 'Пользователь с такими данными уже существует'
                    }
                })
                return;
            }

            const detailsUserInfo: CreateUserInfo = {
                userName: data.userName,
                email: data.email,
            }
            const id = await createUserInfo(detailsUserInfo);

            const newList: UserInfo[] = [
                ...userList,
                {
                    ...detailsUserInfo,
                    password: passwordHash,
                    id
                }
            ];
            handleChangeUserList(newList);
            handleChangeUserInfo({ userType: UserType.User, id });
            navigate('/profile');
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
            else {
                enqueueSnackbar(err.message, { variant: 'error' });
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
                    label="Имя пользователя"
                    placeholder="Имя пользователя"
                    required
                    radius="md"
                    {...register("userName")}
                    data-testid="registration-userName-input"
                />
                {errorObj?.['userName'] &&
                    <Text style={css.errorTextStyle}>
                        {errorObj['userName'].message}
                    </Text>
                }
                <TextInput
                    label="Email"
                    placeholder="you@mantine.dev"
                    required
                    radius="md"
                    mt="md"
                    {...register("email")}
                    data-testid="registration-email-input"
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
                    {...register("password")}
                    data-testid="registration-password-input"
                />
                {errorObj?.['password'] &&
                    <Text style={css.errorTextStyle}>
                        {errorObj['password'].message}
                    </Text>
                }
                {errorObj?.['registration'] &&
                    <Text style={css.errorTextStyle}>
                        {errorObj['registration'].message}
                    </Text>
                }
                <Button
                    fullWidth
                    mt="md"
                    radius="md"
                    onClick={handleSubmit(onSubmit)}
                    data-testid="create-user-button"
                >
                    Зарегистрироваться
                </Button>
            </Paper>
        </Container>
    );
}