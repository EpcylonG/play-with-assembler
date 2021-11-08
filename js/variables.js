export const body = document.getElementById("body-container");
export const userName = document.getElementById("user-name");
export const getUserName = localStorage.getItem("userName");
export const buttonNext = document.getElementById("button-next");
export const scoreboardPage = [element("div", null, "header"),
                               element("p", "scoreboard-text", "scoreboard-text"),
                               element("div", "scoreboard"),
                               element("div", null, "scoreboard-button"),
                               [element("button", "scoreboard-next")]
                             ];

function element(type, elemId, elemClass){
    const element = document.createElement(type);
    if(elemId != null) element.setAttribute("id", elemId);
    if(elemClass != null) element.setAttribute("class", elemClass);
    return element;
}
