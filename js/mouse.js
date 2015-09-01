var WHITE_CAPTURES = 0;
var BLACK_CAPTURES = 0;

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

  if (countNetworkLiberties([cell]) === 0) {
    reportNoLiberties();
  }

  if (ATARI && ATARI.x === cell.x && ATARI.y === cell.y) {
    reportAtari();
    return;
  }

  if (cell.stone === EMPTY) {
    if (TURN === "white") {
      cell.stone = WHITE;
    } else if (TURN === "black") {
      cell.stone = BLACK;
    }

    ATARI = false;
    var stonesKilled = processBoard();

    if (TURN === "white") {
      WHITE_CAPTURES += stonesKilled;
      TURN = "black";
    } else if (TURN === "black") {
      BLACK_CAPTURES += stonesKilled;
      TURN = "white";
    }
  }

  $(".scores .white").text(WHITE_CAPTURES);
  $(".scores .black").text(BLACK_CAPTURES);
}

