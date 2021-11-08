import * as variable from "./variables.js";

window.onload = () => {
    if(variable.getUserName != "") variable.userName.value = variable.getUserName;
}

export function readArray(){
    for(let i = 0; i < variable.scoreboardPage.length; i++){
        if(Array.isArray(variable.scoreboardPage[i])) readInsideArray(variable.scoreboardPage[i], variable.scoreboardPage[i-1]);
        else variable.body.appendChild(variable.scoreboardPage[i]);
    }
}

function readInsideArray(array, parent){
    for(let i = 0; i < array.length; i++){
        if(Array.isArray(array[i])) readInsideArray(array[i], array[i-1]);
        else parent.appendChild(array[i]);
    }
}