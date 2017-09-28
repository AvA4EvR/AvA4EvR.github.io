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
      //Holds player score count, displays in the progress bar and increases with each win
	  playerScore: 0,
      //Holds computer score count, displays in the progress bar and increases with each win
	  computerScore: 0,
      // Value that gets toggled based on the start button being click, toggles the start of the game and
      // hides the start button while bringing up the game buttons
      startButtonClick: true,
      // Integer that holds the number of player turn wins, displayed as a number in the progress bar
      playerWinCount: 0,
      // Integer that holds the number of computer turn wins, displayed as a number in the progress bar
      computerWinCount: 0,
      // Messages array that holds each message that is displayed in the game bar for the outcome of each turn
      messages: [],

  },


  computed: {

      //Function that increases the player progress bar scaled to the number of turn wins
    increasePlayerBar: function() {
      return {
        width: this.playerScore + '%'
      }
    },

      //Function that increases the computer progress bar scaled to the number of turn wins
    increaseComputerBar: function(){
        return {
        width: this.computerScore + '%'
        }
      },

  },
  
  methods: {

      // Increases the player score by a factor of 10. This will reflect in the progress bar and increment
      // by 10 for each score
      increasePlayerScore: function(){
        this.playerScore+= 10
            this.playerWinCount++
      },

      // Increases the player score by a factor of 10. This will reflect in the progress bar and increment
      // by 10 for each score
	  increaseComputerScore: function() {
		this.computerScore+= 10
          this.computerWinCount++
	  },


      //Resets the game by toggling the selection values to false, resets the scores and progress bars and
      //clears the messages
      reset: function() {
          this.computerRock = false
          this.computerPaper = false
          this.computerScissors = false
          this.playerScore = 0
          this.computerScore = 0
          this.playerWinCount = 0
          this.computerWinCount = 0
          this.startButtonClick = true
          this.messages = []
      },


      //Randomly selects a turn for the computer and assigns that turn to a value of Rock, Paper, or Scissors by toggling
      //the assigned values true and all others false
	  computerSelection: function(){
          var comSelection = Math.floor(Math.random() * 3) + 1
          if (comSelection === 1){
              this.computerScissors = false
              this.computerPaper = false
              this.computerRock = true
          }
          else if (comSelection === 2){
              this.computerRock = false
              this.computerScissors = false
              this.computerPaper = true
          }
          else{
              this.computerRock = false
              this.computerPaper = false
              this.computerScissors = true
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
	    if(this.playerRock === true){
            if(this.computerRock === true){
                this.messages.unshift({
                    tieGame: true,
                    text: "Computer chose Rock| You have tied!"
                })
            }
            else if(this.computerPaper === true){
                this.increaseComputerScore()
                this.messages.unshift({
                    computerWon: true,
                    text: "Computer chose Paper| Paper beats rock | Computer wins!"
                })
            }
            else {
                this.increasePlayerScore()
                this.messages.unshift({
                    playerWon: true,
                    text: "Computer chose Scissors | Rock Beats scissors | Player Wins!"
                })
            }
        }
        else if (this.playerPaper === true){
            if(this.computerRock === true){
                this.increasePlayerScore()
                this.messages.unshift({
                    playerWon: true,
                    text: "Computer chose Rock | Paper beats Rock | Player Wins!"
                })
            }
            else if (this.computerPaper === true){
                this.messages.unshift({
                    tieGame: true,
                    text: "Computer chose Paper| You have tied!"
                })
            }
            else {
                this.increaseComputerScore()
                this.messages.unshift({
                    computerWon: true,
                    text: "Computer chose Scissors| Scissors beats paper | Computer wins!"
                })
            }
        }
        else {
            if (this.computerRock === true){
                this.increaseComputerScore()
                this.messages.unshift({
                    computerWon: true,
                    text: "Computer chose Rock| Rock beats Scissors | Computer wins!"
                })
            }
            else if (this.computerPaper === true){
                this.increasePlayerScore()
                this.messages.unshift({
                    playerWon: true,
                    text: "Computer chose Paper | Scissors beats Paper | Player Wins!"
                })
            }
            else {
                this.messages.unshift({
                    tieGame: true,
                    text: "Computer chose Scissors| You have tied!"
                })
            }
        }
      },

      //Creates an alert when either the computer or player has won the game and resets the game board
      alertBox: function(){
        if(this.playerWinCount === 10){
            alert("You won! Play again?")
            this.reset()
        }
        else if (this.computerWinCount === 10){
            alert("You lose. Play again?")
            this.reset()
        }


      },

  },
  
});