var playerWinCount = 0;
var paperImage = document.getElementById('playerPaper');
var rockImage = document.getElementById('playerRock');
var scissorImage = document.getElementById('playerScissors');
var startGameBtn = document.getElementById('startButton');
var seconds = 0;
var countdownTimer = 0;
var computerWinOrLoseChoice2 = 0;
var computerSelection2 = 0;
var playerPaperObject = document.getElementById('playerPaper');
var playerRockObject = document.getElementById('playerRock');
var playerScissorsObject = document.getElementById('playerScissors');
var paperObject = document.getElementById('cpuPaper');
var rockObject = document.getElementById('cpuRock');
var scissorObject = document.getElementById('cpuScissors');
var clickable = 1;
var highScore = 0;


//Adds an event listener on the start button that, when pressed, starts the game and sets default values for variables. Basically starting the game or
//restarting if the game has already been played. 
startGameBtn.addEventListener('click', function() {
	seconds = 60;
	document.getElementById("p").textContent = '';
	resetDefaults();
	clickable = 0;
	playerWinCount = 0;
	var computerSelection = randomComputerNumber();
	var computerWinOrLoseChoice = randomComputerAnswer();
	document.getElementById('playerScore').textContent = '';
	document.getElementById("playerScore").textContent += playerWinCount;
	computerWinOrLoseChoice2 = computerWinOrLoseChoice;
	computerSelection2 = computerSelection;
	showComMove(computerSelection);
	countdownTimer = setInterval('secondPassed()', 1000);
	setUpRound(computerWinOrLoseChoice);
    document.getElementById("startButton").disabled = 'disabled';
});


//This will run to play the game. 
function game(playerSelection){
	if (computerWinOrLoseChoice2 === 1){
		win(playerSelection);
	}
	else if (computerWinOrLoseChoice2 === 2){
		lose(playerSelection);
	}
	else {
		tie(playerSelection);
	}
};


paperImage.addEventListener('mouseover', function() {
	if (clickable === 1){
		paperImage.removeEventListener('mouseover', function(){})
	}
	else {
		playerPaperObject.setAttribute('id', 'imageHover');	
	}
});
paperImage.addEventListener('mouseout', function() {
	playerPaperObject.setAttribute('id', 'playerPaper');
});

rockImage.addEventListener('mouseover', function() {
	if (clickable === 1){
		rockImage.removeEventListener('mouseover', function(){})
	}
	else {
		playerRockObject.setAttribute('id', 'imageHover');	
	}
});
rockImage.addEventListener('mouseout', function() {
	playerRockObject.setAttribute('id', 'playerRock');
});

scissorImage.addEventListener('mouseover', function() {
	if (clickable === 1){
		scissorImage.removeEventListener('mouseover', function(){})
	}
	else {
		playerScissorsObject.setAttribute('id', 'imageHover');	
	}
});
scissorImage.addEventListener('mouseout', function() {
	playerScissorsObject.setAttribute('id', 'playerScissors');
});

//Adds a click option for the paper image. This assigns a value of 1 for the paper value, plays the game with the user value of paper, then resets defaults
//and keeps the game going for the next round. 
paperImage.addEventListener('click', function() {
	if (clickable === 1){
		paperImage.removeEventListener('click', function(){});
	}
	else {
	    game(1);
	    resetDefaults();
	    var computerSelection = randomComputerNumber();
	    var computerWinOrLoseChoice = randomComputerAnswer();
	    computerWinOrLoseChoice2 = computerWinOrLoseChoice;
	    computerSelection2 = computerSelection;
	    showComMove(computerSelection);
	    setUpRound(computerWinOrLoseChoice);
	}
});

//Adds a click option for the rock image. This assigns a value of 2 for the paper value, plays the game with the user value of rock, then resets defaults
//and keeps the game going for the next round.
rockImage.addEventListener('click', function() {
	if (clickable === 1){
		return;
	}
	else {
		game(2);
		resetDefaults();
		var computerSelection = randomComputerNumber();
		var computerWinOrLoseChoice = randomComputerAnswer();
		computerWinOrLoseChoice2 = computerWinOrLoseChoice;
		computerSelection2 = computerSelection;
		showComMove(computerSelection);
		setUpRound(computerWinOrLoseChoice);
	}
});

//Adds a click option for the scissors image. This assigns a value of 3 for the paper value, plays the game with the user value of scissors, then resets defaults
//and keeps the game going for the next round.
scissorImage.addEventListener('click', function() {
	if (clickable === 1){
		return;
	}
	else {
		game(3);
		resetDefaults();
		var computerSelection = randomComputerNumber();
		var computerWinOrLoseChoice = randomComputerAnswer();
		computerWinOrLoseChoice2 = computerWinOrLoseChoice;
		computerSelection2 = computerSelection;
		showComMove(computerSelection);
		setUpRound(computerWinOrLoseChoice);
	}
});

//This shows the move that the computer will play for the round, either paper, rock, or scissors. 
function showComMove(computerSelection) {
	var textBox = document.getElementById("p")
    textBox.textContent = '';
	if(computerSelection === 1){
		paperObject.setAttribute('id', 'show');
	}
	else if (computerSelection === 2) {
		rockObject.setAttribute('id', 'show');
	}
	else {
		scissorObject.setAttribute('id', 'show');
	}
}

//This is called if the point of the round is to try and tie the computer. 
function tie(playerSelection){
	document.getElementById("p").textContent = '';
	document.getElementById("p").textContent = "Tie!";
	if (playerSelection == computerSelection2){
		document.getElementById("p").textContent = 'Good job! You beat the computer! 1 point awarded';
		playerWinCount++;
		playerWins();
		setHighScore();
	}
	else{
		document.getElementById("p").textContent = 'You didn\'t tie the computer. Minus 2 points';
		if (playerWinCount - 2 < 0){
			playerWinCount = 0;
		}
		else {
			playerWinCount -=2;
		}
		playerWins();
	}
}

//This is called if the point of the round is to try and win against the computer. 
function win(playerSelection){
	document.getElementById("p").textContent = '';
	document.getElementById("p").textContent = 'Win!';
	if (playerSelection < computerSelection2 && playerSelection !== 3){
		document.getElementById("p").textContent = 'Good job! You beat the computer! 1 point awarded';
		playerWinCount++;
		playerWins();
		setHighScore();
	}
	else if (playerSelection === 3 && computerSelection2 === 1){
		document.getElementById("p").textContent = 'Good job! You beat the computer! 1 point awarded';
		playerWinCount++;
		playerWins();
		setHighScore();
	}
	else {
		document.getElementById("p").textContent = 'You didn\'t beat the computer. Minus 2 points';
		if (playerWinCount - 2 < 0){
			playerWinCount = 0;
		}
		else {
			playerWinCount -=2;
		}
		playerWins();
	}
}

//This is called if the point of the round is to try and lose against the computer. 
function lose(playerSelection) {
	document.getElementById("p").textContent = '';
	document.getElementById("p").textContent = 'Lose!';
	if (playerSelection > computerSelection2 && playerSelection !== 1){
		document.getElementById("p").textContent = 'Good job! You beat the computer! 1 point awarded';
		playerWinCount++;
		playerWins();
		setHighScore();
	}
	else if (playerSelection === 1 && computerSelection2 === 3){
		document.getElementById("p").textContent = 'Good job! You beat the computer! 1 point awarded';
		playerWinCount++;
		playerWins();
		setHighScore();
	}
	else {
		document.getElementById("p").textContent = 'You didn\'t beat the computer. Minus 2 points';
		if (playerWinCount - 2 < 0){
			playerWinCount = 0;
		}
		else {
			playerWinCount -=2;
		}
		playerWins();
	}
}

//My timer function, showing the timer countdown from 60 seconds. Displays a message showing the time is up and then disables the images from being clicked
function secondPassed() {
	document.getElementById('time').textContent = '';
    document.getElementById('time').textContent += seconds;
    if (seconds == 0) {
        clearInterval(countdownTimer);
        document.getElementById('time').textContent = "Time's Up!";
		clickable = 1;
		document.getElementById("startButton").disabled = false;
    } else {
        seconds--;
    }
}

//Resets attributes of the three objects (paper, rock, and scissors) for the id tag
function resetDefaults(){
	paperObject.setAttribute('id', 'cpuPaper');
	rockObject.setAttribute('id', 'cpuRock');
	scissorObject.setAttribute('id', 'cpuScissors');
}

//Sets up information on the round, showing the user if they are supposed to try and win, lose, or tie the computer
function setUpRound(computerWinOrLoseChoice){
	if (computerWinOrLoseChoice === 1){
      document.getElementById("p").textContent = '';
	  document.getElementById("p").textContent = 'Win!';
	}
	else if (computerWinOrLoseChoice === 2){
      document.getElementById("p").textContent = '';
	  document.getElementById("p").textContent = 'Lose!';
	}
	else {
	  document.getElementById("p").textContent = '';
	  document.getElementById("p").textContent = "Tie!";
	}
}

//Creates a random number for the computer to use whether it is a win, lose, or tie round
function randomComputerNumber () {
	return Math.floor((Math.random() * 3) + 1);
}

//Creates a random number for the computer to use whether the computer has chosen rock, paper, or scissors
function randomComputerAnswer () {
	return Math.floor((Math.random() * 3) + 1);
}

function playerWins() {
	document.getElementById('playerScore').textContent = '';
	document.getElementById("playerScore").textContent += playerWinCount;
}

function setHighScore (){
	if (playerWinCount > highScore){
		highScore = playerWinCount;
		document.getElementById('cpuScore').textContent = '';
		document.getElementById('cpuScore').textContent += highScore;
	}
}