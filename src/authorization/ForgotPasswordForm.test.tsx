import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';

describe('ForgotPasswordForm', () => {
    it('Форма заполняется корректными данными', async () => {

        render(
            <App />
        );

        await userEvent.click(screen.getByTestId("forgot-password-button"));
        await waitFor(async () => {
            await userEvent.type(screen.getByTestId("forgot-email-input"), "123@mail.ru");
            await userEvent.type(screen.getByTestId("forgot-userName-input"), "Name");

            expect(screen.getByTestId("forgot-email-input")).toHaveValue("123@mail.ru");
            expect(screen.getByTestId("forgot-userName-input")).toHaveValue("Name");
        });
    });
});