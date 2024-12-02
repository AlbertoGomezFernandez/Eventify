import { Home } from "../Home/Home";
import { LoginRegister, submitLogin } from "../LoginRegister/LoginRegister";
import "./Register.css";


export const RegisterPage = () => {
  const main = document.querySelector("main");
  main.innerHTML = "";

  const registerDiv = document.createElement("div");
  registerDiv.className = "register";

  Register(registerDiv);

  const pError = document.createElement("p");
  pError.className = "error";
  pError.textContent = "";
  registerDiv.append(pError);


  main.append(registerDiv);

};

const Register = (parent) => {

  const form = document.createElement("form");
  form.className = "register-form";
  const registerLabel = document.createElement("label");
  registerLabel.textContent = "Register";
  const name = document.createElement("input");
  const email = document.createElement("input");
  const password = document.createElement("input");
  const button = document.createElement("button");
  button.className = "register-button btn";
  const login = document.createElement("button");
  login.className = "login-button btn";

  password.type = "password";
  name.placeholder = "Please enter your name";
  email.placeholder = "Please enter your email";
  password.placeholder = "Please enter your password";
  button.textContent = "Register";
  login.textContent = "Login";

  form.append(registerLabel);
  form.append(name);
  form.append(email);
  form.append(password);
  form.append(button);
  form.append(login);
  parent.append(form);

  login.addEventListener("click", () => LoginRegister());


  form.addEventListener("submit", () => submitRegister(name.value, email.value, password.value, form));
};

const submitRegister = async (name, email, password, form) => {


  const res = await fetch(process.env.APP_BACKEND_URL + "/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password })
  });

  if (res.status === 400) {
    const errorMessage = document.querySelector("p");
    errorMessage.className = "error";
    errorMessage.textContent = "User already registered";
    form.append(errorMessage);
    form.reset();
    return;
  }

  submitLogin(name, password, form);
  Home();
};

// http://localhost:3000/api/auth/register

// http://localhost:3000/api/user/events