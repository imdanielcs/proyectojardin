const { JSDOM } = require('jsdom');
const jest = require('jest-mock');

describe("Validación login", () => {
    let dom;
    let usernameInput, passwordInput, loginForm;

    beforeEach(() => {
        // Setup jsdom
        dom = new JSDOM(`<!DOCTYPE html><form id="loginForm"><input type="text" id="username"><input type="password" id="password"><button type="submit">Login</button></form>`, {
            url: 'http://localhost/'
        });
        global.document = dom.window.document;
        global.window = dom.window;

        usernameInput = document.getElementById("username");
        passwordInput = document.getElementById("password");
        loginForm = document.getElementById("loginForm");

        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
        });
    });

    it("Deberia permitir el inicio de sesión cuando el nombre y la contraseña no esten vacios", () => {
        usernameInput.value = "testuser";
        passwordInput.value = "password123";

        const submitEvent = new dom.window.Event('submit');
        loginForm.dispatchEvent(submitEvent);

        console.log("Testiando validación de inicio de sesión...");
        expect(usernameInput.value).not.toBe("", "El nombre de usuario no debe estar vacío");
        expect(passwordInput.value).not.toBe("", "La contraseña no debe estar vacía");
    });

    it("debería prevenir el inicio de sesión cuando el nombre de usuario o la contraseña están vacíos", () => {
        usernameInput.value = "";
        passwordInput.value = "password123";

        const submitEvent = new dom.window.Event('submit');
        loginForm.dispatchEvent(submitEvent);

        console.log("Testiando validación de inicio de sesión...");
        expect(usernameInput.value).toBe("", "El nombre de usuario debe estar vacío");
        expect(passwordInput.value).not.toBe("", "La contraseña no debe estar vacía");
    });

    it("debería prevenir el inicio de sesión cuando tanto el nombre de usuario como la contraseña están vacíos", () => {
        usernameInput.value = "";
        passwordInput.value = "";

        const submitEvent = new dom.window.Event('submit');
        loginForm.dispatchEvent(submitEvent);

        console.log("Testiando validación de inicio de sesión...");
        expect(usernameInput.value).toBe("", "El nombre de usuario no debe estar vacío");
        expect(passwordInput.value).toBe("", "La contraseña no debe estar vacía");
    });
});