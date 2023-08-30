'use strict';
//Player0 and Player1 background (class in section)
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//Global scores of Player 0 and Player 1 (class in score)
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');

//Playing scores that are continously changing until you hold
//both queryselector and get element id has same functionality
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

//using this diceEl to change dice images
const diceEl = document.querySelector('.dice');

//reacting to any button pressed
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
//starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  //we hide dice element , in css there already present a selector called hidden we just add it here
  diceEl.classList.add('hidden');
  //Intially they will be at 96 and 69 we will make them as 0 and even after game restarts we will turn them into 0
  score0El.textContent = 0;
  score1El.textContent = 0;

  //current scores set them to zero intially
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //intially it should be 0 as obvious
  currentScore = 0;
  // here the logic is simple if the dice = 1 and now active player has to change from 0 into 1 but for that we need a if else , so we ask if activeplayer is 0 then change it to 1 and give it back to active player and when player 2 loses we again need to give it back to one so in else case it is 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  ////toggling is nothing but when dice it's 1 then player get chnged so what happens there should be some toggling so we use this
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//What happens after i click roll button
btnRoll.addEventListener('click', function () {
  if (playing) {
    //generating a random dice number when clciked the button roll dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    //we remove the hidden class to display the image of dice
    diceEl.classList.remove('hidden');
    //but in upper part we don't get every image of the dice based on dice number so for that we have to dynamically create
    diceEl.src = `dice-${dice}.png`;

    //now we also generated image now logic part starts
    // logic here is simple if dice is 1 then switch to another player , but if not then update the current score in the given player
    if (dice !== 1) {
      currentScore = currentScore + dice;
      //after doing this we have to display it on current score element but dynamically
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score to global score

    scores[activePlayer] += currentScore;
    //for displaying it in global scores
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //if global score is greater than 100 player wins the game
    if (scores[activePlayer] >= 100) {
      //hide the dice
      playing = false;
      diceEl.classList.add('hidden');
      //here show the player has won
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      //here remove the active state of a player
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
