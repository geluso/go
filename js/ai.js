var RANDOM_MOVE_RATE = 100;
var DO_RANDOM = false;

function randomMove() {
  var x = Math.round(Math.random() * (GRID - 1));
  var y = Math.round(Math.random() * (GRID - 1));

  var cell = CELLS[x][y];
  if (cell.stone === EMPTY) {
    placeStone(cell, TURN);

    processBoard();

    nextTurn();
  }

}
