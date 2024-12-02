import { CreateEventPage } from "../../pages/CreateEvent/CreateEvent";
import { Home } from "../../pages/Home/Home";
import { LoginRegister } from "../../pages/LoginRegister/LoginRegister";
import { RegisterPage } from "../../pages/Register/Register";
import style from "./Header.module.css";

export const Header = () => {
  const userData = localStorage.getItem("token");
  const user = userData ? JSON.parse(userData).user : null;

  const routes = user ? [
    {
      text: "Home",
      function: Home
    },
    {
      text: "Create Event",
      function: CreateEventPage
    },
    {
      text: `${user.name || user.user.name} / Logout`,
      function: () => {
        localStorage.removeItem("token");
        window.location.reload();
      }
    }
  ] : [
    {
      text: "Home",
      function: Home
    },
    {
      text: "Create Event",
      function: CreateEventPage
    },
    {
      text: "Login",
      function: LoginRegister
    },
    {
      text: "Register",
      function: RegisterPage
    },
  ];

  const header = document.querySelector("header");
  header.innerHTML = '';
  header.className = style.header;


  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "menu-toggle";
  checkbox.className = style["menu-toggle"];
  header.append(checkbox);


  const menuIcon = document.createElement("label");
  menuIcon.setAttribute("for", "menu-toggle");
  menuIcon.className = style["menu-icon"];
  menuIcon.innerHTML = `
    <div class="${style.bar}"></div>
    <div class="${style.bar}"></div>
    <div class="${style.bar}"></div>
  `;
  header.append(menuIcon);


  const nav = document.createElement("nav");
  nav.className = style.menu;

  for (const route of routes) {
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = route.text;
    a.className = style.link;
    a.addEventListener("click", () => {

      route.function();
      checkbox.checked = false;
    });
    nav.append(a);
  }

  header.append(nav);


  document.addEventListener("click", (event) => {

    if (checkbox.checked && !nav.contains(event.target) && !menuIcon.contains(event.target)) {
      checkbox.checked = false;
    }
  });


  menuIcon.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  checkbox.addEventListener("click", (event) => {
    event.stopPropagation();
  });
};



