new Vue({
  el: '#app',
  data: {
      playerPaper: false,
	  playerRock: false,
	  playerScissors: false,
      computerRock: false,
      computerPaper: false,
      computerScissors: false,
	  playerScore: 0,
	  computerScore: 0,
      buttonsVisible: true,
      buttonsStart: true,
      buttonClick: true,
      messages: [
          { message: 'Computer chose'},
          { message: 'Beats'},
          { message: ' Wins'},
      ]

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
        this.playerScore++
      },

	  increaseComputerScore: function() {
		this.computerScore++
	  },

      reset: function() {
          this.computerRock = false
          this.computerPaper = false
          this.computerScissors = false
          this.playerScore = 0
          this.computerScore = 0
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
          else
              this.computerRock = false
              this.computerPaper = false
              this.computerScissors = true
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

            }
            else if(this.computerPaper === true){

            }
            else {

            }
        }
        else if (this.playerPaper === true){
            if(this.computerRock === true){

            }
            else if (this.computerPaper === true){

            }
            else {

            }
        }
        else {
            if (this.computerRock === true){

            }
            else if (this.computerPaper === true){

            }
            else {

            }
        }
      },

  },
  
});