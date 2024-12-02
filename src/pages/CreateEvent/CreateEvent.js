import { Home } from "../Home/Home";

import "./CreateEvent.css";





export const CreateEventPage = () => {
  const main = document.querySelector("main");
  main.innerHTML = "";

  const createEventDiv = document.createElement("div");
  createEventDiv.className = "CreateEvent container";

  CreateEvent(createEventDiv);

  const pError = document.createElement("p");
  pError.id = "error";
  pError.textContent = "";
  createEventDiv.append(pError);


  main.append(createEventDiv);

};

const CreateEvent = (parent) => {

  /* img, name, date ,location, description */

  const form = document.createElement("form");
  form.className = "CreateEvent-form flex";
  const imgLabel = document.createElement("label");
  imgLabel.for = "img";
  imgLabel.textContent = "Please enter an image for the event";
  const img = document.createElement("input");
  img.className = "img flex__item";
  const name = document.createElement("input");
  const date = document.createElement("input");
  date.type = "date";
  const location = document.createElement("input");
  const description = document.createElement("input");
  const button = document.createElement("button");

  img.type = "file";
  name.placeholder = "Please enter event´s name";
  date.placeholder = "Please enter event´s date";
  location.placeholder = "Please enter event´s location";
  description.placeholder = "Please enter event´s  description";
  button.textContent = "Create event";
  button.className = "btn";


  form.append(name);
  form.append(date);
  form.append(location);
  form.append(description);
  form.append(imgLabel);
  form.append(img);
  form.append(button);
  parent.append(form);



  form.addEventListener("submit", () => submitEvent(img.files[0], name.value, date.value, location.value, description.value, form));
};

const submitEvent = async (img, name, date, location, description, form) => {

  const loginLink = document.querySelector(".Login");
  if (loginLink) {
    const errorMessage = document.querySelector("p");
    errorMessage.textContent = "You need to be logged in to create an event";
    form.append(errorMessage);
    form.reset();
    return;
  }
  const { user, token } = JSON.parse(localStorage.getItem("token"));


  const formData = new FormData();

  formData.append("img", img);
  formData.append("name", name);
  formData.append("date", date);
  formData.append("location", location);
  formData.append("description", description);
  formData.append("userId", user._id);
  const res = await fetch(process.env.APP_BACKEND_URL + "/api/user/events", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData
  });

  if (res.status === 400) {
    const errorMessage = document.querySelector("p");
    errorMessage.textContent = "You most fill the fields";
    form.append(errorMessage);
    form.reset();
    return;
  }

  const data = await res.json();

  Home();
  window.location.reload();
};



// http://localhost:3000/api/user/events