const dates = document.querySelectorAll(".days-container");
const data = document.querySelectorAll(".h4-days");
const year_el = document.querySelector(".year");
const sidebar_month_title = document.querySelector(".sidebar-month-title");
const events_container = document.querySelector(".events-container");
const month_notes = document.querySelector(".month-notes");
const sabbath_days_count_el = document.querySelector(".sabbath-days-count");
const special_sabbath_days_count_el = document.querySelector(".special-sabbath-days-count");
const days_count_el = document.querySelector(".days-count");
const daily_events_el = document.querySelector(".daily-events");
const no_upcoming_events_el = document.querySelector(".no-upcoming-events");
const feast_days = document.querySelectorAll(".feast-days");
const menu_container = document.querySelector(".menu-container");
const gregorian_date_el = document.querySelector(".gregorian");
const seconds_arm = document.querySelector(".seconds_arm");
const minutes_arm = document.querySelector(".minutes_arm");
const hours_arm = document.querySelector(".hours_arm");
const time_discription = document.querySelector(".time-discription");
const middle_hour = document.querySelector(".middle-hour");
const menubar = document.querySelector(".fa-solid.fa-bars");
const xmark = document.querySelector(".fa-solid.fa-xmark");
const sidebar_container = document.querySelector(".sidebar-container");
const month_container = document.querySelector(".month-container");
const months = document.querySelectorAll(".month");
const ancient_calendar = document.querySelector("#ancient-calendar");
const milliseconds_per_day = 86400000;
const milliseconds_per_year = 31449600000;
const year_zero = 1679457600757 - 3600000*12; //22 Mar 2023 - 6am (1679457600757)
const real_days = [];
const date = new Date();

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

real_days.forEach(day => {
  day.innerHTML = `<div>${day.textContent}</div>`;
})

daySeeker(real_days, year_zero);
const current_day = document.querySelector(".current-day");
const current_month = current_day.parentElement.parentElement;
current_month.scrollIntoView({behavior: "smooth"});
current_month.classList.add("show")

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
.map((day) => {day.classList.add("first-day")});

mondays_list = mondays_list
.filter((day) => !day.classList.contains("none-days"))
.map((day) => {day.classList.add("second-day")});

tuesdays_list = tuesdays_list
.filter((day) => !day.classList.contains("none-days"))
.map((day) => {day.classList.add("third-day")});

wednesdays_list = wednesdays_list
.filter((day) => !day.classList.contains("none-days"))
.map((day) => {day.classList.add("fourth-day")});

thursdays_list = thursdays_list
.filter((day) => !day.classList.contains("none-days"))
.map((day) => {day.classList.add("fifth-day")});

fridays_list = fridays_list
.filter((day) => !day.classList.contains("none-days"))
.map((day) => {day.classList.add("sixth-day")});

sabbaths_list = sabbaths_list
.filter((day) => !day.classList.contains("none-days"));

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

//https://www.gotquestions.org/Feast-of-Weeks.html
//https://www.gotquestions.org/Feast-of-Tabernacles.html
//https://www.gotquestions.org/Feast-of-Trumpets.html
//https://www.gotquestions.org/Day-Atonement-Yom-Kippur.html
//https://www.gotquestions.org/Feast-of-Firstfruits.html
//https://www.gotquestions.org/firstfruits-offering.html
//https://messianiclight.com/first-fruits-for-believers-in-yeshua/

real_days.forEach((day, index, arr) => {

  if (day.classList.contains("current-day")) {
    
    days_count_el.textContent = `Day ${index+1} of ${arr.length}`;
    gregorian_date_el.textContent = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
    
    let current_month_title = day.parentElement.parentElement.firstChild.nextSibling.textContent;
    let current_month_days = day.parentElement.children;
    let sabbath_days = 0;
    let special_sabbath_days = 0;

    sidebar_month_title.textContent = `Day ${current_day.textContent} of ${current_month_title}`;

    for (let i = 0; i < current_month_days.length; i++) {
      if (current_month_days[i].classList.contains("sabbath-days")) {
        sabbath_days++;
        sabbath_days_count_el.textContent = `Weekly Sabbaths: ${sabbath_days}`;
      } else if (current_month_days[i].classList.contains("special-sabbaths")) {
        special_sabbath_days++;
        special_sabbath_days_count_el.textContent = `Feast Sabbaths: ${special_sabbath_days}`;
      }

      if (
        current_month_days[i].classList.contains("feast-days") &&
        current_month_title === "Month 1 - Abib"
      ) {
        no_upcoming_events_el.style.display = "none";
        if (current_month_days[i].classList.contains("passover")) {
          let a = document.createElement("a");
          a.setAttribute(
            "href",
            "https://www.gotquestions.org/what-is-Passover.html"
          );
          a.setAttribute("target", "_blank");
          a.textContent = "What is Passover?";

          if (current_month_days[i].textContent - day.textContent <= 0) {
            if (current_month_days[i].textContent - day.textContent === 0) {
              daily_events_el.textContent = `Hooray! Today is the long awaited Passover
                            Feast which will begin at sunset this evening. Celebrate this feast with us
                            tonight, prepare a nice meal for yourself and your family. For more info
                            on this feast, visit gotQuestions.org: `;
              daily_events_el.appendChild(a);
            }
          } else {
            let list_item = document.createElement("li");
            list_item.textContent = `Day ${
              current_month_days[i].textContent
            } is Passover Feast (${
              current_month_days[i].textContent - day.textContent
            } days from now)`;
            events_container.appendChild(list_item);
          }
        } else if (
          current_month_days[i].classList.contains("unleavened-bread")
        ) {
          let a = document.createElement("a");
          a.setAttribute(
            "href",
            "https://www.gotquestions.org/unleavened-bread.html"
          );
          a.setAttribute("target", "_blank");
          a.textContent = "What is Unleavened Bread?";
          if (current_month_days[i].textContent === "15") {
            if (current_month_days[i].textContent - day.textContent <= 0) {
              if (current_month_days[i].textContent - day.textContent === 0) {
                daily_events_el.textContent = `Hooray! Today begins the 7-day Feast
                                called the Feast of Unleavened Bread, where we eat bread with no leaven.
                                For meaning and more info on this feast visit getQuestions.org:`;
                daily_events_el.appendChild(a);
              }
            } else {
              let list_item = document.createElement("li");
              list_item.textContent = `Day ${
                current_month_days[i].textContent
              } is the first sabbath of the Feast of Unleavened Bread, 
                            which lasts for 7 days (${
                              current_month_days[i].textContent -
                              day.textContent
                            } days from now)`;
              events_container.appendChild(list_item);
            }
          }
        } else {
          if (current_month_days[i].textContent - day.textContent <= 0) {
            if (current_month_days[i].textContent - day.textContent === 0) {
              daily_events_el.textContent = "this is the waving of sheaf";
            }
          } else {
            let list_item = document.createElement("li");
            list_item.textContent = `Day ${
              current_month_days[i].textContent
            } is The Waving of Sheaf (${
              current_month_days[i].textContent - day.textContent
            } days from now)`;
            events_container.appendChild(list_item);
          }
        }
        if (events_container.children.length === 0) {
          no_upcoming_events_el.style.display = "block";
          no_upcoming_events_el.textContent = "No feasts left on this month";
        }
      } else if (
        current_month_days[i].classList.contains("feast-days") &&
        current_month_title === "Month 3 - Sivan"
      ) {
        no_upcoming_events_el.style.display = " none";
        if (current_month_days[i].classList.contains("shavuot")) {
          if (current_month_days[i].textContent - day.textContent <= 0) {
            if (current_month_days[i].textContent - day.textContent === 0) {
              daily_events_el.textContent = "this is shavuot";
            }
          } else {
            let list_item = document.createElement("li");
            list_item.textContent = `Day ${
              current_month_days[i].textContent
            } is Shavuot, also called: Feast of Weeks (Day of Pentecost in Greek), 
                        Feast of First-Friuts is also celebrated on this day. (${
                          current_month_days[i].textContent - day.textContent
                        } days from now)`;
            events_container.appendChild(list_item);
          }
        }
        if (events_container.children.length === 0) {
          no_upcoming_events_el.style.display = "block";
          no_upcoming_events_el.textContent = "No feasts left on this month";
        }
      } else if (
        current_month_days[i].textContent == "15" &&
        current_month_title == "Month 6"
      ) {
        if (current_day.textContent == "15") {
          daily_events_el.textContent =
            "this is a special date according to the bible, it the day sarah conceived Isaac";
        }
      } else if (
        current_month_days[i].classList.contains("feast-days") &&
        current_month_title === "Month 7 - Ethanim"
      ) {
        no_upcoming_events_el.style.display = "none";
        if (current_month_days[i].classList.contains("day-of-trumpets")) {
          if (current_month_days[i].textContent - day.textContent <= 0) {
            if (current_month_days[i].textContent - day.textContent === 0) {
              daily_events_el.textContent = "this is the day of trumpets";
            }
          } else {
            let list_item = document.createElement("li");
            list_item.textContent = `Day ${
              current_month_days[i].textContent
            } is the Day of Trumpets. (${
              current_month_days[i].textContent - day.textContent
            } days from now)`;
            events_container.appendChild(list_item);
          }
        } else if (
          current_month_days[i].classList.contains("day-of-atonement")
        ) {
          if (current_month_days[i].textContent - day.textContent <= 0) {
            if (current_month_days[i].textContent - day.textContent === 0) {
              daily_events_el.textContent = "this is the day of atonement";
            }
          } else {
            let list_item = document.createElement("li");
            list_item.textContent = `Day ${
              current_month_days[i].textContent
            } is the Day of Atonement. (${
              current_month_days[i].textContent - day.textContent
            } days from now)`;
            events_container.appendChild(list_item);
          }
        } else if (current_month_days[i].classList.contains("tabernacles")) {
          if (current_month_days[i].textContent == "15") {
            if (current_month_days[i].textContent - day.textContent <= 0) {
              if (current_month_days[i].textContent - day.textContent === 0) {
                daily_events_el.textContent =
                  "this is the feast of tabernacles";
              }
            } else {
              let list_item = document.createElement("li");
              list_item.textContent = `Day ${
                current_month_days[i].textContent
              } is the Feast of Tabernacles. (${
                current_month_days[i].textContent - day.textContent
              } days from now)`;
              events_container.appendChild(list_item);
            }
          }
        }
        if (events_container.children.length === 0) {
          no_upcoming_events_el.style.display = "block";
          no_upcoming_events_el.textContent = "No feasts left on this month";
        }
      } else if (!current_month_days[i].classList.contains("feast-days")) {
        //events_container.style.display = "none"
      }
    }

  }

  day.addEventListener("click", () => {
    
    let sec = date.getTime();
    let milliseconds_from_year_zero = sec - year_zero;
    let number_of_days_from_year_zero = milliseconds_from_year_zero / milliseconds_per_day;
    let number_of_years_from_year_zero = Math.floor(milliseconds_from_year_zero / milliseconds_per_year);
    let milliseconds_count_in_year = (number_of_days_from_year_zero/364 - number_of_years_from_year_zero) * milliseconds_per_year;
    let days_count_in_year = Math.ceil(milliseconds_count_in_year/milliseconds_per_day);
    let target_day = index+1;
    let num_of_days_from_current_day;
    let milliseconds;
    let ndate;
    let fullDate;
    let container;
    let container_btn;
    if (target_day < days_count_in_year) {
      num_of_days_from_current_day = days_count_in_year - target_day;
      milliseconds = sec - (num_of_days_from_current_day * milliseconds_per_day);
      ndate = new Date(milliseconds);
      fullDate = `${ndate.getDate()}-${ndate.getMonth()+1}-${ndate.getFullYear()}`;
      
      detailsPopUp(fullDate, day);
      container = document.querySelector(".details-popup");
      container_btn = document.querySelector(".details-popup-btn");
      
    } else if (target_day > days_count_in_year) {
      num_of_days_from_current_day = target_day - days_count_in_year;
      milliseconds = sec + (num_of_days_from_current_day * milliseconds_per_day);
      ndate = new Date(milliseconds);
      fullDate = `${ndate.getDate()}-${ndate.getMonth()+1}-${ndate.getFullYear()}`;
      
      detailsPopUp(fullDate, day);
      container = document.querySelector(".details-popup");
      container_btn = document.querySelector(".details-popup-btn");
      
    } else {
      fullDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
      
      detailsPopUp(fullDate, day);
      container = document.querySelector(".details-popup");
      container_btn = document.querySelector(".details-popup-btn");

    }
    container_btn.addEventListener("click", () => {
      container.remove();
    })
  });
  showModernCalendar(day, index, year_zero, milliseconds_per_day, milliseconds_per_year);
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

let i = 0
let h = 0
setInterval(() => {
  const date = new Date();
  let seconds = date.getSeconds();
  let minutes = date.getMinutes();
  let hours = date.getHours();

  if (seconds == 0) {
    i = 0;
  } else {
    i = (seconds/10);
  }
  if (minutes == 0) {
    h = 0;
  } else {
    h = minutes/2;
  }

  let seconds_angle = (seconds / 60) * 360;
  let minutes_angle = ((minutes / 60) * 360) + i;
  let hours_angle = ((hours / 12) * 360) + h;
  
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
    console.log(xmark.style.display !== "block")
  if (xmark.style.display !== "block") {
    xmark.style.display = "block"
    menubar.style.display = "none"
    sidebar_container.style.display = "block"
    //sidebar_container.style.height = "100%"
  } else {
    xmark.style.display = "none"
    menubar.style.display = "block"
    //sidebar_container.style.height = "0"
    sidebar_container.style.display = "none"
  }
});

if (window.innerWidth < 768) {
  document.querySelectorAll(".modernDate").forEach(item => {
    item.remove();
  })
}

month_container.addEventListener("scroll", () => {
  const middleScreen = window.innerHeight / 2;
  //console.log(middleScreen)
  months.forEach(month => {
    const monthTop = month.getBoundingClientRect().top;
    //console.log(monthBottom)
    if (monthTop < middleScreen) {
      //month.classList.add("show")
    } else {
      //month.classList.remove("show")
    }
  })
})

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
    let current_month = current_day.parentElement.parentElement.firstChild.nextSibling;
    
    if (number_of_days_from_year_zero === 2) {
      arr[0].classList.remove("current-day");
      arr[0].parentElement.parentElement.firstChild.nextSibling.classList.remove(
        "current-month"
      );
      current_day.classList.add("current-day");
      current_month.classList.add("current-month");
    } else if (number_of_days_from_year_zero === 1) {
      arr[arr.length - 1].classList.remove("current-day");
      arr[
        arr.length - 1
      ].parentElement.parentElement.firstChild.nextSibling.classList.remove(
        "current-month"
      );
      current_day.classList.add("current-day");
      current_month.classList.add("current-month");
    } else {
      let prev_month =
      arr[number_of_days_from_year_zero - 2].parentElement.parentElement.firstChild.nextSibling;
      prev_day.classList.remove("current-day");
      prev_month.classList.remove("current-month");
      current_day.classList.add("current-day");
      current_month.classList.add("current-month");
    }
  }
}

function detailsPopUp(date, targetEl) {
  let parentEl = targetEl.parentElement.parentElement.parentElement.parentElement;
  let current_month_title = targetEl.parentElement.parentElement.firstChild.nextSibling.textContent;
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
  let sec = date.getTime();
  let milliseconds_from_year_zero = sec - start;
  let number_of_days_from_year_zero = milliseconds_from_year_zero / mpd;
  let number_of_years_from_year_zero = Math.floor(milliseconds_from_year_zero / mpy);
  let milliseconds_count_in_year = (number_of_days_from_year_zero/364 - number_of_years_from_year_zero) * mpy;
  let days_count_in_year = Math.ceil(milliseconds_count_in_year / mpd);
  let target_day = index+1;
  let num_of_days_from_current_day;
  let milliseconds;
  let ndate;
  let fullDate;
  let dateEl;
  if (target_day < days_count_in_year) {
    num_of_days_from_current_day = days_count_in_year - target_day;
    milliseconds = sec - (num_of_days_from_current_day * mpd);
    ndate = new Date(milliseconds);
    fullDate = `${ndate.getDate()}-${ndate.getMonth()+1}-${ndate.getFullYear()}`;

    dateEl = document.createElement("div");
    dateEl.classList.add("modernDate");
    dateEl.textContent = fullDate;
    day.appendChild(dateEl);
  } else if (target_day > days_count_in_year) {
    num_of_days_from_current_day = target_day - days_count_in_year;
    milliseconds = sec + (num_of_days_from_current_day * mpd);
    ndate = new Date(milliseconds);
    fullDate = `${ndate.getDate()}-${ndate.getMonth()+1}-${ndate.getFullYear()}`;

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


