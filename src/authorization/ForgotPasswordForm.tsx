import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
    Button,
    Container,
    Paper,
    Text,
    TextInput,
} from '@mantine/core';
import { useForm, SubmitHandler } from "react-hook-form";
import { ForgotPasswordSchema } from '../../entities/ForgotPasswordValidationSchema';
import z from 'zod';

const css = {
    errorTextStyle: {
        fontSize: '13px',
        color: '#f24141',
    }
}

export const ForgotPasswordForm = () => {
    const navigate = useNavigate();
    const [errorObj, setErrorObj] = useState<{ [key: string]: { message: string } }>();
    const { register, handleSubmit } = useForm<ForgotPasswordSchema>();

    const onSubmit: SubmitHandler<ForgotPasswordSchema> = async (data) => {
        try {
            await ForgotPasswordSchema.parseAsync(data);
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
                    data-testid="forgot-userName-input"
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
                    data-testid="forgot-email-input"
                />
                {errorObj?.['email'] &&
                    <Text style={css.errorTextStyle}>
                        {errorObj['email'].message}
                    </Text>
                }
                <Button
                    fullWidth
                    mt="md"
                    radius="md"
                    onClick={handleSubmit(onSubmit)}
                    data-testid="reset-password-button"
                >
                    Сбросить пароль
                </Button>
            </Paper>
        </Container>
    );
}