var TURN = "white";
var ATARI = false;

function reportNoLiberties() {
  message("no liberties. cannot place stone.");
}

function setAtari(cell) {
  message("possible atari at " + cell.x + " " + cell.y);
}

function reportAtari() {
  message("atari! cannot place stone.");
}

function message(msg) {
  $(".messages").text(msg);
}
