import { Link } from 'react-router-dom';
import { ThemeType, useMyThemeProvider } from '../../providers/ThemeProvider';
import { Button, Group, Radio, useMantineTheme } from '@mantine/core';
import { UserType, useUserInfo } from '../../providers/AuthorizationProvider';
import { useNavigate } from 'react-router';
import styles from './Components.module.css';

export const Header = () => {
    const navigate = useNavigate();
    const mantineTheme = useMantineTheme();
    const { theme, handleThemeChange } = useMyThemeProvider();

    const { user, logOut } = useUserInfo();

    const handleExitButtonClick = () => {
        navigate('/login');
        logOut();
    }

    return <div
        className={styles.headerWrap}
        style={{ background: mantineTheme.colors.primary[0] }}
    >
        <div style={{ justifyContent: 'flex-start' }}>
            {user.userType === UserType.User &&
                <Link
                    to={'/profile'}
                    style={{ color: 'white' }}
                >
                    Профиль
                </Link>
            }
        </div>
        <div className={styles.buttonWrap}>
            <Radio.Group
                defaultValue={theme}
                className={styles.radioGroup}
            >
                <Group mt="xs">
                    <Radio
                        value={ThemeType.Light}
                        label={'Светлая тема'}
                        onChange={(e) => handleThemeChange(e.target.value)}
                    />
                    <Radio
                        value={ThemeType.Dark}
                        label={'Темная тема'}
                        onChange={(e) => handleThemeChange(e.target.value)}
                    />
                </Group>
            </Radio.Group>
            <div>
                {user.userType === UserType.User &&
                    <Button onClick={handleExitButtonClick}>
                        Выйти
                    </Button>
                }
            </div>
        </div>
    </div>
}