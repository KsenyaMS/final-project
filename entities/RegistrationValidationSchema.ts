import { z } from 'zod';

export const RegistrationSchema = z.object({
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
    password: z
        .string({
            required_error: 'Пароль - обязательное поле',
        })
        .trim()
        .min(8, 'Пароль должен быть длиннее 8 символов')
        .max(32, 'Пароль должен быть короче 32 символов'),
});

export type RegistrationSchema = z.infer<typeof RegistrationSchema>;