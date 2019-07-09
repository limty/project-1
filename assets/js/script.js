// var boardSizeY = 8;
// var boardSizeX = 8;

// max y 11
// max x 15


var xDir = 1
var yDir = 0

var bgColour = "YellowGreen";
var snake = [[5,8]];
var food = [Math.floor(Math.random() * 11), Math.floor(Math.random() * 15)];
var nextHeadPosX = 0;
var nextHeadPosY = 0;
var currentDirection = "None"; //For input control purposes
var ateFood = false;
//var currentSnakeTail = [];
// var arrowKeysPressed = false;
// var gameStared = false;

var clearSnakeTail = function() {
    var grids = document.getElementsByClassName("grid");
    for (var i = 0; i < grids.length; i++) {
      //grids[i].style.backgroundColor = bgColour;
      removeClass(grids[i],"snake");
    };
};
var checkFoodCollision = function() {
    //If snake position === food position
    if (JSON.stringify(snake[snake.length - 1]) === JSON.stringify(food)) {
      updateFood();
      ateFood = true;
      //increase Score and display on screen
    };
};
var updateSnake = function(){ //move snake
    if (currentDirection != "None"){
      var nextHeadPosition = [
        snake[snake.length-1][0] + nextHeadPosY,
        snake[snake.length-1][1] + nextHeadPosX
      ];
    snake.push(nextHeadPosition);
    if(ateFood){
        //add point to var and dom
        ateFood = false;
    }
    else {
           //remove last element of snake array, effect like snake moving
        //currentSnakeTail = snake[0];
        snake.shift();
        //    removeClass(
        //      document.getElementById(
        //        cellId(currentSnakeTail[xDir], currentSnakeTail[yDir])
        //      ),
        //      "snake"
        //    );
         }

    //if(snake.length > 1){

    // console.log(currentSnakeTail);
    // var currentSnakeTail = snake[snake.length-1];
    // addClass(
    //   document.getElementById(
    //     cellId(currentSnakeTail[0], currentSnakeTail[1])
    //   ),
    //   "food"
    // );
    //snake.pop();
    // console.log(currentSnakeTail);

    //  };
}
console.log("Debug: Current Snake Array: " + snake);
};

var drawSnake = function(){
    snake.forEach(function (item) {
        addClass(document.getElementById(cellId(item[0], item[1])), "snake");
    });

    // if(snake.length > 1){
    //    removeClass(
    //          document.getElementById(
    //            cellId(currentSnakeTail[yDir], currentSnakeTail[xDir])
    //          ),"snake");
    // }
};

var drawFood = function(){
    addClass(document.getElementById(cellId(food[0], food[1])), "food");
};
var updateFood = function(){
    removeClass(document.getElementById(cellId(food[0], food[1])), "food");
    food = [Math.floor(Math.random() * 11), Math.floor(Math.random() * 15)];
};

// var initGame = function() {
//     currentHeadPositionY = boardSizeY / 2;
//     currentHeadPositionX = boardSizeX/2;
//     addClass(document.getElementById(cellId(currentHeadPositionY, currentHeadPositionX)), "snake");
//     addKeyListener();
// };

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

//check if key pressed and not travelling in reverse
var changeDirection = function(event) {
        if (event.key === "ArrowLeft" && currentDirection != "Right") {
            nextHeadPosX = -1;
            nextHeadPosY = 0;
            currentDirection = "Left";
        }
        if (event.key === "ArrowRight" && currentDirection != "Left") {
            nextHeadPosX = 1;
            nextHeadPosY = 0;
            currentDirection = "Right";
        }
        if (event.key === "ArrowUp" && currentDirection != "Down") {
            nextHeadPosX = 0;
            nextHeadPosY = 1;
            currentDirection = "Up";
        }
        if (event.key === "ArrowDown" && currentDirection != "Up") {
            nextHeadPosX = 0;
            nextHeadPosY = -1;
            currentDirection = "Down";
        }
    };


var main = function() {
    clearSnakeTail();
    drawFood();
    drawSnake();
    checkFoodCollision();
    updateSnake();
};

document.addEventListener("keydown", changeDirection);

// arrowKeysPressed = (event.key === "ArrowDown") || (event.key === "ArrowUp") ||
// (event.key === "ArrowLeft") || (event.key === "ArrowRight");

//initGame();
// if(arrowKeysPressed){
//   gameStared = true;
// };

// if(gameStared === true){
    setInterval(main, 500);
// };