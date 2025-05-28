import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';

describe('ClassicAuthorization', () => {
    it('Форма заполняется корректными данными', async () => {

        render(
            <App />
        );

        await userEvent.type(screen.getByTestId("auth-email-input"), "123@mail.ru");
        await userEvent.type(screen.getByTestId("auth-password-input"), "12345678");

        expect(screen.getByTestId("auth-email-input")).toHaveValue("123@mail.ru");
        expect(screen.getByTestId("auth-password-input")).toHaveValue("12345678");
    });
});