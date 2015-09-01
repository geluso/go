$(document).ready(main);

function main() {
  updateScores();

  var canvas = document.getElementById("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  CTX = canvas.getContext("2d");

  $(canvas).click(click);
  $(canvas).mousemove(mousemove);

  populateCells();

  drawBoard();

  if (DO_RANDOM) {
    setInterval(randomMove, RANDOM_MOVE_RATE);
  }
}
