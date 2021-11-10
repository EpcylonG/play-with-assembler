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

export function createCard(array, mode){
    const cardContainer = document.querySelector(".card-container");
    let temp = newCard(array, cardContainer);
    for(let card = 1; card <= 8; card++){
        for(let i = 0; i < 2; i++){
            temp.dataset.color = "color-" + card;
            temp.style.backgroundColor = mode[card-1];
            cardContainer.appendChild(temp.cloneNode(true));
        }
    }
    cardContainer.removeChild(temp);
}

function newCard(array, parent){
    for(let i = 0; i < array.length; i++){
        if(Array.isArray(array[i])) readInsideArray(array[i], array[i-1]);
        else parent.appendChild(array[i]);
    }
    return array[0];
}
