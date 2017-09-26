new Vue({
  el: '#app',
  data: {
      paperButton: false,
	  rockButton: false,
	  scissorsButton: false,
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

      reset: function() {
        this.computerRock = false,
        this.computerPaper = false,
        this.computerScissors = false
      },
	  
	  increaseComputerScore: function() {
		this.computerScore++
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

  },
  
});