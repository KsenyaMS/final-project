import { atom, useAtom } from 'jotai';

export enum UserType {
    User = 'user',
    Guest = 'guest',
}

export type User = {
    userType: UserType,
    id?: string,
}

const defaultUserParams: User = {
    userType: UserType.Guest,
    id: undefined,
}

export const initialValue: User = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : defaultUserParams;

export const authorizationAtom = atom<User>(initialValue);

export function useUserInfo() {
    const [user, setUser] = useAtom(authorizationAtom);

    const handleChangeUserInfo = (user: User) => {
        setUser(user);
        localStorage.setItem('userInfo', JSON.stringify(user));
    }

    const logOut = () => {
        setUser(defaultUserParams);
        localStorage.removeItem('userInfo');
    }

    return { user, handleChangeUserInfo, logOut } as const;
}