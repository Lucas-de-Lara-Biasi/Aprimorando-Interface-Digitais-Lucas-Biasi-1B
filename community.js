import { getRandomPFP } from "./profile.js"

//SEARCH METHOD----------------------------------------------------------------------------------------------------------------
const search_input = document.getElementById("search_input")
const search_button = document.getElementById("search_button")

function FakeSearch() {
    let search_raw = search_input.value
    console.log("Searching... (' " + search_raw + " ')")

    //check se for null ou sem nada escrito
    if (search_raw == null || search_raw == "" || typeof (search_raw) != "string") {
        return
    }

    //converter para sem espaços
    search_raw = search_raw.replaceAll(" ", "+")

    console.log(search_raw)

    //window.location.href = (window.location.href + "/search?" + search_raw)
}

search_button.addEventListener("click", FakeSearch)

//TIME SET----------------------------------------------------------------------------------------------------------------
function UpdateTime() {
    for (let time of document.getElementsByClassName("time")) {
        let computed_style = window.getComputedStyle(time)
        let value = Number(computed_style.getPropertyValue("--secs").trim())

        //text format
        let formated = value
        let pos = "s"

        if (value > 59 && value <= 3599) {
            formated = Math.floor(value / 60)
            pos = " min"
        } else if (value > 3599 && value <= 86399) {
            formated = Math.floor(value / 3600)
            pos = "h"
        } else if (value > 86399) {
            formated = Math.floor(value / 86400)
            pos = "d"
        }

        time.textContent = formated + pos

        time.style.setProperty("--secs", value + 1)
    }
}

UpdateTime()
setInterval(UpdateTime, 1000)