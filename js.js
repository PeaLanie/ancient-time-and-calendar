import {
  daySeeker,
  detailsPopUp,
  showModernCalendar,
  getHour,
  displayMoonPhases,
  displayFeasts,
  displayDailyEvents,
  displayApiData,
} from "./utils/functions.js";
import { feastsObj } from "../utils/objects.js";

const dates = document.querySelectorAll(".days-container");
const data = document.querySelectorAll(".h4-days");
const sidebar_month_title = document.querySelector(".sidebar-month-title");
const days_count_el = document.querySelector(".days-count");
const feast_days = document.querySelectorAll(".feast-days");
const menu_container = document.querySelector(".menu-container");
const gregorian_date_el = document.querySelector(".gregorian");
const seconds_arm = document.querySelector(".seconds_arm");
const minutes_arm = document.querySelector(".minutes_arm");
const hours_arm = document.querySelector(".hours_arm");
const time_discription = document.querySelector(".time-discription");
const menubar = document.querySelector(".fa-solid.fa-bars");
const xmark = document.querySelector(".fa-solid.fa-xmark");
const sidebar_main = document.querySelector(".side-bar-main");
const sidebar = document.querySelector(".side-bar");
const tabs = document.querySelectorAll(".tab");
const feasts_el = document.querySelector("#events-container");
const milliseconds_per_day = 86400000;
const milliseconds_per_year = 31449600000;
const ms_per_hour = 3600000;
const year_zero = 1679457600757 + milliseconds_per_day*7 - ms_per_hour*12; //22 Mar 2023 - 6am (1679457600757)
const real_days = [];
const date = new Date();

gregorian_date_el.textContent = `${date.getDate()}-${
  date.getMonth() + 1
}-${date.getFullYear()}`;

let sundays_list = [];
let mondays_list = [];
let tuesdays_list = [];
let wednesdays_list = [];
let thursdays_list = [];
let fridays_list = [];
let sabbaths_list = [];

for (let i = 0; i < data.length; i++) {
  if (!data[i].className.includes("none-days")) {
    real_days.push(data[i]);
  }
}

real_days.forEach((day) => {
  day.innerHTML = `<div>${day.textContent}</div>`;
});

daySeeker(real_days, year_zero);

const current_day = document.querySelector(".current-day");
const current_month_title =
current_day.parentElement.parentElement.firstChild.nextSibling.textContent;
const current_month = current_day.parentElement.parentElement;
current_month.scrollIntoView({ behavior: "smooth", block: "center" });
sidebar_month_title.textContent = `Day ${current_day.textContent} of ${current_month_title}`;

dates.forEach((date) => {
  let day = date.children;

  for (let i = 0; i < 5; i++) {
    let sundays = day[(i + 1) * 7 - 7];
    let mondays = day[(i + 1) * 7 - 6];
    let tuesdays = day[(i + 1) * 7 - 5];
    let wednesdays = day[(i + 1) * 7 - 4];
    let thursdays = day[(i + 1) * 7 - 3];
    let fridays = day[(i + 1) * 7 - 2];
    let sabbaths = day[(i + 1) * 7 - 1];

    sundays_list.push(sundays);
    mondays_list.push(mondays);
    tuesdays_list.push(tuesdays);
    wednesdays_list.push(wednesdays);
    thursdays_list.push(thursdays);
    fridays_list.push(fridays);
    sabbaths_list.push(sabbaths);

    if (sabbaths.className !== "h4-days none-days") {
      sabbaths.classList.add("sabbath-days");
    }
  }

  for (let i = 0; i < day.length; i++) {
    if (day[i].className !== "h4-days none-days") {
      if (day[i].textContent == "31") {
        day[i].classList.add("sign-days");
      }
    }
  }
});

sundays_list = sundays_list
  .filter((day) => !day.classList.contains("none-days"))
  .map((day) => {
    day.classList.add("first-day");
  });

mondays_list = mondays_list
  .filter((day) => !day.classList.contains("none-days"))
  .map((day) => {
    day.classList.add("second-day");
  });

tuesdays_list = tuesdays_list
  .filter((day) => !day.classList.contains("none-days"))
  .map((day) => {
    day.classList.add("third-day");
  });

wednesdays_list = wednesdays_list
  .filter((day) => !day.classList.contains("none-days"))
  .map((day) => {
    day.classList.add("fourth-day");
  });

thursdays_list = thursdays_list
  .filter((day) => !day.classList.contains("none-days"))
  .map((day) => {
    day.classList.add("fifth-day");
  });

fridays_list = fridays_list
  .filter((day) => !day.classList.contains("none-days"))
  .map((day) => {
    day.classList.add("sixth-day");
  });

sabbaths_list = sabbaths_list.filter(
  (day) => !day.classList.contains("none-days")
);

feast_days.forEach((day) => {
  if (
    day.textContent === "21" ||
    day.textContent === "15" ||
    day.textContent === "1" ||
    day.textContent === "9"
  ) {
    day.classList.add("special-sabbaths");
  }
});

real_days.forEach((day, index, arr) => {
  if (day.classList.contains("current-day")) {
    days_count_el.textContent = `Day ${index + 1} of ${arr.length}`;
  }

  day.addEventListener("click", () => {
    let sec = date.getTime();
    let milliseconds_from_year_zero = sec - year_zero;
    let number_of_days_from_year_zero =
      milliseconds_from_year_zero / milliseconds_per_day;
    let number_of_years_from_year_zero = Math.floor(
      milliseconds_from_year_zero / milliseconds_per_year
    );
    let milliseconds_count_in_year =
      (number_of_days_from_year_zero / 364 - number_of_years_from_year_zero) *
      milliseconds_per_year;
    let days_count_in_year = Math.ceil(
      milliseconds_count_in_year / milliseconds_per_day
    );
    let target_day = index + 1;
    let num_of_days_from_current_day;
    let milliseconds;
    let ndate;
    let fullDate;
    let container;
    let container_btn;
    if (target_day < days_count_in_year) {
      num_of_days_from_current_day = days_count_in_year - target_day;
      milliseconds = sec - num_of_days_from_current_day * milliseconds_per_day;
      ndate = new Date(milliseconds);
      fullDate = `${ndate.getDate()}-${
        ndate.getMonth() + 1
      }-${ndate.getFullYear()}`;

      detailsPopUp(fullDate, day);
      container = document.querySelector(".details-popup");
      container_btn = document.querySelector(".details-popup-btn");
    } else if (target_day > days_count_in_year) {
      num_of_days_from_current_day = target_day - days_count_in_year;
      milliseconds = sec + num_of_days_from_current_day * milliseconds_per_day;
      ndate = new Date(milliseconds);
      fullDate = `${ndate.getDate()}-${
        ndate.getMonth() + 1
      }-${ndate.getFullYear()}`;

      detailsPopUp(fullDate, day);
      container = document.querySelector(".details-popup");
      container_btn = document.querySelector(".details-popup-btn");
    } else {
      fullDate = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`;

      detailsPopUp(fullDate, day);
      container = document.querySelector(".details-popup");
      container_btn = document.querySelector(".details-popup-btn");
    }
    container_btn.addEventListener("click", () => {
      container.remove();
    });
  });
  showModernCalendar(
    day,
    index,
    year_zero,
    milliseconds_per_day,
    milliseconds_per_year
  );
});

if (current_day.classList.contains("first-day")) {
  days_count_el.textContent += " - First Day";
} else if (current_day.classList.contains("second-day")) {
  days_count_el.textContent += " - Second Day";
} else if (current_day.classList.contains("third-day")) {
  days_count_el.textContent += " - Third Day";
} else if (current_day.classList.contains("fourth-day")) {
  days_count_el.textContent += " - Fourth Day";
} else if (current_day.classList.contains("fifth-day")) {
  days_count_el.textContent += " - Fifth Day";
} else if (current_day.classList.contains("sixth-day")) {
  days_count_el.textContent += " - Sixth Day";
} else if (current_day.classList.contains("sabbath-days")) {
  days_count_el.textContent += " - Shabbath";
}

setInterval(() => {
  const date = new Date();
  let seconds = date.getSeconds();
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let i = 0;
  let h = 0;

  if (seconds == 0) {
    i = 0;
  } else {
    i = seconds / 10;
  }
  if (minutes == 0) {
    h = 0;
  } else {
    h = minutes / 2;
  }

  let seconds_angle = (seconds / 60) * 360;
  let minutes_angle = (minutes / 60) * 360 + i;
  let hours_angle = (hours / 12) * 360 + h;

  if (seconds == 31 || seconds == 33) {
    seconds_angle = Math.floor(seconds_angle);
  } else if (seconds == 21 || seconds == 42) {
    seconds_angle = Math.ceil(seconds_angle);
  } else {
    seconds_angle = (seconds / 60) * 360;
  }

  seconds_arm.style.transform = `rotate(${seconds_angle}deg)`;
  minutes_arm.style.transform = `rotate(${minutes_angle}deg)`;
  hours_arm.style.transform = `rotate(${hours_angle}deg)`;

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  time_discription.textContent = `${getHour(hours)}:${minutes}`;
}, 1000);

menu_container.addEventListener("click", () => {
  if (xmark.style.display !== "block") {
    xmark.style.display = "block";
    menubar.style.display = "none";
    sidebar_main.classList.add("show-side-bar");
    sidebar.style.height = "100vh";
  } else {
    xmark.style.display = "none";
    menubar.style.display = "block";
    sidebar_main.classList.remove("show-side-bar");
    sidebar.style.height = "100%";
  }
});

if (window.innerWidth < 768) {
  document.querySelectorAll(".modernDate").forEach((item) => {
    item.remove();
  });
}

let isNew = true;

if (!localStorage.refreshedTime) {
  localStorage.setItem("isNew", JSON.stringify(isNew));
} else {
  isNew = JSON.parse(localStorage.isNew);
}

tabs.forEach((tab, index, arr) => {
  tab.addEventListener("click", (e) => {
    let content = document.querySelectorAll(".side-bar-main-content");

    if (tab.id == "daily-events" && !tab.classList.contains("active")) {
      if (content.length > 0) {
        content.forEach((item) => item.remove());
      }
      displayDailyEvents(feasts_el);
    } else if (tab.id == "feasts-tab" && !tab.classList.contains("active")) {
      if (content.length > 0) {
        content.forEach((item) => item.remove());
      }
      displayFeasts(feastsObj, feasts_el);
    } else if (tab.id == "luminaries" && !tab.classList.contains("active")) {
      if (content.length > 0) {
        content.forEach((item) => item.remove());
      }
      let date = new Date();
      let current_time = date.getTime();
      let last_refreshed_time = parseInt(localStorage.refreshedTime);

      if (current_time > last_refreshed_time + ms_per_hour || isNew) {
        let loader = document.createElement("img");
        loader.src = "img/loader.png";
        loader.classList.add("loader");
        feasts_el.appendChild(loader);

        displayMoonPhases(feasts_el);
        isNew = false;
        localStorage.setItem("isNew", JSON.stringify(isNew));
      } else {
        displayApiData(JSON.parse(localStorage.ApiData), feasts_el);
      }
    }

    arr.forEach((btn) => {
      btn.classList.remove("active");
    });
    tab.classList.add("active");
  });
});

displayDailyEvents(feasts_el);
