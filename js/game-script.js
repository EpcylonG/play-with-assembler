import { getMode, loadJson, modes, scoreBoard } from "./events.js";
import { getUserName } from "./variables.js";

//Audio
const bgAudio = new Audio('assets/audio/bg-music.wav');
const clickAudio = new Audio('assets/audio/click.wav');
const correctAudio = new Audio('assets/audio/correct.wav');
const wrongAudio = new Audio('assets/audio/wrong.wav');
const victoryAudio = new Audio('assets/audio/victory.wav');

let hasFlipped = false;
let firstCard, secondCard;
let lockBoard = false; //locking the board so you can't flip more than 2 cards at a time
let counter = 0;
let timeElapsed;
let playerTime;

export function assignColors(){
    const backFace = document.querySelectorAll('.back-face');
    for (let i = 0; i < backFace.length; i++) backFace[i].style.backgroundColor = backFace[i].parentElement.style.backgroundColor;
};

//Initial flip of the cards
export function showCards(cards) {
    shuffleCards(cards);
    setTimeout(()=>{
        cards.forEach(card => {
            card.classList.add('flip')
        });
    }, 1000);
    setTimeout(()=>{
        hideCards(cards);
    }, 6000);
}

// SHUFFLING THE cards + Immediately Invoked Function Expression
function shuffleCards(cards) {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 16);
        card.style.order = randomPosition;
    });
};

//Hiding the cards after 5s and starts the stopwatch
function hideCards(cards) {
    setTimeout(()=>{
        cards.forEach(card => {
            card.classList.remove('flip')
        });
    });
    timeElapsed = setInterval(setTime, 1000);
}

// Main function for flipping the cards
export function flipCard() {
    clickAudio.currentTime = 0;
    clickAudio.play();
    if (lockBoard) return; //if the board is locked, don't let another flip;
    if (this === firstCard) return; //avoid double click

    this.classList.add('flip');

    if (!hasFlipped) {
        // first click
        hasFlipped = true;
        firstCard = this;
        return;
    }
    // second click
    hasFlipped = false;
    secondCard = this;
    matchingFunction();
}

//Function that checks if the cards match
function matchingFunction() {
    // do cards match? if yes, remove flip event listener
    if (firstCard.dataset.color === secondCard.dataset.color) {
        correctAudio.currentTime = 0;
        correctAudio.play();
        disableFlip();
        counter+=2;
        if(counter === 16){
            gameRecap(); //end of the game
        }
    } else {
        flipBack()
        wrongAudio.currentTime = 0;
        wrongAudio.play();
    }
}

//Function that disables the flip if the cards match
function disableFlip() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard()
}

//Function that resets the main variables
export function resetBoard() {
    [hasFlipped, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//End of the game and final message display
function gameRecap() {
    playerTime = `${minutes.innerText}:${seconds.innerText}`;
    clearInterval(timeElapsed); //stops the timer
    setTimeout(recapMsg, 1000);
    victoryAudio.play();
}

//Function that flips the cards back because they don't match
function flipBack() {
    lockBoard = true;
    // give some time for seeing the event
    setTimeout(() => {
        //remove class flip so they can turn again
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard()
    }, 1250);
}

// Stopwatch
export let totalSeconds = 0;

export function setTime() {
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");
    seconds.textContent = pad(totalSeconds % 60);
    minutes.textContent = pad(parseInt(totalSeconds / 60));
    ++totalSeconds;
}

export function resetTime() { totalSeconds = 0; }

function pad(val) {
    let valString = val + "";
    if (valString.length < 2) return "0" + valString;
    else return valString;
}

// Final message with final time
function recapMsg() {
    const endOfGameMsg = document.createElement('p');
    endOfGameMsg.classList.add('final-msg');
    endOfGameMsg.innerHTML = `Great job! Your time is <b>${playerTime}</b>
    <button class='end-button'>Play Again</button>`;
    const main = document.querySelector('#game');
    main.appendChild(endOfGameMsg);
    const blurredBg = document.createElement('div');
    blurredBg.classList.add('bg-blur');
    endOfGameMsg.insertAdjacentElement('beforebegin', blurredBg);
    const playAgain = document.querySelector(".end-button");
    playAgain.addEventListener("click", modes);

    loadJson(function(response) {
        const player = {name: getUserName, time: playerTime};
        response.scores.push(JSON.parse(JSON.stringify(player)));
        localStorage.setItem(getMode(), JSON.stringify(response));
    }, getMode());

    scoreBoard();
    const scoreboard = document.getElementById("scoreboard");
    const userPlaying = document.querySelector(".playing");
    scoreboard.removeChild(userPlaying);
}


