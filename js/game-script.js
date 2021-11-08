const cards = document.querySelectorAll('.card');

let hasFlipped = false;
let firstCard, secondCard;
let lockBoard = false; //locking the board so you can't flip more than 2 cards at a time

function flipCard() {
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
function matchingFunction() {
    // do cards match? if yes, remove flip event listener
    if (firstCard.dataset.color === secondCard.dataset.color) {
        disableFlip()
    } else {
        flipBack()
    }
}
function disableFlip() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard()
}
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

cards.forEach(card => card.addEventListener('click', flipCard));