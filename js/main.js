let order = [], //Keep the track of the order of the light that will flash
    playerOrder = [],   //order of light pressed by player
    flash,  //type:int  Number of flashes appeared in game
    turn, //Keep track of turn going on
    good,   //type:boolean //Whether player had hit all the right colors or not
    compTurn, //type:boolean //Whether players turn or computers turn
    intervalId,
    strict = false, //Strict mode is on or not
    noise = true,   //for playing noise/sound
    on = false,     //Power button is ON or NOT
    win;    //whether player has won the game or not

const turnCounter = document.querySelector('#turn');
const topLeft = document.querySelector('#topleft');
const topRight = document.querySelector('#topright');
const bottomLeft = document.querySelector('#bottomleft');
const bottomRight = document.querySelector('#bottomright');
const strictButton = document.querySelector('#strict');
const onButton = document.querySelector('#on');
const startButton = document.querySelector('#start');

strictButton.addEventListener('click', (event) => {
    if(strictButton.checked == true){
        strict = true;
        // console.log("checked");
    } else {
        strict = false;
        // console.log("Unchecked");
    }
})

onButton.addEventListener('click', (event)=> {
    if(onButton.checked == true){
        on = true;
        turnCounter.innerHTML = "--";
    }else {
        on = false;
        turnCounter.innerHTML = "";
        clearColor();
        clearInterval(intervalId);
    }
});

startButton.addEventListener('click', (event) => {
    if(on || win){
        play();
    }
});

function play() {
    order = [];     //To begin new game empty the array
    win = false;    //In the start of the game the player is not winner so win=false
    playerOrder = [];   //As player starting the game so player's move array is empty
    flash = 0;      //New game and flash yet
    intervalId = 0;     //First chance so intervalId is 0
    turn = 1;       //Starting the new game hence first turn
    turnCounter.innerHTML = 1;      //Print turn on web
    good = true;    //Starting the game so till now all good

    //Fill order[] with 20 random values between 1 and 4
    for(let i =0; i < 20; i++){
        order.push(Math.floor(Math.random() * 4)+ 1);
    }
    // console.log(order);
    compTurn = true;       //The game starts with computer playing first

    intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
    on = false;        //Player cannot click color's while computer is playing

    //This condition says that computer's turn is over i.e, number of times light flashed is equal to no of turn going on
    if(flash == turn){
        clearInterval(intervalId);
        compTurn = false;   //Computer turn over
        clearColor();
        on = true;      //Computer's turn is over and it passes the turn to player and enables it to play the game
    }

    if(compTurn){
        clearColor();
        setTimeout(() => {
            if(order[flash] == 1) one();
            if(order[flash] == 2) two();
            if(order[flash] == 3) three();
            if(order[flash] == 4) four();
            flash++;
        }, 300);
    }
}

function one() {
    if(noise) {
        let audio = document.getElementById('clip1');
        audio.play();
    }
    noise = true;
    topLeft.style.backgroundColor = 'lightgreen';
}


function two() {
    if(noise) {
        let audio = document.getElementById('clip2');
        audio.play();
    }
    noise = true;
    topRight.style.backgroundColor = 'tomato';
}


function three() {
    if(noise) {
        let audio = document.getElementById('clip3');
        audio.play();
    }
    noise = true;
    bottomLeft.style.backgroundColor = 'yellow';
}


function four() {
    if(noise) {
        let audio = document.getElementById('clip4');
        audio.play();
    }
    noise = true;
    bottomRight.style.backgroundColor = 'lightskyblue';
}

function clearColor() {
    topLeft.style.backgroundColor = 'darkgreen';
    topRight.style.backgroundColor = 'darkred';
    bottomLeft.style.backgroundColor = 'goldenrod';
    bottomRight.style.backgroundColor = 'blue';
}

topLeft.addEventListener('click', () => {
    if(on) {
        playerOrder.push(1);
        check();
        one();
        if(!win){
            setTimeout( () => {
                clearColor();
            }, 200);
        }
    }
});

topRight.addEventListener('click', () => {
    if(on){
        playerOrder.push(2);
        check();
        two();

        if(!win){
            setTimeout( () => {
                clearColor();
            }), 200;
        }
    }
});

bottomLeft.addEventListener('click', () => {
    if(on){
        playerOrder.push(3);
        check();
        three();

        if(!win){
            setTimeout( () => {
                clearColor();
            }), 200;
        }
    }
});

bottomRight.addEventListener('click', () => {
    if(on){
        playerOrder.push(4);
        check();
        four();

        if(!win){
            setTimeout( () => {
                clearColor();
            }), 200;
        }
    }
});

function check(){
    if(playerOrder[playerOrder.length -1] !== order[playerOrder.length -1] )
        good = false;   //If the players color does not match with computer's color then good = false

    if(playerOrder.length == 20 && good) {
        winGame();
    }

    if(good == false) {
        flashColor();
        turnCounter.innerHTML = "NO!";
        setTimeout ( () => {
            turnCounter.innerHTML = turn;
            clearColor();

            if(strict) {
                play();
            }else {
                compTurn = true;
                flash = 0;
                playerOrder = [];
                good = true;
                intervalId = setInterval(gameTurn, 800);
            }
        }, 800);

        noise = false;
    }

    if(turn == playerOrder.length && good && !win) {
        turn++;
        playerOrder = [];
        compTurn = true;
        flash = 0;
        turnCounter.innerHTML = turn;
        intervalId = setInterval(gameTurn, 800);

    }
}

function flashColor() {
    topLeft.style.backgroundColor = 'ligtgreen';
    topRight.style.backgroundColor = 'tomato';
    bottomLeft.style.backgroundColor = 'yellow';
    bottomRight.style.backgroundColor = 'lightskyblue';
}

function winGame (){
    flashColor();
    turnCounter.innerHTML = "WIN!";
    on = false;
    win = true;
}