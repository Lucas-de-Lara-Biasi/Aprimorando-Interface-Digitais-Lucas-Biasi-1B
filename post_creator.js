import { getRandomPFP, getRandomUserName } from "./profile.js"

//Create posts--------------------------------------------------------
const post_template = document.getElementById("post_template")
const posts_div = document.getElementById("posts_div")

let post_counter_fake = 0;

function CreatePost(title, author, content) {
    let post = post_template.cloneNode(true)
    post.id = post_counter_fake
    post.style = ""

    //regions
    let post_header = post.getElementsByClassName("post_header")[0]
    let post_content = post.getElementsByClassName("post_content")[0]
    let post_footer = post.getElementsByClassName("post_footer")[0]

    //Title
    let post_title = post.getElementsByClassName("post_title")[0]
    post_title.textContent = title

    //Pfp
    let pfp_img = post_header.getElementsByClassName("post_pfp")[0]
    pfp_img.src = getRandomPFP()

    //Author
    let post_author = post_header.getElementsByClassName("post_username")[0]
    if (author == "") {
        author = getRandomUserName()
    }
    post_author.textContent = "u/" + author

    //post content set
    let allowed = ["p", "img", "h1", "h2", "h3", "h4", "h5", "strong", "a"]
    for (let info of content) {
        if (allowed.includes(info.type) == true) {
            let element = document.createElement(info.type)

            //set for text components
            if (["p", "h1", "h2", "h3", "h4", "h5", "strong"].includes(info.type)) {
                element.textContent = info.content
            } else if (info.type == "a") { //link setup
                element.href = info.content.link

                let sub = document.createElement("p")
                if (info.content.text == "") {
                    sub.textContent = info.content.link
                } else {
                    sub.textContent = info.content.text
                }

                element.appendChild(sub)
            } else if (info.type == "img") {

            }

            post_content.appendChild(element)
        }
    }

    //append
    posts_div.appendChild(post)
    post_counter_fake++;

    //setup upvote / downvote
    let post_votes = post_footer.getElementsByClassName("post_votes")[0]
    let votes_up = post_votes.getElementsByClassName("post_vote_upvote")[0]
    let votes_down = post_votes.getElementsByClassName("post_vote_downvote")[0]
    let votes_text = post_votes.getElementsByClassName("post_votes_count")[0]

    function UpdateText() {
        let count = 0
        if (votes_up.checked) {
            count += 1;
        }
        if (votes_down.checked) {
            count -= 1;
        }
        votes_text.textContent = count
    }

    votes_up.addEventListener("change", UpdateText)
    votes_down.addEventListener("change", UpdateText)
}

//PostCREATIONS----------------------------------------------------------------------------------------------------------------
CreatePost(
    "HELLO NEW PEOPLE!!!!!",
    "me",
    [
        { "type": "p", "content": "This is something i've been working on for the past 3 weeks, a clone of reddit! Made for a school project!" },
        { "type": "p", "content": "The 'reddit 2' was made for an project on ALURA, brazilian learning plataform!" }
    ]
)
CreatePost(
    "HELLO NEW PEOPLE!!!!!",
    "",
    [
        { "type": "p", "content": "This is something i've been working on for the past 3 weeks, a clone of reddit! Made for a school project!" },
        { "type": "p", "content": "The 'reddit 2' was made for an project on ALURA, brazilian learning plataform!" },
        { "type": "a", "content": { "link": "https://alura.com.br", "text": "" } }
    ]
)