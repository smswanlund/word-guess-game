
// array of monster names
var monsterBank = [
    "beholder",
    "tarrasque",
    "kenku",
    "aboleth",
    "mimic",
    "roper",
    "owlbear",
    "behir",
    "kobold",
    "ettin",
    "nalfeshnee",
    "xorn",
    "solar", 
]

// blank variables for counters and letter boxes
var monster = "";
var monsterLetters = [];
var blanks = 0;
var correctBlanks = [];
var wrongGuess = [];
var guessesRemaining = 3;

//=====================================================

// function to initialize game
function Game() {

    //generate random word from monsterbank
    monster = monsterBank[Math.floor(Math.random() * monsterBank.length)];

    //separates word into its letters
    monsterLetters = monster.split("");

    // number of blanks needed for word
    blanks = monsterLetters.length;

    // generating "_" for each letter in "blanks"
    for(var i = 0; i< blanks; i++) {
        correctBlanks.push("_")
    }

    //show the blanks in the html
    document.getElementById("wordBlank").innerHTML = " " + correctBlanks.join("");

    //console.logs for initialization
    console.log(monster);
    console.log(monsterLetters);
    console.log(blanks);
    console.log(correctBlanks);

}

// function for resets
function reset() {
    guessesRemaining = 3;
    wrongGuess = [];
    correctBlanks = [];
    Game()
}

// function for letter checking
function letterCheck(letter) {
    var letterInWord = false;

    //if monster has the guessed letter, letterInWord is true
    for(var i = 0; i < blanks; i++) {

        if (monster[i] == letter) {
            letterInWord = true;
        }
    }

    //if letterInWord is false check to see if each letter matches the word
    if (letterInWord) {
        for(var i = 0; i < blanks; i++) {
            if (monster[i] == letter) {
                correctBlanks[i] = letter;
            }
        }
    }

    //otherwise, put letter in wrong guess section and reduce remaining guesses
    else {
        wrongGuess.push(letter);
        guessesRemaining--;
    }
    console.log(correctBlanks)
}

// function for completion (checking if player won/lost)
function completion() {
    
    //if player won, then alert and reset
    if (monsterLetters.toString() == correctBlanks.toString()) {
        alert("Congradulations! You Won!");
        reset()
    }

    //if player lost, then alert and reset
    else if (guessesRemaining === 0) {
        alert("You Lose. Try Again!")
        reset()
    }

    //update guess countdown
    document.getElementById("lives").innerHTML = " " + guessesRemaining
}

//=====================================================

// Execution

// call initialization
Game();

// looking for keyups
document.onkeyup = function (event) {
    var guess = String.fromCharCode(event.keyCode).toLowerCase();

    //check if guess matches a value in monsterLetter
    letterCheck(guess);

    //process win/loss
    completion();

    //store guess in console
    console.log(guess);

    //display incorrect letters
    document.getElementById("badGuesses").innerHTML = " " + wrongGuess.join("");
}