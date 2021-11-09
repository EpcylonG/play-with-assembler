import * as variable from "./variables.js";

window.onload = () => {
    if(variable.getUserName != "") variable.userName.value = variable.getUserName;
}

export function readArray(array){
    for(let i = 0; i < array.length; i++){
        if(Array.isArray(array[i])) readInsideArray(array[i], array[i-1]);
        else variable.body.appendChild(array[i]);
    }
}

function readInsideArray(array, parent){
    for(let i = 0; i < array.length; i++){
        if(Array.isArray(array[i])) readInsideArray(array[i], array[i-1]);
        else parent.appendChild(array[i]);
    }
}