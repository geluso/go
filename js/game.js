var TURN = "white";
var ATARI = false;

var WHITE_CAPTURES = 0;
var BLACK_CAPTURES = 0;

function nextTurn() {
  if (TURN === "white") {
    TURN = "black";
  } else if (TURN === "black") {
    TURN = "white";
  }
}

function reportNoLiberties() {
  message("no liberties. cannot place stone.");
}

function reportAtari() {
  message("atari! cannot place stone.");
}

function message(msg) {
  $(".messages").text(msg);
}

function updateScores() {
  $(".scores .white").text(WHITE_CAPTURES);
  $(".scores .black").text(BLACK_CAPTURES);
}

