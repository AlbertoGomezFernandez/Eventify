import { Header } from "../../components/Header/Header";
import { Home } from "../Home/Home";
import "./LoginRegister.css";


export const LoginRegister = () => {
  const main = document.querySelector("main");
  main.innerHTML = "";

  const loginDiv = document.createElement("div");
  loginDiv.id = "login";
  loginDiv.className = "login";

  Login(loginDiv);

  const pError = document.createElement("p");
  pError.className = "error";
  pError.textContent = "";
  loginDiv.append(pError);


  main.append(loginDiv);

};


const Login = (parent) => {

  const form = document.createElement("form");
  form.className = "login-form";
  const loginLabel = document.createElement("label");
  loginLabel.textContent = "Login";
  const name = document.createElement("input");
  const password = document.createElement("input");
  const button = document.createElement("button");
  button.className = "login-button btn";

  password.type = "password";
  name.placeholder = "Please enter your name";
  password.placeholder = "Please enter your password";
  button.textContent = "Login";

  form.append(loginLabel);
  form.append(name);
  form.append(password);
  form.append(button);
  parent.append(form);


  form.addEventListener("submit", () => submitLogin(name.value, password.value, form));
};


export const submitLogin = async (name, password, form) => {


  const res = await fetch(process.env.APP_BACKEND_URL + "/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, password })
  });

  if (res.status === 400) {
    const errorMessage = document.querySelector("p");
    errorMessage.textContent = "Invalid credentials";
    form.reset();
    return;
  }

  const data = await res.json();

  localStorage.setItem("token", JSON.stringify(data));
  Header();
  Home();
  window.location.reload();
};


// http://localhost:3000/api/auth/login