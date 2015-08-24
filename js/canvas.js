$(document).ready(canvas);

var CTX;

var GRID = 19;
var SIZE = 36;
var STONE_SIZE = 32;

var HOVER_RADIUS = 2;

var WIDTH = (GRID + 1) * SIZE;
var HEIGHT = WIDTH;

var MOUSE_X = 0;
var MOUSE_Y = 0;

var CELLS = [];

var TURN = "white";

var EMPTY = {
  color: undefined
}

var WHITE = {
  color: "white"
};

var BLACK = {
  color: "black"
};

function canvas() {
  var canvas = document.getElementById("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  CTX = canvas.getContext("2d");

  $(canvas).click(click);
  $(canvas).mousemove(mousemove);

  populateCells();
  drawBoard();
}

function drawBoard() {
  CTX.fillStyle = "tan";
  CTX.fillRect(0, 0, WIDTH, HEIGHT);

  // draw grid lines.
  CTX.stokeStyle = "black";
  for (var x = SIZE / 2; x < WIDTH; x += SIZE) {
    CTX.beginPath();
    CTX.moveTo(x, SIZE / 2);
    CTX.lineTo(x, HEIGHT - SIZE / 2);
    CTX.stroke();
  }

  for (var y = SIZE / 2; y < HEIGHT; y += SIZE) {
    CTX.beginPath();
    CTX.moveTo(SIZE / 2, y);
    CTX.lineTo(WIDTH - SIZE / 2, y);
    CTX.stroke();
  }

  // mouse hover dot
  drawHover();

  // draw stones.
  for (var x = 0; x < CELLS.length; x++) {
    var row = CELLS[x];
    for (var y = 0; y < row.length; y++) {
      var cell = row[y];

      if (cell.stone !== EMPTY) {
        drawStone(cell);
      }
    }
  }

  window.requestAnimationFrame(drawBoard);
}

function drawStone(cell) {
  var radius = STONE_SIZE / 2; // Arc radius
  var startAngle = 0; // Starting point on circle
  var endAngle = 2 * Math.PI; // End point on circle

  var xx = SIZE / 2 + cell.x * SIZE;
  var yy = SIZE / 2 + cell.y * SIZE;

  var path = new Path2D();
  path.arc(xx, yy, radius, startAngle, endAngle);

  CTX.fillStyle = cell.stone.color;

  CTX.fill(path);
  CTX.stroke(path);
}

function drawHover() {
  var x = MOUSE_X - SIZE / 2;
  var y = MOUSE_Y - SIZE / 2;

  var xx = Math.round(x / SIZE) * SIZE + SIZE / 2;
  var yy = Math.round(y / SIZE) * SIZE + SIZE / 2;

  var radius = HOVER_RADIUS; // Arc radius
  var startAngle = 0; // Starting point on circle
  var endAngle = 2 * Math.PI; // End point on circle

  var path = new Path2D();
  path.arc(xx, yy, radius, startAngle, endAngle);

  CTX.fillStyle = "red";
  CTX.fill(path);

  var color;
  if (TURN === "black") {
    color = "rgba(0,0,0,.5)";
  } else {
    color = "rgba(255,255,255,.5)";
  }
}

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

function populateCells() {
  for (var x = 0; x < SIZE; x++) {
    CELLS[x] = [];
    for (var y = 0; y < SIZE; y++) {
      CELLS[x][y] = {
        stone: EMPTY,
        x: x,
        y: y
      };
    }
  }
}

function processBoard() {
  for (var x = 0; x < GRID; x++) {
    for (var y = 0; y < GRID; y++) {
      var cell = CELLS[x][y];
      var neighbors = getNeighbors(cell.x, cell.y);

      var liberties = 0;
      for (var i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i];
        if (neighbor.stone === EMPTY) {
          liberties++;
        }
      }

      if (liberties === 0) {
        cell.stone = EMPTY
      }
    }
  }

}

function getCell(x, y) {
  // account for border offset.
  x = x - SIZE / 2;
  y = y - SIZE / 2;

  x = Math.round(x / SIZE);
  y = Math.round(y / SIZE);

  var cell = CELLS[x][y];
  return cell;
}

function getNeighbors(x, y) {
  var neighbors = [];

  // left
  if (x - 1 >= 0) {
    neighbors.push(CELLS[x - 1][y]);
  }

  // right
  if (x + 1 < GRID) {
    neighbors.push(CELLS[x + 1][y]);
  }

  // top
  if (y - 1 >= 0) {
    neighbors.push(CELLS[x][y - 1]);
  }

  // bottom
  if (y + 1 < GRID) {
    neighbors.push(CELLS[x][y + 1]);
  }

  return neighbors;
}
