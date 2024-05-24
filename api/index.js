import { displayLocalLuminaries } from "../utils/functions.js";

export const getMoonPhases = async (lat, lon, container) => {
  const url = `https://moon-phase.p.rapidapi.com/advanced?lat=${lat}&lon=${lon}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "56dec330famsh9bc7fe8100c97c4p1415aajsnd701309b5384",
      "X-RapidAPI-Host": "moon-phase.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
  } catch (error) {
    let error_container = document.createElement("div");
    error_container.className = "side-bar-main-content error-container";

    let error_el = document.createElement("div");
    error_el.className = "error";
    error_el.textContent = error;

    error_container.appendChild(error_el);

    if (localStorage.luminaries) {
      let btn = document.createElement("button");
      btn.className = "show-btn";
      btn.textContent = "Get Previous Results";
      error_container.appendChild(btn);
    }

    container.appendChild(error_container);

    let showBtn = document.querySelector(".show-btn");
    showBtn.addEventListener("click", () => {
      let list = document.querySelectorAll(".side-bar-main-content");
      list.forEach((element) => {
        element.remove();
      });
      displayLocalLuminaries(JSON.parse(localStorage.luminaries), container);
    });
  }
};
