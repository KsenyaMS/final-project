describe("Регистрация пользователя", () => {
  it("Пользователь открывает приложение", () => {
    cy.visit("/");
  });
  it("Пользователь выбирает регистрацию, вводит  email, password, userName, и нажимает 'Зарегистрироваться'", () => {
    cy.visit("/login");
    cy.get('[data-testid="registration-button"]').click();
    cy.get('[data-testid="registration-email-input"]').type("123@mail.ru");
    cy.get('[data-testid="registration-password-input"]').type("12345678");
    cy.get('[data-testid="registration-userName-input"]').type("UserName");
    cy.get('[data-testid="create-user-button"]').click();

    cy.contains("UserName").should("be.visible");
    cy.url().should("include", "/profile");
  });
});

describe("Авторизация пользователя", () => {
  it("Пользователь открывает приложение", () => {
    cy.visit("/");
  });
  it("Пользователь вводит неправильный пароль и нажимает 'Войти'", () => {
    cy.visit("/login");
    cy.get('[data-testid="auth-email-input"]').type("123@mail.ru");
    cy.get('[data-testid="auth-password-input"]').type("12345678");
    cy.get('[data-testid="authorization-button"]').click();

    cy.contains("Неверное имя пользователя или пароль").should("be.visible");
  });
});

describe("Форма 'Забыли пароль'", () => {
  it("Пользователь открывает приложение", () => {
    cy.visit("/");
  });
  it("Пользователь нажимает на кнопку 'Забыли пароль'", () => {
    cy.visit("/login");
    cy.get('[data-testid="forgot-password-button"]').click();
    cy.get('[data-testid="forgot-email-input"]').type("123@mail.ru");
    cy.get('[data-testid="forgot-userName-input"]').type("UserName");
    cy.get('[data-testid="reset-password-button"]').click();

    cy.url().should("include", "/login");
  });
});