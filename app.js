angular.module('simon', [])

//Define Simon Controller to be used for the Application
.controller('simonController', function( $timeout ){
	var self = this;


	self.title = "Simon Says";
	self.turnNumber = 0;

    //Define Color Array to be used in Application
	self.colorArray = ['red', 'blue', 'green', 'yellow'];


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