var CELLS = [];

var PLACING_STONE = false;
var LAST_STONE = {
  x: undefined,
  y: undefined
};

function populateCells() {
  for (var x = 0; x < GRID; x++) {
    CELLS[x] = [];
    for (var y = 0; y < GRID; y++) {
      CELLS[x][y] = {
        stone: EMPTY,
        x: x,
        y: y
      };
    }
  }
}

function placeStone(cell, color) {
  color = color[0].toUpperCase();
  if (color === "W") {
    cell.stone = WHITE;
  } else if (color === "B") {
    cell.stone = BLACK;
  }

  LAST_STONE = cell;

  PLACING_STONE = true;
  processBoard();
  PLACING_STONE = false;

  // recheck most recently placed stones network
  var network = getNetwork(cell);
  var liberties = countNetworkLiberties(network);
  if (liberties === 0) {
    cell.stone = EMPTY;
    reportNoLiberties();
    return false;
  }

  return true;
}

function processBoard() {
  var stonesKilled = 0;

  for (var x = 0; x < GRID; x++) {
    for (var y = 0; y < GRID; y++) {
      var cell = CELLS[x][y];

      if (cell.stone === EMPTY) {
        continue;
      }

      var network = getNetwork(cell);
      var liberties = countNetworkLiberties(network);

      clearVisited();

      if (liberties === 0) {
        killNetwork(network);
        stonesKilled += network.length;

        if (stonesKilled === 1) {
          KO = network[0];
        } else if (stonesKilled > 1) {
          KO = false;
        }
      }
    }
  }

  return stonesKilled;
}

function countNetworkLiberties(network) {
  var liberties = 0;

  for (var i = 0; i < network.length; i++) {
    var cell = network[i];
    liberties += countCellLiberties(cell);
  }

  return liberties;
}

function countCellLiberties(cell) {
  if (PLACING_STONE && cell.x === LAST_STONE.x && cell.y === LAST_STONE.y) {
    return Infinity;
  }

  var neighbors = getCellNeighbors(cell);
  var liberties = 0;

  for (var i = 0; i < neighbors.length; i++) {
    if (neighbors[i].stone === EMPTY) {
      liberties++;
    }
  }

  return liberties;
}

function killNetwork(network) {
  for (var i = 0; i < network.length; i++) {
    var cell = network[i];
    cell.stone = EMPTY;
  }
}

function groupStones() {
  var networks = [];

  for (var x = 0; x < CELLS.length; x++) {
    for (var y = 0; y < CELLS[x].length; y++) {
      var cell = CELLS[x][y];

      if (!cell.visited) {
        if (cell.stone !== EMPTY) {
          var network = getNetwork(cell);
          networks.push(network);
        }
      }
    }
  }

  clearVisited();

  return networks;
}

function getNetwork(cell) {
  var network = _getNetwork(cell);
  clearVisited();
  return network;
}

function _getNetwork(cell) {
  if (cell.visited) {
    return [];
  }

  var network = [cell];
  cell.visited = true;

  var neighbors = getCellNeighbors(cell);

  for (var i = 0; i < neighbors.length; i++) {
    var neighbor = neighbors[i];

    // same color, non-empty.
    if (!neighbor.visited && neighbor.stone === cell.stone) {
      network.push.apply(network, _getNetwork(neighbor));
    }
  }

  return network;
}

function clearVisited() {
  for (var x = 0; x < CELLS.length; x++) {
    for (var y = 0; y < CELLS[x].length; y++) {
      CELLS[x][y].visited = false;
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

function getCellNeighbors(cell) {
  return getNeighbors(cell.x, cell.y);
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


function saveBoard() {

}

function loadBoard() {

}

function printBoard() {
  var grid = "";
  for (var y = 0; y < GRID; y++) {
    var row = "";

    for (var x = 0; x < GRID; x++) {
      var cell = CELLS[x][y];
      if (cell.stone === EMPTY) {
        row += ".";
      } else if (cell.stone === WHITE) {
        row += "W";
      } else if (cell.stone === BLACK) {
        row += "B";
      }
    }

    grid += row + "\n";
  }

  console.log(grid);
}
