var xMax = 15;
var yMax = 11;
var xDir = 1;
var yDir = 0;
var snake = [[5, 8]];
var food = [Math.floor(Math.random() * yMax), Math.floor(Math.random() * xMax)];
var nextHeadPosX = 0;
var nextHeadPosY = 0;
var currentDirection = "None"; //For input control purposes

var clearSnakeTrail = function() {
  var grids = document.getElementsByClassName("grid");
  for (var i = 0; i < grids.length; i++) {
    removeClass(grids[i], "snake");
  }
};
var checkFoodCollision = function() {
  //If snake position === food position
  if (JSON.stringify(snake[snake.length - 1]) === JSON.stringify(food)) {
    updateFood();
    //increase Score and display on screen

    //return value
    return true;
  }
  else{
    return false;
  };
};
var updateSnake = function(ateFood) {
    //If snake is moving
  if (currentDirection != "None") {
      //move snake
    var nextHeadPosition = [
      snake[snake.length - 1][yDir] + nextHeadPosY,
      snake[snake.length - 1][xDir] + nextHeadPosX
    ];
    snake.push(nextHeadPosition);
    if (ateFood) {
      //add point to var and dom
      ateFood = false;
    } else {
      //remove last element of snake array, effect like snake moving
      snake.shift();
    }
    console.log("Debug: Current Snake Array: " + snake);
  }
};

var drawSnake = function() {
  snake.forEach(function(item) {
    addClass(document.getElementById(cellId(item[yDir], item[xDir])), "snake");
  });
};

var updateFood = function() {
  removeClass(
    document.getElementById(cellId(food[yDir], food[xDir])),
    "food"
  );
  food = [Math.floor(Math.random() * yMax), Math.floor(Math.random() * xMax)];
};

var drawFood = function() {
  addClass(document.getElementById(cellId(food[yDir], food[xDir])), "food");
};

var checkDie = function(){
    var currentHeadPos = snake[snake.length - 1];
    console.log(currentHeadPos);
    //check hit wall
    var hitWall =
      currentHeadPos[yDir] < 0 ||
      currentHeadPos[yDir] > yMax ||
      currentHeadPos[xDir] < 0 ||
      currentHeadPos[xDir] > xMax;
    if(hitWall){
        stopGame(gameRunning);
        dieTasks();
        console.log("Debug: Hit Wall");
    };
    //check eat self
    if(arrayContainsArray(currentHeadPos,snake.slice(0,-1))){ //slice head away from array and compare
            stopGame(gameRunning);
            dieTasks();
            console.log("Debug: Ate Self");
    };
};

var stopGame = function(funcName){
     clearInterval(funcName);
};

var dieTasks = function(){
    //flash snake
     //show game over message
     console.log("Debug: Game over. Doing die tasks");
};

//check if key pressed and not travelling in reverse
var changeDirection = function(event) {
  if (event.key === "ArrowLeft" && currentDirection != "Right") {
    //move left
    nextHeadPosX = -1;
    nextHeadPosY = 0;
    currentDirection = "Left";
  }
  if (event.key === "ArrowRight" && currentDirection != "Left") {
    //move right
    nextHeadPosX = 1;
    nextHeadPosY = 0;
    currentDirection = "Right";
  }
  if (event.key === "ArrowUp" && currentDirection != "Down") {
    //move up
    nextHeadPosX = 0;
    nextHeadPosY = 1;
    currentDirection = "Up";
  }
  if (event.key === "ArrowDown" && currentDirection != "Up") {
    //move down
    nextHeadPosX = 0;
    nextHeadPosY = -1;
    currentDirection = "Down";
  }
};

var cellId = function(row, col) {
  return "grid-" + row + "-" + col;
};

var addClass = function(element, className) {
  element.classList.add(className);
};

var removeClass = function(element, className) {
  if (element.classList.contains(className)) {
    element.classList.remove(className);
  }
};
var arrayContainsArray = function(subset, superset) {
  if (0 === subset.length) {
    return false;
  }
  return subset.every(function(value) {
    return superset.indexOf(value) >= 0;
  });
};

var main = function() {
  clearSnakeTrail();
  drawFood();
  drawSnake();
  updateSnake(checkFoodCollision());
  checkDie();
};

document.addEventListener("keydown", changeDirection);
var gameRunning = setInterval(main, 200);