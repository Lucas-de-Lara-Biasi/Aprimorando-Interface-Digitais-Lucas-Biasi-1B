//PROFILE SETUP
function randomFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

//PFPs
let pfps_dir = "images/pfps/"

let MaxCount = 4
let Colors = [
    "yellow", "light_yellow", "orange", "light_orange", "purple", "light_purple", "moss_green", "light_green", "acid_green", "discord_blue", "light_blue", "grey"
]

function getRandomPFP() {
    let color = randomFromArray(Colors);
    let random_num = randomNumber(1, MaxCount);
    let formated = pfps_dir + color + " (" + random_num + ").png"

    return formated
}

//RANDOM USERNAME
const MainNames = ["Criador", "Dev", "Moss", "Teacher", "Profissional", "Carta", "Demolidor", "Rato", "Criacao", "Coração",
    "Incrivel", "DVD", "Pasta", "Serial", "Chair", "Table", "Mouse", "Gamer", "Fita", "Livro", "HQ", "Vaas", "Estojo", "Bolsa",
    "Balsa", "Carro", "Zap", "School", "Learner", "Cola", "Cell", "PC", "Bala", "Start", "Power", "Energia", "Aura"
]
const SecNames = ["King", "Rei", "Dono", "Dev", "Verde", "Vermelho", "Azul", "Amarelo", "Incrivel", "Lemure", "Cama", "Profissional", "Js",
    "Css", "Html", "Ayanami", "Alura", "Abu", "Ari", "Ishigami", "Man", "Gringa", "Gringo"
]

function getRandomUserName() {
    let first = randomFromArray(MainNames); let sec = randomFromArray(SecNames)
    let num = 1000 + randomNumber(0, 8999)

    let formated = first + "-" + sec + "-" + num

    return formated
}

//Set
document.getElementById("main_profile_pfp").src = pfps_dir + "orange (1).png"


//Create posts--------------------------------------------------------
const post_template = document.getElementById("post_template")
const posts_div = document.getElementById("posts_div")

let post_counter_fake = 0;

//post content
function SetPostContent(post, content) {
    let allowed = ["p", "img", "h1", "h2", "h3", "h4", "h5", "strong", "a", "div"]
    let post_content = post.getElementsByClassName("post_content")[0]

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
            } else if (info.type == "div") {
                element.style.height = info.content
                element.style.width = "100%"
            }

            post_content.appendChild(element)
        }
    }
}

//post tags
function SetPostTags(post, tags) {
    let post_tags = post.getElementsByClassName("post_tags")[0]

    if (tags.length == 0) {
        post_tags.remove()
    }

    for (let tag of tags) {
        let tag_element = document.createElement("h4")
        tag_element.classList.add("tag")

        tag_element.textContent = tag.name
        tag_element.style.backgroundColor = tag.bg_color

        post_tags.appendChild(tag_element)
    }
}

function CreatePost(title = "NO_TITLE", author = "", pfp = "", posttime = 0, content = [], tags = []) {
    let post = post_template.cloneNode(true)
    post.id = post_counter_fake
    post.style = ""

    //regions
    let post_header = post.getElementsByClassName("post_header")[0]
    let post_footer = post.getElementsByClassName("post_footer")[0]

    //Title
    let post_title = post.getElementsByClassName("post_title")[0]
    post_title.textContent = title

    //set post time
    let timer = post_header.getElementsByClassName("post_timeago")[0].getElementsByClassName("time")[0]
    timer.style.setProperty("--secs", posttime)

    //Pfp
    let pfp_img = post_header.getElementsByClassName("post_pfp")[0]
    if (pfp == "") {
        pfp_img.src = getRandomPFP()
    } else {
        pfp_img.src = pfp
    }

    //Author
    let post_author = post_header.getElementsByClassName("post_username")[0]
    if (author == "") {
        author = getRandomUserName()
    }
    post_author.textContent = "u/" + author

    //post content set
    SetPostContent(post, content)

    //post tags set
    SetPostTags(post, tags)

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

//Post CREATIONS----------------------------------------------------------------------------------------------------------------

CreatePost(
    "BOAS VINDAS!",
    "lucas",
    "images/pfps/yellow (4).png",
    650,
    [
        { "type": "p", "content": "Boas vindas ao meu blog de Desenvolvimento de JOGOS!" },
        { "type": "p", "content": "Aqui será discutido tecnologias e desafios que os desenvolvedores enfrentaram para criar lendas no mundo dos jogos!" },
        { "type": "div", "content": "10px" },
        { "type": "p", "content": "<Esse projeto foi desenvolvido para um trabalho escolar para o curso do alura>" },
        { "type": "a", "content": { "link": "https://alura.com.br", "text": "" } }
    ],
    [
        { "name": "Aviso", "bg_color": "rgba(255, 65, 65, 0.91)" },
        { "name": "Mensagem", "bg_color": "rgba(65, 125, 255, 0.91)" },
        { "name": "Boas-Vindas", "bg_color": "rgba(23, 216, 65, 0.91)" },
    ]
)

CreatePost(
    "MOTORES GRÁFICOS E TECNOLOGIAS!",
    "lucas",
    "images/pfps/yellow (4).png",
    512,
    [
        { "type": "p", "content": "Existem CENTENAS de motores gráficos, todos eles com um propósito, ajudar no desenvolvimento de jogos, trazendo funções ja prontas, para que os próprios desenvolvedores não precisem cria-las do zero e focar na criação do jogo em si!" },
        { "type": "p", "content": "Dentre todos os motores mais famosos podemos citar:" },
        { "type": "blank", "content": "15" },
        { "type": "p", "content": "- Unity" },
        { "type": "p", "content": "- Unreal" },
        { "type": "p", "content": "- Godot" },
        { "type": "p", "content": "- GameMaker" },
        { "type": "p", "content": "- RPGMaker" },
        { "type": "blank", "content": "15" },
        { "type": "p", "content": "Algumas empresas decidem criar seus próprios motores, normalmente fechados apenas para o uso dela própria, podemos citar como exemplo a Rockstar, que desenvolve o RAGE, motor gráfico proprietário da empresa, suprindo todas as necessidades do grupo de desenvolvimento para alcançar o objetivo final, gráfico ou mecânico. " },
    ],
    [
        { "name": "Motores Gráficos", "bg_color": "rgba(234, 144, 0, 0.91)" },
    ]
)

CreatePost(
    "TECNOLOGIA UNREAL ENGINE",
    "lucas",
    "images/pfps/yellow (4).png",
    453,
    [
        { "type": "p", "content": "A Unreal Engine, motor gráfico desenvolvido pela empresa Epic Games, é um motor focado em gráficos, atualmente no mercado, é um dos melhores que pode se citar quando a questão são a renderização e texturas em alta qualidade." },
        { "type": "p", "content": "Ela vem crescendo cada vez mais nos ultimos anos, com cada vez mais tecnologicas para facilitar o desenvolvimento de jogos por pessoas comuns." },
        { "type": "blank", "content": "15" },
        { "type": "p", "content": "O motor possui um modo de programação chamado 'Blueprint' (traduzido para planta-baixa), um modo onde é possível apenas arrastar e conectar módulos para escrever a lógica de programação de seu projeto, sem precisar aprender uma linguagem de programação escrita (e muitas vezes muito mais complexas), facilitando a criação e desenvolvimento sem a necessidade de uma grande e dedicada equipe." },
        { "type": "a", "content": { "link": "https://dev.epicgames.com/documentation/unreal-engine/blueprint-foundations?lang=pt-BR", "text": "Fórum da Unreal Engine - Blueprints" } }
    ],
    [
        { "name": "Motores Gráficos", "bg_color": "rgba(234, 144, 0, 0.91)" },
        { "name": "Unreal Engine", "bg_color": "rgba(255, 17, 0, 0.91)" },
    ]
)





CreatePost(
    "Qual o melhor motor gráfico?????",
    "",
    "",
    randomNumber(0, 3600 * 5),
    [
        { "type": "p", "content": "Sou novo no mundo do desenvolvimento de jogos, por qual motor gráfico e linguagem de programação devo começar?" },
    ],
    [
        { "name": "Ajuda", "bg_color": "rgba(255, 0, 43, 0.91)" },
    ]
)

CreatePost(
    "Blueprints",
    "",
    "",
    randomNumber(0, 3600 * 5),
    [
        { "type": "p", "content": "O sistema blueprints é simplismente INCRÍVEL, com ele eu consegui criar um jogo que eu queria muito que existisse de forma muito facil!" },
    ],
    [
        { "name": "Feedback", "bg_color": "rgba(0, 94, 255, 0.91)" },
        { "name": "Opinião", "bg_color": "rgba(0, 197, 82, 0.91)" },
        { "name": "Depoimento", "bg_color": "rgba(234, 144, 0, 0.91)" },
        { "name": "Unreal Engine", "bg_color": "rgba(255, 17, 0, 0.91)" },
    ]
)