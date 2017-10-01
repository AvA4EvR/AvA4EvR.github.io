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
      turnSelection: 0,
      //Holds player score count, displays in the progress bar and increases with each win
	  playerScore: 0,
      //Holds computer score count, displays in the progress bar and increases with each win
	  highScore: 0,
      // Value that gets toggled based on the start button being click, toggles the start of the game and
      // hides the start button while bringing up the game buttons
      startButtonClick: true,
      // Integer that holds the number of player turn wins, displayed as a number in the progress bar
      playerWinCount: 0,
      // Integer that holds the number of computer turn wins, displayed as a number in the progress bar
      highScoreCount: 0,
      // Messages array that holds each message that is displayed in the game bar for the outcome of each turn
      messages: [],
      toWin: false,
      toLose: false,
      toTie: false,
      message: '',
      computerMessage: ''

  },


  computed: {

      //Function that increases the player progress bar scaled to the number of turn wins
    increasePlayerBar: function() {
      return {
        width: this.playerScore + '%'
      }
    },

      //Function that increases the computer progress bar scaled to the number of turn wins
    increaseScoreBar: function(){
        return {
        width: this.highScore + '%'
        }
      },

  },
  
  methods: {

      // Increases the player score by a factor of 10. This will reflect in the progress bar and increment
      // by 10 for each score
      increasePlayerScore: function(){
        this.playerScore++
        this.playerWinCount++
      },

      // Increases the player score by a factor of 10. This will reflect in the progress bar and increment
      // by 10 for each score
	  increaseHighScore: function() {
          if(this.highScoreCount < this.playerWinCount && this.highScore < this.playerScore){
              this.highScore++
              this.highScoreCount++
          }
          else{
              return
          }
	  },

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
          this.highScore = 0
          this.playerWinCount = 0
          this.startButtonClick = true
          this.messages = []
          this.message = ''
          this.computerMessage = ''
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
              this.message = "Beat the computer!!"
          }
          else if (turnSelection === 2){
              this.toWin = false
              this.toLose = true
              this.toTie = false
              this.message = "Lose against the computer!!"
          }
          else{
              this.toWin = false
              this.toLose = false
              this.toTie = true
              this.message = "Tie the computer!!"
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
                          tieGame: true,
                          text: "Computer chose Rock | You have tied! | Lose 2 points"
                      })
                  }
                  else if (this.computerPaper === true) {
                      this.decreasePlayerScore()
                      this.messages.unshift({
                          computerWon: true,
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
                          tieGame: true,
                          text: "Computer chose Paper | You have tied! | Lose 2 points"
                      })
                  }
                  else {
                      this.decreasePlayerScore()
                      this.messages.unshift({
                          computerWon: true,
                          text: "Computer chose Scissors | Scissors beats paper | Lose 2 points!"
                      })
                  }
              }
              else {
                  if (this.computerRock === true) {
                      this.decreasePlayerScore()
                      this.messages.unshift({
                          computerWon: true,
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
                          tieGame: true,
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
                          tieGame: true,
                          text: "Computer chose Rock | You have tied! | Lose 2 points"
                      })
                  }
                  else if (this.computerPaper === true) {
                      this.increasePlayerScore()
                      this.increaseHighScore()
                      this.messages.unshift({
                          computerWon: true,
                          text: "Computer chose Paper | Paper beats rock | Player Wins!"
                      })
                  }
                  else {
                      this.decreasePlayerScore()
                      this.messages.unshift({
                          playerWon: true,
                          text: "Computer chose Scissors | Rock Beats scissors | Lose 2 points!"
                      })
                  }
              }
              else if (this.playerPaper === true) {
                  if (this.computerRock === true) {
                      this.decreasePlayerScore()
                      this.messages.unshift({
                          playerWon: true,
                          text: "Computer chose Rock | Paper beats Rock | Lose 2 points!"
                      })
                  }
                  else if (this.computerPaper === true) {
                      this.decreasePlayerScore()
                      this.messages.unshift({
                          tieGame: true,
                          text: "Computer chose Paper | You have tied! | Lose 2 points"
                      })
                  }
                  else {
                      this.increasePlayerScore()
                      this.increaseHighScore()
                      this.messages.unshift({
                          computerWon: true,
                          text: "Computer chose Scissors | Scissors beats paper | Player Wins!"
                      })
                  }
              }
              else {
                  if (this.computerRock === true) {
                      this.increasePlayerScore()
                      this.increaseHighScore()
                      this.messages.unshift({
                          computerWon: true,
                          text: "Computer chose Rock | Rock beats Scissors | Player Wins!"
                      })
                  }
                  else if (this.computerPaper === true) {
                      this.decreasePlayerScore()
                      this.messages.unshift({
                          playerWon: true,
                          text: "Computer chose Paper | Scissors beats Paper | Lose 2 points!"
                      })
                  }
                  else {
                      this.decreasePlayerScore()
                      this.messages.unshift({
                          tieGame: true,
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
                          tieGame: true,
                          text: "Computer chose Rock | You have tied! | Player Wins"
                      })
                  }
                  else if (this.computerPaper === true) {
                      this.decreasePlayerScore()
                      this.messages.unshift({
                          computerWon: true,
                          text: "Computer chose Paper | Paper beats rock | Lose 2 points!"
                      })
                  }
                  else {
                      this.decreasePlayerScore()
                      this.messages.unshift({
                          playerWon: true,
                          text: "Computer chose Scissors | Rock Beats scissors | Lose 2 points!"
                      })
                  }
              }
              else if (this.playerPaper === true) {
                  if (this.computerRock === true) {
                      this.decreasePlayerScore()
                      this.messages.unshift({
                          playerWon: true,
                          text: "Computer chose Rock | Paper beats Rock | Lose 2 points!"
                      })
                  }
                  else if (this.computerPaper === true) {
                      this.increasePlayerScore()
                      this.increaseHighScore()
                      this.messages.unshift({
                          tieGame: true,
                          text: "Computer chose Paper | You have tied! | Player Wins"
                      })
                  }
                  else {
                      this.decreasePlayerScore()
                      this.messages.unshift({
                          computerWon: true,
                          text: "Computer chose Scissors | Scissors beats paper | Lose 2 points!"
                      })
                  }
              }
              else {
                  if (this.computerRock === true) {
                      this.decreasePlayerScore()
                      this.messages.unshift({
                          computerWon: true,
                          text: "Computer chose Rock | Rock beats Scissors | Lose 2 points!"
                      })
                  }
                  else if (this.computerPaper === true) {
                      this.decreasePlayerScore()
                      this.messages.unshift({
                          playerWon: true,
                          text: "Computer chose Paper | Scissors beats Paper | Lose 2 points"
                      })
                  }
                  else {
                      this.increaseHighScore()
                      this.increasePlayerScore()
                      this.messages.unshift({
                          tieGame: true,
                          text: "Computer chose Scissors | You have tied! | Player Wins!"
                      })
                  }
              }
          }
          this.computerSelection()
          this.computerTurn()
      },

      //Creates an alert when either the computer or player has won the game and resets the game board
      alertBox: function(){
        if(this.playerWinCount === 10){
            alert("You won! Play again?")
            this.reset()
        }
          
      },

  },
  
});