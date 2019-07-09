var boardSizeY = 8;
var boardSizeX = 8;
var currentHeadPositionY;
var currentHeadPositionX;
var bgColour = "YellowGreen";
var snake = [{}];
var keyPressed;

var clearBoard = function() {
    var grids = document.getElementsByClassName("grid");
    for (var i = 0; i < grids.length; i++) {
      grids[i].style.backgroundColor = bgColour;
    };
};

var drawSnake = function(){

};

var initGame = function() {
    currentHeadPositionY = boardSizeY / 2;
    currentHeadPositionX = boardSizeX/2;
    addClass(document.getElementById(cellId(currentHeadPositionY, currentHeadPositionX)), "snake");
    addKeyListener();
};

var cellId = function(row, col) {
	return "grid-" + row + col;
};

var addClass = function(element, className) {
  element.classList.add(className);
};

var removeClass = function(element, className) {
  if (element.classList.contains(className)) {
    element.classList.remove(className);
  }
};

var stepRight = function() {
    removeClass(
      document.getElementById(
        cellId(currentHeadPositionY, currentHeadPositionX)
      ),"snake");
    currentHeadPositionX += 1;
    addClass(
      document.getElementById(
        cellId(currentHeadPositionY, currentHeadPositionX)
      ),
      "snake"
    );
};
var stepLeft = function(){
    removeClass(
      document.getElementById(
        cellId(currentHeadPositionY, currentHeadPositionX)
      ),
      "snake"
    );
    currentHeadPositionX -= 1;
    addClass(
      document.getElementById(
        cellId(currentHeadPositionY, currentHeadPositionX)
      ),
      "snake"
    );
};
var moveUp = function() {
    currentHeadPositionY += 1;
};
var moveDown = function() {
    currentHeadPositionY -= 1;
};

var addKeyListener = function(){
    document.addEventListener("keydown", function(event) {
        //event.preventDefault();
        switch (event.key) {
          case "ArrowLeft":
            // Left pressed
            stepLeft();
            break;
          case "ArrowRight":
            // Right pressed
            stepRight();
            break;
          case "ArrowUp":
            // Up pressed
            stepUp();
            break;
          case "ArrowDown":
            // Down pressed
            stepDown();
            break;
        }
    })
};

var processKey = function(){

};

initGame();

var main =function(){

};

var mainGamePlaying = setInterval(main, 500);
