 angular.module('simon', [])

 .factory('gameOptionsDTO', function(){

		function gameOptionsDTO() {

		}

		gameOptionsDTO.prototype.dataObject = function() {
			
		};
			
			return gameOptionsDTO;
		})


 .service('turns', function(){

	})

	.value('gameOptionz', 

		{
			colorOptions: {
				red: 'red', 
				blue: 'blue', 
				green: 'green', 
				yellow: 'yellow',
				},
			random: ['red', 'blue', 'green', 'yellow'],
			simonsTurn: false,
			yourTurn: false,
			simonMoves: [],
			yourMoves: [],
			displayMoves: [],

		}

	)

//Define Simon Controller to be used for the Application
.controller('myController', function( $timeout, $interval, $log, gameOptionsDTO, gameOptionz, turns ){

	
	var self = this;

	self.gO = gameOptionz;

	self.isDisabled = true;


	self.title = "Simon Says";
	self.turnNumber = 0;

    //Define Color Array to be used in Application
	self.colorArray = ['red', 'blue', 'green', 'yellow'];

	var i = 0;

		self.yourTurn = function(colorSelect) {
			
			//run animation function on usr click
			self.clickedColor = colorSelect;
			self.selectSquare(self.clickedColor);

			self.gO.yourMoves.push({move: self.clickedColor});

			self.len--;

			self.yourMove = self.gO.yourMoves[i].move;
			self.simonsMove = self.gO.simonMoves[i].move;

			if ( self.yourMove === self.simonsMove ) {

				i++;

				self.gO.displayMoves.push({simon: self.yourMove, you: self.simonsMove});

				// if your selections 
				if ( self.gO.yourMoves.length === self.gO.simonMoves.length) {
						
					self.gO.yourMoves = [];

					self.isDisabled = true;

					$timeout(function(){
						self.gO.displayMoves = [];
						self.simonsTurn();
					}, 1500);

					i = 0;
				}	

			} else {
					
					self.gO.simonsTurn = false;
					self.isDisabled = true;
					self.gameOver = true;


				$timeout(function(){
					i = 0;
					self.isDisabled = true;
					self.gO.yourMoves = [];
					self.gO.simonMoves = [];
					self.gO.displayMoves = [];
					self.gO.yourTurn = false;
					self.startBtn = false; //shows play again btn
					self.gameOver = false;

					console.log('Play Again?');
				}, 2000);
			}

		}

		self.simonsTurn = function(){

			self.gO.yourTurn = false;
			self.gO.simonsTurn = true;


			self.isDisabled = true; //shows button
			self.startBtn = true; //hides btn

			self.random = self.gO.random[Math.floor(Math.random() * self.gO.random.length)];

			$log.info('Simon selected: ' + self.random);
			
			self.gO.simonMoves.push({move: self.random});

			self.len = self.gO.simonMoves.length;

			var x = 0; // Resets Every time simon takes a turn

			$interval(function(){

				// Runs through simons choices
				if (self.gO.simonMoves[x].move == 'yellow') {

					self.selectSquare(self.gO.colorOptions.yellow);

				} else if (self.gO.simonMoves[x].move == 'green') {

					self.selectSquare(self.gO.colorOptions.green);

				} else if (self.gO.simonMoves[x].move == 'blue') {

					self.selectSquare(self.gO.colorOptions.blue);

				} else if (self.gO.simonMoves[x].move == 'red') {

					self.selectSquare(self.gO.colorOptions.red);

				} else {
					$log.log('Oops... Simon Fucked Up!')
				}

				if (x === self.len - 1) {

					$timeout(function(){
					  self.isDisabled = false;
				    }, 10);

					$timeout(function(){
				    	self.gO.simonsTurn = false;
						self.gO.yourTurn = true;
					}, 1000);
					
				}

				x++;

			}, 800, self.len);

		}

		//animation for color selection
		self.selectSquare = function(color) {
			if (color === 'yellow') {

				self.yellow = true;

			} else if (color === 'green') {

				self.green = true;	

			} else if (color === 'blue') {

				self.blue = true;

			} else if (color === 'red') {

				self.red = true;	

			} 
			$timeout(function(){
					self.yellow = false;
					self.red = false;
					self.blue = false;
					self.green = false;
				}, 200);
		}


	//Define Computer Instructions Array
	self.computerInstructions = "";
	self.computerInstructionsArray = []; 

	//Define Player Sequence Array
	self.playerSequence = "";
	self.playerSequenceArray = []; //duplicate

	self.isGameStarted = false;
	self.didInstructionsDisplay = false;

	self.pickColor = function(color){

		if (self.isGameStarted == true ) {
			//push color to the Array	
			self.playerSequenceArray.push(color); 

			$timeout( checkCorrect, 700);
		} else {
			alert("Press the 'Start Game' button to start!");
		}
	}

	self.beginGame = function(){
		if ( self.isGameStarted == false ) { 
			self.isGameStarted = true;
			beginNewTurn();
		}
	}



	function checkCorrect(){
		
		if (self.computerInstructionsArray.length == self.playerSequenceArray.length ) {
			// console.log('same length!');
			if ( arecolorsEqual() == true ){
				console.log('good job! next turn now!');
				beginNewTurn();			
			} else if ( arecolorsEqual() == false ) {
				alert('Wrong!');
				refresh();
			}
		}
	}

	//new turn
	function beginNewTurn() {

		changecolor(); //new instruction
		self.didInstructionsDisplay = false;
		
		var time = 500 + self.playerSequenceArray.length * 150;
		$timeout( function(){
			self.didInstructionsDisplay = true;
		}, time );


		self.playerSequenceArray = []; 

		self.turnNumber += 1; //increment turn

	}

	//changing color for instructions
	function changecolor(){
		



		var randomIndex = Math.floor( Math.random() * self.colorArray.length );
		

		var color = self.colorArray[ randomIndex.valueOf() ];
		
		self.computerInstructionsArray.push(color); 

		// console.log("computer instrucitons: " + self.computerInstructions);
	}

	// attach the .equals method to Array's prototype to call it on any array
	Array.prototype.equals = function (array) {
	  
	    if (!array)
	        return false;

	   
	    if (this.length != array.length)
	        return false;

	    for (var i = 0, l=this.length; i < l; i++) {
	       
	        if (this[i] instanceof Array && array[i] instanceof Array) {
	           
	            if (!this[i].equals(array[i]))
	                return false;       
	        }           
	        else if (this[i] != array[i]) { 
	            
	            return false;   
	        }           
	    }       
	    return true;
	}   

	//checking if colors are Equal
	function arecolorsEqual(){

		return self.computerInstructionsArray.equals( self.playerSequenceArray ); //duplicate
	}

	//start new game if you lose
	function refresh() {
		window.location.reload();
	}
});