import { z } from 'zod';

export const ForgotPasswordSchema = z.object({
    userName: z
        .string({
            required_error: 'Имя пользователя - обязательное поле',
        })
        .trim()
        .min(1, 'Имя пользователя не может быть пустым')
        .max(32, 'Имя пользователя должен быть короче 64 символов'),
    email: z
        .string({
            required_error: 'Email - обязательное поле',
        })
        .trim()
        .min(1, 'Email не может быть пустым')
        .max(32, 'Email должен быть короче 32 символов'),
});

export type ForgotPasswordSchema = z.infer<typeof ForgotPasswordSchema>;