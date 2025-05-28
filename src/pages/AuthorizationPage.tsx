import { useState, useEffect } from 'react';
import { AuthorizationForm } from '../authorization/AuthorizationForm';
import { RegistrationForm } from '../authorization/RegistrationForm';
import { ForgotPasswordForm } from '../authorization/ForgotPasswordForm';
import { User, UserType, useUserInfo } from '../../providers/AuthorizationProvider';
import { useNavigate } from 'react-router';

export enum AuthorizationTabs {
    Authorization = 'authorization',
    Registration = 'registration',
    NewPassword = 'new-password',
}

export const AuthorizationPage = () => {
    const navigate = useNavigate();
    const [tabCode, setTabCode] = useState<AuthorizationTabs>(AuthorizationTabs.Authorization);
    const { user, handleChangeUserInfo } = useUserInfo();

    const handleYandexButtonClick = () => {
        window.open('https://oauth.yandex.ru/authorize?response_type=token&client_id=75e745ab21f94ec1b7fe52e8a99a6446', 'new_window')
    }

    const handleAuthorizationButtonClick = (params: User) => {
        handleChangeUserInfo(params);
        navigate('/profile');
    }

    useEffect(() => {
        if (user.userType === UserType.User)
            navigate('/profile');

    }, [user, navigate])

    return <>
        {tabCode === AuthorizationTabs.Authorization &&
            <AuthorizationForm
                setTabCode={code => setTabCode(code)}
                handleYandexButtonClick={handleYandexButtonClick}
                handleAuthorizationButtonClick={handleAuthorizationButtonClick}
            />
        }
        {tabCode === AuthorizationTabs.Registration &&
            <RegistrationForm />
        }
        {tabCode === AuthorizationTabs.NewPassword &&
            <ForgotPasswordForm />
        }
    </>
}