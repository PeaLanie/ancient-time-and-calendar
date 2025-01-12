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

function showModernCalendar(
  day,
  index,
  start,
  milliseconds_per_day,
  milliseconds_per_year
) {
  const date = new Date();
  let sec = date.getTime();
  let milliseconds_from_year_zero = sec - start;
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
  let dateEl;
  if (target_day < days_count_in_year) {
    num_of_days_from_current_day = days_count_in_year - target_day;
    milliseconds = sec - num_of_days_from_current_day * milliseconds_per_day;
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
    milliseconds = sec + num_of_days_from_current_day * milliseconds_per_day;
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

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(pos => {
  })
}

function displayMoonPhases(el) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      let lat = pos.coords.latitude;
      let lon = pos.coords.longitude;
      
      getMoonPhases(lat, lon, el).then((data) => {
        
        document.querySelector(".loader").remove()
        if (data) {
          let date =  new Date();
          apiCount = parseInt(apiCount);
          apiCount++;
          localStorage.setItem("apiCount", apiCount);
          localStorage.setItem("refreshedTime", date.getTime());
          displayApiData(data, el);
          // alert(
          //   `API requests: ${localStorage.apiCount} out of 500 requests per day`
          // );
        }
      });
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function displayApiData(data, container) {
  localStorage.setItem("ApiData", JSON.stringify(data))
  let contDiv = document.createElement("div");
  contDiv.className = "side-bar-main-content luminaries";

  let date_el = document.createElement("div");
  date_el.className = "side-bar-main-content luminaries date";
  let string = data.datestamp;
  date_el.textContent = `Last updated: ${string.substring(0, string.length - 6)}`;

  let sun_container = document.createElement("div");

  let sun_title_el = document.createElement("h3");
  sun_title_el.className = "sun";
  sun_title_el.textContent = "The Sun";

  let sunrise_el = document.createElement("div");
  sunrise_el.className = "sun";
  sunrise_el.textContent = `Sunrise: ${data.sun.sunrise_timestamp}`;

  let sunset_el = document.createElement("div");
  sunset_el.className = "sun";
  sunset_el.textContent = `Sunset: ${data.sun.sunset_timestamp}`;

  let daylength_el = document.createElement("div");
  daylength_el.className = "sun";
  daylength_el.textContent = `Day Length: ${data.sun.day_length}`;

  let solar_noon_el = document.createElement("div");
  solar_noon_el.className = "sun";
  solar_noon_el.textContent = `Directly above area at: ${data.sun.solar_noon}`;

  let solar_eclipse_title = document.createElement("h4");
  solar_eclipse_title.className = "sun";
  solar_eclipse_title.textContent = "Next Solar Eclipse";

  let solar_eclipse_date = document.createElement("div");
  solar_eclipse_date.className = "sun";
  solar_eclipse_date.textContent = `Date: ${data.sun.next_solar_eclipse.datestamp}`;

  let solar_eclipse_type = document.createElement("div");
  solar_eclipse_type.className = "sun";
  solar_eclipse_type.textContent = `Type: ${data.sun.next_solar_eclipse.type}`;

  let solar_eclipse_regions = document.createElement("div");
  solar_eclipse_regions.className = "sun";
  solar_eclipse_regions.textContent = `Visibility Regions: ${data.sun.next_solar_eclipse.visibility_regions}`;

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

  let moonrise_el = document.createElement("div");
  moonrise_el.className = "moon";
  moonrise_el.textContent = `Moonrise: ${data.moon.moonrise}`;

  let moonset_el = document.createElement("div");
  moonset_el.className = "moon";
  moonset_el.textContent = `Moonset: ${data.moon.moonset}`;

  let moonage_el = document.createElement("div");
  moonage_el.className = "moon";
  moonage_el.textContent = `Age: ${data.moon.age_days} days old`;
  
  let moon_illumination_el = document.createElement("div");
  moon_illumination_el.className = "moon";
  moon_illumination_el.textContent = `Illumination: ${data.moon.illumination} ${data.moon.emoji}`;
  
  let moon_phase_name_el = document.createElement("div");
  moon_phase_name_el.className = "moon";
  moon_phase_name_el.textContent = `Phase Name: ${data.moon.phase_name}`;
  
  let moon_stage_el = document.createElement("div");
  moon_stage_el.className = "moon";
  moon_stage_el.textContent = `Stage: ${data.moon.stage}`;
  
  let lunar_eclipse_title_el = document.createElement("h4");
  lunar_eclipse_title_el.className = "moon";
  lunar_eclipse_title_el.textContent = `Next Lunar Eclipse`;
  
  let lunar_eclipse_date_el = document.createElement("div");
  lunar_eclipse_date_el.className = "moon";
  lunar_eclipse_date_el.textContent = `Date: ${data.moon.next_lunar_eclipse.datestamp}`;
  
  let lunar_eclipse_type_el = document.createElement("div");
  lunar_eclipse_type_el.className = "moon";
  lunar_eclipse_type_el.textContent = `Type: ${data.moon.next_lunar_eclipse.type}`;
  
  let lunar_eclipse_visibility_regions_el = document.createElement("div");
  lunar_eclipse_visibility_regions_el.className = "moon";
  lunar_eclipse_visibility_regions_el.textContent = `Visibility Regions: ${data.moon.next_lunar_eclipse.visibility_regions}`;
  
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

  let moon_phases_container = document.createElement("div")

  let moon_phases_title_el = document.createElement("h3");
  moon_phases_title_el.className = "moon-phases";
  moon_phases_title_el.textContent = "Moon Phases";

  let first_quarter_title_el = document.createElement("h4");
  first_quarter_title_el.className = "moon-phases";
  first_quarter_title_el.textContent = "First Quarter";
  
  let first_quarter_img_el = document.createElement("img");
  first_quarter_img_el.className = "moon";
  first_quarter_img_el.src = "img/first-quarter.png";
  first_quarter_img_el.alt = "First Quarter";
  
  let first_quarter_last_time_el = document.createElement("div");
  first_quarter_last_time_el.className = "moon";
  first_quarter_last_time_el.textContent = `Previous: ${data.moon_phases.first_quarter.last.datestamp} - ${data.moon_phases.first_quarter.last.days_ago} days ago`;
  
  let first_quarter_next_time_el = document.createElement("div");
  first_quarter_next_time_el.className = "moon";
  first_quarter_next_time_el.textContent = `Next: ${data.moon_phases.first_quarter.next.datestamp} ${data.moon_phases.first_quarter.next.days_ahead} days ahead`;
  
  let fullmoon_title_el = document.createElement("h4");
  fullmoon_title_el.className = "moon-phases";
  fullmoon_title_el.textContent = "Full Moon";
  
  let fullmoon_img_el = document.createElement("img");
  fullmoon_img_el.className = "moon-phases";
  fullmoon_img_el.src = "img/fullmoon.png";
  fullmoon_img_el.alt = "Full Moon";
  
  let fullmoon_last_time_el = document.createElement("div");
  fullmoon_last_time_el.className = "moon-phases";
  fullmoon_last_time_el.textContent = `Previous: ${data.moon_phases.full_moon.last.datestamp} - ${data.moon_phases.full_moon.last.days_ago} days ago`;
  
  let fullmoon_next_time_el = document.createElement("div");
  fullmoon_next_time_el.className = "moon-phases";
  fullmoon_next_time_el.textContent = `Next: ${data.moon_phases.full_moon.next.datestamp} - ${data.moon_phases.full_moon.next.days_ahead} days ahead`;
  
  let last_quarter_title_el = document.createElement("h4");
  last_quarter_title_el.className = "moon-phases";
  last_quarter_title_el.textContent = "Last Quarter";
  
  let last_quarter_img_el = document.createElement("img");
  last_quarter_img_el.className = "moon-phases";
  last_quarter_img_el.src = "img/last-quarter.png";
  last_quarter_img_el.alt = "Last Quarter";
  
  let last_quarter_last_time_el = document.createElement("div");
  last_quarter_last_time_el.className = "moon-phases";
  last_quarter_last_time_el.textContent = `Previous: ${data.moon_phases.last_quarter.last.datestamp} - ${data.moon_phases.last_quarter.last.days_ago} days ago`;
  
  let last_quarter_next_time_el = document.createElement("div");
  last_quarter_next_time_el.className = "moon-phases";
  last_quarter_next_time_el.textContent = `Next: ${data.moon_phases.last_quarter.next.datestamp} - ${data.moon_phases.last_quarter.next.days_ahead} days ahead`;
  
  let new_moon_title_el = document.createElement("h4");
  new_moon_title_el.className = "moon-phases";
  new_moon_title_el.textContent = "New Moon";
  
  let new_moon_img_el = document.createElement("img");
  new_moon_img_el.className = "moon-phases";
  new_moon_img_el.src = "img/new-moon.png";
  new_moon_img_el.alt = "New Moon";
  
  let new_moon_last_time_el = document.createElement("div");
  new_moon_last_time_el.className = "moon-phases";
  new_moon_last_time_el.textContent = `Previous: ${data.moon_phases.new_moon.last.datestamp} - ${data.moon_phases.new_moon.last.days_ago} days ago`;
  
  let new_moon_next_time_el = document.createElement("div");
  new_moon_next_time_el.className = "moon-phases";
  new_moon_next_time_el.textContent = `Next: ${data.moon_phases.new_moon.next.datestamp} - ${data.moon_phases.new_moon.next.days_ahead} days ahead`;
  
  moon_phases_container.appendChild(moon_phases_title_el)
  moon_phases_container.appendChild(first_quarter_title_el)
  moon_phases_container.appendChild(first_quarter_img_el)
  moon_phases_container.appendChild(first_quarter_last_time_el)
  moon_phases_container.appendChild(first_quarter_next_time_el)

  moon_phases_container.appendChild(fullmoon_title_el)
  moon_phases_container.appendChild(fullmoon_img_el)
  moon_phases_container.appendChild(fullmoon_last_time_el)
  moon_phases_container.appendChild(fullmoon_next_time_el)

  moon_phases_container.appendChild(last_quarter_title_el)
  moon_phases_container.appendChild(last_quarter_img_el)
  moon_phases_container.appendChild(last_quarter_last_time_el)
  moon_phases_container.appendChild(last_quarter_next_time_el)

  moon_phases_container.appendChild(new_moon_title_el)
  moon_phases_container.appendChild(new_moon_img_el)
  moon_phases_container.appendChild(new_moon_last_time_el)
  moon_phases_container.appendChild(new_moon_next_time_el)

  contDiv.appendChild(sun_container);
  contDiv.appendChild(moon_container);
  contDiv.appendChild(moon_phases_container);

  container.appendChild(date_el);
  container.appendChild(contDiv);
}

function displayFeasts(obj, container) {
  obj.forEach((item) => {
    let contDiv = document.createElement("div");
    contDiv.className = "side-bar-main-content feast-item";

    let el;

    if (item.name) {
      el = document.createElement("h3");
      el.classList.add("feast-name");
      el.innerHTML = `${item.position}. <a href="${item.url}" target="_blank">${item.name}</a>`;
      contDiv.appendChild(el);
    }

    if (item.alt_name) {
      el = document.createElement("h4");
      el.classList.add("feast-alt-name");
      el.textContent = `Also called: ${item.alt_name}`;
      contDiv.appendChild(el);
    }

    if (item.description) {
      el = document.createElement("p");
      el.classList.add("feast-description");
      el.textContent = item.description;
      contDiv.appendChild(el);
    }

    if (item.day) {
      el = document.createElement("div");
      el.classList.add("ancient-calendar")
      el.textContent = `Ancient Calendar: Day ${item.day} ${item.month}`;
      contDiv.appendChild(el);
    }

    if (item.modernDate) {
      el = document.createElement("div");
      el.textContent = `Gregorian Calendar: ${item.modernDate}`;
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

function setFeasts(yearZero, msPerDay, feastDay) {
  const daysOfYear = 364
  const date = new Date();
  const sec = date.getTime();

  const timeFromYearZero = sec - yearZero;
  const currentDay = Math.ceil(timeFromYearZero / msPerDay % daysOfYear);

  const daysToFeast =
    currentDay > feastDay
      ? daysOfYear - currentDay + feastDay
      : feastDay - currentDay;

  const timeToFeast = daysToFeast * msPerDay;
  const feastDate = new Date(sec + timeToFeast);

  return `${feastDate.getDate()}-${feastDate.getMonth() + 1}-${feastDate.getFullYear()}`;
}

export {
  daySeeker,
  detailsPopUp,
  showModernCalendar,
  getHour,
  displayMoonPhases,
  displayFeasts,
  displayDailyEvents,
  displayApiData,
  setFeasts,
};
