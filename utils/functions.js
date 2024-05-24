import { getMoonPhases } from "../api/index.js";

function daySeeker(arr, start_point) {
  const date = new Date();
  let sec = date.getTime();
  let milliseconds_from_year_zero = sec - start_point;
  const milliseconds_per_day = 86400000;
  const milliseconds_per_year = 31449600000;
  let number_of_days_from_year_zero = Math.ceil(
    milliseconds_from_year_zero / milliseconds_per_day
  );
  let year = Math.ceil(number_of_days_from_year_zero / arr.length);
  if (number_of_days_from_year_zero > arr.length) {
    daySeeker(arr, start_point + milliseconds_per_year);
  } else {
    let current_day = arr[number_of_days_from_year_zero - 1];
    let prev_day = arr[number_of_days_from_year_zero - 2];
    let current_month_title =
      current_day.parentElement.parentElement.firstChild.nextSibling;
    let current_month_el = current_day.parentElement.parentElement;

    if (number_of_days_from_year_zero === 2) {
      arr[0].classList.remove("current-day");
      arr[0].parentElement.parentElement.firstChild.nextSibling.classList.remove(
        "current-month-title"
      );
      current_month_el.classList.remove("current-month-el");
      current_day.classList.add("current-day");
      current_month_title.classList.add("current-month-title");
      current_month_el.classList.add("current-month-el");
    } else if (number_of_days_from_year_zero === 1) {
      arr[arr.length - 1].classList.remove("current-day");
      arr[
        arr.length - 1
      ].parentElement.parentElement.firstChild.nextSibling.classList.remove(
        "current-month-title"
      );
      current_month_el.classList.remove("current-month-el");
      current_day.classList.add("current-day");
      current_month_title.classList.add("current-month-title");
      current_month_el.classList.add("current-month-el");
    } else {
      let prev_month =
        arr[number_of_days_from_year_zero - 2].parentElement.parentElement
          .firstChild.nextSibling;
      prev_day.classList.remove("current-day");
      prev_month.classList.remove("current-month-title");
      current_month_el.classList.remove("current-month-el");
      current_day.classList.add("current-day");
      current_month_title.classList.add("current-month-title");
      current_month_el.classList.add("current-month-el");
    }
  }
}

function detailsPopUp(date, targetEl) {
  let parentEl =
    targetEl.parentElement.parentElement.parentElement.parentElement;
  let current_month_title =
    targetEl.parentElement.parentElement.firstChild.nextSibling.textContent;
  let container = document.createElement("div");
  container.classList.add("details-popup");
  let dateEl = document.createElement("div");
  dateEl.innerHTML = `Modern Calendar: <span style=color:#067bc2ff> ${date} (Day ${targetEl.children[0].textContent} of ${current_month_title})</span>`;
  dateEl.style.padding = "1rem";
  dateEl.style.fontWeight = "bold";
  let btn = document.createElement("button");
  btn.className = "details-popup-btn";
  btn.textContent = "Close";

  container.appendChild(dateEl);
  container.appendChild(btn);

  parentEl.appendChild(container);
}

function showModernCalendar(day, index, start, mpd, mpy) {
  const date = new Date();
  let sec = date.getTime();
  let milliseconds_from_year_zero = sec - start;
  let number_of_days_from_year_zero = milliseconds_from_year_zero / mpd;
  let number_of_years_from_year_zero = Math.floor(
    milliseconds_from_year_zero / mpy
  );
  let milliseconds_count_in_year =
    (number_of_days_from_year_zero / 364 - number_of_years_from_year_zero) *
    mpy;
  let days_count_in_year = Math.ceil(milliseconds_count_in_year / mpd);
  let target_day = index + 1;
  let num_of_days_from_current_day;
  let milliseconds;
  let ndate;
  let fullDate;
  let dateEl;
  if (target_day < days_count_in_year) {
    num_of_days_from_current_day = days_count_in_year - target_day;
    milliseconds = sec - num_of_days_from_current_day * mpd;
    ndate = new Date(milliseconds);
    fullDate = `${ndate.getDate()}-${
      ndate.getMonth() + 1
    }-${ndate.getFullYear()}`;

    dateEl = document.createElement("div");
    dateEl.classList.add("modernDate");
    dateEl.textContent = fullDate;
    day.appendChild(dateEl);
  } else if (target_day > days_count_in_year) {
    num_of_days_from_current_day = target_day - days_count_in_year;
    milliseconds = sec + num_of_days_from_current_day * mpd;
    ndate = new Date(milliseconds);
    fullDate = `${ndate.getDate()}-${
      ndate.getMonth() + 1
    }-${ndate.getFullYear()}`;

    dateEl = document.createElement("div");
    dateEl.classList.add("modernDate");
    dateEl.textContent = fullDate;
    day.appendChild(dateEl);
  }
}

function getHour(hours) {
  let hour;
  if (hours < 7) {
    hour = hours + 6;
  } else if (hours > 6 && hours < 19) {
    hour = hours - 6;
  } else if (hours > 18) {
    hour = hours - 18;
  }

  return hour;
}

let apiCount = 0;
const date = new Date();
let day = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

if (!localStorage.apiCount || !localStorage.date || localStorage.date != day) {
  localStorage.setItem("apiCount", apiCount);
  apiCount = localStorage.apiCount;
  localStorage.setItem("date", day);
} else {
  apiCount = localStorage.apiCount;
}

function displayMoonPhases(el) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      let lat = pos.coords.latitude;
      let lon = pos.coords.longitude;

      getMoonPhases(lat, lon, el).then((data) => {
        if (data) {
          apiCount = parseInt(apiCount);
          apiCount++;
          localStorage.setItem("apiCount", apiCount);
          localStorage.setItem("loaded", date.getTime());
          displayApiData(data, el);
          alert(
            `API requests: ${localStorage.apiCount} out of 500 requests per day`
          );
        }
      });
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function displayApiData(data, container) {
  let obj = {};
  let list = [];
  let contDiv = document.createElement("div");
  contDiv.className = "side-bar-main-content luminaries";

  let date_el = document.createElement("div");
  date_el.className = "side-bar-main-content luminaries date";
  date_el.textContent = `Today: ${data.datestamp}`;
  obj.type = date_el.nodeName.toLocaleLowerCase();
  obj.class = date_el.className;
  obj.textContent = date_el.textContent;
  list.push(obj);
  obj = {};

  let sun_container = document.createElement("div");

  let sun_title_el = document.createElement("h3");
  sun_title_el.className = "sun";
  sun_title_el.textContent = "The Sun";
  obj.type = sun_title_el.nodeName.toLocaleLowerCase();
  obj.class = sun_title_el.className;
  obj.textContent = sun_title_el.textContent;
  list.push(obj);
  obj = {};

  let sunrise_el = document.createElement("div");
  sunrise_el.className = "sun";
  sunrise_el.textContent = `Sunrise: ${data.sun.sunrise_timestamp}`;
  obj.type = sunrise_el.nodeName.toLocaleLowerCase();
  obj.class = sunrise_el.className;
  obj.textContent = sunrise_el.textContent;
  list.push(obj);
  obj = {};

  let sunset_el = document.createElement("div");
  sunset_el.className = "sun";
  sunset_el.textContent = `Sunset: ${data.sun.sunset_timestamp}`;
  obj.type = sunset_el.nodeName.toLocaleLowerCase();
  obj.class = sunset_el.className;
  obj.textContent = sunset_el.textContent;
  list.push(obj);
  obj = {};

  let daylength_el = document.createElement("div");
  daylength_el.className = "sun";
  daylength_el.textContent = `Day Length: ${data.sun.day_length}`;
  obj.type = daylength_el.nodeName.toLocaleLowerCase();
  obj.class = daylength_el.className;
  obj.textContent = daylength_el.textContent;
  list.push(obj);
  obj = {};

  let solar_noon_el = document.createElement("div");
  solar_noon_el.className = "sun";
  solar_noon_el.textContent = `Directly above area at: ${data.sun.solar_noon}`;
  obj.type = solar_noon_el.nodeName.toLocaleLowerCase();
  obj.class = solar_noon_el.className;
  obj.textContent = solar_noon_el.textContent;
  list.push(obj);
  obj = {};

  let solar_eclipse_title = document.createElement("h4");
  solar_eclipse_title.className = "sun";
  solar_eclipse_title.textContent = "Next Solar Eclipse";
  obj.type = solar_eclipse_title.nodeName.toLocaleLowerCase();
  obj.class = solar_eclipse_title.className;
  obj.textContent = solar_eclipse_title.textContent;
  list.push(obj);
  obj = {};

  let solar_eclipse_date = document.createElement("div");
  solar_eclipse_date.className = "sun";
  solar_eclipse_date.textContent = `Date: ${data.sun.next_solar_eclipse.datestamp}`;
  obj.type = solar_eclipse_date.nodeName.toLocaleLowerCase();
  obj.class = solar_eclipse_date.className;
  obj.textContent = solar_eclipse_date.textContent;
  list.push(obj);
  obj = {};

  let solar_eclipse_type = document.createElement("div");
  solar_eclipse_type.className = "sun";
  solar_eclipse_type.textContent = `Type: ${data.sun.next_solar_eclipse.type}`;
  obj.type = solar_eclipse_type.nodeName.toLocaleLowerCase();
  obj.class = solar_eclipse_type.className;
  obj.textContent = solar_eclipse_type.textContent;
  list.push(obj);
  obj = {};

  let solar_eclipse_regions = document.createElement("div");
  solar_eclipse_regions.className = "sun";
  solar_eclipse_regions.textContent = `Visibility Regions: ${data.sun.next_solar_eclipse.visibility_regions}`;
  obj.type = solar_eclipse_regions.nodeName.toLocaleLowerCase();
  obj.class = solar_eclipse_regions.className;
  obj.textContent = solar_eclipse_regions.textContent;
  list.push(obj);
  obj = {};

  sun_container.appendChild(sun_title_el);
  sun_container.appendChild(sunrise_el);
  sun_container.appendChild(sunset_el);
  sun_container.appendChild(daylength_el);
  sun_container.appendChild(solar_noon_el);
  sun_container.appendChild(solar_eclipse_title);
  sun_container.appendChild(solar_eclipse_date);
  sun_container.appendChild(solar_eclipse_type);
  sun_container.appendChild(solar_eclipse_regions);

  let moon_container = document.createElement("div");

  let moon_title_el = document.createElement("h3");
  moon_title_el.className = "moon";
  moon_title_el.textContent = "The Moon";
  obj.type = moon_title_el.nodeName.toLocaleLowerCase();
  obj.class = moon_title_el.className;
  obj.textContent = moon_title_el.textContent;
  list.push(obj);
  obj = {};

  let moonrise_el = document.createElement("div");
  moonrise_el.className = "moon";
  moonrise_el.textContent = `Moonrise: ${data.moon.moonrise}`;
  obj.type = moonrise_el.nodeName.toLocaleLowerCase();
  obj.class = moonrise_el.className;
  obj.textContent = moonrise_el.textContent;
  list.push(obj);
  obj = {};

  let moonset_el = document.createElement("div");
  moonset_el.className = "moon";
  moonset_el.textContent = `Moonrise: ${data.moon.moonset}`;
  obj.type = moonset_el.nodeName.toLocaleLowerCase();
  obj.class = moonset_el.className;
  obj.textContent = moonset_el.textContent;
  list.push(obj);
  obj = {};

  let moonage_el = document.createElement("div");
  moonage_el.className = "moon";
  moonage_el.textContent = `Age: ${data.moon.age_days} days old`;
  obj.type = moonage_el.nodeName.toLocaleLowerCase();
  obj.class = moonage_el.className;
  obj.textContent = moonage_el.textContent;
  list.push(obj);
  obj = {};

  let moon_illumination_el = document.createElement("div");
  moon_illumination_el.className = "moon";
  moon_illumination_el.textContent = `Illumination: ${data.moon.illumination} ${data.moon.emoji}`;
  obj.type = moon_illumination_el.nodeName.toLocaleLowerCase();
  obj.class = moon_illumination_el.className;
  obj.textContent = moon_illumination_el.textContent;
  list.push(obj);
  obj = {};

  let moon_phase_name_el = document.createElement("div");
  moon_phase_name_el.className = "moon";
  moon_phase_name_el.textContent = `Phase Name: ${data.moon.phase_name}`;
  obj.type = moon_phase_name_el.nodeName.toLocaleLowerCase();
  obj.class = moon_phase_name_el.className;
  obj.textContent = moon_phase_name_el.textContent;
  list.push(obj);
  obj = {};

  let moon_stage_el = document.createElement("div");
  moon_stage_el.className = "moon";
  moon_stage_el.textContent = `Stage: ${data.moon.stage}`;
  obj.type = moon_stage_el.nodeName.toLocaleLowerCase();
  obj.class = moon_stage_el.className;
  obj.textContent = moon_stage_el.textContent;
  list.push(obj);
  obj = {};

  let lunar_eclipse_title_el = document.createElement("h4");
  lunar_eclipse_title_el.className = "moon";
  lunar_eclipse_title_el.textContent = `Next Lunar Eclipse`;
  obj.type = lunar_eclipse_title_el.nodeName.toLocaleLowerCase();
  obj.class = lunar_eclipse_title_el.className;
  obj.textContent = lunar_eclipse_title_el.textContent;
  list.push(obj);
  obj = {};

  let lunar_eclipse_date_el = document.createElement("div");
  lunar_eclipse_date_el.className = "moon";
  lunar_eclipse_date_el.textContent = `Date: ${data.moon.next_lunar_eclipse.datestamp}`;
  obj.type = lunar_eclipse_date_el.nodeName.toLocaleLowerCase();
  obj.class = lunar_eclipse_date_el.className;
  obj.textContent = lunar_eclipse_date_el.textContent;
  list.push(obj);
  obj = {};

  let lunar_eclipse_type_el = document.createElement("div");
  lunar_eclipse_type_el.className = "moon";
  lunar_eclipse_type_el.textContent = `Type: ${data.moon.next_lunar_eclipse.type}`;
  obj.type = lunar_eclipse_type_el.nodeName.toLocaleLowerCase();
  obj.class = lunar_eclipse_type_el.className;
  obj.textContent = lunar_eclipse_type_el.textContent;
  list.push(obj);
  obj = {};

  let lunar_eclipse_visibility_regions_el = document.createElement("div");
  lunar_eclipse_visibility_regions_el.className = "moon";
  lunar_eclipse_visibility_regions_el.textContent = `Visibility Regions: ${data.moon.next_lunar_eclipse.visibility_regions}`;
  obj.type = lunar_eclipse_visibility_regions_el.nodeName.toLocaleLowerCase();
  obj.class = lunar_eclipse_visibility_regions_el.className;
  obj.textContent = lunar_eclipse_visibility_regions_el.textContent;
  list.push(obj);
  obj = {};

  moon_container.appendChild(moon_title_el);
  moon_container.appendChild(moonrise_el);
  moon_container.appendChild(moonset_el);
  moon_container.appendChild(moonage_el);
  moon_container.appendChild(moon_illumination_el);
  moon_container.appendChild(moon_phase_name_el);
  moon_container.appendChild(moon_stage_el);
  moon_container.appendChild(lunar_eclipse_title_el);
  moon_container.appendChild(lunar_eclipse_date_el);
  moon_container.appendChild(lunar_eclipse_type_el);
  moon_container.appendChild(lunar_eclipse_visibility_regions_el);

  contDiv.appendChild(sun_container);
  contDiv.appendChild(moon_container);

  container.appendChild(date_el);
  container.appendChild(contDiv);

  localStorage.setItem("luminaries", JSON.stringify(list));
}

function displayFeasts(obj, container) {
  obj.forEach((item) => {
    let contDiv = document.createElement("div");
    contDiv.className = "side-bar-main-content feast-item";

    let el;

    if (item.name) {
      el = document.createElement("h3");
      el.classList.add("feast-name");
      el.textContent = `${item.position}. ${item.name}`;
      contDiv.appendChild(el);
    }

    if (item.alt_name) {
      el = document.createElement("h4");
      el.classList.add("feast-alt-name");
      el.textContent = `also called: ${item.alt_name}`;
      contDiv.appendChild(el);
    }

    if (item.description) {
      el = document.createElement("h3");
      el.classList.add("feast-description");
      el.textContent = item.name;
      contDiv.appendChild(el);
    }

    if (item.url) {
      el = document.createElement("div");
      el.innerHTML = `For more info: <a href="${item.url}" target="_blank">${item.name}</a>`;
      contDiv.appendChild(el);
    }

    if (item.day) {
      el = document.createElement("div");
      el.classList.add("feast-date");
      el.textContent = `Ancient Calendar: Day ${item.day} ${item.month}`;
      contDiv.appendChild(el);
    }

    container.appendChild(contDiv);
  });
}

function displayDailyEvents(container) {
  let contDiv = document.createElement("div");
  contDiv.className = "side-bar-main-content daily-events-item";

  let title = document.createElement("h3");
  title.textContent = "Daily Events - coming soon";

  contDiv.appendChild(title);

  container.appendChild(contDiv);
}

function displayLocalLuminaries(list, cont) {
  let sun_container = document.createElement("div");

  let moon_container = document.createElement("div");

  let container = document.createElement("div");
  container.className = "side-bar-main-content luminaries";

  list.forEach((item) => {
    let element = document.createElement(item.type);
    element.className = item.class;
    element.textContent = item.textContent;

    if (item.class == "side-bar-main-content luminaries date") {
      cont.appendChild(element);
    } else if (item.class == "sun") {
      sun_container.appendChild(element);
    } else if (item.class == "moon") {
      moon_container.appendChild(element);
    }
  });

  container.appendChild(sun_container);
  container.appendChild(moon_container);
  cont.appendChild(container);
}

export {
  daySeeker,
  detailsPopUp,
  showModernCalendar,
  getHour,
  displayMoonPhases,
  displayFeasts,
  displayDailyEvents,
  displayLocalLuminaries,
};
