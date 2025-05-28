import axios from "axios";
import { string } from "zod";

export const API_URL = 'https://api.example.com/user';

export enum Gender {
    Male = 'male',
    Female = 'female',
}

export type DetailUserInfo = {
    avatarSrc?: string,
    userName: string,
    email: string,
    phone?: string,

    balance: number,
    sale: number,
    limitOnPaymentInInstallments: number,
    limitOnPaymentUponReceipt: number,
    favoriteGoods: number,
    purchases: number,
    awaitingEvaluation: number,
    cards: Card[],

    deviceList: Device[],
    isReceiveMessages: boolean,
    isConsiderPreferences: boolean,
    notifications: Notification[],
    gender: Gender,
}

export type Notification = {
    name: string,
    description: string,
}

export type Card = {
    cardNumber: string,
    isActive: true,
}

export type Device = {
    name: string,
    isActive: true,
}

const userDetails: DetailUserInfo = {
    avatarSrc: '',
    balance: 300,
    sale: 10,
    limitOnPaymentInInstallments: 30000,
    limitOnPaymentUponReceipt: 30000,
    favoriteGoods: 20,
    purchases: 40,
    awaitingEvaluation: 15,
    cards: [{
        cardNumber: '000 000 000 000',
        isActive: true
    }],
    phone: '8-800-888-88-88',
    notifications: [],
    userName: 'Ksenia',
    email: '1234@mail.ru',
    isReceiveMessages: true,
    isConsiderPreferences: true,
    deviceList: [
        {
            name: 'Desktop Windows',
            isActive: true,
        }
    ],
    gender: Gender.Female,
}

export const getDetailsUserInfoById = async (id: string) => {
    try {
        console.log({ id });
        await setTimeout(() => { }, 5000);
        return userDetails;
    }
    catch (err) {
        console.log({ err });
        // throw new Error('Не получилось получить подробную информацию о пользователе. Попробуйте перезагрузить страницу.');
    }
}

export type CreateUserInfo = {
    userName: string,
    email: string,
}

export const createUserInfo = async (params: CreateUserInfo) => {
    try {
        const response = await axios.post(`${API_URL}`, params);
        return response.data;
    }
    catch (err) {
        console.log({ err });
        return Math.random().toString(16);
        // throw new Error('Не получилось создать пользователя. Перезагрузите страницу и попробуйте снова.');
    }
}

export const putDetailsUserInfoById = async (id: string, params: Partial<DetailUserInfo>) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, params);
        return response.data;
    }
    catch (err) {
        console.log({ err });
        // throw new Error('Не получилось обновить данные пользователя. Перезагрузите страницу и попробуйте снова.');
    }
}

const statistic = [
    {
        date: '1',
        Апрель: 2890,
        Март: 2338,
        Май: 2452,
    },
    {
        date: '2',
        Апрель: 2756,
        Март: 2103,
        Май: 2402,
    },
    {
        date: '3',
        Апрель: 3322,
        Март: 986,
        Май: 1821,
    },
    {
        date: '4',
        Апрель: 3470,
        Март: 2108,
        Май: 2809,
    },
    {
        date: '5',
        Апрель: 3129,
        Март: 1726,
        Май: 2290,
    },
]

export type StatisticType = {
    keys: string[],
    statistic: {
        [key: string]: number | string,
    }[]
}

export const getStatisticByUserId = async (id: string) => {
    try {
        console.log({ id });
        await setTimeout(() => { }, 5000);
        return { statistic, keys: ['Март', 'Апрель', 'Май'] };
    }
    catch (err) {
        console.log({ err });
        // throw new Error('Не получилось получить подробную информацию о пользователе. Попробуйте перезагрузить страницу.');
    }

}