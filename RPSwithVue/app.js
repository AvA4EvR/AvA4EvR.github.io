new Vue({
  el: '#app',
  data: {
      paper: true,
	  rock: true,
	  scissors: true,
	  playerScore: 0,
	  computerScore: 0,

  },
  
  computed: {
    increaseBar: function() {
      return {
        width: this.playerScore + '%'
      }
    }
  },
  
  methods: {
      increasePlayerScore: function(){
        this.playerScore++
      }
	  
	  increaseComputerScore: function() {
		this.computerScore++
	  }
  },
  
});