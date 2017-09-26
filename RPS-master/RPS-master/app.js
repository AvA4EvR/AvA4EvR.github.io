new Vue({
  el: '#app',
  data: {
	  paper: true,
	  rock: true,
	  scissors: true,
	  

  },
  methods: {
	  startGame: function () {
		  
		  this.paper = false,
		  this.rock = false,
		  this.scissors = false,
	  }
	  

  }
});