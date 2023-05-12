"use strict";

//Getting elements from HTML using DOM and storing them in variables
const player0El=document.querySelector(".player--0");
const player1El=document.querySelector(".player--1");
const score0El=document.getElementById("score--0")
const score1El=document.getElementById("score--1")
const diceEl=document.querySelector(".dice")
const btnRoll=document.querySelector(".btn--roll");
const btnNew=document.querySelector(".btn--new");
const btnHold=document.querySelector(".btn--hold");
const current0El=document.querySelector("#current--0");
const current1El=document.querySelector("#current--1");

let scores,currentScore,activePlayer,playing;
//Initializes our page with default settings for all elements
const init=function(){
    playing=true;
    currentScore=0;
    activePlayer=0;
    scores=[0,0];
    score0El.textContent=0;
    score1El.textContent=0;
    diceEl.classList.add("hidden");
    player0El.classList.remove(`player--winner`);
    player1El.classList.remove(`player--winner`);
    player0El.classList.add(`player--active`);
    current0El.textContent=0;
    current1El.textContent=0;
}
init();

//Toggles the active player between the two players
const switchPlayer=function(){
    document.getElementById(`current--${activePlayer}`).textContent=0;
    activePlayer=activePlayer===0?1:0;
    currentScore=0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
}

//Roll Dice functionality implementation
btnRoll.addEventListener("click",function(){
    if(playing){
        //generate a random number between 1-6
        const dice=Math.trunc(Math.random()*6)+1;
        //display dice
        diceEl.classList.remove("hidden");
        diceEl.src=`assets/Images/dice-${dice}.png`;
        //check for rolled value=1, if true switch to next player else add dice value to the current score
        if(dice!==1){
        //add dice to current score
        currentScore+=dice;
        document.getElementById(`current--${activePlayer}`).textContent=currentScore;
        }
        else{
        //switch player
        switchPlayer();
        }
    }
})

//Hold functionality implementation
btnHold.addEventListener("click",function(){
    if(playing){
    //Add current score to active player score
    scores[activePlayer]+=currentScore;
    document.getElementById(`score--${activePlayer}`).textContent=scores[activePlayer];
    //Check if player's score is already greater than 100
    //if true finish the game
    if(scores[activePlayer]>=100){
        playing=false;
        diceEl.classList.add("hidden");
        document.querySelector(`.player--${activePlayer}`).classList.add(`player--winner`);
        document.querySelector(`.player--${activePlayer}`).classList.remove(`player--active`);   
    }
    //else switch to other player
    else{
        switchPlayer();
    }
}
})

//New Game functionality implementation
btnNew.addEventListener("click",init);

