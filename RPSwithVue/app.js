new Vue({
  el: '#app',
  data: {
      paperButton: false,
	  rockButton: false,
	  scissorsButton: false,
	  playerScore: 0,
	  computerScore: 0,
      buttonsVisible: true,
      buttonsStart: true,
      buttonClick: true

  },
  
  computed: {
    increasePlayerBar: function() {
      return {
        width: this.playerScore + '%'
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

	  computerSelection: function(){
          return Math.floor(Math.random() * 3) + 1
      }
  },
  
});