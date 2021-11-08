import * as variable from "./variables.js";
import { readArray } from "./windows.js";

variable.buttonNext.addEventListener("click", saveUserName);

function saveUserName(){
    //control no spaces in name
    if(variable.userName.value === ""){
        console.log("Introduce un nombre");
    } else {
        localStorage.setItem("userName", variable.userName.value);
        variable.body.innerHTML = "";
        variable.body.classList.remove("body-center");
        readArray();
        scoreBoard();
    }
}

function scoreBoard(){
    const scoreboardText = document.getElementById("scoreboard-text");
    scoreboardText.textContent = "Scoreboard";

    const scoreboard = document.getElementById("scoreboard");
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
                console.log(leaderP);
                playerElement.appendChild(leaderP);
            } else {
                playerElement.textContent = (i+1) + ". " + times[i].name + " " + times[i].time + "s";
            }
            scoreboard.appendChild(playerElement);
        }
    });

    const scoreboardNext = document.getElementById("scoreboard-next");
    scoreboardNext.textContent = "Start";
}

function loadJson(callback){
    var json = new XMLHttpRequest();
    json.overrideMimeType("application/json");
    json.open('GET', 'json/scoreboard.json', true);
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