document.addEventListener("DOMContentLoaded", function () {
  // Select elements
  const levelTitle = document.getElementById("level-title");
  const greenButton = document.getElementById("green");
  const redButton = document.getElementById("red");
  const yellowButton = document.getElementById("yellow");
  const blueButton = document.getElementById("blue");

  // Colors and game variables
  const colors = ["green", "red", "yellow", "blue"];
  let gameSequence = [];
  let playerSequence = [];
  let level = 0;
  let gameStarted = false;

  // Sounds
  const sounds = {
    green: new Audio("../assets/sounds/green.mp3"),
    red: new Audio("../assets/sounds/red.mp3"),
    yellow: new Audio("../assets/sounds/yellow.mp3"),
    blue: new Audio("../assets/sounds/blue.mp3"),
    wrong: new Audio("../assets/sounds/wrong.mp3"),
  };

  // Event listener for key press to start the game
  document.addEventListener("keydown", function () {
    if (!gameStarted) {
      startGame();
    }
  });

  // Event listeners for color buttons
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
  });

  // Function to start the game
  function startGame() {
    gameSequence = [];
    playerSequence = [];
    level = 1;
    gameStarted = true;
    nextRound();
  }

  // Function to generate the next round
  function nextRound() {
    levelTitle.textContent = `Level ${level}`;
    playerSequence = [];
    addToSequence();
    playSequence();
  }

  // Function to generate a random color and add it to the sequence
  function addToSequence() {
    const randomColor = colors[Math.floor(Math.random() * 4)];
    gameSequence.push(randomColor);
  }

  // Function to play the current sequence
  function playSequence() {
    disableButtons();
    let i = 0;
    const intervalId = setInterval(function () {
      const color = gameSequence[i];
      animateButton(color);
      playSound(color);
      i++;
      if (i >= gameSequence.length) {
        clearInterval(intervalId);
        enableButtons();
      }
    }, 500);
  }

  // Function to handle button clicks
  function handleButtonClick(color) {
    if (gameStarted) {
      playerSequence.push(color);
      checkSequence();
      animateButton(color);
      playSound(color);
    }
  }

  // Function to play sound for a given color
  function playSound(color) {
    sounds[color].currentTime = 0;
    sounds[color].play();
  }

  // Function to animate button click
  function animateButton(color) {
    const button = document.getElementById(color);
    button.style.boxShadow = "0 0 20px white";
    button.style.backgroundColor = "grey";
    setTimeout(() => {
      button.style.boxShadow = "";
      button.style.backgroundColor = color;
    }, 200);
  }

  // Function to check if the player's sequence matches the game sequence
  function checkSequence() {
    const index = playerSequence.length - 1;
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
  }

  // Function to end the game
  function endGame() {
    gameStarted = false;
    levelTitle.textContent = "Game Over, Press Any Key to Restart";
    document.body.classList.add("game-over");
    playSound("wrong");
    setTimeout(() => {
      document.body.classList.remove("game-over");
    }, 200);
  }

  // Function to enable color buttons
  function enableButtons() {
    greenButton.disabled = false;
    redButton.disabled = false;
    yellowButton.disabled = false;
    blueButton.disabled = false;
  }

  // Function to disable color buttons
  function disableButtons() {
    greenButton.disabled = true;
    redButton.disabled = true;
    yellowButton.disabled = true;
    blueButton.disabled = true;
  }
});
