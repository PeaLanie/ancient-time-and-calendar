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
        //year_el.textContent = year
    }
}

let dates = document.querySelectorAll(".days-container")

let sundays_list = []
let mondays_list = []
let tuesdays_list = []
let wednesdays_list = []
let thursdays_list = []
let fridays_list = []
let sabbaths_list = []

let real_days = []
let data = document.querySelectorAll(".h4-days")
let year_el = document.querySelector(".year")
let year_zero = 1679457600757 //22 Mar 2023 - 6am
let sidebar_month_title = document.querySelector(".sidebar-month-title")
let events_container = document.querySelector(".events-container")
let month_notes = document.querySelector(".month-notes")
let sabbath_days_count_el = document.querySelector(".sabbath-days-count")
let special_sabbath_days_count_el = document.querySelector(".special-sabbath-days-count")
let daily_events_el = document.querySelector(".daily-events")
let no_upcoming_events_el = document.querySelector(".no-upcoming-events")
let feast_days = document.querySelectorAll(".feast-days")


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
        
        sundays_list.push(sundays)
        mondays_list.push(mondays)
        tuesdays_list.push(tuesdays)
        wednesdays_list.push(wednesdays)
        thursdays_list.push(thursdays)
        fridays_list.push(fridays)
        sabbaths_list.push(sabbaths)

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

sundays_list = sundays_list.filter(day => !day.classList.contains("none-days"))
mondays_list = mondays_list.filter(day => !day.classList.contains("none-days"))
tuesdays_list = tuesdays_list.filter(day => !day.classList.contains("none-days"))
wednesdays_list = wednesdays_list.filter(day => !day.classList.contains("none-days"))
thursdays_list = thursdays_list.filter(day => !day.classList.contains("none-days"))
fridays_list = fridays_list.filter(day => !day.classList.contains("none-days"))
sabbaths_list = sabbaths_list.filter(day => !day.classList.contains("none-days"))

for (let i = 0; i < data.length; i++) {
    if (!data[i].className.includes("none-days")) {
        real_days.push(data[i])
    }
}


feast_days.forEach((day) => {
    if (day.textContent === "21" || day.textContent === "15" || day.textContent === "1" || day.textContent === "9") {
        day.classList.add("special-sabbaths")
    }
})

daySeeker(real_days, year_zero, year_el)
let current_day = document.querySelector(".current-day")

sundays_list.forEach((day, i) => {
    sunday_count = i+1
    if (day.classList.contains("current-day")) {
        console.log(sunday_count)
    }
})

//https://www.gotquestions.org/Feast-of-Weeks.html
//https://www.gotquestions.org/Feast-of-Tabernacles.html
//https://www.gotquestions.org/Feast-of-Trumpets.html
//https://www.gotquestions.org/Day-Atonement-Yom-Kippur.html
//https://www.gotquestions.org/Feast-of-Firstfruits.html
//https://www.gotquestions.org/firstfruits-offering.html
//https://messianiclight.com/first-fruits-for-believers-in-yeshua/

real_days.forEach((day) => {
    
    if (day.classList.contains("current-day")) {
        let current_month_title = day.parentElement.parentElement.firstChild.nextSibling.textContent
        let current_month_days = day.parentElement.children
        let sabbath_days = 0
        let special_sabbath_days = 0

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
                no_upcoming_events_el.style.display = "none"
                if (current_month_days[i].classList.contains("passover")) {
                    let a = document.createElement("a")
                    a.setAttribute("href", "https://www.gotquestions.org/what-is-Passover.html")
                    a.setAttribute("target", "_blank")
                    a.textContent = "What is Passover?"
                    
                    if (current_month_days[i].textContent - day.textContent <= 0) {
                        if (current_month_days[i].textContent - day.textContent === 0) {
                            daily_events_el.textContent = `Hooray! Today is the long awaited Passover
                            Feast which will begin at sunset this evening. Celebrate this feast with us
                            tonight, prepare a nice meal for yourself and your family. For more info
                            on this feast, visit gotQuestions.org: `
                            daily_events_el.appendChild(a)
                        }
                    } else {
                        let list_item = document.createElement("li")
                        list_item.textContent = `Day ${current_month_days[i].
                        textContent} is Passover Feast (${current_month_days[i].
                        textContent - day.textContent} days from now)`
                        events_container.appendChild(list_item)
                    }
                } else if (current_month_days[i].classList.contains("unleavened-bread")) {
                    let a = document.createElement("a")
                    a.setAttribute("href", "https://www.gotquestions.org/unleavened-bread.html")
                    a.setAttribute("target", "_blank")
                    a.textContent = "What is Unleavened Bread?"
                    if (current_month_days[i].textContent === "15") {
                        if (current_month_days[i].textContent - day.textContent <= 0) {
                            if (current_month_days[i].textContent - day.textContent === 0) {
                                daily_events_el.textContent = `Hooray! Today begins the 7-day Feast
                                called the Feast of Unleavened Bread, where we eat bread with no leaven.
                                For meaning and more info on this feast visit getQuestions.org:`
                                daily_events_el.appendChild(a)
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
                if (events_container.children.length === 0) {
                    no_upcoming_events_el.style.display = "block"
                    no_upcoming_events_el.textContent = "No feasts left on this month"
                }
            } else if (current_month_days[i].classList.contains("feast-days") && current_month_title === "Month 3 - Sivan") {
                no_upcoming_events_el.style.display = " none"
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
                if (events_container.children.length === 0) {
                    no_upcoming_events_el.style.display = "block"
                    no_upcoming_events_el.textContent = "No feasts left on this month"
                }
            } else if (current_month_days[i].textContent == "15" && current_month_title == "Month 6") {
                
                if (current_day.textContent == "15") {
                    daily_events_el.textContent = "this is a special date according to the bible, it the day sarah conceived Isaac"
                }

            } else if (current_month_days[i].classList.contains("feast-days") && current_month_title === "Month 7 - Ethanim") {
                no_upcoming_events_el.style.display = "none"
                if (current_month_days[i].classList.contains("day-of-trumpets")) {
                    if (current_month_days[i].textContent - day.textContent <= 0) {
                        if (current_month_days[i].textContent - day.textContent === 0) {
                            daily_events_el.textContent = "this is the day of trumpets"
                        }
                    } else {
                        let list_item = document.createElement("li")
                        list_item.textContent = `Day ${current_month_days[i].
                        textContent} is the Day of Trumpets. (${current_month_days[i].
                        textContent - day.textContent} days from now)`
                        events_container.appendChild(list_item)
                    }
                } else if (current_month_days[i].classList.contains("day-of-atonement")) {
                    if (current_month_days[i].textContent - day.textContent <= 0) {
                        if (current_month_days[i].textContent - day.textContent === 0) {
                            daily_events_el.textContent = "this is the day of atonement"
                        }
                    } else {
                        let list_item = document.createElement("li")
                        list_item.textContent = `Day ${current_month_days[i].
                        textContent} is the Day of Atonement. (${current_month_days[i].
                        textContent - day.textContent} days from now)`
                        events_container.appendChild(list_item)
                    }
                }  else if (current_month_days[i].classList.contains("tabernacles")) {
                    if (current_month_days[i].textContent == "15") {
                        if (current_month_days[i].textContent - day.textContent <= 0) {
                            if (current_month_days[i].textContent - day.textContent === 0) {
                                daily_events_el.textContent = "this is the feast of tabernacles"
                            }
                        } else {
                            let list_item = document.createElement("li")
                            list_item.textContent = `Day ${current_month_days[i].
                            textContent} is the Feast of Tabernacles. (${current_month_days[i].
                            textContent - day.textContent} days from now)`
                            events_container.appendChild(list_item)
                        }
                    }
                }
                if (events_container.children.length === 0) {
                    no_upcoming_events_el.style.display = "block"
                    no_upcoming_events_el.textContent = "No feasts left on this month"
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


setInterval(() => {
    //daySeeker(real_days, year_zero, year_el) 
}, 1000)
