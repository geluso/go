var CTX;

var GRID = 19;
var SIZE = 36;
var STONE_SIZE = 32;

var HOVER_RADIUS = 2;

var WIDTH = (GRID) * SIZE;
var HEIGHT = WIDTH;

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

  var radius = STONE_SIZE / 2; // Arc radius
  var startAngle = 0; // Starting point on circle
  var endAngle = 2 * Math.PI; // End point on circle

  var path = new Path2D();
  path.arc(xx, yy, radius, startAngle, endAngle);

  var color;
  if (TURN === "black") {
    color = "rgba(0,0,0, .7)";
  } else {
    color = "rgba(255,255,255, .7)";
  }

  CTX.fillStyle = color;
  CTX.fill(path);

  CTX.strokeStyle = "rgba(0,0,0,.7)";
  CTX.stroke(path);
}

