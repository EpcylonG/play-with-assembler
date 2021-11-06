import * as variable from "./variables.js";

window.onload = () => {
    if(variable.getUserName != "") variable.userName.value = variable.getUserName;
}