import { atom, useAtom } from 'jotai';

export type UserInfo = {
    userName: string,
    email: string,
    password?: string,
    token?: string,
    id: string,
}

export const initialValue: UserInfo[] = localStorage.getItem('userList') ? JSON.parse(localStorage.getItem('userList')) : [];

export const authorizationAtom = atom<UserInfo[]>(initialValue);

export function useUserList() {
    const [userList, setUserList] = useAtom(authorizationAtom);

    const handleChangeUserList = (userList: UserInfo[]) => {
        setUserList(userList);
        localStorage.setItem('userList', JSON.stringify(userList));
    }

    return { userList, handleChangeUserList } as const;
}