var MOUSE_X = 0;
var MOUSE_Y = 0;

function mousemove(e) {
  MOUSE_X = e.offsetX;
  MOUSE_Y = e.offsetY;
}

function click(e) {
  var x = e.offsetX;
  var y = e.offsetY;

  var cell = getCell(x, y);
  if (cell.stone === EMPTY) {
    if (TURN === "white") {
      cell.stone = WHITE;
      TURN = "black";
    } else if (TURN === "black") {
      cell.stone = BLACK;
      TURN = "white";
    }

    processBoard();
  }
}

