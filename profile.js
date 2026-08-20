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

export function getRandomPFP() {
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

export function getRandomUserName() {
    let first = randomFromArray(MainNames); let sec = randomFromArray(SecNames)
    let num = 1000 + randomNumber(0, 8999)

    let formated = first + "-" + sec + "-" + num

    return formated
}


//Set
document.getElementById("main_profile_pfp").src = pfps_dir + "orange (1).png"