new Vue({
  el: '#app',
  data: {
      playerPaper: false,
	  playerRock: false,
	  playerScissors: false,
      computerRock: false,
      computerPaper: false,
      computerScissors: false,
      select: 0,
      selection: 0,
	  playerScore: 0,
	  computerScore: 0,
      buttonsVisible: true,
      buttonsStart: true,
      buttonClick: true,
      playerWinCount: 0,
      computerWinCount: 0,
      messages: [],
      playerWin: false,
      computerWin: false,
      noWin: false

  },
  
  computed: {
    increasePlayerBar: function() {
      return {
        width: this.playerScore + '%'
      }
    },

    increaseComputerBar: function(){
        return {
        width: this.computerScore + '%'
        }
      },

  },
  
  methods: {
      increasePlayerScore: function(){
        this.playerScore+= 10
            this.playerWinCount++
      },

	  increaseComputerScore: function() {
		this.computerScore+= 10
          this.computerWinCount++
	  },

      reset: function() {
          this.computerRock = false
          this.computerPaper = false
          this.computerScissors = false
          this.playerScore = 0
          this.computerScore = 0
          this.playerWinCount = 0
          this.computerWinCount = 0
      },

	  computerSelection: function(){
          var selection = Math.floor(Math.random() * 3) + 1
          if (selection === 1){
              this.computerScissors = false
              this.computerPaper = false
              this.computerRock = true
          }
          else if (selection === 2){
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

      playerSelection: function(select) {
          if (select === 1){
              this.playerScissors = false
              this.playerPaper = false
              this.playerRock = true
          }
          else if (select === 2){
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

      checkTurn: function(){
	    if(this.playerRock === true){
            if(this.computerRock === true){
                this.noWin = true
                this.messages.unshift({
                    text: "Computer chose Rock| You have tied!"
                })
                this.playerWin = false
                this.computerWin = false
            }
            else if(this.computerPaper === true){
                this.increaseComputerScore()
                this.computerWin = true
                this.messages.unshift({
                    text: "Computer chose Paper| Paper beats rock | Computer wins!"
                })
                this.noWin = false
                this.playerWin = false
            }
            else {
                this.increasePlayerScore()
                this.playerWin = true
                this.messages.unshift({
                    text: "Computer chose Scissors | Rock Beats scissors | Player Wins!"
                })
                this.computerWin = false
                this.noWin = false
            }
        }
        else if (this.playerPaper === true){
            if(this.computerRock === true){
                this.increasePlayerScore()
            }
            else if (this.computerPaper === true){

            }
            else {
                this.increaseComputerScore()
            }
        }
        else {
            if (this.computerRock === true){
                this.increaseComputerScore()
            }
            else if (this.computerPaper === true){
                this.increasePlayerScore()
            }
            else {

            }
        }
      },

      alertBox: function(){
        if(this.playerWinCount === 10){
            alert("You won! Play again?")
        }
        else if (this.computerWinCount === 10){
            alert("You lose. Play again?")
        }

      },

  },
  
});