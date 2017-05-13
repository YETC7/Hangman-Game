// Declaring Variables
var alphabet = "qwertyuiopasdfghjklzxcvbnm";
var winNum = 0;

var userGuesses = [];
var maxGuess = 12;
var guessesLeft = maxGuess;
var userLetter;
var letterFound;

var phraseBank = ["test","asuka","space bar test#2"];

var audio = new Audio("");



// Generates random number to pick a phrase
// var rand = Math.floor((Math.random()*phraseBank.length));
// var comPhrase = phraseBank[rand];
// console.log(comPhrase);

// Display to the user
// var displayPhraseArr = [];
// for (var i = 0; i < comPhrase.length; i++) {

// 	if( alphabet.indexOf(comPhrase[i]) == -1) {
// 		displayPhraseArr.push(comPhrase[i]);
// 	}

// 	else {	
// 		displayPhraseArr.push("_");
// 	}
		
// 		console.log(comPhrase[i]);
// 		console.log(displayPhraseArr.join(""));
// }
// updateDisplay();

startGame();


document.onkeyup = function(event) {
	userLetter = event.key;

	// The game is still going or just ended
	if (guessesLeft > 0) {

		// Checks for valid input
		if( alphabet.indexOf(userLetter) == -1 || repeatGuess() ) {
			return;
		}

		userGuesses.push(userLetter);
		letterFound = false;

		for (var i = 0; i < comPhrase.length; i++) {
	 		if (userLetter === comPhrase[i]) {
	 			displayPhraseArr[i] = comPhrase[i];
	 			letterFound = true;
	  		}
	 	}

	 	// Deducts a guess if the letter is not in the phrase
	 	if (!letterFound) {
	 		guessesLeft--;
	 	}

	 	updateDisplay();

	 	// You are sucessful
	 	if (comPhrase === displayPhraseArr.join("")) {
	 		winNum++;
	 		startGame();
	 	}

 	}

 	// You ran out of tries
	if (guessesLeft === 0) {
 		startGame();
 	}

}

// Resets Variables
function startGame () {
	userGuesses = [];
	guessesLeft = maxGuess;

	rand = Math.floor((Math.random()*phraseBank.length));
	comPhrase = phraseBank[rand];
	playAudio(comPhrase);

	displayPhraseArr = [];
	for (var i = 0; i < comPhrase.length; i++) {
		if( alphabet.indexOf(comPhrase[i]) == -1) {
			displayPhraseArr.push(comPhrase[i]);
		}

		else {	
			displayPhraseArr.push("_");
		}
		
		console.log(comPhrase[i]);
		console.log(displayPhraseArr.join(""));
	}

	// Displays Win count
	if(winNum > 0){
		document.getElementById("winNum").textContent = ("Wins: " + winNum);
	}

	updateDisplay();
}

// Updates the display
function updateDisplay () {

	document.getElementById("wordToGuess").textContent = displayPhraseArr.join("");

	document.getElementById("guessesLeft").textContent = guessesLeft;

	document.getElementById("userGuesses").textContent = userGuesses.join(" ");
}

// Checks for repeat guesses
function repeatGuess () {
	console.log(userGuesses.length);
	for(var i = 0; i < userGuesses.length; i++) {
		if (userLetter === userGuesses[i]) {
			console.log("true");
			return true;
		}
	}
	console.log("false");
	return false;
}

function playAudio (phr) {
	if (phr === "asuka") {
		audio = new Audio("assets/audio/The_Future.mp3");
		audio.play();
	}

	else {
		audio.pause();
	}

	audio.loop = true;
}