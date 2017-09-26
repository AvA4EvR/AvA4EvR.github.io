new Vue({
  el: '#app',
  data: {
      paper: true,
	  rock: true,
	  scissors: true,
	  playerScore: 1,

  },
  
  computed: {
    increaseBar: function() {
      return {
        width: this.playerScore + '%'
      }
    }
  },
  
  methods: {
      startGame: function(){
        this.rock = false
      }
  },
  
});