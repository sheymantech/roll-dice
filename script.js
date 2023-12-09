"use strict";

/*---------project 001----------*/

//----------------------project 002

const score1El = document.getElementById("score-0");
const score2El = document.getElementById("score-1");
const dice5El = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn-c-2");
const btnNewGame = document.querySelector(".btn-c-1");
const btnHold = document.querySelector(".btn-c-3");
const currentScoreB1 = document.getElementById("current-score-0");
const currentScoreB2 = document.getElementById("current-score-1");

score1El.textContent = 0;
score2El.textContent = 0;
dice5El.classList.add("hidden");

let totalScore = [0, 0];
let currentScore = 0;
let activePlayer = 0;

let playing = true;
function switchFunction() {
  document.getElementById(`current-score-${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  bgChange.classList.remove("main1");
  bgChange.classList.add("change-player-bg");
}

//rolling dice implementation

btnRoll.addEventListener("click", function () {
  if (playing) {
    //generating a random dice roll
    let dice = Math.trunc(Math.random() * 6) + 1;
    //check for roll dice
    dice5El.classList.remove("hidden");

    dice5El.src = `images/dice-${dice}.png`;
    const bgChange = document.querySelector(".main-wrapper");

    //check for roll 1: if true,switch to next player
    if (dice !== 1) {
      currentScore = currentScore + dice;
      document.getElementById(`current-score-${activePlayer}`).textContent =
        currentScore;
      bgChange.classList.add("main1");
      bgChange.classList.remove("change-player-bg");
    } else {
      switchFunction();
    }
  }
});

///adding bg to active player
const bgChange = document.querySelector(".main-wrapper");
//hold button
btnHold.addEventListener("click", function () {
  if (playing) {
    //1. add score to tghe score of the active player
    //--thesame thing with the down---totalScore[0] = totalScore[0] + currentScore;
    totalScore[activePlayer] += currentScore;
    document.getElementById(`score-${activePlayer}`).textContent =
      totalScore[activePlayer];
    if (totalScore[activePlayer] >= 20) {
      playing = false;
      dice5El.classList.add("hidden");
      bgChange.classList.remove("main1");
      bgChange.classList.remove("change-player-bg");
      bgChange.classList.add("player-win");
    } else {
      switchFunction();
    }
  }

  //check if player winsi
});
function resetGame() {
  playing = true;
  if (playing) {
    dice5El.classList.add("hidden");
    bgChange.classList.add("main1");
    bgChange.classList.remove("change-player-bg");
    bgChange.classList.remove("player-win");
  }
}
////reseting the game
btnNewGame.addEventListener("click", function () {
  dice5El.classList.add("hidden");
  currentScore = 0;
  document.getElementById(`current-score-${activePlayer}`).textContent =
    currentScore;
  totalScore[0] = 0;
  document.getElementById(`score-0`).textContent = totalScore[0];
  totalScore[1] = 0;
  document.getElementById(`score-1`).textContent = totalScore[1];
  resetGame();
});
