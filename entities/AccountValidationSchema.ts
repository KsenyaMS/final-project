import { z } from 'zod';

export const AccountSchema = z.object({
    userName: z
        .string({
            required_error: 'Имя пользователя - обязательное поле',
        })
        .trim()
        .min(1, 'Имя пользователя не может быть пустым')
        .max(32, 'Имя пользователя должен быть короче 64 символов'),
    phone: z
        .string({
            required_error: 'Номер телефона - обязательное поле',
        })
        .trim()
        .min(1, 'Номер телефона не может быть пустым')
        .max(32, 'Номер телефона должен содержать от 6 до 11 символов'),
    gender: z
        .string({
            required_error: 'Пол - обязательное поле',
        }),
});

export type AccountSchema = z.infer<typeof AccountSchema>;