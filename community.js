//Search method--------------------------------------------------------

const search_input = document.getElementById("search_input")
const search_button = document.getElementById("search_button")

function Search() {
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

search_button.addEventListener("click", Search)

//Create posts--------------------------------------------------------
const post_template = document.getElementById("post_template")
const posts_div = document.getElementById("posts_div")

let post_counter_fake = 0;

function CreatePost(title,author,content) {
    let post = post_template.cloneNode(true)
    post.id = post_counter_fake
    post.style = ""

    //regions
    let post_header = post.getElementsByClassName("post_header")[0]
    let post_content = post.getElementsByClassName("post_content")[0]
    let post_footer = post.getElementsByClassName("post_footer")[0]

    posts_div.appendChild(post)
    post_counter_fake++;

    //setup upvote / downvote
    let post_votes = post_footer.getElementsByClassName("post_votes")[0]
    let votes_up = post_votes.getElementsByClassName("post_vote_upvote")[0]
    let votes_down = post_votes.getElementsByClassName("post_vote_downvote")[0]
    let votes_text = post_votes.getElementsByClassName("post_votes_count")[0]

    function UpdateText()  {
        let count = 0
        if (votes_up.checked) {
            count+=1;
        }
        if (votes_down.checked) {
            count-=1;
        }
        votes_text.textContent = count
    }

    votes_up.addEventListener("change",UpdateText)
    votes_down.addEventListener("change",UpdateText)
}

for (let i = 0; i < 15; i++) {
    CreatePost()
}

//time
function UpdateTime() {
    for (let time of document.getElementsByClassName("time")) {
        let computed_style = window.getComputedStyle(time)
        let value = Number(computed_style.getPropertyValue("--secs").trim())

        //text format
        let formated = value
        let pos = "s"

        if (value > 59) {
            formated = Math.floor(value/60)
            pos = " min"
        } else (value > 3599); {
            formated = Math.floor(value/3600)
            pos = "h"
        }

        time.textContent = formated+pos

        time.style.setProperty("--secs",value+1)
    }
}

UpdateTime()
setInterval(UpdateTime,1000)