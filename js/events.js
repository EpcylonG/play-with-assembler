import * as variable from "./variables.js";


variable.buttonNext.addEventListener("click", saveUserName);

function saveUserName(){
    //control no spaces in name
    if(variable.userName.value === ""){
        console.log("Introduce un nombre");
    } else {
        localStorage.setItem("userName", variable.userName.value);
    }
}