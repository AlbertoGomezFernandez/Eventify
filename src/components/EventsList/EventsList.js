import { Event } from "../Cards/Event";
import "./EventsList.css";

export const EventsList = async () => {
  const main = document.querySelector("main");
  main.innerHTML = "";
  main.className = "main container flex";
  const eventsContainer = document.createElement("ul");
  eventsContainer.className = "flex container";
  main.append(eventsContainer);

  const res = await fetch("http://localhost:3000/api/events");

  const events = await res.json();

  events.forEach(event => Event(event, eventsContainer));
};
