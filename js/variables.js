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
                          [
                           element("a", null, "link-btn"),
                           [
                            element("div", null, "circle"),
                            element("div", null, "btn-next"),
                            [
                             element("span", null, "btn-main-text"),
                             element("span", null, "btn-secondary-text")
                            ]
                           ]
                          ],
                          element("div", "hard-mode", "mode-btn"),
                          [
                           element("a", null, "link-btn"),
                            [
                             element("div", null, "circle"),
                             element("div", null, "btn-next"),
                             [
                             element("span", null, "btn-main-text"),
                             element("span", null, "btn-secondary-text")
                             ]
                            ]
                          ],
                          element("div", "impossible-mode", "mode-btn"),
                          [
                           element("a", null, "link-btn"),
                            [
                             element("div", null, "circle"),
                             element("div", null, "btn-next"),
                             [
                              element("span", null, "btn-main-text"),
                              element("span", null, "btn-secondary-text")
                             ]
                            ]
                          ]
                        ];

export const gamePage = [element("main", "game"),
                          [
                           element("section", null, "stopwatch"),
                           [
                            element("label", "minutes"),
                            element("label", "seconds")
                           ],
                           element("section", null, "card-container"),
                           [
                            element("div", null, "card", "color-1"),
                             [
                              element("div", null, "back-face"),
                              element("div", null, "front-face"),
                              [element("img", null, "img-card")]
                             ],
                            element("div", null, "card", "color-1"),
                             [
                              element("div", null, "back-face"),
                              element("div", null, "front-face"),
                              [element("img", null, "img-card")]
                             ],
                             element("div", null, "card", "color-2"),
                             [
                              element("div", null, "back-face"),
                              element("div", null, "front-face"),
                              [element("img", null, "img-card")]
                             ],
                             element("div", null, "card", "color-2"),
                             [
                              element("div", null, "back-face"),
                              element("div", null, "front-face"),
                              [element("img", null, "img-card")]
                             ],
                             element("div", null, "card", "color-3"),
                             [
                              element("div", null, "back-face"),
                              element("div", null, "front-face"),
                              [element("img", null, "img-card")]
                             ],
                             element("div", null, "card", "color-3"),
                             [
                              element("div", null, "back-face"),
                              element("div", null, "front-face"),
                              [element("img", null, "img-card")]
                             ],
                             element("div", null, "card", "color-4"),
                             [
                              element("div", null, "back-face"),
                              element("div", null, "front-face"),
                              [element("img", null, "img-card")]
                             ],
                             element("div", null, "card", "color-4"),
                             [
                              element("div", null, "back-face"),
                              element("div", null, "front-face"),
                              [element("img", null, "img-card")]
                             ],
                             element("div", null, "card", "color-5"),
                             [
                              element("div", null, "back-face"),
                              element("div", null, "front-face"),
                              [element("img", null, "img-card")]
                             ],
                             element("div", null, "card", "color-5"),
                             [
                              element("div", null, "back-face"),
                              element("div", null, "front-face"),
                              [element("img", null, "img-card")]
                             ],
                             element("div", null, "card", "color-6"),
                             [
                              element("div", null, "back-face"),
                              element("div", null, "front-face"),
                              [element("img", null, "img-card")]
                             ],
                             element("div", null, "card", "color-6"),
                             [
                              element("div", null, "back-face"),
                              element("div", null, "front-face"),
                              [element("img", null, "img-card")]
                             ],
                             element("div", null, "card", "color-7"),
                             [
                              element("div", null, "back-face"),
                              element("div", null, "front-face"),
                              [element("img", null, "img-card")]
                             ],
                             element("div", null, "card", "color-7"),
                             [
                              element("div", null, "back-face"),
                              element("div", null, "front-face"),
                              [element("img", null, "img-card")]
                             ],
                             element("div", null, "card", "color-8"),
                             [
                              element("div", null, "back-face"),
                              element("div", null, "front-face"),
                              [element("img", null, "img-card")]
                             ],
                             element("div", null, "card", "color-8"),
                             [
                              element("div", null, "back-face"),
                              element("div", null, "front-face"),
                              [element("img", null, "img-card")]
                             ]
                           ]
                          ]
                        ];

function element(type, elemId, elemClass, dataColor){
    const element = document.createElement(type);
    if(elemId != null) element.setAttribute("id", elemId);
    if(elemClass != null) element.setAttribute("class", elemClass);
    if(dataColor != null) element.setAttribute("data-color", dataColor);
    return element;
}


// Color arrays
export const easyMode = ['#4DBCB6', '#F1693C', '#0B6D79', '#FEC232','#E5E5E5', '#454545', '#FAB11E', '#000000'];
export const impossibleMode = ['#F9CDC3', '#FACBC0', '#FAC9BE', '#FBC7BB', '#FBC4B8', '#FCC2B5', '#FCC0B3', '#FDBEB0'];