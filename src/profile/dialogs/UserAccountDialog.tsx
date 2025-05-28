import { Button, Group, Modal, Radio, Text, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { DetailUserInfo, Gender, putDetailsUserInfoById } from '../../../api/user';
import { UserInfo } from '../../../providers/UserListProvider';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AccountSchema } from '../../../entities/AccountValidationSchema';
import z from 'zod';
import { useSnackbar } from 'notistack';

const css = {
    titleStyle: {
        marginBottom: '10px',
        fontWeight: 600,
        fontSize: '19px',
    },
    errorTextStyle: {
        fontSize: '13px',
        color: '#f24141',
    }
}

type BalanceDialogProps = {
    isOpen: boolean,
    handleClose: () => void,
    details: DetailUserInfo & UserInfo,
}

export const UserAccountDialog = ({ isOpen, details, handleClose }: BalanceDialogProps) => {
    const { enqueueSnackbar } = useSnackbar();

    const [errorObj, setErrorObj] = useState<{ [key: string]: { message: string } }>();

    const { register, handleSubmit } = useForm<AccountSchema>({ defaultValues: details });
    const onSubmit: SubmitHandler<AccountSchema> = async (data) => {
        try {
            await AccountSchema.parseAsync(data);
            await putDetailsUserInfoById(details.id, data);
            handleClose();
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

    return <Modal
        opened={isOpen}
        onClose={handleClose}
    >
        <Text style={css.titleStyle}>Личные данные</Text>
        <TextInput
            label="Имя пользователя"
            placeholder="Имя пользователя"
            required
            radius="md"
            mt="md"
            {...register("userName")}
        />
        {errorObj?.['userName'] &&
            <Text style={css.errorTextStyle}>
                {errorObj['userName'].message}
            </Text>
        }
        <TextInput
            label="Номер телефона"
            placeholder="8-(800)-888-88-88"
            required
            radius="md"
            mt="md"
            {...register("phone")}
        />
        <Radio.Group
            label="Пол"
            withAsterisk
            mt="md"
        >
            <Group mt="xs">
                <Radio
                    value={Gender.Male}
                    label="Мужской"
                    {...register("gender")}
                />
                <Radio
                    value={Gender.Female}
                    label="Женский"
                    {...register("gender")}
                />
            </Group>
        </Radio.Group>
        <Button
            fullWidth
            mt="md"
            radius="md"
            onClick={handleSubmit(onSubmit)}
        >
            Сохранить
        </Button>
    </Modal >
}