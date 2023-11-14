"use strict";

// Select elements
var levelTitle = document.getElementById("level-title");
var greenButton = document.getElementById("green");
var redButton = document.getElementById("red");
var yellowButton = document.getElementById("yellow");
var blueButton = document.getElementById("blue"); // Colors and game variables

var colors = ["green", "red", "yellow", "blue"];
var gameSequence = [];
var playerSequence = [];
var level = 0;
var gameStarted = false; // Sounds

var sounds = {
  green: new Audio("../assets/sounds/green.mp3"),
  red: new Audio("../assets/sounds/red.mp3"),
  yellow: new Audio("../assets/sounds/yellow.mp3"),
  blue: new Audio("../assets/sounds/blue.mp3"),
  wrong: new Audio("../assets/sounds/wrong.mp3")
}; // Event listener for key press to start the game

document.addEventListener("keydown", function () {
  if (!gameStarted) {
    startGame();
  }
}); // Event listeners for color buttons

greenButton.addEventListener("click", function () {
  handleButtonClick("green");
});
redButton.addEventListener("click", function () {
  handleButtonClick("red");
});
yellowButton.addEventListener("click", function () {
  handleButtonClick("yellow");
});
blueButton.addEventListener("click", function () {
  handleButtonClick("blue");
}); // Function to start the game

function startGame() {
  gameSequence = [];
  playerSequence = [];
  level = 1;
  gameStarted = true;
  nextRound();
} // Function to generate the next round


function nextRound() {
  levelTitle.textContent = "Level ".concat(level);
  playerSequence = [];
  addToSequence();
  playSequence();
} // Function to generate a random color and add it to the sequence


function addToSequence() {
  var randomColor = colors[Math.floor(Math.random() * 4)];
  gameSequence.push(randomColor);
} // Function to play the current sequence


function playSequence() {
  disableButtons();
  var i = 0;
  var intervalId = setInterval(function () {
    var color = gameSequence[i];
    animateButton(color);
    playSound(color);
    i++;

    if (i >= gameSequence.length) {
      clearInterval(intervalId);
      enableButtons();
    }
  }, 500);
} // Function to handle button clicks


function handleButtonClick(color) {
  if (gameStarted) {
    playerSequence.push(color);
    checkSequence();
    animateButton(color);
    playSound(color);
  }
} // Function to play sound for a given color


function playSound(color) {
  sounds[color].currentTime = 0;
  sounds[color].play();
} // Function to animate button click


function animateButton(color) {
  var button = document.getElementById(color);
  button.style.boxShadow = "0 0 20px white";
  button.style.backgroundColor = "grey";
  setTimeout(function () {
    button.style.boxShadow = "";
    button.style.backgroundColor = color;
  }, 100);
} // Function to check if the player's sequence matches the game sequence


function checkSequence() {
  var index = playerSequence.length - 1;

  if (playerSequence[index] !== gameSequence[index]) {
    endGame();
  } else if (playerSequence.length === gameSequence.length) {
    if (level === 5) {
      alert("Congratulations! You won!");
      gameStarted = false;
      levelTitle.textContent = "Press Any Key to Restart";
    } else {
      level++;
      setTimeout(nextRound, 500);
    }
  }
} // Function to end the game


function endGame() {
  gameStarted = false;
  levelTitle.textContent = "Game Over, Press Any Key to Restart";
  document.body.classList.add("game-over");
  playSound("wrong");
  setTimeout(function () {
    document.body.classList.remove("game-over");
  }, 200);
} // Function to enable color buttons


function enableButtons() {
  greenButton.disabled = false;
  redButton.disabled = false;
  yellowButton.disabled = false;
  blueButton.disabled = false;
} // Function to disable color buttons


function disableButtons() {
  greenButton.disabled = true;
  redButton.disabled = true;
  yellowButton.disabled = true;
  blueButton.disabled = true;
}
//# sourceMappingURL=game.dev.js.map
