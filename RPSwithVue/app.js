new Vue({
  el: '#app',
  data: {
      //These three data sets are toggled based on what button the user selects (Paper, Rock, or Scissors)
      playerPaper: false,
	  playerRock: false,
	  playerScissors: false,
      //These three data sets are toggled based on what the computer has selected (Paper, Rock, or Scissors)
      computerRock: false,
      computerPaper: false,
      computerScissors: false,
      //argument variable being passed in from UI, has value of 1, 2, or 3 based on selection
      playerSelect: 0,
      //argument variable for computer selection to check between Rock, Paper, or Scissors
      comSelection: 0,
      //Value that gets changed on if it is a win, lose, or tie turn
      turnSelection: 0,
      // global variable for selection used to know which computer selections were used
      selection: 0,
      //Holds player score count, displays in the progress bar and increases with each win
	  playerScore: 0,
      //Holds computer score count, displays in the progress bar and increases with each win
	  highScore: 0,
      // Value that gets toggled based on the start button being click, toggles the start of the game and
      // hides the start button while bringing up the game buttons
      startButtonClick: true,
      // Integer that holds the number of player turn wins, displayed as a number in the progress bar
      playerWinCount: 0,
      // Messages array that holds each message that is displayed in the game bar for the outcome of each turn
      messages: [],
      //These 3 are toggled based on which turn it is and what the goal of the turn is
      toWin: false,
      toLose: false,
      toTie: false,
      // message value to notify the player for win, lose, or tie turns
      message: '',
      // Notify's the player on what the computer has seleted
      computerMessage: '',
      //Message for the timer
      timerMessage: '',
      //Displays the number of seconds remaining in the round
      seconds: '',
      //Holds the high score for all the games played
      highScoreHolder: 0,
      //Holds the time for the interval set
      timer: 0
  },


  computed: {

      //Function that increases the player progress bar scaled to the number of turn wins
    increasePlayerBar: function() {
      return {
        width: this.playerScore + '%'
      }
    },

      //Function that increases the high score progress bar
    increaseScoreBar: function(){
        return {
        width: this.highScore + '%'
        }
      }

  },
  
  methods: {

      //Timer function that starts the timer and counts down from 60 seconds
      startTimer: function(){
          var myVar = this
          myVar.seconds = 60
          myVar.timer = setInterval( function() {
              myVar.seconds--
              if(myVar.seconds === 0){
                  clearInterval(myVar.timer)
                  if (myVar.highScore > myVar.highScoreHolder){
                      myVar.highScoreHolder = myVar.highScore
                      alert("Time's up. New High Score!!")
                  }
                  else{
                      alert("Time's up. Try again for a high score!")
                  }
                  myVar.reset()
              }
          }, 1000);
      },

      // Increases the player score by a factor of 1. This will reflect in the progress bar and increment
      // by 1 for each score
      increasePlayerScore: function(){
        this.playerScore++
        this.playerWinCount++
      },

      // Increases the player high score by a factor of 1. This will reflect in the progress bar and increment
      // by 1 for each score
	  increaseHighScore: function() {
          if(this.highScore < this.playerScore){
              this.highScore++
          }
          else{
              return
          }
	  },

      // Decreases the player score by a factor of 2 for each incorrect answer
      decreasePlayerScore: function(){
        this.playerScore -= 2
        this.playerWinCount -= 2
        if (this.playerScore < 0){
            this.playerScore = 0
            this.playerWinCount = 0
        }
      },


      //Resets the game by toggling the selection values to false, resets the scores and progress bars and
      //clears the messages
      reset: function() {
          this.computerRock = false
          this.computerPaper = false
          this.computerScissors = false
          this.playerScore = 0
          this.playerWinCount = 0
          this.startButtonClick = true
          this.messages = []
          this.message = ''
          this.computerMessage = ''
          this.seconds = 0
          clearInterval(this.timer)
      },


      //Randomly selects a turn for the computer and assigns that turn to a value of Rock, Paper, or Scissors by toggling
      //the assigned values true and all others false
	  computerSelection: function(){
          var comSelection = Math.floor(Math.random() * 3) + 1
          if (comSelection === 1){
              this.computerMessage = "Computer picks Rock!"
              this.computerScissors = false
              this.computerPaper = false
              this.computerRock = true
          }
          else if (comSelection === 2){
              this.computerMessage = "Computer picks Paper!"
              this.computerRock = false
              this.computerScissors = false
              this.computerPaper = true
          }
          else{
              this.computerMessage = "Computer picks Scissors!"
              this.computerRock = false
              this.computerPaper = false
              this.computerScissors = true
          }
      },

      //Randomly selects a turn for the computer and assigns that turn to a value of Rock, Paper, or Scissors by toggling
      //the assigned values true and all others false
      computerTurn: function(){
          var turnSelection = Math.floor(Math.random() * 3) + 1
          if (turnSelection === 1){
              this.toWin = true
              this.toLose = false
              this.toTie = false
              this.message = "Win!!"
          }
          else if (turnSelection === 2){
              this.toWin = false
              this.toLose = true
              this.toTie = false
              this.message = "Lose!!"
          }
          else{
              this.toWin = false
              this.toLose = false
              this.toTie = true
              this.message = "Tie!!"
          }
      },


      //Assigns a player selection based on what button the user clicked and toggles that value true while toggling
      //all other values false
      playerSelection: function(playerSelect) {
          if (playerSelect === 1){
              this.playerScissors = false
              this.playerPaper = false
              this.playerRock = true
          }
          else if (playerSelect === 2){
              this.playerRock = false
              this.playerScissors = false
              this.playerPaper = true
          }
          else{
              this.playerRock = false
              this.playerPaper= false
              this.playerScissors = true
          }
      },

      //Checks the value of both the player and computer turns and checks who has won that turn and puts in the messages
      //for who won and scored.
      checkTurn: function(){
          if(this.toWin === true) {
              if (this.playerRock === true) {
                  if (this.computerRock === true) {
                      this.decreasePlayerScore()
                      this.messages.unshift({
                          playerLose: true,
                          text: "Computer chose Rock | You have tied! | Lose 2 points"
                      })
                  }
                  else if (this.computerPaper === true) {
                      this.decreasePlayerScore()
                      this.messages.unshift({
                          playerLose: true,
                          text: "Computer chose Paper | Paper beats rock | Lose 2 points!"
                      })
                  }
                  else {
                      this.increasePlayerScore()
                      this.increaseHighScore()
                      this.messages.unshift({
                          playerWon: true,
                          text: "Computer chose Scissors | Rock Beats scissors | Player Wins!"
                      })
                  }
              }
              else if (this.playerPaper === true) {
                  if (this.computerRock === true) {
                      this.increasePlayerScore()
                      this.increaseHighScore()
                      this.messages.unshift({
                          playerWon: true,
                          text: "Computer chose Rock | Paper beats Rock | Player Wins!"
                      })
                  }
                  else if (this.computerPaper === true) {
                      this.decreasePlayerScore()
                      this.messages.unshift({
                          playerLose: true,
                          text: "Computer chose Paper | You have tied! | Lose 2 points"
                      })
                  }
                  else {
                      this.decreasePlayerScore()
                      this.messages.unshift({
                          playerLose: true,
                          text: "Computer chose Scissors | Scissors beats paper | Lose 2 points!"
                      })
                  }
              }
              else {
                  if (this.computerRock === true) {
                      this.decreasePlayerScore()
                      this.messages.unshift({
                          playerLose: true,
                          text: "Computer chose Rock | Rock beats Scissors | Lose 2 points!"
                      })
                  }
                  else if (this.computerPaper === true) {
                      this.increasePlayerScore()
                      this.increaseHighScore()
                      this.messages.unshift({
                          playerWon: true,
                          text: "Computer chose Paper | Scissors beats Paper | Player Wins!"
                      })
                  }
                  else {
                      this.decreasePlayerScore()
                      this.messages.unshift({
                          playerLose: true,
                          text: "Computer chose Scissors | You have tied! | Lose 2 points"
                      })
                  }
              }
          }
          else if (this.toLose === true){
              if (this.playerRock === true) {
                  if (this.computerRock === true) {
                      this.decreasePlayerScore()
                      this.messages.unshift({
                          playerLose: true,
                          text: "Computer chose Rock | You have tied! | Lose 2 points"
                      })
                  }
                  else if (this.computerPaper === true) {
                      this.increasePlayerScore()
                      this.increaseHighScore()
                      this.messages.unshift({
                          playerWon: true,
                          text: "Computer chose Paper | Paper beats rock | Player Wins!"
                      })
                  }
                  else {
                      this.decreasePlayerScore()
                      this.messages.unshift({
                          playerLose: true,
                          text: "Computer chose Scissors | Rock Beats scissors | Lose 2 points!"
                      })
                  }
              }
              else if (this.playerPaper === true) {
                  if (this.computerRock === true) {
                      this.decreasePlayerScore()
                      this.messages.unshift({
                          playerLose: true,
                          text: "Computer chose Rock | Paper beats Rock | Lose 2 points!"
                      })
                  }
                  else if (this.computerPaper === true) {
                      this.decreasePlayerScore()
                      this.messages.unshift({
                          playerLose: true,
                          text: "Computer chose Paper | You have tied! | Lose 2 points"
                      })
                  }
                  else {
                      this.increasePlayerScore()
                      this.increaseHighScore()
                      this.messages.unshift({
                          playerWon: true,
                          text: "Computer chose Scissors | Scissors beats paper | Player Wins!"
                      })
                  }
              }
              else {
                  if (this.computerRock === true) {
                      this.increasePlayerScore()
                      this.increaseHighScore()
                      this.messages.unshift({
                          playerWon: true,
                          text: "Computer chose Rock | Rock beats Scissors | Player Wins!"
                      })
                  }
                  else if (this.computerPaper === true) {
                      this.decreasePlayerScore()
                      this.messages.unshift({
                          playerLose: true,
                          text: "Computer chose Paper | Scissors beats Paper | Lose 2 points!"
                      })
                  }
                  else {
                      this.decreasePlayerScore()
                      this.messages.unshift({
                          playerLose: true,
                          text: "Computer chose Scissors | You have tied! | Lose 2 points"
                      })
                  }
              }
          }
          else {
              if (this.playerRock === true) {
                  if (this.computerRock === true) {
                      this.increasePlayerScore()
                      this.increaseHighScore()
                      this.messages.unshift({
                          playerWon: true,
                          text: "Computer chose Rock | You have tied! | Player Wins"
                      })
                  }
                  else if (this.computerPaper === true) {
                      this.decreasePlayerScore()
                      this.messages.unshift({
                          playerLose: true,
                          text: "Computer chose Paper | Paper beats rock | Lose 2 points!"
                      })
                  }
                  else {
                      this.decreasePlayerScore()
                      this.messages.unshift({
                          playerLose: true,
                          text: "Computer chose Scissors | Rock Beats scissors | Lose 2 points!"
                      })
                  }
              }
              else if (this.playerPaper === true) {
                  if (this.computerRock === true) {
                      this.decreasePlayerScore()
                      this.messages.unshift({
                          playerLose: true,
                          text: "Computer chose Rock | Paper beats Rock | Lose 2 points!"
                      })
                  }
                  else if (this.computerPaper === true) {
                      this.increasePlayerScore()
                      this.increaseHighScore()
                      this.messages.unshift({
                          playerWon: true,
                          text: "Computer chose Paper | You have tied! | Player Wins"
                      })
                  }
                  else {
                      this.decreasePlayerScore()
                      this.messages.unshift({
                          playerLose: true,
                          text: "Computer chose Scissors | Scissors beats paper | Lose 2 points!"
                      })
                  }
              }
              else {
                  if (this.computerRock === true) {
                      this.decreasePlayerScore()
                      this.messages.unshift({
                          playerLose: true,
                          text: "Computer chose Rock | Rock beats Scissors | Lose 2 points!"
                      })
                  }
                  else if (this.computerPaper === true) {
                      this.decreasePlayerScore()
                      this.messages.unshift({
                          playerLose: true,
                          text: "Computer chose Paper | Scissors beats Paper | Lose 2 points"
                      })
                  }
                  else {
                      this.increasePlayerScore()
                      this.increaseHighScore()
                      this.messages.unshift({
                          playerWon: true,
                          text: "Computer chose Scissors | You have tied! | Player Wins!"
                      })
                  }
              }
          }
          this.computerSelection()
          this.computerTurn()
      },
  },
  
});