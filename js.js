let dates = document.querySelectorAll(".days-container")

dates.forEach((date) => {
    let day = date.children
    
    for (let i = 0; i < 5; i++) {
        let sundays = day[(i+1)*7-7]
        let mondays = day[(i+1)*7-6]
        let tuesdays = day[(i+1)*7-5]
        let wednesdays = day[(i+1)*7-4]
        let thursdays = day[(i+1)*7-3]
        let fridays = day[(i+1)*7-2]
        let sabbaths = day[(i+1)*7-1]
        
        if (sabbaths.className !== "h4-days none-days") {
            sabbaths.classList.add("sabbath-days")
        }
        
    }

    for (let i = 0; i < day.length; i++) {
        if (day[i].className !== "h4-days none-days") {
            if (day[i].textContent == "31") {
                day[i].classList.add("sign-days")
            }
        }
    }
})

let data = document.querySelectorAll(".h4-days")
let real_days = []

for (let i = 0; i < data.length; i++) {
    if (!data[i].className.includes("none-days")) {
        real_days.push(data[i])
    }
}

let current_date = document.querySelector(".current-day")
let year_el = document.querySelector(".year")
let year_zero = 1693972800757 //06 Sep 2023 - 6am

function daySeeker(arr, start_point, year_el) {
    let date = new Date()
    let sec = date.getTime()
    let milliseconds_from_year_zero = sec - start_point
    let milliseconds_per_day = 86400000
    let milliseconds_per_year = 31449600000
    let number_of_days_from_year_zero = Math.ceil(milliseconds_from_year_zero/milliseconds_per_day)
    let year = Math.ceil(number_of_days_from_year_zero/arr.length)
    
    if (number_of_days_from_year_zero > arr.length) {
        daySeeker(arr, start_point + milliseconds_per_year, year_el)
        year_el.textContent = year
    } else {
        let current_day = arr[number_of_days_from_year_zero - 1]
        let prev_day = arr[number_of_days_from_year_zero - 2]
        let current_month = arr[number_of_days_from_year_zero - 1].parentElement.parentElement.firstChild.nextSibling
        if (number_of_days_from_year_zero === 2) {
            arr[0].classList.remove("current-day")
            arr[0].parentElement.parentElement.firstChild.nextSibling.classList.remove("current-month")
            current_day.classList.add("current-day")
            current_month.classList.add("current-month")
        } else if (number_of_days_from_year_zero === 1) {
            arr[arr.length - 1].classList.remove("current-day")
            arr[arr.length - 1].parentElement.parentElement.firstChild.nextSibling.classList.remove("current-month")
            current_day.classList.add("current-day")
            current_month.classList.add("current-month")
        } else {
            let prev_month = arr[number_of_days_from_year_zero - 2].parentElement.parentElement.firstChild.nextSibling
            prev_day.classList.remove("current-day")
            prev_month.classList.remove("current-month")
            current_day.classList.add("current-day")
            current_month.classList.add("current-month")
        }
        year_el.textContent = year
    }
}
daySeeker(real_days, year_zero, year_el)

let sidebar_month_title = document.querySelector(".sidebar-month-title")
let events_container = document.querySelector(".events-container")
let current_day = document.querySelector(".current-day")
let month_notes = document.querySelector(".month-notes")
let sabbath_days_count_el = document.querySelector(".sabbath-days-count")
let special_sabbath_days_count_el = document.querySelector(".special-sabbath-days-count")
let daily_events_el = document.querySelector(".daily-events")
let no_upcoming_events_el = document.querySelector(".no-upcoming-events")


feast_days = document.querySelectorAll(".feast-days")
feast_days.forEach((day, i) => {
    if (day.textContent === "21" || day.textContent === "15" || day.textContent === "1" || day.textContent === "9") {
        day.classList.add("special-sabbaths")
    }
})


real_days.forEach((day) => {
    
    if (day.classList.contains("current-day")) {
        let current_month_title = day.parentElement.parentElement.firstChild.nextSibling.textContent
        let current_month_days = day.parentElement.children
        let sabbath_days = 0
        let special_sabbath_days = 0
        console.log(current_day)
        sidebar_month_title.textContent = `Day ${current_day.textContent} of ${current_month_title}`
        for (let i = 0; i < current_month_days.length; i++) {

            if (current_month_days[i].classList.contains("sabbath-days")) {
                sabbath_days++
                sabbath_days_count_el.textContent = `Weekly Sabbaths: ${sabbath_days}`
            } else if (current_month_days[i].classList.contains("special-sabbaths")) {
                special_sabbath_days++
                special_sabbath_days_count_el.textContent = `Feast Sabbaths: ${special_sabbath_days}`
            }

            if (current_month_days[i].classList.contains("feast-days") && current_month_title === "Month 1 - Abib") {
                no_upcoming_events_el.textContent = ""
                if (current_month_days[i].classList.contains("passover")) {
                    if (current_month_days[i].textContent - day.textContent <= 0) {
                        if (current_month_days[i].textContent - day.textContent === 0) {
                            daily_events_el.textContent = "this is passover"
                        }
                    } else {
                        let list_item = document.createElement("li")
                        list_item.textContent = `Day ${current_month_days[i].
                        textContent} is Passover Feast (${current_month_days[i].
                        textContent - day.textContent} days from now)`
                        events_container.appendChild(list_item)
                    }
                } else if (current_month_days[i].classList.contains("unleavened-bread")) {
                    if (current_month_days[i].textContent === "15") {
                        if (current_month_days[i].textContent - day.textContent <= 0) {
                            if (current_month_days[i].textContent - day.textContent === 0) {
                                daily_events_el.textContent = "this is unleavened bread"
                            }
                        } else {
                            let list_item = document.createElement("li")
                            list_item.textContent = `Day ${current_month_days[i].
                            textContent} is the first sabbath of the Feast of Unleavened Bread, 
                            which lasts for 7 days (${current_month_days[i].
                            textContent - day.textContent} days from now)`
                            events_container.appendChild(list_item)
                        }
                    }
                } else {
                    if (current_month_days[i].textContent - day.textContent <= 0) {
                        if (current_month_days[i].textContent - day.textContent === 0) {
                            daily_events_el.textContent = "this is the waving of sheaf"
                        }
                    } else {
                        let list_item = document.createElement("li")
                        list_item.textContent = `Day ${current_month_days[i].
                        textContent} is The Waving of Sheaf (${current_month_days[i].
                        textContent - day.textContent} days from now)`
                        events_container.appendChild(list_item)
                    }
                }
            } else if (current_month_days[i].classList.contains("feast-days") && current_month_title === "Month 3 - Sivan") {
                no_upcoming_events_el.textContent = ""
                if (current_month_days[i].classList.contains("shavuot")) {
                    if (current_month_days[i].textContent - day.textContent <= 0) {
                        if (current_month_days[i].textContent - day.textContent === 0) {
                            daily_events_el.textContent = "this is shavuot"
                        }
                    } else {
                        let list_item = document.createElement("li")
                        list_item.textContent = `Day ${current_month_days[i].
                        textContent} is Shavuot, also called: Feast of Weeks (Day of Pentecost in Greek), 
                        Feast of First-Friuts is also celebrated on this day. (${current_month_days[i].
                        textContent - day.textContent} days from now)`
                        events_container.appendChild(list_item)
                    }
                }
            }
        }
    }
})


setInterval(() => {
    let date = new Date()
    let seconds_arm = document.querySelector(".seconds_arm")
    let minutes_arm = document.querySelector(".minutes_arm")
    let hours_arm = document.querySelector(".hours_arm")
    let time_discription = document.querySelector(".time-discription")
    let middle_hour = document.querySelector(".middle-hour")
    let seconds = date.getSeconds()
    let minutes = date.getMinutes()
    let hours = date.getHours()
    
    let seconds_angle = (seconds / 60) *  360
    let minutes_angle = (minutes / 60) * 360
    let hours_angle = (hours / 12) * 360
    if (seconds == 31 || seconds == 33) {
        seconds_angle = Math.floor(seconds_angle)
    } else if (seconds == 21 || seconds == 42) {
        seconds_angle = Math.ceil(seconds_angle)
    } else {
        seconds_angle = (seconds / 60) *  360
    }
    
    seconds_arm.style.transform = `rotate(${seconds_angle}deg)`
    minutes_arm.style.transform = `rotate(${minutes_angle}deg)`
    hours_arm.style.transform = `rotate(${hours_angle}deg)`
    
    if (minutes === 30) {
        middle_hour.textContent = "middle of the"
    } else if (minutes >= 0 && minutes <= 15) {
        middle_hour.textContent = "first quarter of the"
    } else if (minutes > 15 && minutes < 30) {
        middle_hour.textContent = "second quarter of the"
    } else if (minutes > 30 && minutes <= 45) {
        middle_hour.textContent = "third quarter of the"
    } else if (minutes > 45 && minutes <= 59) {
        middle_hour.textContent = "fourth quarter of the"
    } else {
        middle_hour.textContent = ""
    }

    
    if (hours === 6 || hours === 18) {
        if (hours === 6) {
            time_discription.textContent = "Morning"
        } else {
            time_discription.textContent = "Evening"
        }
    } else if (hours === 7 || hours === 19) {
        if (hours === 7) {
            time_discription.textContent = "first (1st) hour in the morning"
        } else {
            time_discription.textContent = "first (1st) hour in the evening"
        }
    } else if (hours === 8 || hours === 20) {
        if (hours === 8) {
            time_discription.textContent = "second (2nd) hour in the morning"
        } else {
            time_discription.textContent = "second (2nd) hour in the evening"
        }
    } else if (hours === 9 || hours === 21) {
        if (hours === 9) {
            time_discription.textContent = "third (3rd) hour after morning"
        } else {
            time_discription.textContent = "third (3rd) hour after evening"
        }
    } else if (hours === 10 || hours === 22) {
        if (hours === 10) {
            time_discription.textContent = "fourth (4th) hour after morning"
        } else {
            time_discription.textContent = "fourth (4th) hour after evening"
        }
    } else if (hours === 11 || hours === 23) {
        if (hours === 11) {
            time_discription.textContent = "fiveth (5th) hour after morning"
        } else {
            time_discription.textContent = "fiveth (5th) hour after evening"
        }
    } else if (hours === 12 || hours === 0) {
        if (hours === 12) {
            time_discription.textContent = "sixth (6th) hour (Noon)"
        } else {
            time_discription.textContent = "sixth (6th) hour (Midnight)"
        }
    } else if (hours === 13 || hours === 1) {
        if (hours === 13) {
            time_discription.textContent = "seventh (7th) hour afternoon"
        } else {
            time_discription.textContent = "seventh (7th) hour after midnight"
        }
    } else if (hours === 14 || hours === 2) {
        if (hours === 14) {
            time_discription.textContent = "eighth (8th) hour afternoon"
        } else {
            time_discription.textContent = "eighth (8th) hour after midnight"
        }
    } else if (hours === 15 || hours === 3) {
        if (hours === 15) {
            time_discription.textContent = "nineth (9th) hour afternoon"
        } else {
            time_discription.textContent = "nineth (9th) hour after midnight"
        }
    } else if (hours === 16 || hours === 4) {
        if (hours === 16) {
            time_discription.textContent = "tenth (10th) hour afternoon"
        } else {
            time_discription.textContent = "tenth (10th) hour after midnight"
        }
    } else if (hours === 17 || hours === 5) {
        if (hours === 17) {
            time_discription.textContent = "eleventh (11th) hour afternoon"
        } else {
            time_discription.textContent = "eleventh (11th) hour after midnight"
        }
    }
    
}, 1000)





let date_fr_gz = new Date()
let milliseconds = date_fr_gz.getTime()
console.log(`Ground zero milliseconds: ${milliseconds}`)


setInterval(() => {
    daySeeker(real_days, year_zero, year_el) 
}, 1000)