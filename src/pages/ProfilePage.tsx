import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { UserType, useUserInfo } from '../../providers/AuthorizationProvider';
import { Text, Skeleton } from '@mantine/core';
import { UserInfo, useUserList } from '../../providers/UserListProvider';
import { MainInfoWidget } from '../profile/MainInfoWidget';
import { DetailsWidget } from '../profile/DetailsWidget';
import { DetailUserInfo, getDetailsUserInfoById } from '../../api/user';
import { useSnackbar } from 'notistack';
import styles from './ProfilePage.module.css';

const css = {
    noDataText: {
        fontSize: '25px',
        margin: '20% auto',
    },
}

export type YandexInfo = {
    id: string,
    email: string,
    login: string,
}

export const ProfilePage = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { userList, handleChangeUserList } = useUserList();
    const { user, handleChangeUserInfo } = useUserInfo();

    const [yandexInfo, setYandexInfo] = useState<YandexInfo | undefined>();
    const [userDetails, setUserDetails] = useState<DetailUserInfo & UserInfo>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const url = window.location.hash.split('&');
    const token = url
        .find(item => item.includes('access_token'))
        ?.replace('#access_token=', '');

    const getUserInfo = async (token: string) => {
        try {
            const response = await fetch(`https://login.yandex.ru/info?format=json&jwt_secret=eef6b18eafbb4c6a9c03cbcf14d610f1`, {
                // mode: 'no-cors',
                method: "GET",
                headers: {
                    "Authorization": `OAuth ${token}`,
                }
            })
            const yandexInfo = await response.json();
            setYandexInfo(yandexInfo);

            const existUser = userList.find(item => item.token === token && item.userName === yandexInfo.login);

            if (!existUser) {
                handleChangeUserList([
                    ...userList,
                    {
                        id: yandexInfo.id,
                        token,
                        email: yandexInfo.default_email,
                        userName: yandexInfo.login,
                    }
                ])
            }
            else {
                handleChangeUserInfo({
                    userType: UserType.User,
                    id: existUser?.id,
                })
            }
        }
        catch {
            enqueueSnackbar('Не удалось загрузить данные пользователя!', { variant: 'error' });
        }
    }

    const getDetails = async (id: string) => {
        try {
            const details = await getDetailsUserInfoById(id);
            const correctUser = userList
                .find(item => item.id === user.id);

            setUserDetails({ ...details, ...correctUser });
            setIsLoading(false);
        }
        catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (user.userType === UserType.User)
            return;

        if (!token && user.userType === UserType.Guest) {
            navigate('/login');
            return;
        }

        getUserInfo(token);
    }, [token, getUserInfo, navigate, user.userType])

    useEffect(() => {
        if (user.userType !== UserType.User || !user.id)
            return;

        getDetails(user.id);
    }, [user])

    return (
        <div className={styles.wrapStyle}>
            {!error && !isLoading && userDetails &&
                <>
                    <MainInfoWidget
                        details={userDetails}
                        yandexInfo={yandexInfo}
                    />
                    <DetailsWidget
                        details={userDetails}
                        userId={userDetails.id}
                    />
                </>
            }
            {!error && isLoading &&
                <Skeleton height={'80vh'} radius="md" animate={true} />
            }
            {!error && !isLoading && !userDetails &&
                <Text style={css.noDataText}>
                    Нет данных для отображения
                </Text>
            }
            {error &&
                <Text style={css.noDataText}>
                    {error}
                </Text>
            }
        </div>
    )
}
