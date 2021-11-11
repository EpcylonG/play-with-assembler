import { getMode, modes, scoreBoard, times } from "./events.js";
import { userName } from "./variables.js";

//Audio
const gameOverAudio = new Audio('assets/audio/game-over.wav');
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
            counter = 0;
        }
    } else {
        flipBack()
        wrongAudio.currentTime = 0;
        wrongAudio.play();
        const gameModeText = document.querySelector('.game-mode');
        if (gameModeText.innerHTML === 'Hard') {
            clearInterval(timeElapsed); //stops the timer
            setTimeout(recapMsg(endMsgHardMode), 1000);
            gameOverAudio.play()
        }
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
    const endMsg = `Great job! Your time is <b>${playerTime}</b>
    <button class='end-button'>Play Again</button>`;
    clearInterval(timeElapsed); //stops the timer
    setTimeout(recapMsg(endMsg), 1000);
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
const endMsgHardMode = `<b>GAME OVER</b> <button class='end-button'>Play Again</button>`;

function recapMsg(msg) {
    const endOfGameMsg = document.createElement('p');
    endOfGameMsg.classList.add('final-msg');
    endOfGameMsg.innerHTML = msg;
    const main = document.querySelector('#game');
    main.appendChild(endOfGameMsg);
    const blurredBg = document.createElement('div');
    blurredBg.classList.add('bg-blur');
    endOfGameMsg.insertAdjacentElement('beforebegin', blurredBg);
    const playAgain = document.querySelector(".end-button");
    playAgain.addEventListener("click", modes);
    if(msg.includes("GAME OVER")) return;


    const player = {name: userName.value, time: playerTime};
    times.push(player);
    localStorage.setItem(getMode(), JSON.stringify(times));

    scoreBoard(true);
}


