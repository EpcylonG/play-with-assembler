const cards = document.querySelectorAll('.card');
const backFace = document.querySelectorAll('.back-face');
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

// Color arrays
let easyMode = ['#4DBCB6', '#4DBCB6', '#F1693C', '#F1693C', '#0B6D79', '#0B6D79', '#FEC232', '#FEC232', '#E5E5E5', '#E5E5E5', '#454545', '#454545', '#FAB11E', '#FAB11E', '#000000', '#000000'];
let impossibleMode = ['#F9CDC3', '#F9CDC3', '#FACBC0', '#FACBC0', '#FAC9BE', '#FAC9BE', '#FBC7BB', '#FBC7BB', '#FBC4B8', '#FBC4B8', '#FCC2B5', '#FCC2B5', '#FCC0B3', '#FCC0B3', '#FDBEB0', '#FDBEB0'];

window.onload = assignColors(easyMode);

function assignColors(mode){
    for (let i=0; i<backFace.length; i++){
        backFace[i].style.backgroundColor = mode[i];
    }
};

setTimeout(showCards, 1000);

//Initial flip of the cards
function showCards() {
    setTimeout(()=>{
        cards.forEach(card => {
            card.classList.add('flip')
        });
    }, 1000);
}

//Hiding the cards after 5s and starts the stopwatch
function hideCards() {
    cards.forEach(card => {
        card.classList.remove('flip')
    });
    timeElapsed = setInterval(setTime, 1000);
}
setTimeout(hideCards, 5000);

//End of the game and final message display
function gameRecap() {
    playerTime = `${minutes.innerText}:${seconds.innerText}`;
    clearInterval(timeElapsed); //stops the timer
    setTimeout(recapMsg, 1000);
    victoryAudio.play();
}

// Main function for flipping the cards
function flipCard() {
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
//Function that resets the main variables
function resetBoard() {
    [hasFlipped, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// SHUFFLING THE cards + Immediately Invoked Function Expression
(function shuffleCards() {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 16);
        card.style.order = randomPosition;
    });
})();

// Stopwatch

const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
let totalSeconds = 0;

function setTime() {
    ++totalSeconds;
    seconds.innerHTML = pad(totalSeconds % 60);
    minutes.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    let valString = val + "";
    if (valString.length < 2) {
    return "0" + valString;
    } else {
    return valString;
    }
}

// Final message with final time
function recapMsg() {
    const endOfGameMsg = document.createElement('p');
    endOfGameMsg.classList.add('final-msg');
    endOfGameMsg.innerHTML = `Great job! Your time is <b>${playerTime}</b>
    <button class='end-button'>Play Again</button> <button class='end-button'>View Leaderboard</button>`;
    const main = document.querySelector('#game');
    main.appendChild(endOfGameMsg);
    const blurredBg = document.createElement('div');
    blurredBg.classList.add('bg-blur');
    endOfGameMsg.insertAdjacentElement('beforebegin', blurredBg);
}


cards.forEach(card => card.addEventListener('click', flipCard));

