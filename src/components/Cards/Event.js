import { EventPage } from "../../pages/EventPage/EventPage";
import "./Event.css";

export const Event = (event, parent) => {

  const eventCard = document.createElement("li");
  eventCard.className = (`event-card ${event.name.split(" ")}`);
  eventCard.innerHTML = `
      <img class= "event-card__image" src="${event.img}" alt="${event.name}">
      <h2 class= "event-card__title">${event.name}</h2>
      <p class= "event-card__date">${event.date}</p>
      <p class= "event-card__content">${event.location}</p>
      <button class="learn-more-button btn" data-id="${event._id}">Learn More</button>`;

  parent.append(eventCard);

  const learnMoreButton = eventCard.querySelector('.learn-more-button');

  learnMoreButton.addEventListener("click", () => EventPage(event));
};





