export const body = document.getElementById("body-container");
export const userName = document.getElementById("user-name");
export const getUserName = localStorage.getItem("userName");
export const buttonNext = document.getElementById("button-next");
export const scoreboardPage = [element("div", null, "header"),
                               [
                                element("p", null, "memoryText"),
                                element("p", null, "userName")
                               ],
                               element("p", "scoreboard-text", "scoreboard-text"),
                               element("div", "scoreboard"),
                               element("div", null, "scoreboard-button"),
                               [element("button", "scoreboard-next")]
                             ];

export const modePage = [element("section", null, "modes-screen"),
                               element("p", null, "text-center"),
                               element("div", "easy-mode", "mode-btn"),
                               [element("a", null, "link-btn"),
                                [element("div", null, "circle"),
                                 element("div", null, "btn-next"),
                                 [element("span", null, "btn-main-text"),
                                  element("span", null, "btn-secondary-text")]
                                ]
                               ],
                               element("div", "hard-mode", "mode-btn"),
                               [element("a", null, "link-btn"),
                                 [element("div", null, "circle"),
                                 element("div", null, "btn-next"),
                                 [element("span", null, "btn-main-text"),
                                  element("span", null, "btn-secondary-text")]
                                ]
                               ],
                               element("div", "impossible-mode", "mode-btn"),
                               [element("a", null, "link-btn"),
                                 [element("div", null, "circle"),
                                 element("div", null, "btn-next"),
                                 [element("span", null, "btn-main-text"),
                                  element("span", null, "btn-secondary-text")]
                                ]
                               ]
                             ];

function element(type, elemId, elemClass){
    const element = document.createElement(type);
    if(elemId != null) element.setAttribute("id", elemId);
    if(elemClass != null) element.setAttribute("class", elemClass);
    return element;
}