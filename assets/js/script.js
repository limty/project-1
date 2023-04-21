(function () {
  var xMax = 15;
  var yMax = 11;
  var xDir = 1;
  var yDir = 0;
  var snake = [[5, 8]];
  var food = [
    Math.floor(Math.random() * yMax),
    Math.floor(Math.random() * xMax),
  ];
  var nextHeadPosX = 0;
  var nextHeadPosY = 0;
  var currentDirection = "None"; //For input control purposes
  var score = 0;

  const scoreSpan = document.getElementById("score-value");
  const gameOverDiv = document.getElementById("game-over");
  const restartButton = document.getElementById("restart");

  var clearSnakeTrail = function () {
    var grids = document.getElementsByClassName("grid");
    for (var i = 0; i < grids.length; i++) {
      removeClass(grids[i], "snake");
    }
  };
  var checkFoodCollision = function () {
    //If snake position === food position
    if (JSON.stringify(snake[snake.length - 1]) === JSON.stringify(food)) {
      updateFood();
      //increase Score and display on screen
      score++;
      scoreSpan.textContent = score;
      //return value
      return true;
    } else {
      return false;
    }
  };
  var updateSnake = function (ateFood) {
    //If snake is moving
    if (currentDirection != "None") {
      //move snake
      var nextHeadPosition = [
        snake[snake.length - 1][yDir] + nextHeadPosY,
        snake[snake.length - 1][xDir] + nextHeadPosX,
      ];
      snake.push(nextHeadPosition);
      if (ateFood) {
        //add point to var and dom in function passed into ateFood
        ateFood = false;
      } else {
        //remove last element of snake array, effect like snake moving
        snake.shift();
      }
      // console.log("Debug: Current Snake Array: " + snake);
    }
  };

  var drawSnake = function () {
    snake.forEach(function (item) {
      addClass(
        document.getElementById(cellId(item[yDir], item[xDir])),
        "snake"
      );
    });
  };

  var updateFood = function () {
    removeClass(
      document.getElementById(cellId(food[yDir], food[xDir])),
      "food"
    );
    //Randomise Food Position
    food = [Math.floor(Math.random() * yMax), Math.floor(Math.random() * xMax)];
  };

  var drawFood = function () {
    addClass(document.getElementById(cellId(food[yDir], food[xDir])), "food");
  };

  var checkDie = function () {
    var currentHeadPos = snake[snake.length - 1];
    //console.log(currentHeadPos); //For Debug
    //check hit wall
    var hitWall =
      currentHeadPos[yDir] < 0 ||
      currentHeadPos[yDir] > yMax ||
      currentHeadPos[xDir] < 0 ||
      currentHeadPos[xDir] > xMax;
    if (hitWall) {
      stopGame(gameRunning);
      dieTasks();
      // console.log("Debug: Hit Wall");
    }

    //check eat self
    for (var i = snake.length - 2; i > 0; i--) {
      //Check in body
      if (
        snake[i][xDir] === snake[snake.length - 1][xDir] &&
        snake[i][yDir] === snake[snake.length - 1][yDir]
      ) {
        stopGame(gameRunning);
        dieTasks();
        //   console.log("Debug: Ate Self");
        break;
      }
    }

    //};
  };

  var stopGame = function (funcName) {
    clearInterval(funcName);
  };

  var dieTasks = function () {
    //flash snake
    //show game over message
    //   console.log("Debug: Game over. Doing die tasks");
    restartButton.addEventListener("click", handleClickRestart);
    gameOverDiv.style.visibility = "visible";
  };

  //check if key pressed and not travelling in reverse
  var changeDirection = function (event) {
    if (
      (event.key === "ArrowLeft" || event.key === "a") &&
      currentDirection != "Right"
    ) {
      //move left
      nextHeadPosX = -1;
      nextHeadPosY = 0;
      currentDirection = "Left";
    }
    if (
      (event.key === "ArrowRight" || event.key === "d") &&
      currentDirection != "Left"
    ) {
      //move right
      nextHeadPosX = 1;
      nextHeadPosY = 0;
      currentDirection = "Right";
    }
    if (
      (event.key === "ArrowUp" || event.key === "w") &&
      currentDirection != "Down"
    ) {
      //move up
      nextHeadPosX = 0;
      nextHeadPosY = -1;
      currentDirection = "Up";
    }
    if (
      (event.key === "ArrowDown" || event.key === "s") &&
      currentDirection != "Up"
    ) {
      //move down
      nextHeadPosX = 0;
      nextHeadPosY = 1;
      currentDirection = "Down";
    }
  };

  var cellId = function (row, col) {
    return "grid-" + row + "-" + col;
  };

  var addClass = function (element, className) {
    element.classList.add(className);
  };

  var removeClass = function (element, className) {
    if (element.classList.contains(className)) {
      element.classList.remove(className);
    }
  };

  var main = function () {
    clearSnakeTrail();
    drawFood();
    drawSnake();
    updateSnake(checkFoodCollision());
    checkDie();
  };

  // var pausePlay = function (event) {
  //     if (event.key === "p"){
  //         console.log("pp");
  //     }

  // };

  document.addEventListener("keydown", function (e) {
    changeDirection(e);
    // pausePlay(e);
  });
  var gameRunning = setInterval(main, 200);

  function handleClickRestart() {
    currentDirection = "None";
    gameOverDiv.style.visibility = "hidden";
    score = 0;
    scoreSpan.textContent = score;
    snake = [[5, 8]];
    gameRunning = setInterval(main, 200);
    restartButton.removeEventListener("click", handleClickRestart);
  }
})();
