import { login } from './login.js';
import { formContainer, btnSubmit } from './dom.js';

function submitLogin(e) {
    e.preventDefault();
    login();
};

btnSubmit.onclick = submitLogin;
formContainer.onsubmit = submitLogin;
