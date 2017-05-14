// Declaring Variables

var themes = ["WWE","SSB64"]
var currentTheme = themes[0];

var alphabet = "qwertyuiopasdfghjklzxcvbnm";
alphabet = alphabet + "QWERTYUIOPASDFGHJKLZXCVBNM";
var winNum = 0;

var userGuesses = [];
var maxGuess = 12;
var guessesLeft = maxGuess;
var userLetter;
var letterFound;

var phraseBank = [
	"AJ Lee",
	"AJ Styles",
	"Asuka",
	"Bayley",
	"Becky Lynch",
	"CM Punk",
	"Eddie Guerrero",
	"Jason Jordan & Chad Gable",
	"John Cena",
	"Johnny Gargano & Tommaso Ciampa", 
	"Kevin Owens",
	"Kofi, Big E & Xavier Woods",
	"Kurt Angle",
	"Lita",
	"Matt & Jeff Hardy",
	"Naomi",
	"Sami Zayn",
	"Sasha Banks", 
	"Shinsuke Nakamura",
	"The Miz",
	];

/*var phraseBank1 = [
	"Captin Falcon",
	"Donkey Kong",
	"Fox",
	"Jigglypuff",
	"Kirby",
	"Link",
	"Luigi",
	"Mario",
	"Mushroom Kingdom",
	"Ness",
	"Peach's Castle",
	"Pikachu",
	"Samus",
	"Yoshi"
	];*/

var phraseBank1 = [
	"Luigi",
	"Mario",
	"Mushroom Kingdom",
	"Peach's Castle",

	"Congo Jungle",
	"Donkey Kong",

	"Hyrule Castle",
	"Link",

	"Planet Zebas",
	"Samus",

	"Mute City",
	"Captin Falcon",

	"Ness",
	"Onet",

	"Yoshi",
	"Yoshi's Island",

	"Dreamland",
	"Kirby",

	"Fox",
	"Sector Z",

	"Jigglypuff",
	"Pikachu",
	"Saffron City"	
	];




var comPhrase;

var audio = new Audio("");

// var tagetElm = document.getElementById("hintTitle");
// tagetElm.classList.add("other");

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

startGame(currentTheme);

document.onkeyup = function(event) {
	userLetter = event.key;

	if (userLetter === "0" && currentTheme != "WWE") {
		themeSwitch(0);
	}

	else if (userLetter === "1" && currentTheme != "SSB64") {
		themeSwitch(1);
	}

	// The game is still going or just ended
	if (guessesLeft > 0) {

		// Checks for valid input
		if( alphabet.indexOf(userLetter) == -1 || repeatGuess() ) {
			return;
		}

		userGuesses.push(userLetter);
		letterFound = false;

		for (var i = 0; i < comPhrase.length; i++) {
	 		if (userLetter === comPhrase[i] || userLetter.toUpperCase() === comPhrase[i]) {
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
	 		if (currentTheme === "SSB64") {
	 			playSuccessAudio (comPhrase);
	 		}
	 		startGame(currentTheme);
	 	}

 	}

 	// You ran out of tries
	if (guessesLeft === 0) {
 		startGame(currentTheme);
 	}

}

// Resets Variables
function startGame (thm) {

	if (thm === "WWE") {
		var img = document.getElementById("logo");
		img.src = "assets/images/WWELogo.png";

		var img2 = document.getElementById("logo2");
		img2.src = "assets/images/WWELogo2.gif";

		rand = Math.floor((Math.random()*phraseBank.length));
		var newComPhrase = phraseBank[rand];
	}

	else if (thm === "SSB64") {
		var img = document.getElementById("logo");
		img.src = "assets/images/smash64Logo.png";

		var img2 = document.getElementById("logo2");
		img2.src = "assets/images/N64Logo.gif";

		rand = Math.floor((Math.random()*phraseBank1.length));
		var newComPhrase = phraseBank1[rand];
	}

	if( newComPhrase != comPhrase ) {

		comPhrase = newComPhrase;
		// comPhrase = phraseBank[18];
		userGuesses = [];
		guessesLeft = maxGuess;

		if (thm === "WWE"){
			playAudioHint(comPhrase);
		}

		else if (thm === "SSB64") {
			document.getElementById("hintTitle").textContent = "";
		}

		displayPhraseArr = [];
		for (var i = 0; i < comPhrase.length; i++) {
			if( alphabet.indexOf(comPhrase[i]) == -1 ) {
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

	else {
		startGame(currentTheme);
	}
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

function playAudioHint (phr) {

	var hintTitle;
	audio.pause();

	if (phr === "AJ Lee") {
		hintTitle = "Let's Light It Up"
		audio = new Audio("assets/audio/Let's_Light_It_Up.mp3");
		audio.play();
	}

	else if (phr === "AJ Styles") {
		hintTitle = "Phenomenal"
		audio = new Audio("assets/audio/Phenomenal.mp3");
		audio.play();
	}

	else if (phr === "Asuka") {
		hintTitle = "The Future"
		audio = new Audio("assets/audio/The_Future.mp3");
		audio.play();
	}

	else if (phr === "Bayley") {
		hintTitle = "Turn it Up"
		audio = new Audio("assets/audio/Turn_it_Up.mp3");
		audio.play();
	}

	else if (phr === "Becky Lynch") {
		hintTitle = "Celtic Invasion"
		audio = new Audio("assets/audio/Celtic_Invasion.mp3");
		audio.play();
	}

	else if (phr === "CM Punk") {
		hintTitle = "Cult of Personality"
		audio = new Audio("assets/audio/Cult_of_Personality.mp3");
		audio.play();
	}

	else if (phr === "Eddie Guerrero") {
		hintTitle = "Lie, Cheat & Steal"
		audio = new Audio("assets/audio/Lie_Cheat_Steal.mp3");
		audio.play();
	}

	else if (phr === "Jason Jordan & Chad Gable") {
		hintTitle = "Elite"
		audio = new Audio("assets/audio/Elite.mp3");
		audio.play();
	}

	else if (phr === "John Cena") {
		hintTitle = "The Time is Now"
		audio = new Audio("assets/audio/The_Time_is_Now.mp3");
		audio.play();
	}

	else if (phr === "Johnny Gargano & Tommaso Ciampa") {
		hintTitle = "Chrome Hearts"
		audio = new Audio("assets/audio/Chrome_Hearts.mp3");
		audio.play();
	}

	else if (phr === "Kevin Owens") {
		hintTitle = "Fight"
		audio = new Audio("assets/audio/Fight.m4a");
		audio.play();
	}

	else if (phr === "Kofi, Big E & Xavier Woods") {
		hintTitle = "New Way"
		audio = new Audio("assets/audio/New_Way.mp3");
		audio.play();
	}

	else if (phr === "Kurt Angle") {
		hintTitle = "Medal"
		audio = new Audio("assets/audio/Medal.mp3");
		audio.play();
	}

	else if (phr === "Lita") {
		hintTitle = "LoveFuryPassionEnergy"
		audio = new Audio("assets/audio/LoveFuryPassionEnergy.mp3");
		audio.play();
	}

	else if (phr === "Matt & Jeff Hardy") {
		hintTitle = "Loaded"
		audio = new Audio("assets/audio/Loaded.mp3");
		audio.play();
	}

	else if (phr === "Naomi") {
		hintTitle = "Amazing"
		audio = new Audio("assets/audio/Amazing_Remix.mp3");
		audio.play();
	}

	else if (phr === "Sami Zayn") {
		hintTitle = "Worlds Apart"
		audio = new Audio("assets/audio/Worlds_Apart.m4a");
		audio.play();
	}

	else if (phr === "Sasha Banks") {
		hintTitle = "Sky's the Limit"
		audio = new Audio("assets/audio/Sky's_the_Limit.m4a");
		audio.play();
	}

	else if (phr === "Shinsuke Nakamura") {
		hintTitle = "Rising Sun"
		audio = new Audio("assets/audio/Rising_Sun.mp3");
		audio.play();
	}

	else if (phr === "The Miz") {
		hintTitle = "I Came to Play"
		audio = new Audio("assets/audio/I_Came_to_Play.mp3");
		audio.play();
	}

	audio.loop = true;
	document.getElementById("hintTitle").textContent = hintTitle;
}

function playSuccessAudio (phr) {
	audio.pause();

	if( phr === "Luigi" || phr === "Mario" ) {
		audio = new Audio("assets/audio/marioWin.mp3");
		audio.play();
	}

	else if( phr === "Donkey Kong" ) {
		audio = new Audio("assets/audio/dkWin.mp3");
		audio.play();
	}

	else if( phr === "Link" ) {
		audio = new Audio("assets/audio/linkWin.mp3");
		audio.play();
	}

	else if( phr === "Samus" ) {
		audio = new Audio("assets/audio/samusWin.mp3");
		audio.play();
	}

	else if( phr === "Captin Falcon" ) {
		audio = new Audio("assets/audio/captinFalconWin.mp3");
		audio.play();
	}

	else if( phr === "Ness" ) {
		audio = new Audio("assets/audio/nessWin.mp3");
		audio.play();
	}

	else if( phr === "Yoshi" ) {
		audio = new Audio("assets/audio/yoshiWin.mp3");
		audio.play();
	}

	else if( phr === "Kirby" ) {
		audio = new Audio("assets/audio/kirbyWin.mp3");
		audio.play();
	}

	else if( phr === "Fox" ) {
		audio = new Audio("assets/audio/foxWin.mp3");
		audio.play();
	}

	else if( phr === "Pikachu" || phr === "Jigglypuff" ) {
		audio = new Audio("assets/audio/pokemonWin.mp3");
		audio.play();
	}

	audio.loop = false;
}

function themeSwitch (index) {
	audio.pause();
	currentTheme = themes[index];
	startGame(currentTheme);
}