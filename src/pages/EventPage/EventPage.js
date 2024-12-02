import { Home } from "../Home/Home";
import { RegisterPage } from "../Register/Register";
import "./EventPage.css";

export const EventPage = async (event) => {

  if (localStorage.getItem("token")) {
    const { user, token } = JSON.parse(localStorage.getItem("token"));


    const main = document.querySelector("main");
    main.innerHTML = "";
    main.className = "main container flex";
    const eventContainer = document.createElement("div");
    eventContainer.className = "Event container";
    main.append(eventContainer);
    eventContainer.innerHTML = `
      <h2>${event.name}</h2>
      <img class="event-card__image" src="${event.img}" alt="${event.name}">
      <p>${event.date}</p>
      <p>${event.location}</p>
      <p>${event.description}</p>

      <button class="attendees btn">See others joined</button>

      <button class="join btn">Join</button>

      <button class="back-button btn">Back</button>
    `;


    if (user?._id === event.userId) {
      const deleteButton = document.createElement("button");
      deleteButton.className = "delete-button btn";
      deleteButton.textContent = "X";
      eventContainer.append(deleteButton);

      deleteButton.addEventListener("click", async () => {
        const deleteRes = await fetch(process.env.APP_BACKEND_URL + "/api/events/" + event._id, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        });
        if (deleteRes.ok) {
          window.location.href = "/";
        } else {
          throw new Error("Error deleting event");
        }
      });
    }


    const attendeesButton = document.querySelector(".attendees");

    const extraInfoContainer = document.createElement("div");
    extraInfoContainer.id = "extra-info-container";

    eventContainer.append(extraInfoContainer);

    attendeesButton.addEventListener("click", async () => {
      const attendeesRes = await fetch(process.env.APP_BACKEND_URL + "/api/attendees/" + event._id, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      const attendees = await attendeesRes.json();


      extraInfoContainer.innerHTML = "";
      const attendeesList = document.createElement("ul");
      attendeesList.id = "attendees-list";
      attendeesList.className = "event-card";
      const attendeesTitle = document.createElement("h3");
      attendeesTitle.className = "event-card__title";
      attendeesTitle.textContent = "Attendees";
      attendeesList.append(attendeesTitle);
      extraInfoContainer.append(attendeesList);
      attendees.forEach(attendee => {
        const attendeeItem = document.createElement("li");
        attendeeItem.className = "event-atendee";
        attendeeItem.textContent = attendee.name;
        attendeesList.append(attendeeItem);
      });
    });

    const joinButton = document.querySelector(".join");

    joinButton.addEventListener("click", async () => {
      extraInfoContainer.innerHTML = "";
      let pContent;
      try {
        const res = await fetch(process.env.APP_BACKEND_URL + "/api/user/attendees/" + event._id, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        const data = await res.json();
        if (!res.ok) {
          // Verificar si es un error de asistencia duplicada
          if (data.error === "DUPLICATE_ATTENDANCE") {
            pContent = "You have already joined this event.";
          } else {
            pContent = "An error occurred: " + data.message;
          }
        } else {
          pContent = `Welcome, ${data.name}! You have successfully joined the event.`;
        }

      } catch (error) {
        pContent = "An unexpected error occurred: " + error.message;
      }
      const joinText = document.createElement("p");
      joinText.textContent = pContent;
      extraInfoContainer.append(joinText);
    });


    const backButton = document.querySelector(".back-button");
    backButton.addEventListener("click", Home);

  } else {
    RegisterPage();
  }
};
