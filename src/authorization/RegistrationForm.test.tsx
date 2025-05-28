import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';

describe('RegistrationForm', () => {
    it('Форма заполняется корректными данными', async () => {

        render(
            <App />
        );

        await userEvent.click(screen.getByTestId("registration-button"));
        await waitFor(async () => {
            await userEvent.type(screen.getByTestId("registration-email-input"), "123@mail.ru");
            await userEvent.type(screen.getByTestId("registration-userName-input"), "Name");
            await userEvent.type(screen.getByTestId("registration-password-input"), "12345678");

            expect(screen.getByTestId("registration-email-input")).toHaveValue("123@mail.ru");
            expect(screen.getByTestId("registration-userName-input")).toHaveValue("Name");
            expect(screen.getByTestId("registration-password-input")).toHaveValue("12345678");
        });
    });
});