var TURN = "white";
var KO = false;

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
  message("No liberties. Cannot place stone.");
}

function reportKo() {
  message("Ko! Cannot place stone.");
}

function message(msg) {
  $(".messages").text(msg);
}

function updateScores() {
  $(".scores .white").text(WHITE_CAPTURES);
  $(".scores .black").text(BLACK_CAPTURES);
}

