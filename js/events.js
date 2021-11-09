import * as variable from "./variables.js";
import { readArray } from "./windows.js";

variable.buttonNext.addEventListener("click", saveUserName);

function saveUserName(){
    //control no spaces in name
    if(variable.userName.value === ""){
        console.log("Introduce un nombre");
    } else {
        localStorage.setItem("userName", variable.userName.value);
        modes();
    }
}

function modes(){
    variable.body.innerHTML = "";
    variable.body.classList.add("body-center");
    readArray(variable.modePage);
    const modesText = document.querySelector(".text-center");
    modesText.textContent = "Scoreboard";
    
    const btnText = document.querySelectorAll(".btn-main-text");
    btnText[0].textContent = "Easy Mode";
    btnText[1].textContent = "Hard Mode";
    btnText[2].textContent = "Impossible Mode";
    
    const btnSecondatyText = document.querySelectorAll(".btn-secondary-text");
    btnSecondatyText[0].textContent = "Complete the game as fast as possible";
    btnSecondatyText[1].textContent = "Complete the game without an error";
    btnSecondatyText[2].textContent = "Complete the game with 3 life";

    const modeBtn = document.querySelectorAll(".mode-btn");
    modeBtn[0].addEventListener("click", playGame);
    /*modeBtn[0].addEventListener("click", scoreBoard);
    modeBtn[1].addEventListener("click", scoreBoard);
    modeBtn[2].addEventListener("click", scoreBoard);*/
}

function playGame(){
    variable.body.innerHTML = "";
    variable.body.classList.remove("body-center");
}

function scoreBoard(mode){
    variable.body.innerHTML = "";
    variable.body.classList.remove("body-center");
    readArray(variable.scoreboardPage);

    const memoryText = document.querySelector(".memoryText");
    memoryText.textContent = "Memory";
    
    const userName = document.querySelector(".userName");
    userName.textContent = variable.userName.value;
    
    const scoreboardText = document.getElementById("scoreboard-text");
    scoreboardText.textContent = "Scoreboard";

    const scoreBoard = document.getElementById("scoreboard");
    scoreBoard.innerHTML = "";
    const times = [];
    loadJson(function(response) {
        for(let player of response.scores) times.push(player);
        times.sort(sortByProperty("time"));
        
        for(let i = 0; i < times.length; i++){
            if(i >= 5) return;
            const playerElement = document.createElement("p");
            playerElement.className = "player";
            if(i === 0) {
                playerElement.classList.add("leader");
                const leaderIcon = document.createElement("img");
                leaderIcon.src = "./assets/icons/leader.png";
                leaderIcon.width = 50;
                const leaderP = document.createElement("p");
                leaderP.className = "leaderP";
                leaderP.textContent = (i+1) + ". " + times[i].name + " " + times[i].time + "s";
                playerElement.appendChild(leaderIcon);
                playerElement.appendChild(leaderP);
            } else {
                playerElement.textContent = (i+1) + ". " + times[i].name + " " + times[i].time + "s";
            }
            scoreBoard.appendChild(playerElement);
        }
    }, mode.target.id);

    const scoreboardNext = document.getElementById("scoreboard-next");
    scoreboardNext.textContent = "Select Mode";
    scoreboardNext.addEventListener("click", modes);
}

function loadJson(callback, mode){
    var json = new XMLHttpRequest();
    json.overrideMimeType("application/json");
    json.open('GET', 'json/' + mode + '.json', true);
    json.onreadystatechange = function () {
      if (json.readyState == 4 && json.status == "200") {
        callback(JSON.parse(json.response));
      }
    };
    json.send(null); 
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