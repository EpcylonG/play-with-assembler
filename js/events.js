import * as variable from "./variables.js";
import { readArray, createCard } from "./windows.js";
import { assignColors, flipCard, resetBoard, showCards, setTime, resetTime } from "./game-script.js";

variable.buttonNext.addEventListener("click", saveUserName);

function saveUserName(){
    let gameAudio = new Audio('assets/audio/bg-music.wav');
    gameAudio.volume = 0.1;
    // gameAudio.play();
    //control no spaces in name
    if(variable.userName.value === ""){
        console.log("Introduce un nombre");
    } else {
        localStorage.setItem("userName", variable.userName.value);
        modes();
    }
}

export function modes(){
    variable.body.innerHTML = "";
    variable.body.classList.remove("body-game");
    variable.body.classList.add("body-center");
    readArray(variable.modePage);
    const modesText = document.querySelector(".text-center");
    modesText.textContent = "Start by selecting the mode that you´d like to play:";
    
    const btnText = document.querySelectorAll(".btn-main-text");
    btnText[0].textContent = "Easy Mode";
    btnText[1].textContent = "Hard Mode";
    btnText[2].textContent = "Impossible Mode";
    
    const btnSecondatyText = document.querySelectorAll(".btn-secondary-text");
    btnSecondatyText[0].textContent = "Complete the game as fast as possible";
    btnSecondatyText[1].textContent = "Complete the game without an error";
    btnSecondatyText[2].textContent = "Complete the game with 3 lives";

    const modeBtn = document.querySelectorAll(".mode-btn");
    modeBtn[0].addEventListener("click", playGame);
    modeBtn[1].addEventListener("click", playGame);
    modeBtn[2].addEventListener("click", playGame);
}

const gameModeText = document.createElement('span');
gameModeText.classList.add("game-mode");
const countdownAudio = new Audio('assets/audio/countdown.wav')

function playGame(e){
    setMode(e.target.id);
    setTimeout(()=> {
        countdownAudio.volume = 0.1;
        countdownAudio.play();
    }, 3000);
    variable.body.innerHTML = "";
    variable.body.classList.remove("body-center");
    variable.body.classList.add("body-game");
    header();
    readArray(variable.gamePage);
    scoreBoard();
    const cardContainer = document.querySelector(".card-container");
    if(cardContainer.innerHTML != ""){
        cardContainer.innerHTML = "";
        clearGame();
    }
    if(e.target.id === "impossible-mode") {
        createCard(variable.card, variable.impossibleMode);
        assignColors();
        gameModeText.innerHTML = 'Impossible';
        const main = document.querySelector('#game');
        main.appendChild(gameModeText);
    } else if(e.target.id === "hard-mode") {
        createCard(variable.card, variable.easyMode);
        assignColors();
        gameModeText.innerHTML = 'Hard';
        const main = document.querySelector('#game');
        main.appendChild(gameModeText);
    } else if(e.target.id === "easy-mode") {
        createCard(variable.card, variable.easyMode);
        assignColors();
        gameModeText.innerHTML = 'Easy';
        const main = document.querySelector('#game');
        main.appendChild(gameModeText);
    }
    const imgCard = document.querySelectorAll(".img-card");
    for(let img of imgCard) img.src = "assets/memory-logo2.png";
    const separator = document.getElementById(":");
    separator.textContent = ":";
    game();   
}

function game(){
    const cards = document.querySelectorAll('.card');
    resetBoard();
    showCards(cards);
    setTime();
    setTimeout(()=>{
        cards.forEach(card => {
            card.addEventListener("click", flipCard);
        });
    }, 6500);
}

function header(){
    readArray(variable.header);
    const memoryText = document.querySelector(".memoryText");
    memoryText.innerHTML = '<img src="assets/memory-logo.png" style="width: 30%">';
    const userName = document.querySelector(".userName");
    userName.textContent = variable.userName.value;
}

export function scoreBoard(){
    readArray(variable.leaderBoard);
    
    const scoreboardText = document.getElementById("scoreboard-text");
    scoreboardText.textContent = "Scoreboard";

    const scoreBoard = document.getElementById("scoreboard");
    scoreBoard.innerHTML = "";
    const times = [];
    loadJson(function(response) {
        for(let player of response.scores) times.push(player);
        times.sort(sortByProperty("time"));
        
        for(let i = 0; i < times.length; i++){
            if(i >= 5) {
                addUserPlaying();
                return;
            }
            const playerElement = document.createElement("p");
            playerElement.className = "player";
            if(i === 0) {
                playerElement.classList.add("leader");
                const leaderIcon = document.createElement("img");
                leaderIcon.src = "./assets/icons/leader.png";
                leaderIcon.width = 50;
                const leaderP = document.createElement("p");
                leaderP.className = "leaderP";
                leaderP.innerHTML = `<p id='position'>${i+1}.</p><p id='name'>${times[i].name}</p> <p id='time'>${times[i].time}</p>`;
                // leaderP.textContent = (i+1) + ". " + times[i].name + " " + times[i].time;
                // playerElement.appendChild(leaderIcon);
                playerElement.appendChild(leaderP);
            } else playerElement.innerHTML = `<p id='position'>${i+1}.</p> <p id='name'>${times[i].name}</p> <p id='time'>${times[i].time}</p>`;
            scoreBoard.appendChild(playerElement);
            if(i === times.length-1) addUserPlaying();
        }
    });
}

function addUserPlaying(){
    const userPlaying = document.getElementById("scoreboard");
    const player = document.createElement("p");
    player.className = "player playing";
    // player.textContent = variable.userName.value + " is playing now";
    player.innerHTML = `<p id='position'>???</p> <p id='name'>${variable.userName.value}</p> <p id='time'>Playing</p>`
    userPlaying.appendChild(player);
}

export function loadJson(callback){
    if(JSON.parse(localStorage.getItem(getMode())) === null){
        var json = new XMLHttpRequest();
        json.overrideMimeType("application/json");
        json.open('GET', 'json/' + getMode() + '.json', true);
        json.onreadystatechange = function () {
            if (json.readyState == 4 && json.status == "200") callback(JSON.parse(json.response));
        };
        json.send(null); 
    } else {
        callback(JSON.parse(localStorage.getItem(getMode())));
    }
}

function sortByProperty(property){  
    return function(a,b){  
       if(a[property] > b[property])  
          return 1;  
       else if(a[property] < b[property])  
          return -1;  
       return 0;  
    }  
}

 function clearGame(){
    const main = document.querySelector('#game');
    const blur = document.querySelector('.bg-blur');
    const msg = document.querySelector('.final-msg');
    main.removeChild(blur);
    main.removeChild(msg);
    //for(let i = 0; i < 2; i++) main.removeChild(main.childNodes[0]);
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.remove("flip");
    });
    resetTime();
}

let gameMode;
function setMode(e) { gameMode = e; }
export function getMode() { return gameMode; }

function nothing() {
    return;
}